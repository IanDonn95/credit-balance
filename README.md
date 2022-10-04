Mongo database initialization:
I set up a Mongo database to run on a free trial cluster on cloud.mongodb.com utilizing Azure. This was chosen to make integrating with Azure functions easier once I got to that.
You can start up your own mongo database either in-memory, as a separate service, or in the cloud; you'll just need to add the connection info
1. Get a .pem certificate file and add it to the credit-balance-node folder (better than using user/password, but the code can be easily adapted to authenticate that way)
2. create '.env' file in the credit-balance-node. Add MONGO_CREDENTIALS=<.pem file name> and MONGO_URL=<connection url, something like mongodb+srv://...> to the file, wrapping both values in double quotation marks
3. run the credit-balance-mongo/db-init.js setup script to create the creditors collection and initialize it with some example data. I was able to connect to the mongodb and run the script directly through the ide, but I'm confident there'll be a way to do it from the command line if you don't want to use VS Code and the Mongo plugin.

Node backend initialization:
1. go into the 'credit-balance-node' folder
2. 'yarn install' to get Express and other dependencies
3. 'yarn start' which will lint the ts code, compile the ts code, and then start the node/express server

React front-end initialization:
1. go into the 'credit-balance-ui' folder
2. 'yarn install' to get dependencies
3. 'yarn start' to start up the react web server
4. navigate to localhost:3000