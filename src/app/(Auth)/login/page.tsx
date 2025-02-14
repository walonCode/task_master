"use client"

import Link from "next/link"
import { useState,useEffect,useContext } from "react"
import { useRouter } from "next/navigation"
import AuthContext from "@/libs/context/authContext"
import { ToastContainer,toast } from "react-toastify"

export default function Login(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isChecked,setIsChecked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const router = useRouter()
    const { login } = useContext(AuthContext) || {}

    useEffect(() => {
        setButtonDisable(!(password && username && isChecked));
    }, [password, username,isChecked]);

    const onlogin = async(e:React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            setLoading(true)

            await login!(username,password)
            toast('login successfully')
            router.push('/task')
        }catch(error:unknown){
            console.log('error occurred',error)
            setErrorMessage('login failed')
            toast(errorMessage)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="m-auto w-full max-w-[450px] px-4 py-6">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full backdrop-blur-lg bg-opacity-95">
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1>
                        <p className="text-center text-gray-600 mb-8">Please enter your details to sign in</p>
                        
                        <form onSubmit={onlogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 bg-gray-50"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="h-4 w-4 text-gray-700 focus:ring-gray-500 border-gray-300 rounded" />
                                    <label className="ml-2 text-sm text-gray-600">Remember me</label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading || buttonDisable}
                                className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-300 to-blue-800 text-white font-medium rounded-lg hover:opacity-90 transition duration-200 transform hover:scale-[1.02]"
                            >
                                {loading ? "Loading" : 'Login'}
                            </button>
                        </form>
                        
                        <p className="text-center mt-6 text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link href='/signup' className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer
            autoClose={5000}
            hideProgressBar={false}
            position="top-right"
            />
        </div>
    )
}