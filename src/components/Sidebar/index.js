import React, { useEffect, useState } from 'react'
import { Logo, LogoH } from '../../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom/dist';
import { RiArrowLeftSLine, RiArrowRightSLine, RiAdminFill, RiCoupon2Fill, RiFileList3Fill, RiLogoutBoxRFill } from 'react-icons/ri';
import { MdOutlineArticle, MdSpaceDashboard } from 'react-icons/md';
import { BiSolidPackage } from 'react-icons/bi';

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;
    const [display, setDisplay] = useState(true)

    const logout = () => {
        localStorage.removeItem('hris-token')
        localStorage.removeItem('hris-role')
        navigate('/')
    }
    
    useEffect(() => {
        if(localStorage.getItem('hris-token') === null) {   
            navigate('/')
        }
    }, [navigate])

    return (
        <div className={`hidden lg:block px-[35px] py-[40px] border h-fit bg-white rounded-[20px] shadow-sm sticky ${display ? 'w-[320px]' : 'w-[124px]'} transition-all duration-1000 ease-in-out`}>
            <div className='border-b-2 w-full py-[8px] relative'>
                <Link to={'/dashboard'} className='flex items-center justify-center'>
                    <img src={display ? Logo : LogoH} alt='Humanusia' className='h-[40px]'/>
                </Link>
                <button onClick={ () => setDisplay(!display) } className='bg-[#147DB4] shadow-md shadow-[#147DB44D] rounded-full w-[28px] h-[28px] absolute -right-[50px] top-5 flex items-center justify-center'>
                    {display ?
                        <RiArrowLeftSLine className='text-xl text-white'/>
                        :
                        <RiArrowRightSLine className='text-xl text-white'/>
                    }
                </button>
            </div>
            <div className={`my-[40px] h-[450px] overflow-auto scrollbar-hide flex flex-col ${display ? 'items-start' : 'items-center'}`}>
                <Link to={'/dashboard'} className={`flex items-center gap-[16px] mb-[40px] ${pathname === '/dashboard' ? 'text-[#780000]' : 'text-[#A8A8A8]'} hover:text-[#780000]`}>
                    <MdSpaceDashboard/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Dashboard</h1>
                    }
                </Link>
                <Link to={'/admin'} className={`flex items-center gap-[16px] mb-[40px] ${pathname === '/admin' ? 'text-[#780000]' : 'text-[#A8A8A8]'} hover:text-[#780000]`}>
                    <RiAdminFill/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Admin</h1>
                    }
                </Link>
                <Link to={'/package'} className={`flex items-center gap-[16px] mb-[40px] ${pathname === '/package' ? 'text-[#780000]' : 'text-[#A8A8A8]'} hover:text-[#780000]`}>
                    <BiSolidPackage/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Package</h1>
                    }
                </Link>
                <Link to={'/coupon'} className={`flex items-center gap-[16px] mb-[40px] ${pathname === '/coupon' ? 'text-[#780000]' : 'text-[#A8A8A8]'} hover:text-[#780000]`}>
                    <RiCoupon2Fill/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Coupon</h1>
                    }
                </Link>
                <Link to={'/transaction'} className={`flex items-center gap-[16px] mb-[40px] ${pathname === '/transaction' ? 'text-[#780000]' : 'text-[#A8A8A8]'} hover:text-[#780000]`}>
                    <RiFileList3Fill/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Transaction</h1>
                    }
                </Link>
                <Link to={'/article'} className={`flex items-center gap-[16px] mb-[40px] ${pathname === '/article' ? 'text-[#780000]' : 'text-[#A8A8A8]'} hover:text-[#780000]`}>
                    <MdOutlineArticle/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Article</h1>
                    }
                </Link>
                <div className='border w-full mb-[40px]'/>
                <button onClick={logout} className='flex items-center gap-[16px] text-[#C1121F] hover:text-[#780000]'>
                    <RiLogoutBoxRFill/>
                    {display &&
                        <h1 className='text-sm font-[500]'>Logout</h1>
                    }
                </button>
            </div>
        </div>
    )
}

export default Sidebar