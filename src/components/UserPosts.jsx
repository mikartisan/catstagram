import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const UserPosts = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null); // Store user data
    const [posts, setPosts] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                const sessionUser = data.session.user;
                setUser(sessionUser);

                // Fetch user details
                const { data: userData, error } = await supabase
                    .from('users')
                    .select('username, first_name, last_name')
                    .eq('user_id', sessionUser.id)
                    .single();

                if (error) {
                    console.error("Error fetching user data:", error);
                } else {
                    setUserData(userData);
                }

                // Fetch posts
                fetchUserPosts(sessionUser.id);
            } else {
                navigate('/');
            }
        };

        checkUserSession();
    }, [navigate]);

    const fetchUserPosts = async (userId) => {
        const { data, error } = await supabase
            .from('posts')
            .select('text, image_url')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data);
            fetchImages(data); // Fetch images once posts are loaded
        }
    };

    const fetchImages = async (posts) => {
        const urls = {}; // Temporary object to hold URLs
        for (const post of posts) {
            if (post.image_url) {
                const imageUrl = await getImageUrl(post.image_url);
                urls[post.image_url] = imageUrl; // Store the URL by the image path
            }
        }
        setImageUrls(urls); // Set all the image URLs at once
        setLoading(false);
    };
    

    const getImageUrl = async (imagePath) => {
        try {
            const fullImagePath = `${imagePath}`;
    
            const { data, error } = await supabase
                .storage
                .from('catstagram')
                .createSignedUrl(fullImagePath, 60); 
    
            if (error) {
                console.error('Error generating signed URL:', error);
                return '';
            }

            return data.signedUrl; 
        } catch (error) {
            console.error('Catch block error:', error);
            return '';
        }
    };
    

    if (loading) {
        // Skeleton loader while data is loading
        return (
            <div>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex bg-white rounded-lg mt-4 md:mx-auto animate-pulse">
                        <div className="flex items-start px-4 py-6 w-full">
                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-4 shadow"></div>
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                                </div>
                                <div className="pt-2">
                                    <div className="w-full h-[18rem] bg-gray-300 rounded-md flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-3 w-3/4 h-4 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className="flex bg-white rounded-lg mt-4 md:mx-auto">
                    <div className="flex items-start px-4 py-6 w-full">
                        <img className="w-10 h-10 rounded-full object-cover mr-4 shadow" src={'profiles/profile1.jpg'} alt="avatar" />
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 -mt-1">{userData?.username}</h2>
                                <small className="text-sm text-gray-700">4h ago</small>
                            </div>
                            <div className='pt-2'>
                                {post.image_url && imageUrls[post.image_url] && (
                                    <img
                                        className="rounded-md bg-cover w-full h-[18rem] sm:h-[20rem] md:h-[25rem] lg:h-[25rem] xl:h-[29rem]"
                                        src={imageUrls[post.image_url]} // Use the fetched URL
                                        alt="User Post"
                                    />
                                )}
                            </div>
                            <p className="mt-3 text-gray-700 text-sm text-left">
                                {post.text}
                            </p>
                            <div className="mt-4 flex items-center">
                                <div className="flex mr-2 text-gray-700 text-sm mr-3">
                                    <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                        </svg>
                                    <span>13</span>
                                </div>
                                <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                    </svg>
                                    <span>2</span>
                                </div>
                                <div className="flex mr-2 text-gray-700 text-sm mr-4">
                                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                        </svg>
                                    <span>share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserPosts;
