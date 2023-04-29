import { useEffect, useState } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionsComponent from "./TransactionsComponent";

const ExpenseApp = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach((t)=>{
        t.type === "income"? (inc= inc + parseFloat(t.amount)) : (exp= exp + parseFloat(t.amount));
    })
    setIncome(inc);
    setExpense(exp);
  }, [transactions]);

  const addTransaction = (formValue) => {
    setTransactions([...transactions, { ...formValue, id: Date.now() }]);
  };

  return (
    <>
      <section className="container">
        <OverviewComponent addTransaction={addTransaction} income={income} expense={expense}  />
        <TransactionsComponent
          transactions={transactions}
          income={income}
          expense={expense}
        />
      </section>
    </>
  );
};

export default ExpenseApp;
