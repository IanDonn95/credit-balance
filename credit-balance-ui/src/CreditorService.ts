import { Creditor } from "./Types";

const backendApiUrl = 'http://localhost:3001';

export const getGoodCreditors = (): Promise<Creditor[]> => {
    return fetch(`${backendApiUrl}/getGoodCreditors`).then(resp => resp.json());
};