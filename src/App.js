import "./styles.css";
import { useState } from "react";

export default function App() {
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  const [bill, setBill] = useState("");
  const totalTip = bill * ((tip1 + tip2) / 2 / 100);
  function handleBill(input) {
    const value = Number(input);
    setBill(value >= 0 ? value : 0);
  }

  function handleReset() {
    setBill("");
    setTip1(0);
    setTip2(0);
  }

  return (
    <div>
      <Bill onBill={handleBill} bill={bill} />
      <YourService tip={tip1} onTip={setTip1}>
        How did you like the service?
      </YourService>
      <YourService tip={tip2} onTip={setTip2}>
        How did your friend like the service?
      </YourService>
      {bill > 0 && (
        <>
          <Output bill={bill} totalTip={totalTip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ onBill, bill }) {
  return (
    <div>
      <label>How much was the bill? </label>
      <input
        value={bill}
        onChange={(e) => onBill(Number(e.target.value))}
        type="text"
        placeholder="bill value"
      />
    </div>
  );
}

function YourService({ children, onTip, tip }) {
  return (
    <div>
      <label>{children}</label>
      <select value={tip} onChange={(e) => onTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, totalTip }) {
  return (
    <h3>
      You pay ${bill + totalTip} (${bill} + ${totalTip} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
