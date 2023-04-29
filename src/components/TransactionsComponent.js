import { useEffect, useState } from "react";

const TransactionsComponent = (props) => {
  // console.log(props.transactions);
  const [searchItem, setSearchItem] = useState("");
  const [filteredTxns, setFilteredTxns] = useState(props.transactions);

  useEffect(() => {
    filterTransactions(searchItem);
  }, [props.transactions]);

  console.log(filteredTxns);

  const filterTransactions = (search) => {
    console.log(search);
    if (!search || search === "") {
      setFilteredTxns(props.transactions);
      return;
    }
    const filtered = props.transactions.filter((t) =>
      t.desc.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTxns(filtered);
  };

  const changeHandler = (e) => {
    setSearchItem(e.target.value);
    filterTransactions(e.target.value);
  };

  if (!props.transactions.length)
    return <div className="empty">add some transactions</div>;

  return (
    <section className="transactions">
      <input
        value={searchItem}
        type="text"
        onChange={changeHandler}
        className="search"
        placeholder="search for tnx"
      />

      {filteredTxns.length ? (
        filteredTxns.map((t) => (
          <div
            key={t.id}
            className="transaction"
            style={{ borderRight: t.type === "expense" && "4px solid red" }}
          >
            <span>{t.desc}</span>
            <span>${t.amount}</span>
          </div>
        ))
      ) : (
        <div className="empty">no matched found !</div>
      )}
    </section>
  );
};

export default TransactionsComponent;

// {props.transactions.length? filteredTxns.length ? searchItem ?( filteredTxns.map((t) => (
//   <div
//     key={t.id}
//     className="transaction"
//     style={{ borderRight: t.type === "expense" && "4px solid red" }}
//   >
//     <span>{t.desc}</span>
//     <span>${t.amount}</span>
//   </div>
// )))
// :(<div>no match found</div>)
// :(<div>no match found</div>)
// :(<div>add some transactions</div>)}
