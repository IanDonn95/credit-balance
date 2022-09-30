import React, { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDataSource } from './Hooks';
import { getGoodCreditors } from './CreditorService';

function App() {
	const goodCreditorsDataSource = useCallback(getGoodCreditors, []);
	const [creditors, creditorsLoading, creditorsError, setCreditors] = useDataSource(getGoodCreditors);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
