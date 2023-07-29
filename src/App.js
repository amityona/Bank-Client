import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDataFromLocalStorage } from './utilits/localStorageProxy';
import { usersURL } from './dataUrl';
import EuroIcon from '@mui/icons-material/Euro';
import MenuItem from './components/custom/MenuItem';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddCardIcon from '@mui/icons-material/AddCard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function App() {

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [balance, setBalance] = useState(0);

  const fetchData = async () => {
    try {
      await setErr('');
      await setLoading(true);
      const token = await getDataFromLocalStorage("token");
      const headers = { 'Authorization': `Bearer ${token}` };
      const data = await axios.get(usersURL, { headers });
      await setBalance(data.data.balance);

      setLoading(false);
    }
    catch (err) {
      await setLoading(false);
      console.log(err)
      setErr("הבקשת קבלת מידע נכשלה");
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="">
      <Header />
      <div className=' p-10 text-balanceColor '>
        <div className='flex'>
          <EuroIcon className=' ml-1 text-balanceColor' />
          <h2 className='font-bold'>{balance.toFixed(2)}</h2>
        </div>
        <h2 className=' ml-4 font-bold '>יתרת העו"ש בחשבון</h2>
      </div>

      <div className='flex items-center justify-center mt-[5%] flex-col'>
        <div> <MenuItem Icon={<CurrencyExchangeIcon fontSize='large' />} value={"העברה בנקאית"} path={"/transference"} /> </div>
        <div className='flex gap-72 mt-10'>
          <div> <MenuItem Icon={<AddCardIcon fontSize='large' />} value={"לקיחת הלוואה"} path={"/loan"} /> </div>
          <div> <MenuItem Icon={<MonetizationOnIcon fontSize='large' />} value={"משיכת כסף"} path={"/withrawal"} /> </div>
        </div>

      </div>
    </div>
  );
}

export default App;
