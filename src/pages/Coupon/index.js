import React, { useEffect, useState } from 'react'
import { Button, Input, InputSearch, Modal, ModalDelete, Pagination } from '../../components'
import { MdImportExport } from 'react-icons/md'
import { CgTrashEmpty } from 'react-icons/cg'
import { HiOutlinePencil } from 'react-icons/hi'
import toast from 'react-hot-toast'
import Api from '../../Api'
import { debounce } from 'lodash'

const Coupon = () => {

    const limit = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')
    const [refresh, setRefresh] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    
    const [couponID, setCouponID] = useState('')
    const [couponData, setCouponData] = useState('')
    const [couponName, setCouponName] = useState('')
    const [couponType, setCouponType] = useState('')
    const [referralCode, setReferralCode] = useState('');
    const [amount, setAmount] = useState('')
    const [status, setStatus] = useState('')

    const dataDropdownCouponType = [
        {value: 'Discount', label: 'Discount'},
        {value: 'Bonus', label: 'Bonus'}
    ]
    const dataDropdownStatus = [
        {value: true, label: 'Enable'},
        {value: false, label: 'Disable'}
    ]

    const generateReferralCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
        return code;
    };

    const getDataCoupon = async() => {
        try {
            const response = await Api.GetCoupon(localStorage.getItem('hris-token'), currentPage, limit, '')
            setCouponData(response.data.data)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    const debouncedSearch = debounce(async(search) => {
        try {
            const response = await Api.GetCoupon(localStorage.getItem('hris-token'), currentPage, limit, search)
            setCouponData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }, 300)

    const handleSearch = (e) => {       
        const search = e.target.value
        debouncedSearch(search) 
    }

    const postDataCoupon = async() => {
        try {
            const data = {
                name : couponName,
                type : couponType,
                referral_code : referralCode,
                amount : amount,
                status : Boolean(status)
            }
            await Api.CreateCoupon(localStorage.getItem('hris-token'), data)
            setShowCreateModal(!showCreateModal)
            setRefresh(true)
            toast.success('Success to send data coupon!')
        } catch (error) {
            toast.error('Failed to send data coupon!')
        }
    }

    const getDataCouponById = async(id) => {
        setShowUpdateModal(!showUpdateModal)
        setCouponID(id)
        try {
            const response = await Api.GetCouponById(localStorage.getItem('hris-token'), id)
            setCouponName(response.data[0].name)
            setCouponType(response.data[0].type)
            setReferralCode(response.data[0].referral_code)
            setAmount(response.data[0].amount)
            setStatus(response.data[0].status)  
        } catch (error) {
            console.log(error)
        }
    }

    const updateDataCoupon = async() => {
        try {
            const data = {
                name : couponName,
                type : couponType,
                referral_code : referralCode,
                amount : amount,
                status : Boolean(status)
            }
            await Api.UpdateCoupon(localStorage.getItem('hris-token'), data, couponID)
            setShowUpdateModal(!showUpdateModal)
            setRefresh(true)
            toast.success('Success to update data coupon')
        } catch (error) {
            toast.error('Failed to update data coupon!')
        }
    }

    const deleteShowModal = (id) => {
        setShowDeleteModal(!showDeleteModal)
        setCouponID(id)
    }

    const deleteDataCoupon = async() => {
        try {
            await Api.DeleteCoupon(localStorage.getItem('hris-token'), couponID)
            setRefresh(true)
            setShowDeleteModal(!showDeleteModal)
            toast.success('Success to delete data coupon')
        } catch (error) {
            toast.error('Failed to delete data coupon!')
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setRefresh(true)
    };
    
    const handlePrevChange = () => {
        if(currentPage === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1);
        }
        setRefresh(true)
    };
    
    const handleNextChange = () => {
        if(currentPage === totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(currentPage + 1);
        }
        setRefresh(true)
    };

    const generateCode = () => {
        const code = generateReferralCode();
        setReferralCode(code);
    };

    useEffect(() => {
        getDataCoupon()
        setRefresh(false)
    }, [refresh])

    return (
        <div>
            <Modal
                activeModal={showCreateModal}
                title={'Add New Coupon'}
                buttonClose={ () => setShowCreateModal(!showCreateModal)}
                width={'550px'}
                content= {
                    <div className='space-y-[25px]'>
                        <Input
                            title={'Coupon Name'}
                            placeholder={'Input coupon name'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setCouponName(e.target.value)}
                        />
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Coupon Type'}
                                dropdownPlaceholder={'Select Coupon Type'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownCouponType}
                                onChange={(e) => setCouponType(e.target.value)}
                            />
                            <Input
                                title={'Refferal Code'}
                                placeholder={'xH7unj1N'}
                                type={'text'}
                                required={true}
                                generate={true}
                                onClickGenerate={generateCode}
                                inputValue={referralCode}
                                onChange={(e) => setReferralCode(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Amount'}
                                placeholder={'Ex : Rp 200.000 or Free 1 mounth package'}
                                type={'number'}
                                required={true}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Input
                                title={'Status'}
                                dropdownPlaceholder={'Select Status'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownStatus}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowCreateModal(!showCreateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={postDataCoupon} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <Modal
                activeModal={showUpdateModal}
                title={'Update Coupon'}
                buttonClose={ () => setShowUpdateModal(!showUpdateModal)}
                width={'550px'}
                content= {
                    <div className='space-y-[25px]'>
                        <Input
                            title={'Coupon Name'}
                            placeholder={'Input coupon name'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setCouponName(e.target.value)}
                            inputValue={couponName}
                        />
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Coupon Type'}
                                dropdownPlaceholder={'Select Coupon Type'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownCouponType}
                                onChange={(e) => setCouponType(e.target.value)}
                                inputValue={couponType}
                            />
                            <Input
                                title={'Refferal Code'}
                                placeholder={'xH7unj1N'}
                                type={'text'}
                                required={true}
                                generate={true}
                                onClickGenerate={generateCode}
                                inputValue={referralCode}
                                onChange={(e) => setReferralCode(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Amount'}
                                placeholder={'Ex : Rp 200.000 or Free 1 mounth package'}
                                type={'number'}
                                required={true}
                                onChange={(e) => setAmount(e.target.value)}
                                inputValue={amount}
                            />
                            <Input
                                title={'Status'}
                                dropdownPlaceholder={'Select Status'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownStatus}
                                onChange={(e) => setStatus(e.target.value)}
                                inputValue={status}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowUpdateModal(!showUpdateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={updateDataCoupon} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <ModalDelete
                activeModal={showDeleteModal}
                buttonClose={() => setShowDeleteModal(!showDeleteModal)}
                submitButton={deleteDataCoupon}
            />
            <div className='px-[20px] py-[36px] bg-white rounded-xl space-y-[33px]'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-2'>
                        <h1 className='text-[#454545] font-semibold text-[20px]'>Coupon</h1>
                        <h1 className='text-[#737373] text-[10px]'>list of coupon</h1>
                    </div>
                    <div className='flex items-center gap-[16px]'>
                        <InputSearch
                            onChange={handleSearch}
                        />
                        <Button 
                            onClick={() => setShowCreateModal(!showCreateModal)}
                            title={'Add New Coupon'}
                            iconAdd={true}
                        />
                    </div>
                </div>
                <div className='overflow-auto scrollbar-hide'>
                    <table className='w-full space-y-[10px]'>
                        <div className='flex items-center gap-3 bg-[#EBF7FF] px-[14px] py-[8px] rounded-[3px]'>
                        <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Coupon Name</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Coupon Type</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Refferal Code</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Amount</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Status</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Action</h1>
                            </div>
                        </div>
                        { couponData.length === 0 ?
                            <div className='flex items-center gap-3 bg-[#F8F9FB] px-[14px] py-[8px] rounded-[3px]'>
                                <div className='min-w-[200px] max-w-[200px]'>
                                    <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                                </div>
                                <div className='min-w-[200px] max-w-[200px]'>
                                    <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                                </div>
                                <div className='min-w-[200px] max-w-[200px]'>
                                    <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                                </div>
                                <div className='min-w-[200px] max-w-[200px]'>
                                    <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                                </div>
                                <div className='min-w-[200px] max-w-[200px]'>
                                    <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                                </div>
                                <div className='min-w-[100px] max-w-[100px] flex items-center gap-[12px]'>
                                    <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                                </div>
                            </div>
                            :
                            Object.values(couponData).map((data, index) => {
                                console.log(data)
                                return (
                                    <div key={index} className='flex items-center gap-3 bg-[#F8F9FB] px-[14px] py-[8px] rounded-[3px]'>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.name}</h1>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.type}</h1>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.referral_code}</h1>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.amount}</h1>
                                        </div>
                                        <div className='min-w-[200px] max-w-[200px]'>
                                            <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.status ? 'Enable' : 'Disable'}</h1>
                                        </div>
                                        <div className='min-w-[100px] max-w-[100px] flex items-center gap-[12px]'>
                                            <button onClick={ () => getDataCouponById(data.id) } className='w-[29px] h-[29px] bg-[#CEDFEA] rounded-[9px] flex items-center justify-center'>
                                                <HiOutlinePencil className='text-[#003049]'/>
                                            </button>
                                            <button onClick={ () => deleteShowModal(data.id)} className='w-[29px] h-[29px] bg-[#CEDFEA] rounded-[9px] flex items-center justify-center'>
                                                <CgTrashEmpty className='text-[#003049]'/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    lengthData={couponData.length} 
                    showingData={!couponData.length < limit ? couponData.length : limit}
                    onPageChange={handlePageChange}
                    onPrevChange={handlePrevChange}
                    onNextChange={handleNextChange}
                />
            </div>
        </div>
    )
}

export default Coupon