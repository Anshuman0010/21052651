import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberType, setNumberType] = useState('primes');
  const [response, setResponse] = useState(null);

  const fetchNumbers = async () => {
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUyMDcxLCJpYXQiOjE3MTUxNTE3NzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU0MDU5YmI2LWIyODItNDgzNy1hMmNhLWFlNjFhNWZkYzcxNiIsInN1YiI6ImFueTEzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IkFueXRoaW5nIiwiY2xpZW50SUQiOiI1NDA1OWJiNi1iMjgyLTQ4MzctYTJjYS1hZTYxYTVmZGM3MTYiLCJjbGllbnRTZWNyZXQiOiJaYkpUY1hJYVdISXRzdFR3Iiwib3duZXJOYW1lIjoiQW55YWpkdmhhdiIsIm93bmVyRW1haWwiOiJhbnkxM0BnbWFpbC5jb20iLCJyb2xsTm8iOiIxMjMifQ.05TUTG293UWSyD_eBLPo4t6kN5y18TZPjCAoTdacCfg'
    };
  
    try {
      const res = await axios.get(`http://20.244.56.144/test/${numberType}`, { headers });
      const numbers = res.data.numbers; 
      setResponse({
        numbers,
        avg: numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length 
      });
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setResponse({ error: "Failed to fetch data. Please check console for details." });
    }
  };
  

  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="primes">Prime</option>
        <option value="fibo">Fibonacci</option>
        <option value="even">Even</option>
        <option value="rand">Random</option>
      </select>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <div>
      <div>
  {response && (
    <>
      <h2>Results</h2>
      {response.error ? (
        <p>Error: {response.error}</p>
      ) : (
        <>
          <p>Numbers: [{response.numbers.join(', ')}]</p>
          <p>Average: {response.avg.toFixed(2)}</p>
        </>
      )}
    </>
  )}
</div>

      </div>
    </div>
  );
}

export default App;
