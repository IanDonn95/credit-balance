import { FC, useState, useEffect, FormEvent } from "react";
import { Creditor } from "../Types";
import './AddCreditorModal.scss';

interface AddCreditorModalProps {
    open: boolean;
    toggleOpen: () => void;
    addCreditor: (creditor: Omit<Creditor, 'id'>) => Promise<void>;
}

const AddCreditorModal: FC<AddCreditorModalProps> = ({ open, toggleOpen, addCreditor }) => {
    // controlled form state
    const [creditorName, setCreditorName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [minPaymentPercentage, setMinPaymentPercentage] = useState('');
    const [balance, setBalance] = useState('');

    // reset the form data whenever the modal closes (it always renders, so it is never unmounted during normal operation)
    useEffect(() => {
        if (!open) {
            setCreditorName('');
            setFirstName('');
            setLastName('');
            setMinPaymentPercentage('');
            setBalance('');
        }
    }, [open]);

    // take the <form> submit event and push the new data on to the backend
    const createCreditor = (evt: FormEvent) => {
        evt.preventDefault(); // forms usually go somewhere after submission, so we need to tell the browser not to navigate away
        const creditor = {
            creditorName,
            firstName,
            lastName,
            minPaymentPercentage: Number.parseFloat(minPaymentPercentage),
            balance: Number.parseFloat(balance)
        };
        addCreditor(creditor).then(() => toggleOpen());
    }

    if (!open) {
        return null;
    }

    return <>
        <div className="modal-backdrop" />
        <div className="modal" onClick={toggleOpen}>
            <div className="modal-body" onClick={evt => { evt.stopPropagation() }}>
                <form onSubmit={createCreditor}>
                    <div className="creditor-form">
                        <label htmlFor='creditorName'>Creditor</label>
                        <input
                            type='text'
                            id='creditorName'
                            value={creditorName}
                            onChange={evt => { setCreditorName(evt.target.value); }}
                            required
                        />
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            id='firstName'
                            value={firstName}
                            onChange={evt => { setFirstName(evt.target.value); }}
                            required
                        />
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            id='lastName'
                            value={lastName}
                            onChange={evt => { setLastName(evt.target.value); }}
                            required
                        />
                        <label htmlFor='minPaymentPercentage'>Min Pay &#37;</label>
                        <div><input
                            type='text' /** I've found that number input aren't ideal for a lot of use cases, but text + a pattern is a great alternative */
                            id='minPaymentPercentage'
                            value={minPaymentPercentage}
                            onChange={evt => {
                                const percent = Number.parseFloat(evt.target.value);
                                if (!Number.isNaN(percent) || evt.target.value === '') {
                                    setMinPaymentPercentage(evt.target.value);
                                }
                            }}
                            pattern={'[0-9]{0,2}([.][0-9]{0,2})?' /** ex. 12.34 */}
                            required
                        />&#37;</div>
                        <label htmlFor='balance'>Balance</label>
                        <div>&#36;<input
                            type='text'
                            id='balance'
                            value={balance}
                            onChange={evt => {
                                const bal = Number.parseFloat(evt.target.value);
                                if (!Number.isNaN(bal) || evt.target.value === '') {
                                    setBalance(evt.target.value);
                                }
                            }}
                            pattern={'[0-9]*([.][0-9]{0,2})?' /** ex. 1234.56 */}
                            required
                        /></div>
                    </div>
                    <div className="footer">
                        <button type="submit">Add Debt</button>
                        <button type="button" onClick={toggleOpen}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </>;
};

export default AddCreditorModal;