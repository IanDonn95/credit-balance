import { Creditor } from "../Types";

// const backendApiUrl = 'http://localhost:3001'; // local node+express server
// const backendApiUrl = 'http://localhost:7071/api'; // local Azure Functions server
const backendApiUrl = 'https://creditors-functions.azurewebsites.net/api'; // deployed Azure Functions

// get creditors for the table that match certain criteria (high balance, reasonable min pay percentage)
export const getGoodCreditors = (): Promise<Creditor[]> => {
    return fetch(`${backendApiUrl}/goodCreditors`)
        .then(resp => resp.json()); // caught by data source hook
};

/**
 * add a creditor to the database, and return the new good creditors in a single API call
 * note the new creditor may not match the good criteria and thus may not show up in the latest data
 */
export const addCreditor = (creditor: Omit<Creditor, 'id'>): Promise<Creditor[]> => {
    return fetch(`${backendApiUrl}/creditor`, {
        method: 'POST',
        body: JSON.stringify(creditor),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json()); // caught by handleAddDebt
};