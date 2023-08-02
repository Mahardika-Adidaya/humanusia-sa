import React from 'react'

const CardDashboard = ({CardName, Value}) => {
    return (
        <div className='border px-[20px] py-[25px] bg-white rounded-[10px] flex items-center justify-between gap-[45px] min-w-[200px] lg:w-full shadow-sm'>
            <div className='space-y-[10px]'>
                <h1 className='text-[#737373] text-[12px]'>{!CardName ? 'Card Name' : CardName}</h1>
                <h1 className='text-[#454545] text-[24px] font-[600]'>{!Value ? '0' : Value}</h1>
            </div>
        </div>
    )
}

export default CardDashboard