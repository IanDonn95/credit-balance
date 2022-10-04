import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

type DataSource<D> = () => Promise<D>;

/**
 * this is a data fetching pattern I settled upon at work that I really liked
 * it just needs a stable data source function, and will fetch new data if that source changes
 * it handles loading and error states internally, instead of forcing every page to set one up for each fetch themselves
 * finally, it provides access to the setData function, as creates/updates usually return fresher data
 */
export function useDataSource<D>(get: DataSource<D>): [
    D | null,
    boolean,
    unknown | null,
    Dispatch<SetStateAction<D | null>>
] {
    const [data, setData] = useState<D | null>(null);
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        get()
            .then(d => setData(d))
            .catch(e => setError(e))
            .finally(() => setDataLoading(false));
    }, [get]);

    return [data, dataLoading, error, setData];
}


/**
 * track how whether each row has been selected, mapping the creditor id to a boolean value
 * provides easy to use update functions, and a precalculated count of selected rows
 */
export function useRowSelectors<D extends {id: number}>(rows: D[]): [
    Map<number, boolean>,
    boolean,
    (id: number) => void,
    () => void
] {
    // use a map because an object with id keys would have the ids converted to strings (bad)
    const [selectedRows, setSelectedRows] = useState(() => {
        const map = new Map<number, boolean>();
        rows.forEach(row => {
            map.set(row.id, false);
        });
        return map;
    });

    // maintain selected rows across data updates
    useEffect(() => {
        setSelectedRows(currentRows => {
            let newRows: {selected: boolean, id: number}[] = [];

            // pass rows still in the data to the new map
            currentRows.forEach((selected, id) => {
                if (rows.some(row => row.id === id)) {
                    newRows.push({selected, id});
                }
            });
            // add new rows to the map, initially unselected
            newRows = newRows.concat(rows.filter(row => newRows.every(nr => nr.id !== row.id))
                .map(row => ({selected: false, id: row.id})));

            // convert back to well-typed map
            const newMap = new Map();
            newRows.forEach(row => newMap.set(row.id, row.selected));
            return newMap;
        });
    }, [rows]);

    // transfer all map entries to the new map, swapping the value of the toggle row
    const toggleRow = (id: number) => {
        setSelectedRows(currentRows => {
            const newMap = new Map<number, boolean>();
            currentRows.forEach((selected, rowId) => {
                newMap.set(rowId, rowId === id ? !selected : selected);
            });
            return newMap;
        });
    };

    const allSelected = useMemo(() => {
        let all = true;
        selectedRows.forEach((selected) => {
            all = all && selected;
        });
        return all;
    }, [selectedRows]);

    // transfer all entries over to the new map, setting their value to !allSelected
    const toggleAll = () => {
        setSelectedRows(currentRows => {
            const newMap = new Map<number, boolean>();
            currentRows.forEach((selected, rowId) => {
                newMap.set(rowId, !allSelected);
            });
            return newMap;
        });
    };

    return [selectedRows, allSelected, toggleRow, toggleAll];
}

// simple hook to provide a modal open state
export const useModal = (): [boolean, () => void] => {
    const [open, setOpen] = useState(false);
    return [open, () => setOpen(o => !o)];
};