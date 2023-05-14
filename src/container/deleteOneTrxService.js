import axios from "axios";

export const deleteOneTrx = (trxId) => {
  const response = axios.delete("/transactions", { trxId });
  return response;
};
