import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Stories = () => {
    return (
        <div className="w-full 2xl:w-1/3 mx-auto p-4">
            <p className="text-left font-bold text-2xl mb-4">Stories</p>
            
            {/* Add overflow-x-auto for scrolling and hide scrollbar using custom CSS */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#f0cea8] via-[#ecc293] to-[#e4aa67] flex items-center justify-center">
                        <div className="w-full h-full rounded-full border-4 border-white bg-white flex items-center justify-center">
                            <img className='w-8 h-8' src={'/public/icons/plus-icon.svg'} alt="" />
                        </div>
                    </div>
                    <p className="text-center mt-2">Add Story</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#f0cea8] via-[#ecc293] to-[#e4aa67]">
                        <img className="w-full h-full rounded-full border-4 border-white" src={'/profiles/profile2.jpg'} alt="Rounded avatar" />
                    </div>
                    <p className="text-center mt-2">John</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#f0cea8] via-[#ecc293] to-[#e4aa67]">
                        <img className="w-full h-full rounded-full border-4 border-white" src={'/profiles/profile3.jpg'} alt="Rounded avatar" />
                    </div>
                    <p className="text-center mt-2">Emily</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#f0cea8] via-[#ecc293] to-[#e4aa67]">
                        <img className="w-full h-full rounded-full border-4 border-white" src={'/profiles/profile4.jpg'} alt="Rounded avatar" />
                    </div>
                    <p className="text-center mt-2">Michael</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-r from-[#f0cea8] via-[#ecc293] to-[#e4aa67]">
                        <img className="w-full h-full rounded-full border-4 border-white" src={'/profiles/profile5.jpg'} alt="Rounded avatar" />
                    </div>
                    <p className="text-center mt-2">Sarah</p>
                </div>
            </div>
        </div>
    );
};

export default Stories;
