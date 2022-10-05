import { Creditor } from './Types';
import { Collection } from 'mongodb';

export const CREDITORS_COLLECTION = 'creditors';
export const CREDITORS_ID_SEQUENCE_COLLECTION = 'creditorIdSequence';

export const getGoodCreditors = (col: Collection<Creditor>) => col.find<Creditor>({
    balance: { $gt: 2000 }, // only include creditors with balance above 2000
    minPaymentPercentage: { $lte: 29.99 } // and also with minPaymentPercentage at most 29.99
}, {
    projection: { _id: 0} // exclude Mongo unique id, since we have our own id field
}).toArray();