document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/transactions");
    const txs = await res.json();

    let incoming = 0;
    let expenses = 0;
    let cash = 0;

    txs.sort((a, b) => new Date(a.date) - new Date(b.date));

    txs.forEach((t) => {
      if (t.category === "Incoming Money") incoming += t.amount_rwf;
      else expenses += t.amount_rwf;
    });

    if (txs.length) cash = txs[txs.length - 1].balance;

    let net = incoming - expenses;

    document.getElementById("incoming").innerHTML =
      fmt(incoming) + " <span>rwf</span>";
    document.getElementById("expenses").innerHTML =
      fmt(expenses) + " <span>rwf</span>";
    document.getElementById("net").innerHTML = fmt(net) + " <span>rwf</span>";
    document.getElementById("cash").innerHTML = fmt(cash) + " <span>rwf</span>";
    document.getElementById("txs").innerHTML =
      fmt(txs.length);
  } catch (e) {
    console.log("could not load", e);
  }
});

function fmt(n) {
  return n.toLocaleString("en-US");
}
