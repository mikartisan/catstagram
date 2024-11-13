import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
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

    // Sign out user
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            console.log('User signed out successfully');
            nivagate('/');
        }
    };

    console.log(user);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleAvatarDropdown = () => setIsAvatarDropdownOpen(!isAvatarDropdownOpen);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={toggleSidebar}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-[#fbf3e9] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="logo-sidebar"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                />
                                </svg>
                            </button>
                            <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                                <img
                                    src={'/catstagram.png'}
                                    className="h-10 me-3"
                                    alt="FlowBite Logo"
                                />
                            </a>
                        </div>

                        <div className="relative flex items-center">
                            <button 
                                onClick={toggleAvatarDropdown} 
                                id="dropdownUserAvatarButton" 
                                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                                type="button"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img 
                                    className="w-8 h-8 rounded-full" 
                                    src={'/profiles/profile3.jpg'} 
                                    alt="user photo" 
                                />
                            </button>
                
                            {isAvatarDropdownOpen && (
                                <div 
                                    id="dropdownAvatar" 
                                    className="absolute right-6 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                    style={{ top: '100%' }} 
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>{user?.name || "Guest"}</div>
                                        <div className="font-medium truncate">{user?.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-[#fbf3e9] dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-[#fbf3e9] dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-[#fbf3e9] dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                        </li>
                                    </ul>
                                    <div onClick={ handleSignOut} className="py-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fbf3e9] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                    className={`fixed top-0 left-0 z-40 w-80 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#fbf3e9] dark:hover:bg-gray-700 group"
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 512 512" fill="#6B7280" stroke="#6B7280" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path className="st0" d="M191.4,164.127c29.081-9.964,44.587-41.618,34.622-70.699c-9.952-29.072-41.6-44.592-70.686-34.626c-29.082,9.956-44.588,41.608-34.632,70.69C130.665,158.582,162.314,174.075,191.4,164.127z"></path>
                                            <path className="st0" d="M102.394,250.767c16.706-25.815,9.316-60.286-16.484-76.986c-25.81-16.691-60.273-9.316-76.978,16.489c-16.695,25.805-9.306,60.268,16.495,76.958C51.236,283.957,85.694,276.573,102.394,250.767z"></path>
                                            <path className="st0" d="M320.6,164.127c29.086,9.948,60.734-5.545,70.695-34.636c9.956-29.081-5.55-60.734-34.631-70.69c-29.086-9.966-60.734,5.555-70.686,34.626C276.013,122.509,291.519,154.163,320.6,164.127z"></path>
                                            <path className="st0" d="M256,191.489c-87.976,0-185.048,121.816-156.946,208.493c27.132,83.684,111.901,49.195,156.946,49.195c45.045,0,129.813,34.489,156.945-49.195C441.048,313.305,343.976,191.489,256,191.489z"></path>
                                            <path className="st0" d="M503.068,190.289c-16.705-25.805-51.166-33.18-76.976-16.489c-25.801,16.7-33.19,51.171-16.486,76.986c16.7,25.806,51.158,33.19,76.968,16.481C512.374,250.557,519.764,216.095,503.068,190.289z"></path>
                                        </g>
                                    </svg>
                                    <span className="ms-3">Home</span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#fbf3e9] dark:hover:bg-gray-700 group"
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="ms-3">Search</span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#fbf3e9] dark:hover:bg-gray-700 group"
                                >
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="ms-3">Notification</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                
            <div className='h-16'></div>
        </>
    );
};

export default Navbar;
