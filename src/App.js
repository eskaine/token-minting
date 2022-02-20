import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Token from './artifacts/contracts/Token.sol/ESKToken.json'
import { formatUnits, parseUnits } from 'ethers/lib/utils';

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [userAccount, setUserAccount] = useState();
  const [amount] = useState('10');
  const [balance, setBalance] = useState();
  const [statusMessage, setStatusMessage] = useState("");



  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      const balanceToEtherUnit = formatUnits(balance.toString(), 18);
      
      setBalance(Number(balanceToEtherUnit));
    }
  }

  async function sendCoins() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const transation = await contract.transfer(userAccount, parseUnits(amount));
  
        await transation.wait();
        setStatusMessage("Transaction Successful");
        getBalance();
      }
    } catch (error) {
      setStatusMessage("Transaction Unsuccessful");
      console.error(error);
    }
  }

  useEffect(() => {
    getBalance();
  });


  return (
    <div className="app">
      <div className="title">ESK Token</div>
      {balance && <div className="balance">{balance} tokens left</div>}
      <div>
        <button className="btn" onClick={sendCoins}>Send {amount} ESK tokens</button>
        <br /><sub>{statusMessage}</sub>
      </div>
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Recipient Address" />
      <div>Ropsten test network token address: {tokenAddress}</div>
    </div>
  );
}

export default App;
