import React, { useEffect, useState } from 'react'
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../utilits/localStorageProxy';
import CustomButton from './custom/CustomButton';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const func = async () => {
            const user = await getDataFromLocalStorage("userName");
            if (user == null) {
                navigate('/login')
            }
            setUserName(user)
        }
        func();
    }, [])

    const HandleClick = async () => {
        await saveDataToLocalStorage("token", null);
        await saveDataToLocalStorage("userName", null);
        navigate('/login')

    }

    return (
        <div className='h-[70px] w-full bg-customBlue flex justify-between' >
            <div className='ml-5'><CustomButton onClick={HandleClick} value="יציאה" /> </div>
            <div className='flex text-white flex-row-reverse items-center mr-4'>
                <h2> ברוך הבא </h2>
                <h2 className='mr-2'>, {userName} </h2>
            </div>

        </div>
    )
}

export default Header