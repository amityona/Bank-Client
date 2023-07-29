import React from 'react'
import CustomButton from './CustomButton'
import { useNavigate } from 'react-router-dom';

function MenuItem(props) {

    const navigate = useNavigate();
    const HandleClick = () => {
        navigate(props.path);
    }

    return (
        <div className='flex flex-col space-y-4 items-center hover:scale-105 transition-all duration-150'>

            <div className='text-balanceColor'>{props.Icon}</div>
            <CustomButton value={props.value} width='w-[140px]' onClick={HandleClick} />

        </div>
    )
}

export default MenuItem