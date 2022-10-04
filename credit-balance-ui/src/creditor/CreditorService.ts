import { Creditor } from "../Types";

const backendApiUrl = 'http://localhost:3001';

export const getGoodCreditors = (): Promise<Creditor[]> => {
    return fetch(`${backendApiUrl}/goodCreditors`)
        .then(resp => resp.json());
};

export const addCreditor = (creditor: Omit<Creditor, 'id'>): Promise<Creditor[]> => {
    return fetch(`${backendApiUrl}/creditor`, {
        method: 'POST',
        body: JSON.stringify(creditor),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .catch(e => console.error(e));
};