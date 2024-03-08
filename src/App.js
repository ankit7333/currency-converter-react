import {useState, useEffect} from 'react';

function App() {
  const [isAmount, setIsAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [isConverted, setIsConverted] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function(){
    async function convert(){
      setIsLoading(true)
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${isAmount}&from=${fromCurrency}&to=${toCurrency}`)
      const data = await res.json()
      setIsConverted(data.rates[toCurrency])
      setIsLoading(false)
    }
    if(fromCurrency === toCurrency) return setIsConverted(isAmount);
    convert()
  },[isAmount, fromCurrency, toCurrency]);
  return (
    <div className="App">
      <input type="text" value={isAmount} onChange={(e)=>setIsAmount(Number(e.target.value))} disabled={isLoading} />
      <select value={fromCurrency} onChange={e=>setFromCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={e=>setToCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      
      <>
      {
        isLoading ? <p>Loading...</p> : <p>{isConverted} {toCurrency}</p>
      }
      </>
    </div>
  );
}

export default App;
