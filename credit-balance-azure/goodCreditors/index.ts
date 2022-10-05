import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CREDITORS_COLLECTION, getGoodCreditors } from "../lib/CreditorsCollection";
import { query } from '../lib/DB';

// enable GET API call to find good creditors
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request for creditors.');

    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors);
    context.log('retrieved creditors from Mongo');

    context.res = {
        body: creditors
    };
};

export default httpTrigger;