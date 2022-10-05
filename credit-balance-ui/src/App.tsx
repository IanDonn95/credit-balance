import { useCallback } from 'react';
import { useDataSource } from './Hooks';
import { addCreditor, getGoodCreditors } from './creditor/CreditorService';
import CreditorTable from './creditor/CreditorTable';
import './App.scss';
import { Creditor } from './Types';

function App() {
	// load creditor data from node backend
	const goodCreditorsDataSource = useCallback(getGoodCreditors, []);
	const [creditors, creditorsLoading, creditorsError, setCreditors] = useDataSource(goodCreditorsDataSource);

	// setup creditor creation call here as we have access to the table data setter at the app level
	const handleAddDebt = (creditor: Omit<Creditor, 'id'>) => {
		return addCreditor(creditor)
			.then(setCreditors)
			.catch(e => console.error(e)); // adding toast errors felt out of scope
	};

	return <div className="app">
		{creditorsError ?
			<span>There was an error loading the creditor table. Please try again later.</span>
			:
			<>
				{creditorsLoading && <span>Loading...</span>}
				{creditors && <CreditorTable creditors={creditors} handleAddDebt={handleAddDebt} />}
			</>
		}
	</div>;
}

export default App;
