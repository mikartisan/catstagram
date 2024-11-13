// src/pages/LoginPage.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
    
            if (error) {
                setError(error.message);
            } else {
                navigate('/home');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center py-10">
                <img src={'/catstagram.png'} className="h-24" alt="Image to crop" />
            </div>
            
            <form action="#" onSubmit={handleLogin}>
                <div className=" pb-4 flex flex-col items-center justify-center">
                    {error && 
                        <div className="py-3 text-xs text-red-400 rounded-lg" role="alert">
                            <span className="font-medium">Login Failed : </span> {error}
                        </div>
                    }

                    <input 
                        type="text" 
                        className="bg-[#fafafa] border border-[rgb(118, 118, 118)] 
                        text-xs p-2 w-64 rounded-sm" 
                        placeholder="Phone number, username, or email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input 
                        type="password" 
                        className="bg-[#fafafa] border border-[rgb(118, 118, 118)] text-xs p-2 w-64 mt-2 rounded-sm" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button disabled={isLoading} className="bg-blue-400 w-64 my-3 p-2 text-white font-bold text-xs rounded-md">
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                </div>    
            </form>
            <div className="flex items-center justify-center">
                <hr className="w-[100px]" />
                <p className="text-[#000] mr-4 ml-4 text-xs font-bold text-[#828282]">OR</p>
                <hr className="w-[100px]" />
            </div>
            <div className="flex items-center justify-center py-8">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#385185"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Facebook-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"> <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"> </path> </g> </g> </g></svg>
                <a href="" className="text-sm font-semibold text-[#385185]">
                    Log in with Facebook
                </a>    
            </div>
            <div className="flex items-center justify-center">
                <a href="#" className="text-sm text-[#00376b]">
                    Forgot password?
                </a>
            </div>
            <div className="py-20 flex items-center justify-center">
                <p className="text-[14px]">Don't have an account? <span className="text-blue-500 font-bold"><a onClick={() => navigate('/signup')}>Sign up</a></span></p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="mb-2 text-[14px]">Get the app.</p>
                <div className="flex space-x-2">
                    <img className="h-10" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" />
                    <img className="h-10" src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="" />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-16">
                <div className="flex space-x-3 text-xs text-[#767676]">
                    <a href="#">Meta</a>
                    <a href="#">About</a>
                    <a href="#">Blog </a>
                    <a href="#">Jobs</a>
                    <a href="#">Help </a>
                    <a href="#">API</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
                <div className="flex space-x-2 text-xs mt-2 text-[#767676]">
                    <a href="#">Locations</a>
                    <a href="#">Instagram Lite</a>
                    <a href="#">Threads</a>
                </div>
                <div className="flex space-x-2 text-xs mt-2 text-[#767676]">
                    <a href="#">Contact Uploading & Non-Users</a>
                    <a href="#">Meta Verified</a>
                </div>

                <div className="flex space-x-2 text-xs mt-4 text-[#767676]">
                    <select className="appearance-none text-xs p-0 w-13 focus:outline-none border-0">
                        <option>English</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                    
                    <a href="#">2024 Instagram from Meta</a>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
