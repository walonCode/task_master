"use client"

import Link from "next/link"
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { useState,useEffect,useContext } from "react"
import { useRouter } from "next/navigation"
import AuthContext from "@/libs/context/authContext"
import { ToastContainer,toast } from "react-toastify"

export default function Signup() {
    const [fullname, setFullname] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [jobTitle, setJobTitle] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isChecked,setIsChecked] = useState(false)
    const router = useRouter()
    const { signup } = useContext(AuthContext) || {}
    

    useEffect(()=>{
        setButtonDisable(!(email && password && fullname && confirmPassword && username && isChecked && jobTitle))
    },[password, email, fullname, confirmPassword, username,isChecked,jobTitle])

    const onSignup = async(e:React.FormEvent<HTMLFormElement>) => {
        try{
            setLoading(true)
            e.preventDefault()
            if(password === confirmPassword){
                await signup!(fullname,username,email,password,jobTitle)
                toast('signup successfully')
                router.push('/login')
            }else{
                setErrorMessage('password and confirm password are not the same')
                toast(errorMessage)
            }
           
        }catch(error){
            console.log(`error occurred ${error}`)
        }finally{
            setLoading(false)
        }
    }


    return (
        <div>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="m-auto w-full max-w-[450px] px-4 py-6">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full backdrop-blur-lg bg-opacity-95">
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-full">
                                <FiUser className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">{errorMessage ? errorMessage :"Create an Account"}</h1>
                        <p className="text-center text-gray-600 mb-8">Enter your details to get started</p>
                        
                        <form onSubmit={onSignup} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="johndoe123"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Job Title</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="Engineer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="Create a strong password"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="Confirm your password"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(e.target.checked)}} className="h-4 w-4 text-gray-700 focus:ring-gray-500 border-gray-300 rounded" />
                                <label className="ml-2 text-sm text-gray-600">
                                    I agree to the{' '}
                                    <a href="#" className="text-blue-500 hover:text-blue-800">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-blue-500 hover:text-blue-800">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading || buttonDisable}
                                className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-lg hover:opacity-90 transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>
                        
                        <p className="text-center mt-6 text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-500 hover:text-blue-800 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            />
        </div>
    )
}
