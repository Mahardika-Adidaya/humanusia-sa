import React, { useEffect, useState } from 'react'
import { Button, Input, InputSearch, Modal, ModalDelete, Pagination } from '../../components'
import { MdImportExport } from 'react-icons/md'
import { CgTrashEmpty } from 'react-icons/cg'
import { HiOutlinePencil } from 'react-icons/hi'
import Api from '../../Api'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'

const Admin = () => {

    const limit = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')
    const [refresh, setRefresh] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [adminID, setAdminID] = useState('')
    const [adminData, setAdminData] = useState('')
    const [adminName, setAdminName] = useState('')
    const [adminEmail,setAdminEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [address, setAddress] = useState('')
    const [numberEmployee, setNumberEmployee] = useState('')
    const [status, setStatus] = useState('')
    const [packageSelected, setPackageSelected] = useState('')
    const [couponSelected, setCouponSelected] = useState('')

    const [packageData, setPackageData] = useState('')
    const [couponData, setCouponData] = useState('')

    const getDataPackage = async() => {
        try {
            const response = await Api.GetPackage(localStorage.getItem('hris-token'), currentPage, limit, '')
            setPackageData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getDataCoupon = async() => {
        try {
            const response = await Api.GetCoupon(localStorage.getItem('hris-token'), currentPage, limit, '')
            setCouponData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const dataDropdownStatus = [
        {value: true, label: 'Enable'},
        {value: false, label: 'Disable'}
    ]
    const dataDropdownPackage = Object.values(packageData).map((data) => ({
        value: data.id, 
        label: data.name
    }))

    const dataDropdownCoupon = Object.values(couponData).map((data) => ({
        value: data.id, 
        label: data.name
    }))

    const getDataAdmin = async() => {
        try {
            const response = await Api.GetAdmin(localStorage.getItem('hris-token'), currentPage, limit, '')
            setAdminData(response.data.data)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    const debouncedSearch = debounce(async(search) => {
        try {
            const response = await Api.GetAdmin(localStorage.getItem('hris-token'), currentPage, limit, search)
            setAdminData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }, 300)

    const handleSearch = (e) => {       
        const search = e.target.value
        debouncedSearch(search) 
    }

    const postDataAdmin = async() => {
        try {
            const data = {
                fullname : adminName,
                phone : phone,
                password : password,
                email : adminEmail,
                isVerified : Boolean(status),
                role : 'ADMIN',
                company_name : companyName,
                number_of_employee : numberEmployee,
                address: address,
                packageT: packageSelected,
                coupon: couponSelected,
            }
            const response = await Api.CreateAdmin(localStorage.getItem('hris-token'), data)
            setShowCreateModal(!showCreateModal)
            setRefresh(true)
            toast.success('Success to send data admin!')
        } catch (error) {
            toast.error('Failed to send data admin!')
        }
    }

    const getDataAdminById = async(id) => {
        setShowUpdateModal(!showUpdateModal)
        setAdminID(id)
        try {
            const response = await Api.GetAdminById(localStorage.getItem('hris-token'), id)
            setAdminName(response.data[0].fullname)
            setPhone(response.data[0].phone)
            setPassword(response.data[0].password)
            setAdminEmail(response.data[0].email)
            setStatus(response.data[0].isVerified)
            setCompanyName(response.data[0].company.company_name)  
            setNumberEmployee(response.data[0].company.number_of_employee)  
            setAddress(response.data[0].company.address)  
            setPackageSelected(response.data[0].packageT.id)  
            setCouponSelected(response.data[0].coupon.id)  
        } catch (error) {
            console.log(error)
        }
    }

    const updateDataAdmin = async() => {
        try {
            const data = {
                fullname : adminName,
                phone : phone,
                email : adminEmail,
                isVerified : Boolean(status),
                role : 'ADMIN',
                company_name : companyName,
                number_of_employee : numberEmployee,
                address: address,
                packageT: packageSelected,
                coupon: couponSelected,
            }
            await Api.UpdateAdmin(localStorage.getItem('hris-token'), data, adminID)
            setShowUpdateModal(!showUpdateModal)
            setRefresh(true)
            toast.success('Success to update data admin')
        } catch (error) {
            console.log(error)
            toast.error('Failed to update data admin!')
        }
    }

    const deleteShowModal = (id) => {
        setShowDeleteModal(!showDeleteModal)
        setAdminID(id)
    }

    const deleteDataAdmin = async() => {
        try {
            await Api.DeleteAdmin(localStorage.getItem('hris-token'), adminID)
            setRefresh(true)
            setShowDeleteModal(!showDeleteModal)
            toast.success('Success to delete data admin')
        } catch (error) {
            toast.error('Failed to delete data admin!')
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
        getDataAdmin()
        getDataPackage()
        getDataCoupon()
        setRefresh(false)
    }, [refresh])

    return (
        <div>
            <Modal
                activeModal={showCreateModal}
                title={'Add New Admin'}
                buttonClose={ () => setShowCreateModal(!showCreateModal)}
                width={'550px'}
                content= {
                    <div className='space-y-[25px]'>
                        <Input
                            title={'Name'}
                            placeholder={'Input admin name'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setAdminName(e.target.value)}
                        />
                        <Input
                            title={'Email'}
                            placeholder={'Input admin email'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setAdminEmail(e.target.value)}
                        />
                        <Input
                            title={'Phone Number'}
                            placeholder={'ex: 081222232211'}
                            type={'number'}
                            required={true}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                            title={'Password'}
                            placeholder={'Input the password'}
                            type={'password'}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            title={'Company Name'}
                            placeholder={'Input company name of admin'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Input
                            title={'Address'}
                            placeholder={'Address'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setAddress(e.target.value)}
                            textarea={true}
                        />
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Number of Employee'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                onChange={(e) => setNumberEmployee(e.target.value)}
                            />
                            <Input
                                title={'Status'}
                                dropdownPlaceholder={'Select Status'}
                                required={true}
                                onChange={(e) => setStatus(e.target.value)}
                                dropdown={true}
                                dropdownData={dataDropdownStatus}
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Package'}
                                dropdownPlaceholder={'Select Package'}
                                required={true}
                                onChange={(e) => setPackageSelected(e.target.value)}
                                dropdown={true}
                                dropdownData={dataDropdownPackage}
                            />
                            <Input
                                title={'Coupon'}
                                dropdownPlaceholder={'Select Coupon'}
                                required={true}
                                onChange={(e) => setCouponSelected(e.target.value)}
                                dropdown={true}
                                dropdownData={dataDropdownCoupon}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowCreateModal(!showCreateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={postDataAdmin} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <Modal
                activeModal={showUpdateModal}
                title={'Update Admin'}
                buttonClose={ () => setShowUpdateModal(!showUpdateModal)}
                width={'550px'}
                content= {
                    <div className='space-y-[25px]'>
                        <Input
                            title={'Name'}
                            placeholder={'Input admin name'}
                            type={'text'}
                            required={true}
                            inputValue={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                        />
                        <Input
                            title={'Email'}
                            placeholder={'Input admin email'}
                            type={'text'}
                            required={true}
                            inputValue={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                        />
                        <Input
                            title={'Phone Number'}
                            placeholder={'ex: 081222232211'}
                            type={'number'}
                            required={true}
                            inputValue={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                            title={'Company Name'}
                            placeholder={'Input company name of admin'}
                            type={'text'}
                            required={true}
                            inputValue={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Input
                            title={'Address'}
                            placeholder={'Address'}
                            type={'text'}
                            required={true}
                            inputValue={address}
                            onChange={(e) => setAddress(e.target.value)}
                            textarea={true}
                        />
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Number of Employee'}
                                placeholder={'0'}
                                type={'number'}
                                required={true}
                                inputValue={numberEmployee}
                                onChange={(e) => setNumberEmployee(e.target.value)}
                            />
                            <Input
                                title={'Status'}
                                dropdownPlaceholder={'Select Status'}
                                required={true}
                                inputValue={status}
                                onChange={(e) => setStatus(e.target.value)}
                                dropdown={true}
                                dropdownData={dataDropdownStatus}
                            />
                        </div>
                        <div className='flex items-center gap-[15px]'>
                            <Input
                                title={'Package'}
                                dropdownPlaceholder={'Select Package'}
                                required={true}
                                inputValue={packageSelected}
                                onChange={(e) => setPackageSelected(e.target.value)}
                                dropdown={true}
                                dropdownData={dataDropdownPackage}
                            />
                            <Input
                                title={'Coupon'}
                                dropdownPlaceholder={'Select Coupon'}
                                required={true}
                                inputValue={couponSelected}
                                onChange={(e) => setCouponSelected(e.target.value)}
                                dropdown={true}
                                dropdownData={dataDropdownCoupon}
                            />
                        </div>

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowUpdateModal(!showUpdateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={updateDataAdmin} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <ModalDelete
                activeModal={showDeleteModal}
                buttonClose={() => setShowDeleteModal(!showDeleteModal)}
                submitButton={deleteDataAdmin}
            />
            <div className='px-[20px] py-[36px] bg-white rounded-xl space-y-[33px]'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-2'>
                        <h1 className='text-[#454545] font-semibold text-[20px]'>Admin</h1>
                        <h1 className='text-[#737373] text-[10px]'>list of admin</h1>
                    </div>
                    <div className='flex items-center gap-[16px]'>
                        <InputSearch
                            onChange={handleSearch}
                        />
                        <Button 
                            onClick={() => setShowCreateModal(!showCreateModal)}
                            title={'Add New Admin'}
                            iconAdd={true}
                        />
                    </div>
                </div>
                <div className='overflow-auto scrollbar-hide'>
                    <table className='w-full space-y-[10px]'>
                        <div className='flex items-center gap-3 bg-[#EBF7FF] px-[14px] py-[8px] rounded-[3px]'>
                            <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Name</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Email</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Phone Number</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Company Name</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[250px] max-w-[250px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Address</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Number of Employee</h1>
                                <MdImportExport className='text-[#737373] text-xs'/>
                            </div>
                            <div className='flex items-center gap-[15px] min-w-[100px] max-w-[100px]'>
                                <h1 className='text-[#737373] text-xs font-[500]'>Action</h1>
                            </div>
                        </div>
                        {adminData.length === 0 ?
                        <div className='flex items-center gap-3 bg-[#F8F9FB] px-[14px] py-[8px] rounded-[3px]'>
                            <div className='min-w-[250px] max-w-[250px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[250px] max-w-[250px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[200px] max-w-[200px]'>
                                <h1 className='text-[#737373] text-xs font-[500] truncate'>-</h1>
                            </div>
                            <div className='min-w-[250px] max-w-[250px]'>
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
                        Object.values(adminData).map((data, index) => {
                            return (
                                <div key={index} className='flex items-center gap-3 bg-[#F8F9FB] px-[14px] py-[8px] rounded-[3px]'>
                                    <div className='min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.fullname}</h1>
                                    </div>
                                    <div className='min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.email}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.phone}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.company.company_name}</h1>
                                    </div>
                                    <div className='min-w-[250px] max-w-[250px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.company.address}</h1>
                                    </div>
                                    <div className='min-w-[200px] max-w-[200px]'>
                                        <h1 className='text-[#737373] text-xs font-[500] truncate'>{data.company.number_of_employee }</h1>
                                    </div>
                                    <div className='min-w-[100px] max-w-[100px] flex items-center gap-[12px]'>
                                        <button onClick={ () => getDataAdminById(data.id) } className='w-[29px] h-[29px] bg-[#CEDFEA] rounded-[9px] flex items-center justify-center'>
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
                    lengthData={adminData.length} 
                    showingData={!adminData.length < limit ? adminData.length : limit}
                    onPageChange={handlePageChange}
                    onPrevChange={handlePrevChange}
                    onNextChange={handleNextChange}
                />
            </div>
        </div>
    )
}

export default Admin