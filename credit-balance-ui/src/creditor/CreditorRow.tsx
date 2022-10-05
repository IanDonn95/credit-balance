import { FC } from "react";
import { Creditor } from "../Types";
import { percentFormatter, currencyFormatter } from "./CreditorUtils";

interface CreditorRowProps {
    creditor: Creditor;
    checked: boolean | undefined;
    toggleRow: () => void;
}

const CreditorRow: FC<CreditorRowProps> = ({ creditor, checked, toggleRow }) => {
    return <tr>
        <td className="checkbox">
            {checked !== undefined && <input
                type='checkbox'
                checked={checked}
                onChange={toggleRow}
            />}
        </td>
        <td className="border"><span>{creditor.creditorName}</span></td>
        <td className="border"><span>{creditor.firstName}</span></td>
        <td className="border"><span>{creditor.lastName}</span></td>
        <td className="border right"><span>{percentFormatter.format(creditor.minPaymentPercentage / 100)}</span></td>
        <td className="border right"><span>{currencyFormatter.format(creditor.balance)}</span></td>
    </tr>;
};

export default CreditorRow;