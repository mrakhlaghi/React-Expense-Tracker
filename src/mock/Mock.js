import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import Transactions from "../database/mock-api.json";
import Transactions from "../database/mock-api.js";
var mock = new MockAdapter(axios, { onNoMatch: "throwException" });

let database = Transactions;

mock.onGet("/transactions").reply((config) => {
  // console.log(Transactions);
  console.log(database);
  return [200, { database }];
});

mock.onPost("/transactions").reply((config) => {
  // config -->  contains any props that we passed to the  axios.post
  console.log(config);
  const newData = JSON.parse(config.data);
  console.log(newData, "Hey Im post");
  const updated=[...database, {...newData}];
  database=updated
  return [200, updated];
});

mock.onDelete("/transactions").reply((config) => {
  console.log(config);
  console.log(config.trxId);
  const id = config.trxId;
  const filteredTrxs = database.filter((t) => t.id !== id);
  database=  filteredTrxs
  return [200, filteredTrxs];
});

export default mock;
