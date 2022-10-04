import { FC, useMemo } from "react";
import { Creditor } from "../Types";
import './CreditorTable.scss';
import { useModal, useRowSelectors } from "../Hooks";
import AddCreditorModal from "./AddCreditorModal";

interface CreditorTableProps {
    creditors: Creditor[];
    handleAddDebt: (creditor: Omit<Creditor, 'id'>) => Promise<void>;
}

const CreditorTable: FC<CreditorTableProps> = ({ creditors, handleAddDebt }) => {
    const [selectedRows, allSelected, toggleRow, toggleAll] = useRowSelectors(creditors);

    const totalSelectedBalance = useMemo(() => creditors.reduce((total, creditor) => {
        return selectedRows.get(creditor.id) ? total + creditor.balance : total;
    }, 0), [creditors, selectedRows]);

    const [modalOpen, toggleModalOpen] = useModal();

    // Maps unfortunately lack the pretty array map/reduce functions, but this code is essentially the same
    const selectedRowsCount = useMemo(() => {
        let count = 0;
        selectedRows.forEach((selected) => { if (selected) {count++;} });
        return count;
    }, [selectedRows]);

    return <div>
        <table className="creditors">
            <thead>
                <tr>
                    <th className="checkbox">
                        <input
                            type='checkbox'
                            checked={allSelected}
                            onChange={toggleAll}
                        />
                    </th>
                    <th className="border"><span>Creditor</span></th>
                    <th className="border"><span>First Name</span></th>
                    <th className="border"><span>Last Name</span></th>
                    <th className="border right"><span>Min Pay &#37;</span></th>
                    <th className="border right"><span>Balance</span></th>
                </tr>
            </thead>
            <tbody>
                {creditors.map(creditor => <tr key={creditor.id}>
                    <td className="checkbox">
                        <input
                            type='checkbox'
                            checked={selectedRows.get(creditor.id)}
                            onChange={() => toggleRow(creditor.id)}
                        />
                    </td>
                    <td className="border"><span>{creditor.creditorName}</span></td>
                    <td className="border"><span>{creditor.firstName}</span></td>
                    <td className="border"><span>{creditor.lastName}</span></td>
                    <td className="border right"><span>{percentFormatter.format(creditor.minPaymentPercentage / 100)}</span></td>
                    <td className="border right"><span>{currencyFormatter.format(creditor.balance)}</span></td>
                </tr>)}
            </tbody>
        </table>
        <button onClick={toggleModalOpen}>Add Debt</button>
        <div className="total-row">
            <div><strong>Total</strong></div>
            <div><strong>{currencyFormatter.format(totalSelectedBalance)}</strong></div>
        </div>
        <div className="counts-row">
            <div><strong>Total Row Count : {creditors.length}</strong></div>
            <div><strong>Check Row Count : {selectedRowsCount}</strong></div>
        </div>

        <AddCreditorModal open={modalOpen} toggleOpen={toggleModalOpen} addCreditor={handleAddDebt} />
    </div>;
};

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const percentFormatter = Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
});

export default CreditorTable;