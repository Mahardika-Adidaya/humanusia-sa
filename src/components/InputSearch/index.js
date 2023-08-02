import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'

const InputSearch = ({onChange}) => {
    return (
        <div className='relative'>
            <input onChange={onChange} className='border border-[#CACACA] rounded-[6px] text-[#A8A8A8] pl-[41px] pr-[14px] text-sm py-[8px]' placeholder='Search...'/>
            <BiSearchAlt2 className='absolute left-[14px] top-3 text-[#A8A8A8]'/>
        </div>
    )
}

export default InputSearch