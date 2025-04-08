import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navigation';
import SideBar from '../components/Sidebar';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // To store the selected file
    const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details
        const fetchUserData = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            
            if (sessionData.session) {
                const sessionUser = sessionData.session.user;

                // Fetch user details from users table
                const { data, error } = await supabase
                    .from('users')
                    .select('username, first_name, last_name, gender, address')
                    .eq('user_id', sessionUser.id)
                    .single();

                if (error) {
                    console.error('Error fetching user data:', error);
                } else {
                    setUser(data);
                    setUsername(data.username || '');
                    setFirstName(data.first_name || '');
                    setLastName(data.last_name || '');
                    setGender(data.gender || '');
                    setAddress(data.address || '');
                }
            } else {
                navigate('/'); 
            }
        };
        
        fetchUserData();
    }, [navigate]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }
    
            setSelectedFile(file); // Update selected file
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result); // Set preview
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        const { data: sessionData } = await supabase.auth.getSession();
        const sessionUser = sessionData?.session?.user;
    
        if (sessionUser && selectedFile) {
            try {
                const fileName = `${sessionUser.id}_${Date.now()}_${selectedFile.name}`;
                
                // Explicitly log the bucket name to verify
                console.log('Attempting to upload to bucket:', 'catstagram');
    
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('catstagram')  // Verify this matches exactly
                    .upload(`avatar/${fileName}`, selectedFile, {
                        cacheControl: '3600',
                        upsert: false
                    });
    
                if (uploadError) {
                    console.error('Upload Error Details:', uploadError);
                    setMessage(`Upload failed: ${uploadError.message}`);
                    return;
                }
    
                const { data: publicUrlData, error: urlError } = supabase.storage
                    .from('catstagram')
                    .getPublicUrl(`avatar/${fileName}`);
    
                if (urlError) {
                    console.error('Public URL Error:', urlError);
                    setMessage('Could not generate public URL');
                    return;
                }
    
                console.log('Generated Public URL:', publicUrlData.publicUrl);
                
            } catch (error) {
                console.error('Unexpected error:', error);
                setMessage('An unexpected error occurred');
            }
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
                                    <p className="text-center font-bold text-xl mb-4">Edit Profile</p>

                                    <div className="mb-8">
                                        <div className="relative flex items-center justify-center">
                                            <img
                                                className="w-24 h-24 xl:w-32 xl:h-32 rounded-full ring-4 ring-[#edc597]"
                                                src={imagePreview || 'profiles/profile1.jpg'} // Show preview if available, else default image
                                                alt="Rounded avatar"
                                            />

                                            <button
                                                className="absolute bg-black bg-opacity-50 text-white flex items-center justify-center w-24 h-24 xl:w-32 xl:h-32 rounded-full opacity-100 hover:opacity-40 transition-opacity"
                                                onClick={() => document.getElementById('fileInput').click()}
                                            >
                                                <span className="text-3xl">
                                                    <ion-icon name="camera-outline"></ion-icon>
                                                </span>
                                            </button>
                                            {/* Hidden file input */}
                                            <input
                                                id="fileInput"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e)}
                                            />
                                        </div>
                                    </div>

                                    
                                    {message && (
                                        <div className={`mb-4 text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                            {message}
                                        </div>
                                    )}

                                    <div className="mb-5">
                                        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Username</label>
                                        <input 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                            type="text" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ecc293] focus:border-[#ecc293] block w-full p-2.5" 
                                            placeholder="Username" 
                                            required 
                                        />
                                    </div> 

                                    <div className="mb-5">
                                        <label className="block mb-2 text-left text-sm font-medium text-gray-900">First name</label>
                                        <input 
                                            value={firstName} 
                                            onChange={(e) => setFirstName(e.target.value)} 
                                            type="text" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ecc293] focus:border-[#ecc293] block w-full p-2.5" 
                                            placeholder="First name" 
                                            required 
                                        />
                                    </div> 

                                    <div className="mb-5">
                                        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Last name</label>
                                        <input 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)} 
                                            type="text" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ecc293] focus:border-[#ecc293] block w-full p-2.5" 
                                            placeholder="Last name" 
                                            required 
                                        />
                                    </div> 

                                    <div className="mb-5">
                                        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Email</label>
                                        <input  disabled
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            type="email" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ecc293] focus:border-[#ecc293] block w-full p-2.5" 
                                            placeholder="example@gmail.com" 
                                            required 
                                        />
                                    </div> 

                                    <div className="mb-5">
                                        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Gender</label>
                                        <select 
                                            value={gender} 
                                            onChange={(e) => setGender(e.target.value)} 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ecc293] focus:border-[#ecc293] block w-full p-2.5"
                                        >
                                            <option value="">Choose a gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Metrosexual Male">Metrosexual Male</option>
                                            <option value="Metrosexual Female">Metrosexual Female</option>
                                            <option value="Male, But Curious what Being a Female is like">Male, But Curious what Being a Female is like</option>
                                            <option value="Female, But Curious what Being a Male is like">Female, But Curious what Being a Male is like</option>
                                            <option value="Male, But Overweight So Has Boobs">Male, But Overweight So Has Boobs</option>
                                            <option value="Female, But Have an Adam's Apple">Female, But Have an Adam's Apple</option>
                                            <option value="Hermaphrodite with Predominant Male Leanings">Hermaphrodite with Predominant Male Leanings</option>
                                            <option value="Hermaphrodite with Predominant Female Leanings">Hermaphrodite with Predominant Female Leanings</option>
                                            <option value="Hermaphrodite with No Strong Gender Leanings">Hermaphrodite with No Strong Gender Leanings</option>
                                            <option value="Conjoined Twin - Male">Conjoined Twin - Male</option>
                                            <option value="Conjoined Twin - Female">Conjoined Twin - Female</option>
                                            <option value="Born Without Genitals - Identity as a Male">Born Without Genitals - Identity as a Male</option>
                                            <option value="Born Without Genitals - Identity as a Female">Born Without Genitals - Identity as a Female</option>
                                            <option value="Born Without Genitals - Proud of it">Born Without Genitals - Proud of it</option>
                                            <option value="Born a Male, Bad Circumcision, Raised Female">Born a Male, Bad Circumcision, Raised Female</option>
                                            <option value="Sentient Artificial Intelligence With No Gender">Sentient Artificial Intelligence With No Gender</option>
                                            <option value="Sentient Artificial Intelligence - Identifies as Male">Sentient Artificial Intelligence - Identifies as Male</option>
                                            <option value="Sentient Artificial Intelligence - Identifies as Female">Sentient Artificial Intelligence - Identifies as Female</option>
                                            <option value="Household Pet That Walked Across the Keyboard - Male">Household Pet That Walked Across the Keyboard - Male</option>
                                            <option value="Household Pet That Walked Across the Keyboard - Female">Household Pet That Walked Across the Keyboard - Female</option>
                                            <option value="Attack Helicopter">Attack Helicopter</option>
                                            <option value="Other">Other</option>
                                            <option value="None">None</option>
                                        </select>
                                    </div> 

                                    <div className="mb-5">
                                        <label className="block mb-2 text-left text-sm font-medium text-gray-900">Address</label>
                                        <input 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)} 
                                            type="text" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ecc293] focus:border-[#ecc293] block w-full p-2.5" 
                                            placeholder="Address" 
                                            required 
                                        />
                                    </div> 

                                    <div className='mb-5'>
                                        <button 
                                            type="button" 
                                            onClick={handleSubmit}
                                            className="text-white bg-[#ecc293] hover:bg-[#ad885c] font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                                        >
                                            Submit
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

export default EditProfile;
