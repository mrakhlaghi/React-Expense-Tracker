import { useEffect, useState } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionsComponent from "./TransactionsComponent";
import axios from "axios";

const ExpenseApp = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let inc = 0;
    let exp = 0;

    try {
      const getTrxs = async () => {
        await axios.get("http://localhost:3005/transactions").then((res) => {
          let Trxs = res.data;
          setTransactions([...transactions, ...Trxs]);
        });
      };
      getTrxs();

      transactions.forEach((t) => {
        console.log(t);
        t.type === "income"
          ? (inc = inc + parseFloat(t.amount))
          : (exp = exp + parseFloat(t.amount));
      });
      setIncome(inc);
      setExpense(exp);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach((t) => {
      // console.log(t);
      t.type === "income"
        ? (inc = inc + parseFloat(t.amount))
        : (exp = exp + parseFloat(t.amount));
    });
    setIncome(inc);
    setExpense(exp);
  }, [transactions]);

  const addTransaction = (formValue) => {
    setTransactions([...transactions, { ...formValue, id: Date.now() }]);
    axios.post("http://localhost:3005/transactions", {
      ...formValue,
      id: Date.now(),
    });
  };

  const deleteTransaction = async (id) => {
    await axios
      .delete(`http://localhost:3005/transactions/${id}`)
      .then((res) => axios.get("http://localhost:3005/transactions"))
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <section className="container">
        <OverviewComponent
          addTransaction={addTransaction}
          income={income}
          expense={expense}
        />
        <TransactionsComponent
          transactions={transactions}
          income={income}
          expense={expense}
          onDelete={deleteTransaction}
        />
      </section>
    </>
  );
};

export default ExpenseApp;
