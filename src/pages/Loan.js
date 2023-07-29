import React, { useRef, useState } from 'react'
import '../App.css'
import { NativeSelect } from '@mui/material';
import axios from 'axios';
import { loanURL } from '../dataUrl';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../components/custom/CustomButton';
import { getDataFromLocalStorage } from '../utilits/localStorageProxy';
import { Link } from "react-router-dom";
import EuroIcon from '@mui/icons-material/Euro';
import Header from '../components/Header';

function Loan() {
    const amountRef = useRef();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const HandleClick = async () => {
        try {
            await setErr('');
            await setLoading(true);
            const token = await getDataFromLocalStorage("token");
            const headers = { 'Authorization': `Bearer ${token}` };
            const data = await axios.post(loanURL, {
                amount: parseInt(amountRef.current.value),
            }, { headers });
            console.log(data.data.token);
            setErr(`ההלוואה נלקחה בהצלחה`)
            setLoading(false);
        }
        catch (err) {
            await setLoading(false);
            console.log(err)
            //  setErr(err.response.data.error);
            setErr("ההלוואה נכשלה");
        }

    }
    return (
        <div>
            <Header />
            <div className=" shadow-lg rounded-3xl mt-[10%] overflow-y-hidden overflow-hidden ml-auto mr-auto  h-[200px] w-[360px] bg-customBlue">

                <h2 className='text-white items-start text-2xl  text-center mt-2'> לקיחת הלוואה</h2>

                <div className=' ml-3 mt-5 grid grid-cols-2 gap-4 '>

                    <div className='bg-inputColor rounded-lg w-[200px] flex justify-between'>
                        <EuroIcon className='mt-1 ml-1 text-white' />
                        <input ref={amountRef} placeholder='הכנס סכום' type='number' className='noSpin bg-inputColor ml-2 rounded-lg pt-1 pb-1 text-end  placeholder-white  pr-3 text-white font-sm w-full outline-none' />
                    </div>
                    <h2 className='text-white ml-14 mt-1'>:סכום הלוואה</h2>



                </div>
                <div className='flex justify-center'>
                    <CustomButton onClick={HandleClick} value="משוך" />

                </div>

                {loading && <div className='mt-1 flex justify-center'><CircularProgress /></div>}
                <h2 className='ml-4 text-center text-white mt-1'> {err} </h2>
            </div>
        </div>
    )
}

export default Loan