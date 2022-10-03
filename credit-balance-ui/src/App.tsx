import React, { useCallback } from 'react';
import './App.css';
import { useDataSource } from './Hooks';
import { getGoodCreditors } from './CreditorService';
import CreditorTable from './CreditorTable';

function App() {
	const goodCreditorsDataSource = useCallback(getGoodCreditors, []);
	const [creditors, creditorsLoading, creditorsError, setCreditors] = useDataSource(goodCreditorsDataSource);
	return (
		<div className="App">
			{creditors && <CreditorTable creditors={creditors} />}
		</div>
	);
}

export default App;
