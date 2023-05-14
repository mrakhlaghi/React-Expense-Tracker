import { useEffect, useState } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionsComponent from "./TransactionsComponent";
import { getAllTrxs } from "../container/getAllTrxsService";

import "../mock/Mock";
import { addOneTrx } from "../container/addOneTrxService";
import { deleteOneTrx } from "../container/deleteOneTrxService";

const ExpenseApp = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let inc = 0;
    let exp = 0;

    console.log(transactions);
    try {
      const getTrxs = async () => {
        await getAllTrxs().then((res) => {
          console.log(res);
          let Trxs = res.data.database;
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
      t.type === "income"
        ? (inc = inc + parseFloat(t.amount))
        : (exp = exp + parseFloat(t.amount));
    });
    setIncome(inc);
    setExpense(exp);
  }, [transactions]);

  const addTransaction = (formValue) => {
    const newTrx = {
      ...formValue,
      id: Date.now(),
    };
    setTransactions([...transactions, newTrx]);

    addOneTrx(newTrx)
      .then((res) => {
        console.log(res.data);
        // const updatedDatabase=res.data
        // console.log(updatedDatabase);
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTransaction = async (id) => {
    // console.log(id);
    await deleteOneTrx(id)
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
