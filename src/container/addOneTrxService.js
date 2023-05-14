import axios from "axios";



export const addOneTrx =  (newTrx) => {
  const response =  axios.post("/transactions", JSON.stringify({ ...newTrx }) );
  return response;
};
