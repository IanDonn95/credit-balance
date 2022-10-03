import { FC } from "react";
import { Creditor } from "./Types";
import './CreditorTable.scss';
import { useRowSelectors } from "./Hooks";

interface CreditorTableProps {
    creditors: Creditor[];
}

const CreditorTable: FC<CreditorTableProps> = ({ creditors }) => {
    const [selectedRows, allSelected, toggleRow, toggleAll] = useRowSelectors(creditors);

    return <table className="creditors">
        <thead>
            <tr>
                <th>
                    <input
                        type='checkbox'
                        checked={allSelected}
                        onChange={toggleAll}
                    />
                </th>
                <th className="border"><span>Creditor</span></th>
                <th className="border"><span>First Name</span></th>
                <th className="border"><span>Last Name</span></th>
                <th className="border"><span>Min Pay%</span></th>
                <th className="border"><span>Balance</span></th>
            </tr>
        </thead>
        <tbody>
            {creditors.map(creditor => <tr key={creditor.id}>
                <td>
                    <input
                        type='checkbox'
                        checked={selectedRows.get(creditor.id)}
                        onChange={() => toggleRow(creditor.id)}
                    />
                </td>
                <td className="border"><span>{creditor.creditorName}</span></td>
                <td className="border"><span>{creditor.firstName}</span></td>
                <td className="border"><span>{creditor.lastName}</span></td>
                <td className="border"><span>{creditor.minPaymentPercentage}</span></td>
                <td className="border"><span>{creditor.balance}</span></td>
            </tr>)}
        </tbody>
    </table>;
};

export default CreditorTable;