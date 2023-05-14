import axios from "axios";



export const getAllTrxs =  () => {
  const response =  axios.get("/transactions");
  return response;
};
