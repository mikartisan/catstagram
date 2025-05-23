// src/pages/LoginPage.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        if (password !== conPassword) {
            setError("Passwords do not match!");
            setIsLoading(false);
            return;
        }
    
        try {
            // Sign up the user
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
    
            if (signUpError) {
                setError(signUpError.message);
                return;
            }
    
            // Get the user ID from the sign-up response
            const userId = signUpData?.user?.id;
    
            if (!userId) {
                setError('Sign-up successful, but no user ID returned.');
                return;
            }
    
            // Insert username and user details into the `users` table
            const { error: insertError } = await supabase.from('users').insert([
                {
                    username: username,
                    first_name: '', 
                    last_name: '',  
                    user_id: userId,
                },
            ]);
    
            if (insertError) {
                setError('Failed to save user details: ' + insertError.message);
                return;
            }
    
            // Navigate to home if successful
            navigate('/home');
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <div className="h-screen text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:pt-60">
                        <div>
                            <img
                            src="/catstagram.png"
                            className="w-52 mx-auto"
                            alt="Logo"
                            />
                        </div>
                        <div className="mt-1 flex flex-col items-center">
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#fbf3e9] text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                {/* SVG paths for Google icon */}
                                                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                            </svg>
                                        </div>
                                        <span className="ml-4">Register with Google</span>
                                    </button>

                                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#fbf3e9] text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                        <div className="bg-white p-1 ml-3 rounded-full">
                                            <img className='w-6' src={'/icons/facebook.svg'} alt="google" />
                                        </div>
                                        <span className="ml-4">Register with Facebook</span>
                                    </button>
                                </div>

                                <div className="my-12 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or register with e-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <form action="#" onSubmit={handleRegister}>

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={conPassword}
                                            onChange={(e) => setConPassword(e.target.value)} 
                                        />
                                        {error && 
                                            <div className="pt-3 text-xs text-red-400 rounded-lg" role="alert">
                                                <span className="font-medium">Login Failed : </span> {error}
                                            </div>
                                        }
                                        <button disabled={isLoading} className="mt-5 tracking-wide font-semibold bg-[#ecc293] text-gray-100 w-full py-4 rounded-lg hover:bg-[#985d1b] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg hidden={isLoading} className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">{isLoading ? 'Please wait...' : 'Register'}</span>
                                        </button>
                                        <p className="text-left py-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account?
                                            <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                            backgroundImage:
                                "url('/background.png')",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
