import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CREDITORS_ID_SEQUENCE_COLLECTION, CREDITORS_COLLECTION, getGoodCreditors } from "../lib/CreditorsCollection";
import { query } from "../lib/DB";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request to add a creditor.');
    
    const { value: { id: nextId } } = await query(CREDITORS_ID_SEQUENCE_COLLECTION, col => col.findOneAndUpdate({}, {
        $inc: { id: 1 }
    }));
    const newCreditor = { ...req.body, id: nextId };
    await query(CREDITORS_COLLECTION, col => col.insertOne(newCreditor)); // save the new creditor
    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors); // return up-to-date creditors list

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: creditors
    };

};

export default httpTrigger;