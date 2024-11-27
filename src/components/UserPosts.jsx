import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const UserPosts = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [imageUrls, setImageUrls] = useState({}); // Store image URLs here
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
                fetchUserPosts(data.session.user.id);
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
    };
    

    const getImageUrl = async (imagePath) => {
        try {
            const fullImagePath = `${imagePath}`;
    
            const { data, error } = await supabase
                .storage
                .from('catstagram')
                .createSignedUrl(fullImagePath, 60); // URL expires after 60 seconds
    
            if (error) {
                console.error('Error generating signed URL:', error);
                return '';
            }
    
            console.log('Signed URL:', data.signedUrl); // Log the signed URL
            return data.signedUrl; // Correct key is `signedUrl`, not `signedURL`
        } catch (error) {
            console.error('Catch block error:', error);
            return '';
        }
    };
    

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className="flex bg-white rounded-lg mt-4 md:mx-auto">
                    <div className="flex items-start px-4 py-6 w-full">
                        <img className="w-10 h-10 rounded-full object-cover mr-4 shadow" src={'profiles/profile1.jpg'} alt="avatar" />
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 -mt-1">{user?.email}</h2>
                                <small className="text-sm text-gray-700">4h ago</small>
                            </div>
                            <div className='pt-2'>
                                {post.image_url && imageUrls[post.image_url] ? (
                                    <img
                                        className="rounded-md bg-cover w-full h-[18rem] sm:h-[20rem] md:h-[25rem] lg:h-[25rem] xl:h-[29rem]"
                                        src={imageUrls[post.image_url]} // Use the fetched URL
                                        alt="User Post"
                                    />
                                ) : (
                                    <p>...</p> // Placeholder if the URL isn't ready
                                )}
                            </div>
                            <p className="mt-3 text-gray-700 text-sm text-left">
                                {post.text}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserPosts;
