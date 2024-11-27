import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navigation';
import SideBar from '../components/Sidebar';

const Post = () => {
    const [user, setUser] = useState(null);
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async () => {
        if (!text && !imageFile) return; 

        let imageUrl = '';
        
        if (imageFile) {
            const { data, error } = await supabase
                .storage
                .from('catstagram')
                .upload(`posts/${Date.now()}_${imageFile.name}`, imageFile);

            if (error) {
                console.error('Image upload error:', error);
                return;
            }
            imageUrl = data?.path;
            console.log('Image path:', imageUrl);
        }

        const { error: insertError } = await supabase
            .from('posts')
            .insert([
                { text, image_url: imageUrl, user_id: user.id }
            ]);

        if (insertError) {
            console.error('Error saving post:', insertError);
        } else {
            console.log('Post saved successfully');
            setText('');
            setImageFile(null);
            setPreviewUrl(null);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <NavBar/>
                    <div className="relative flex bg-[#fafafa]">
                        <div className="w-full lg:w-4/5 min-h-screen overflow-y-auto">
                            <div className="p-4 sm:ml-80">
                                <div className="w-full 2xl:w-1/3 mx-auto p-4">
                                    <p className="text-left font-bold text-2xl mb-4">Create post</p>
                                    <div className='pb-4'>
                                        <textarea 
                                            id="message" 
                                            rows="4" 
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#ecc293] focus:border-[#ecc293]"
                                            placeholder="What's on your mind?"
                                        ></textarea>
                                    </div>
                                    
                                    {previewUrl ? (
                                        <div className="relative flex justify-center pb-4">
                                            <img src={previewUrl} alt="Preview" className="max-h-64 rounded-md" />
                                            <button 
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-700 focus:outline-none"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">PNG, JPG, or MP4 (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                    )}

                                    <div className='py-4'>
                                        <button 
                                            type="button" 
                                            className="text-white bg-[#ecc293] hover:bg-[#ad885c] font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                                            onClick={handleSubmit}
                                        >
                                            POST
                                        </button>
                                    </div>
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

export default Post;
