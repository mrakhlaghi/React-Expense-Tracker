import { useState } from "react";

const TransactionForm = ({ addTransaction, setIsShow }) => {
  const [formValues, setFormValues] = useState({
    type: "expense",
    amount: 0,
    desc: "",
  });

  const changeHandler = (e) => {
    // console.log(e.target);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    addTransaction(formValues);
    // setIsShow((isShow)=>!isShow)
    setIsShow(false);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form_transaction">
        <label htmlFor="desc">desc :</label>
        <input type="text" name="desc" onChange={changeHandler} />
      </div >
      <div className="form_transaction">
        <label htmlFor="desc">amount :</label>
        <input type="number" name="amount" onChange={changeHandler} />
      </div>
      <div className="radioBox">
        <input
          type="radio"
          value="expense"
          name="type"
          onChange={changeHandler}
          checked={formValues.type === "expense"}
          id="expense"
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          value="income"
          name="type"
          onChange={changeHandler}
          checked={formValues.type === "income"}
          id="income"
        />
        <label htmlFor="income">Income</label>
      </div>
      <button className="btn primary" type="submit">
        Add transaction
      </button>
    </form>
  );
};

export default TransactionForm;
