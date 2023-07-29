import React from 'react'

function CustomButton(props) {
    console.log(props.width)
    return (
        <input type="button" onClick={() => { props.onClick() }} className={` mt-5 text-center rounded-lg bg-buttonColor ${props.width != undefined ? props.width : 'w-24'} h-10 cursor-pointer text-white hover:scale-105 duration-150 transition-all `} value={props.value} />
    )
}

export default CustomButton