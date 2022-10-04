import { useCallback } from 'react';
import { useDataSource } from './Hooks';
import { addCreditor, getGoodCreditors } from './creditor/CreditorService';
import CreditorTable from './creditor/CreditorTable';
import './App.scss';

function App() {
	const goodCreditorsDataSource = useCallback(getGoodCreditors, []);
	const [creditors, creditorsLoading, creditorsError, setCreditors] = useDataSource(goodCreditorsDataSource);

	const handleAddDebt = () => {
		addCreditor({
			creditorName: 'BIG BANK',
			firstName: 'Ian',
			lastName: 'Huffman',
			minPaymentPercentage: 4.1,
			balance: 12345
		});
	}

	return <div className="app">
		{creditors && <CreditorTable creditors={creditors} handleAddDebt={handleAddDebt} />}
	</div>;
}

export default App;
