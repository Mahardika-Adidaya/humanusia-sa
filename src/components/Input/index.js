import React from 'react'
import { RiArrowDownSFill } from 'react-icons/ri'
import { FaRandom } from 'react-icons/fa'

const Input = ({ title, required, inputValue, onChange, type, placeholder, textarea, dropdown, dropdownPlaceholder, dropdownData, generate, onClickGenerate }) => {

    return (
        <div className='w-full'>
            <h1 className='text-[#737373] text-[13px] mb-[7px]'>{title} {required && <span className='text-[#780000] ml-[4px]'>*</span>}</h1>
            {dropdown ? 
                <div className='relative'>
                    <select onChange={onChange} value={inputValue} className='bg-white border rounded-[6px] text-[#A8A8A8] text-[13px] px-[8px] py-[10px] w-full appearance-none'>
                        <option value={''} selected disabled>{dropdownPlaceholder}</option>
                        {dropdownData.map((data, index) => {
                            return(
                                <option key={index} value={data.value}>{data.label}</option>
                            )
                        })}
                    </select>
                    <RiArrowDownSFill className='absolute text-[#A8A8A8] right-[8px] text-xl top-3'/>
                </div>
                :
                textarea ?
                <textarea rows={4} onChange={onChange} type={type} value={inputValue} className='bg-white border rounded-[6px] text-[#A8A8A8] text-[13px] px-[8px] py-[10px] w-full' placeholder={placeholder}/>
                :
                <div className='relative'>
                    <input value={inputValue} onChange={onChange} type={type} className='bg-white border rounded-[6px] text-[#A8A8A8] text-[13px] px-[8px] py-[10px] w-full' placeholder={placeholder}/>
                    {generate && 
                        <button onClick={onClickGenerate} className='absolute text-[#A8A8A8] right-[12px] top-3.5'><FaRandom/></button>
                    }
                </div>
            }
        </div>
    )
}

export default Input