import { Dispatch, SetStateAction, useEffect, useState } from "react";

type DataSource<D> = () => Promise<D>
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