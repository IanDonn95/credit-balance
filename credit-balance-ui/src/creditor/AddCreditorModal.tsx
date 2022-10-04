import { FC, useState, useEffect, FormEvent } from "react";
import { Creditor } from "../Types";
import './AddCreditorModal.scss';

interface AddCreditorModalProps {
    open: boolean;
    toggleOpen: () => void;
    addCreditor: (creditor: Omit<Creditor, 'id'>) => Promise<void>;
}

const AddCreditorModal: FC<AddCreditorModalProps> = ({ open, toggleOpen, addCreditor }) => {
    const [creditorName, setCreditorName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [minPaymentPercentage, setMinPaymentPercentage] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if (!open) {
            setCreditorName('');
            setFirstName('');
            setLastName('');
            setMinPaymentPercentage('');
            setBalance('');
        }
    }, [open]);

    const createCreditor = (evt: FormEvent) => {
        evt.preventDefault();
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
                            type='text'
                            id='minPaymentPercentage'
                            value={minPaymentPercentage}
                            onChange={evt => {
                                const percent = Number.parseFloat(evt.target.value);
                                if (!Number.isNaN(percent) || evt.target.value === '') {
                                    setMinPaymentPercentage(evt.target.value);
                                }
                            }}
                            pattern={'[0-9]{0,2}([.][0-9]{0,2})?'}
                            required
                        />&#37;</div>
                        <label htmlFor='balance'>Balance</label>
                        <div>$<input
                            type='text'
                            id='balance'
                            value={balance}
                            onChange={evt => {
                                const bal = Number.parseFloat(evt.target.value);
                                if (!Number.isNaN(bal) || evt.target.value === '') {
                                    setBalance(evt.target.value);
                                }
                            }}
                            pattern={'[0-9]*([.][0-9]{0,2})?'}
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