import { useState } from "react";
import TransactionForm from "./TransactionForm";

const OverviewComponent = ({ income, expense, addTransaction }) => {
  const [isShow, setIsShow] = useState(false);
  let Balance = income - expense;

  return (
    <>
      <div className="topSection">
        {Balance === 0 ? (
          <h3> add some trx</h3>
        ) : (
          <>
          <p>Balance :</p>
          <h4 className="balance" style={ Balance>0? {color:"green"}:{color:"red"}}>  {Balance}</h4>
          </>
          
        )}
        <button
          className={`btn  ${isShow ? "cancel" : ""}`}
          onClick={() => setIsShow((prevState) => !prevState)}
        >
          {isShow ? "cancel" : "add"}
        </button>
      </div>

      {isShow && (
        <TransactionForm
          addTransaction={addTransaction}
          setIsShow={setIsShow}
        />
      )}

      <div className="result-section">
        <div className="expenseBox">
          Income <span>{income} $</span>
        </div>
        <div className="expenseBox">
          Expense <span style={{ color: "red" }}>{expense} $</span>
        </div>
      </div>
    </>
  );
};

export default OverviewComponent;
