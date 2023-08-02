import React, { useState } from 'react'
import { BackgroundLogin, Logo } from '../../assets'
import { useNavigate } from 'react-router-dom/dist'
import Api from '../../Api'
import toast from 'react-hot-toast'
import { AiFillEye } from 'react-icons/ai'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')

    const changeTypePassword = () => {
        if(passwordType === 'password') {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
    }

    const login = async() => {
        try {
            const response = await Api.Login(email, password)
            if(response.data.results.data.user.role === 'ADMIN' || response.data.results.data.user.role === 'EMPLOYEE') {
                toast.error('Invalid email and/or password!!!')
            }else {
                localStorage.setItem('hris-token', response.data.results.data.token)
                localStorage.setItem('hris-role', response.data.results.data.user.role)
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error('Invalid email and/or password!!!')
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center gap-5 bg-cover' style={{ backgroundImage: `url(${BackgroundLogin})` }}>
            <div className='rounded-xl shadow-xl border px-[32px] py-[32px] space-y-8 bg-white'>
                <img src={Logo} alt='Humanusia' className='w-72 border-b-2'/>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <label htmlFor='email' className='text-sm text-gray-400'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} id='email' type='text' placeholder='Email' className='w-full text-gray-400 text-xs px-[16px] py-[10px] rounded-md border outline-none'/>
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='password' className='text-sm text-gray-400'>Password</label>
                        <div className='relative'>
                            <input onChange={(e) => setPassword(e.target.value)} id='password' type={passwordType} placeholder='Password' className='w-full text-gray-400 text-xs px-[16px] py-[10px] rounded-md border outline-none'/>
                            <button onClick={changeTypePassword} className='absolute right-3 top-3 text-gray-400'>
                                <AiFillEye/>
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={login} className='w-full border py-[10px] rounded-md text-xs bg-[#0E5073] text-white font-semibold'>Login</button>
            </div>
        </div>
    )
}

export default Login