use('creditorsDB');

const startingData = [
  {
    "id": 1,
    "creditorName": "CBNA",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 2.00,
    "balance": 1363.00
  },
  {
    "id": 2,
    "creditorName": "AMEX",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 2.00,
    "balance": 2763.00
  },
  {
    "id": 3,
    "creditorName": "AMEX",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 2.00,
    "balance": 429.00
  },
  {
    "id": 4,
    "creditorName": "AMEX",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 2.00,
    "balance": 1363.00
  },
  {
    "id": 5,
    "creditorName": "DISCOVERBANK",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 2.00,
    "balance": 2644.00
  },
  {
    "id": 6,
    "creditorName": "CAPITAL ONE",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 4.00,
    "balance": 5464.00
  },
  {
    "id": 7,
    "creditorName": "CAPITAL ONE",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 4.00,
    "balance": 2345.00
  },
  {
    "id": 8,
    "creditorName": "CAPITAL ONE",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 4.00,
    "balance": 836.00
  },
  {
    "id": 9,
    "creditorName": "CBNA",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 3.50,
    "balance": 687.00
  },
  {
    "id": 10,
    "creditorName": "CBNA",
    "firstName": "Suman",
    "lastName": "Tester79",
    "minPaymentPercentage": 3.50,
    "balance": 235.00
  }
];

const maxId = startingData.reduce((m, c) => Math.max(m, c.id), 0) + 1;

db.creditors.drop();
db.createCollection('creditors');

db.creditors.insertMany(startingData);

db.creditorIdSequence.drop();
db.createCollection('creditorIdSequence');
db.creditorIdSequence.insertOne({id: maxId});