import React, { useRef, useState } from 'react'
import '../App.css'
import { NativeSelect } from '@mui/material';
import axios from 'axios';
import { usersURL } from '../dataUrl';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../components/custom/CustomButton';

function Register() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [accountType, setAccount] = useState("basic");
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const HandleClick = async () => {
        try {
            await setErr('');
            await setLoading(true);
            const data = await axios.post(usersURL, {
                userName: userNameRef.current.value,
                password: passwordRef.current.value,
                account_type: accountType
            });
            navigate("/")
        }
        catch (err) {
            await setLoading(false);
            console.log(err)
            setErr(err.response.data.error);
        }

    }
    return (
        <div className=" shadow-lg rounded-3xl mt-[15%] overflow-y-hidden overflow-hidden ml-auto mr-auto  h-[280px] w-[360px] bg-customBlue">

            <h2 className='text-white items-start text-2xl  text-center mt-2'>הרשמה</h2>

            <div className=' ml-3 mt-5 grid grid-cols-2 gap-4 '>

                <div className='bg-inputColor rounded-lg w-[200px]'>
                    <input ref={userNameRef} placeholder='הכנס שם משתמש' type='text' className='bg-inputColor ml-2 pt-1 pb-1 rounded-lg  placeholder-white text-end pr-3 text-white font-sm w-full outline-none' />

                </div>
                <h2 className='text-white ml-14'>:שם משתמש</h2>


                <div className='bg-inputColor rounded-lg w-[200px] '>
                    <input ref={passwordRef} placeholder='הכנס סיסמה ' type='text' className='bg-inputColor ml-2 rounded-lg pt-1 pb-1  placeholder-white text-end pr-3 text-white font-sm w-full outline-none' />

                </div>
                <h2 className='text-white ml-14'>:סיסמה</h2>

                <div className='bg-inputColor rounded-lg w-[200px] '>
                    <NativeSelect
                        style={{ color: 'white', textAlign: 'end', flexDirection: 'row-reverse', background: 'transparent', outline: 'none' }}
                        defaultValue={5}
                        className="text-end bg-inputColor rounded-lg w-[200px] bg-transparent text-white "
                        inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',

                        }}
                        onChange={(e) => {
                            setAccount(e.target.value);
                        }}
                    >
                        <option style={{ color: 'black' }} value={'basic'}>בסיסי</option>
                        <option style={{ color: 'black' }} value={'silver'}>כסף</option>
                        <option style={{ color: 'black' }} value={'gold'}>זהב</option>
                    </NativeSelect>
                </div>
                <h2 className='text-white ml-14'>:סוג חשבון</h2>
            </div>
            <div className='flex justify-center'>
                <CustomButton onClick={HandleClick} value="הצטרפות" />

            </div>

            {loading && <div className='mt-1 flex justify-center'><CircularProgress /></div>}
            <h2 className='ml-4'> {err} </h2>
        </div>

    )
}

export default Register