// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navigation';
import SideBar from '../components/Sidebar';
import UserPosts from '../components/UserPosts'

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const checkUserSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            } else {
                navigate('/'); 
            }
        };
        checkUserSession();
    }, [navigate]);

    return (
        <div>
            {user ? (
                <div>
                    <NavBar/>
                    <div className="relative flex bg-[#fafafa]">
                        <div className="w-full lg:w-4/5 min-h-screen overflow-y-auto">
                            <div className="p-4 sm:ml-80">
                                <div className="w-full 2xl:w-1/3 mx-auto p-4">

                                    <div className='bg-white rounded-lg p-5 xl:p-8'>
                                        <p className="text-left font-bold text-xl xl:text-2xl mb-4">Pookie02</p>
                                        <div className='flex w-full py-5 xl:py-4'>
                                            <div className="w-1/3 py-2 flex items-center justify-center">
                                                <img
                                                    className="w-20 h-20 xl:w-32 xl:h-32 rounded-full ring-4 ring-[#edc597]"
                                                    src={'profiles/profile1.jpg'}
                                                    alt="Rounded avatar"
                                                />
                                            </div>

                                            <div className="w-2/3 flex items-center justify-around h-16 mt-3 xl:mt-10">
                                                <div className="flex flex-col items-center">
                                                    <p className="font-bold text-lg">1</p> 
                                                    <p className="text-start">Posts</p>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <p className="font-bold text-lg">200</p> 
                                                    <p className="text-start">Followers</p>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <p className="font-bold text-lg">180</p>
                                                    <p className="text-start">Following</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='py-2'>
                                            <p className="text-left font-semibold text-base xl:text-xl">Fuzzy Noodles</p>
                                            <p className='text-left text-sm py-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, totam, quasi eum sunt.</p>
                                        </div>
                                        <div>
                                            <button type="button" className="text-white bg-[#ecc293] hover:bg-[#ad885c] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 w-full">Edit Profile</button>
                                        </div>
                                    </div>
                                    
                                    <UserPosts />
                                </div>
                            </div>
                        </div>
                        <SideBar />
                    </div>
                </div> 
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;