This codebase demos a full-stack application where a user can see a list of "good" creditors, select a few then see a total balance, and add new creditors to the database. It uses React on the frontend, Azure Functions (with a legacy Node+Express alternative) on the backend, and a Mongo database. Communication with the different services is straightforward:
React<->Azure Functions<->Mongo


Mongo database initialization:
I set up a Mongo database to run on a free trial cluster on cloud.mongodb.com utilizing Azure. This was chosen to make integrating with Azure functions easier once I got to that.
You can start up your own mongo database either in-memory, as a separate service, or in the cloud; you'll just need to add the connection info.

Steps 1 and 2 are only necessary if using Node. As an alternate, you can add MONGO_USER, MONGO_PASSWORD, and MONGO_URL Application Settings to the Azure Function app.

1. Get a .pem certificate file and add it to the credit-balance-node folder (better than using user/password, but the code can be easily adapted to authenticate that way)
2. create '.env' file in the credit-balance-node folder. Add MONGO_CREDENTIALS=<.pem file name> and MONGO_URL=<connection url, something like mongodb+srv://...> to the file, wrapping both values in double quotation marks.
3. run the credit-balance-mongo/db-init.js setup script to create the creditors collection and initialize it with some example data. I was able to connect to the mongodb and run the script directly through the IDE, but I'm confident there'll be a way to do it from the command line if you don't want to use VS Code and the Mongo plugin.


Azure Function initialization:
I did all these steps with VS Code, so your mileage will vary greatly with these steps.

1. setup connection to Azure account and subscription
2. setup and connect to an Azure Function app
3. Add MONGO_USER, MONGO_PASSWORD, and MONGO_URL (just the web address, not the whole mongodb+srv://... string) Application Settings to the app (do the same for local.settings.json if working locally)
4. Setup CORS (easy to do in the cloud portal); the easiest configuration is to enable '*' wildstar origin
5. deploy the two Functions, 'creditor' and 'goodCreditors' to the Azure Function app


Node backend initialization:
Note that this is now a legacy implementation, instead the backend code runs in Azure Functions

1. go into the 'credit-balance-node' folder
2. 'yarn install' to get Express and other dependencies
3. 'yarn start' which will lint the ts code, compile the ts code, and then start the node/express server
4. swap the backendApiUrl const in credit-balance-ui/src/creditor/CreditorService.ts 


React front-end initialization:
1. go into the 'credit-balance-ui' folder
2. 'yarn install' to get dependencies
3. 'yarn start' to start up the react web server
4. navigate to localhost:3000