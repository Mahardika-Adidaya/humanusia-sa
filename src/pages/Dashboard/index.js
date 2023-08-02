import React, { useEffect, useState } from 'react'
import { CardDashboard } from '../../components'
import moment from 'moment'
import Api from '../../Api'

const Dashboard = () => {

    const [totalAdmin, setTotalAdmin] = useState('')
    const [totalPackage, setTotalPackage] = useState('')
    const [totalCoupon, setTotalCoupon] = useState('')

    const getDataAdmin = async() => {
        try {
            const response = await Api.GetAdmin(localStorage.getItem('hris-token'), '', '', '')
            setTotalAdmin(response.data.totalAdmins)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getDataPackage = async() => {
        try {
            const response = await Api.GetPackage(localStorage.getItem('hris-token'), '', '', '')
            setTotalPackage(response.data.totalPackage)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getDataCoupon = async() => {
        try {
            const response = await Api.GetCoupon(localStorage.getItem('hris-token'), '', '', '')
            setTotalCoupon(response.data.totalCoupon)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataAdmin()
        getDataPackage()
        getDataCoupon()
    }, [])

    return (
        <div className='space-y-5'>
            <div className='flex items-center justify-between bg-white px-[20px] py-[20px] rounded-[10px] border'>
                <h1 className='text-[#454545] font-semibold'>Hello, Super Admin!</h1>
                <h1 className='text-[#737373] text-[14px]'>it's {moment().format('dddd, DD MMMM YYYY')}</h1>
            </div>
            <div className='flex items-center gap-5 overflow-auto'>
                <CardDashboard
                    CardName={'Total Admin'}
                    Value={totalAdmin}
                />
                <CardDashboard
                    CardName={'Total Package'}
                    Value={totalPackage}
                />
                <CardDashboard
                    CardName={'Total Coupon'}
                    Value={totalCoupon}
                />
                <CardDashboard
                    CardName={'Total Transaction'}
                    Value={'0'}
                />
            </div>
        </div>
    )
}

export default Dashboard