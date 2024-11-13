// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navigation';
import Post from '../components/Post';
import SideBar from '../components/Sidebar';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const checkUserSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            } else {
                navigate('/'); // Redirect to login if no session
            }
        };
        checkUserSession();
    }, [navigate]);

    return (
        <div>
            {user ? (
                <div>
                    <NavBar/>
                    {/* Main container with relative positioning */}
                    <div className="relative flex bg-[#fafafa]">
                        <div className="w-full lg:w-4/5 min-h-screen overflow-y-auto">
                            <div className="p-4 sm:ml-80">
                                <Post />
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

export default Home;