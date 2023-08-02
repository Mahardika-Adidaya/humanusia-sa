import React from 'react'
import { BiPlus } from 'react-icons/bi'

const Button = ({onClick, title, iconAdd, bgcolor}) => {
    return (
        <button onClick={onClick} className='rounded-[6px] flex items-center gap-[12px] px-[10px] py-[8px]' style={{ backgroundColor: `${!bgcolor ? '#0E5073' : bgcolor}` }}>
            {iconAdd && 
                <BiPlus className='text-white'/>
            }
            <h1 className='text-white text-sm font-[500]'>{title}</h1>
        </button>
    )
}

export default Button