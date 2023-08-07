import React, { useEffect, useState } from 'react'
import { Button, Input, InputSearch, Modal, ModalDelete, Pagination } from '../../components'
import { MdImportExport } from 'react-icons/md'
import { CgTrashEmpty } from 'react-icons/cg'
import { HiOutlinePencil } from 'react-icons/hi'
import Api from '../../Api'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'

const Package = () => {

    const limit = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')
    const [refresh, setRefresh] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [packageID, setPackageID] = useState('')
    const [packageData, setPackageData] = useState('')
    const [packageName, setPackageName] = useState('')
    const [maxEmployee, setMaxEmployee] = useState('')
    const [durationType, setDurationType] = useState('')
    const [durationNumber, setDurationNumber] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState(null)
    

    const dataDropdownDurationType = [
        {value: 'Daily', label: 'Daily'},
        {value: 'Weekly', label: 'Weekly'},
        {value: 'Monthly', label: 'Monthly'},
        {value: 'Annual', label: 'Annual'}
    ]
    const dataDropdownStatus = [
        {value: true, label: 'Enable'},
        {value: false, label: 'Disable'}
    ]

    const getDataPackage = async() => {
        try {
            const response = await Api.GetPackage(localStorage.getItem('hris-token'), currentPage, limit, '')
            setPackageData(response.data.data)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    const debouncedSearch = debounce(async(search) => {
        try {
            const response = await Api.GetPackage(localStorage.getItem('hris-token'), currentPage, limit, search)
            setPackageData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }, 300)

    const handleSearch = (e) => {       
        const search = e.target.value
        debouncedSearch(search) 
    }

    const postDataPackage = async() => {
        try {
            const data = {
                name : packageName,
                duration_type : durationType,
                duration_number : durationNumber,
                price : price,
                max_employee : maxEmployee,
                status : Boolean(status) 
            }
            await Api.CreatePackage(localStorage.getItem('hris-token'), data)
            setShowCreateModal(!showCreateModal)
            setRefresh(true)
            toast.success('Success to send data package!')
        } catch (error) {
            console.log(error)
            toast.error('Failed to send data package!')
        }
    }

    const getDataPackageById = async(id) => {
        setShowUpdateModal(!showUpdateModal)
        setPackageID(id)
        try {
            const response = await Api.GetPackageById(localStorage.getItem('hris-token'), id)
            setPackageName(response.data[0].name)
            setDurationType(response.data[0].duration_type)
            setDurationNumber(response.data[0].duration_number)
            setMaxEmployee(response.data[0].max_employee)
            setPrice(response.data[0].price)
            setStatus(response.data[0].status)  
        } catch (error) {
            console.log(error)
        }
    }

    const updateDataPackage = async() => {
        try {
            const data = {
                name : packageName,
                duration_type : durationType,
                duration_number : durationNumber,
                price : price,
                max_employee : maxEmployee,
                status : Boolean(status)
            }
            await Api.UpdatePackage(localStorage.getItem('hris-token'), data, packageID)
            setShowUpdateModal(!showUpdateModal)
            setRefresh(true)
            toast.success('Success to update data package')
        } catch (error) {
            console.log(error)
            toast.error('Failed to update data package!')
        }
    }

    const deleteShowModal = (id) => {
        setShowDeleteModal(!showDeleteModal)
        setPackageID(id)
    }

    const deleteDataPackage = async() => {
        try {
            await Api.DeletePackage(localStorage.getItem('hris-token'), packageID)
            setRefresh(true)
            setShowDeleteModal(!showDeleteModal)
            toast.success('Success to delete data package')
        } catch (error) {
            toast.error('Failed to delete data package!')
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

    useEffect(() => {
        getDataPackage()
        setRefresh(false)
    }, [refresh])

    return (
        <div>
            <Modal
                activeModal={showCreateModal}
                title={'Add New Package'}
                buttonClose={ () => setShowCreateModal(!showCreateModal)}
                width={'550px'}
                content= {
                    <div className='space-y-[25px]'>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Package Name'}
                                placeholder={'Input package name'}
                                type={'text'}
                                required={true}
                                onChange={ (e) => setPackageName(e.target.value) }
                            />
                            <Input
                                title={'Max Total Employees'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={ (e) => setMaxEmployee(e.target.value) }
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Duration Type'}
                                dropdownPlaceholder={'Select Duration Type'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownDurationType}
                                onChange={ (e) => setDurationType(e.target.value) }
                            />
                            <Input
                                title={'Duration Number'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={ (e) => setDurationNumber(e.target.value) }
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Price'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={ (e) => setPrice(e.target.value) }
                            />
                            <Input
                                title={'Status'}
                                dropdownPlaceholder={'Select Status'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownStatus}
                                onChange={ (e) => setStatus(e.target.value) }
                            />
                        </div>

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowCreateModal(!showCreateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={postDataPackage} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <Modal
                activeModal={showUpdateModal}
                title={'Update Package'}
                buttonClose={ () => setShowUpdateModal(!showUpdateModal)}
                width={'550px'}
                content= {
                    <div className='space-y-[25px]'>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Package Name'}
                                placeholder={'Input package name'}
                                type={'text'}
                                required={true}
                                onChange={ (e) => setPackageName(e.target.value) }
                                inputValue={packageName}
                            />
                            <Input
                                title={'Max Total Employees'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={ (e) => setMaxEmployee(e.target.value) }
                                inputValue={maxEmployee}
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Duration Type'}
                                dropdownPlaceholder={'Select Duration Type'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownDurationType}
                                onChange={ (e) => setDurationType(e.target.value) }
                                inputValue={durationType}
                            />
                            <Input
                                title={'Duration Number'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={ (e) => setDurationNumber(e.target.value) }
                                inputValue={durationNumber}
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Price'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={ (e) => setPrice(e.target.value) }
                                inputValue={price}
                            />
                            <Input
                                title={'Status'}
                                dropdownPlaceholder={'Select Status'}
                                required={true}
                                dropdown={true}
                                dropdownData={dataDropdownStatus}
                                onChange={ (e) => setStatus(e.target.value) }
                                inputValue={status}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowUpdateModal(!showUpdateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={updateDataPackage} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <ModalDelete
                activeModal={showDeleteModal}
                buttonClose={() => setShowDeleteModal(!showDeleteModal)}
                submitButton={deleteDataPackage}
            />
            <div className='px-[20px] py-[36px] bg-white rounded-xl space-y-[33px]'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-2'>
                        <h1 className='text-[#454545] font-semibold text-[20px]'>Package</h1>
                        <h1 className='text-[#737373] text-[10px]'>list of package</h1>
                    </div>
                    <div className='flex items-center gap-[16px]'>
                        <InputSearch
                            onChange={handleSearch}
                        />
                        <Button 
                            onClick={() => setShowCreateModal(!showCreateModal)}
                            title={'Add New Package'}
                            iconAdd={true}
                        />
                    </div>
                </div>
                <div className='overflow-auto scrollbar-hide'>
                    <table className='w-full space-y-[10px]'>
                        <div className='flex items-center gap-3 bg-[#EBF7FF] px-[14px] py-[8px] rounded-[3px]'>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Package Name</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Duration Type</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Duration Number</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Price </h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Status</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Max Total Employees</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Action</h1>
                            </div>
                        </div>
                        {packageData.length === 0 ?
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
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[100px] max-w-[100px] flex items-center gap-[12px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>   
                            </div>
                        </div>
                        :
                        Object.values(packageData).map((data, index) => {
                            return(
                                <div key={index} className='flex items-center gap-3 bg-[#F8F9FB] px-[14px] py-[8px] rounded-[3px]'>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.name}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.duration_type}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.duration_number}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.price}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.status ? 'Enable' : 'Disable'}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.max_employee}</h1>
                                    </div>  
                                    <div className='min-w-[100px] max-w-[100px] flex items-center gap-[12px]'>
                                        <button onClick={ () => getDataPackageById(data.id) } className='w-[29px] h-[29px] bg-[#CEDFEA] rounded-[9px] flex items-center justify-center'>
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
                    lengthData={packageData.length} 
                    showingData={!packageData.length < limit ? packageData.length : limit}
                    onPageChange={handlePageChange}
                    onPrevChange={handlePrevChange}
                    onNextChange={handleNextChange}
                />
            </div>
        </div>
    )
}

export default Package