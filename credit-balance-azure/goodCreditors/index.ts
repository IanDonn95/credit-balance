import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CREDITORS_COLLECTION, getGoodCreditors } from "../lib/CreditorsCollection";
import { query } from '../lib/DB';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request for creditors.');

    try {
        const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors);
        context.log('retrieved creditors from Mongo');
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify(creditors)
        };
    } catch {
        context.log('failed to connect to Mongo');
        context.res = {
            body: 'failed to connect to Mongo'
        }
    }


};

export default httpTrigger;