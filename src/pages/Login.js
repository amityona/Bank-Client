import React, { useRef, useState } from 'react'
import '../App.css'
import { NativeSelect } from '@mui/material';
import axios from 'axios';
import { loginURL } from '../dataUrl';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../components/custom/CustomButton';
import { saveDataToLocalStorage } from '../utilits/localStorageProxy';
import { Link } from "react-router-dom";

function Register() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const HandleClick = async () => {
        try {
            await setErr('');
            await setLoading(true);
            const data = await axios.post(loginURL, {
                userName: userNameRef.current.value,
                password: passwordRef.current.value,
            });
            console.log(data.data.token);
            await saveDataToLocalStorage("token", data.data.token);
            await saveDataToLocalStorage("userName", data.data.userName);
            navigate("/")
        }
        catch (err) {
            await setLoading(false);
            console.log(err)
            setErr(err.response.data.error);
        }

    }
    return (
        <div className=" shadow-lg rounded-3xl mt-[15%] overflow-y-hidden overflow-hidden ml-auto mr-auto  h-[240px] w-[360px] bg-customBlue">

            <h2 className='text-white items-start text-2xl  text-center mt-2'>התחברות</h2>

            <div className=' ml-3 mt-5 grid grid-cols-2 gap-4 '>

                <div className='bg-inputColor rounded-lg w-[200px]'>
                    <input ref={userNameRef} placeholder='הכנס שם משתמש' type='text' className='bg-inputColor ml-2 rounded-lg pt-1 pb-1 text-end  placeholder-white  pr-3 text-white font-sm w-full outline-none' />

                </div>
                <h2 className='text-white ml-14'>:שם משתמש</h2>


                <div className='bg-inputColor rounded-lg w-[200px] '>
                    <input ref={passwordRef} placeholder='הכנס סיסמה ' type='text' className='bg-inputColor ml-2 rounded-lg pt-1 pb-1   placeholder-white text-end pr-3 text-white font-sm w-full outline-none' />
                    <div className='bg-customBlue flex flex-row-reverse pr-3 pt-2'>
                        <h2 className='text-sm mt-0 bg-customBlue text-white '> ? חדש אצלנו</h2>
                        <Link to={'/register'} className=' mr-1 text-sm text-buttonColor underline'> לחץ כאן </Link>
                        <h2 className='text-sm mt-0 bg-customBlue text-white mr-1 '> להרשמה </h2>
                    </div>
                </div>
                <h2 className='text-white ml-14'>:סיסמה</h2>

            </div>
            <div className='flex justify-center'>
                <CustomButton onClick={HandleClick} value="כניסה" />

            </div>

            {loading && <div className='mt-1 flex justify-center'><CircularProgress /></div>}
            <h2 className='ml-4'> {err} </h2>
        </div>

    )
}

export default Register