import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CREDITORS_COLLECTION, getGoodCreditors } from "../lib/CreditorsCollection";
import { query } from '../lib/DB';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request for creditors.');

    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: creditors
    };

};

export default httpTrigger;