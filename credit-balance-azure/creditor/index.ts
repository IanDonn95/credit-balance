import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CREDITORS_ID_SEQUENCE_COLLECTION, CREDITORS_COLLECTION, getGoodCreditors } from "../lib/CreditorsCollection";
import { query } from "../lib/DB";

/**
 * enable POST API call to add a new creditor
 * first get the next unused ID to attach to the creditor
 * this id is stored in a "sequence" collection that we increment each time we retrieve the next value
 * then the creditor data is stored in the creditor collection, including the new ID
 * DEV NOTE- a future improvement would be to convert this to a single DB transaction, but a partial save won't break the DB
 * we would just skip an ID in the sequence
 */
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request to add a creditor.');
    
    const { value: { id: nextId } } = await query(CREDITORS_ID_SEQUENCE_COLLECTION, col => col.findOneAndUpdate({}, {
        $inc: { id: 1 }
    }));
    const newCreditor = { ...req.body, id: nextId };
    await query(CREDITORS_COLLECTION, col => col.insertOne(newCreditor)); // save the new creditor
    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors); // return up-to-date creditors list

    context.log('added new creditor to Mongo');

    context.res = {
        body: creditors
    };

};

export default httpTrigger;