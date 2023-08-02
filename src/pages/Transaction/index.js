import React, { useState } from 'react'
import { InputSearch, Modal } from '../../components'
import { MdImportExport } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { Logo } from '../../assets'

const Transaction = () => {

    const [showModalDetail, setShowModalDetail] = useState(false)

    return (
        <div>
            <Modal
                title={''}
                activeModal={showModalDetail}
                buttonClose={ () => setShowModalDetail(!showModalDetail)}
                width={'895px'}
                content={
                    <div className='space-y-[66px]'>
                        <div className='flex items-center justify-between'>
                            <img src={Logo} className='w-[262px]' alt='Humanusia'/>
                            <div className='space-y-[15px]'>
                                <h1 className='text-[#2E2E2E] font-semibold text-[24px] uppercase'>Invoice</h1>
                                <div>
                                    <h1 className='text-[#003049CC] text-[12px] font-medium'>ORD/009789/2022</h1>
                                    <h1 className='text-[#737373] text-[12px] font-medium'>001-SKUPaket/HMS/IV/2022</h1>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-6 w-ful border-r-2 py-[31px] space-y-[11px]'>
                                <h1 className='text-[#2E2E2E] font-bold text-[24px]'>Muh Faizal</h1>
                                <h1 className='text-[#737373] font-medium text-xs'>081245527645</h1>
                                <h1 className='text-[#2E2E2E] font-medium text-xs'>8502 Preston Rd. Inglewood, Maine 98380</h1>
                            </div>
                            <div className='col-span-6 w-ful py-[31px] pl-[110px]'>
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-6 space-y-[15px]'>
                                        <h1 className='text-[#737373] font-medium text-xs'>Date</h1>
                                        <h1 className='text-[#737373] font-medium text-xs'>Payment Method</h1>
                                        <h1 className='text-[#737373] font-medium text-xs'>Status</h1>
                                    </div>
                                    <div className='col-span-6 space-y-[15px]'>
                                        <h1 className='text-[#2E2E2E] font-medium text-xs'>08/12/2022</h1>
                                        <h1 className='text-[#2E2E2E] font-medium text-xs'>Bank Transfer</h1>
                                        <div className='bg-[#C1121F] rounded-full py-[2px] px-[10px] w-fit'>
                                            <h1 className='text-[#FFFFFF] font-medium text-[12px]'>Paid</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='overflow-auto scrollbar-hide w-full'>
                            <table className='w-full space-y-[10px]'>
                                <div className='flex items-center gap-3 bg-[#780000] px-[49px] py-[19px] rounded-[8px]'>
                                    <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-white text-sm font-bold'>Package</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-white text-sm font-bold'>Price</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-white text-sm font-bold'>Discount</h1>
                                    </div>
                                    <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-white text-sm font-bold'>Total Price</h1>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 px-[49px] py-[19px] rounded-[3px]'>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>Starter - Mothly (6)</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>Rp 2.000.000</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>-</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>Rp 2.000.000</h1>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 px-[49px] py-[19px] rounded-[3px]'>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>Admin Fee</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>-</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>-</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-xs font-[500] truncate'>-</h1>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 px-[49px] py-[19px] rounded-[3px] border-t-2 border-t-[#780000]'>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#2E2E2E] text-sm font-bold truncate'>Total</h1>
                                    </div>
                                    <div className='min-w-[150px] max-w-[150px]'/>  
                                    <div className='min-w-[150px] max-w-[150px]'/>
                                    <div className='min-w-[150px] max-w-[150px]'>
                                        <h1 className='text-[#780000] text-sm font-bold truncate'>Rp 2.000.000</h1>
                                    </div>
                                </div>
                            </table>
                        </div>
                        <div className='space-y-[10px]'>
                            <h1 className='text-[#A8A8A8] text-[15px] font-medium'>Invoice ini sah dan diproses oleh system</h1>
                            <h1 className='text-[#A8A8A8] text-[15px] font-medium'>Jika ada pertanyaan hubungi info@humanusia.id </h1>
                        </div>
                    </div>
                }
            />
            <div className='px-[20px] py-[36px] bg-white rounded-xl space-y-[33px]'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-2'>
                        <h1 className='text-[#454545] font-semibold text-[20px]'>Transaction</h1>
                        <h1 className='text-[#737373] text-[10px]'>list of transaction</h1>
                    </div>
                    <div className='flex items-center gap-[16px]'>
                        <InputSearch/>
                    </div>
                </div>
                <div className='overflow-auto scrollbar-hide'>
                    <table className='w-full space-y-[10px]'>
                        <div className='flex items-center gap-3 bg-[#EBF7FF] px-[14px] py-[8px] rounded-[3px]'>
                            <div className='flex items-center gap-[15px] min-w-[150px] max-w-[150px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Date</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Name</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Phone Number</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[300px] max-w-[300px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Invoice</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Total Employee</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Total Transaction</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Action</h1>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 bg-[#F8F9FB] px-[14px] py-[8px] rounded-[3px]'>
                            <div className='min-w-[150px] max-w-[150px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[300px] max-w-[300px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[100px] max-w-[100px] flex items-center gap-[12px]'>
                                <button onClick={ () => setShowModalDetail(!showModalDetail) } className='w-[29px] h-[29px] bg-[#CEDFEA] rounded-[9px] flex items-center justify-center'>
                                    <AiFillEye className='text-[#003049]'/>
                                </button>
                            </div>
                        </div>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Transaction