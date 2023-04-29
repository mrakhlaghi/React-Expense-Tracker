import { useState } from "react";
import TransactionForm from "./TransactionForm";

const OverviewComponent = ({ income, expense ,addTransaction}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="topSection">
        <p> Balance : {income - expense}</p>
        <button className={`btn  ${isShow ? "cancel" : ""}`} onClick={()=> setIsShow((prevState)=>!prevState)}>{isShow ? "cancel" : "add"}</button>
      </div>

      {isShow && <TransactionForm addTransaction={addTransaction} setIsShow={setIsShow} /> }

      <div className="result-section">
        <div className="expenseBox">Income <span >{income} $</span></div>
        <div className="expenseBox">Expense <span style={{color:"red"}}>{expense} $</span></div>
      </div>
    </>
  );
};

export default OverviewComponent;
