import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SideBar = () => {
    return (
        <div className="hidden lg:block w-1/5 bg-white border-l border-gray-200 fixed right-0 top-0 h-screen overflow-y-auto">
            <div className="pt-20">
                <div className='px-5'>
                    <p className='font-semibold text-xl pb-2'>Suggestions for you</p>

                    <div className='flex w-full'>
                        <div className="w-1/5 p-2 flex items-center justify-center">
                            <img className="w-14 h-14 rounded-full" src={'/profiles/profile2.jpg'} alt="Rounded avatar" />
                        </div>
                        <div className="w-4/5 flex items-center h-16">
                            <p className="font-semibold text-start">Cat Noodles</p>
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className="w-1/5 p-2 flex items-center justify-center">
                            <img className="w-14 h-14 rounded-full" src={'/profiles/profile3.jpg'} alt="Rounded avatar" />
                        </div>
                        <div className="w-4/5 flex items-center h-16">
                            <p className="font-semibold text-start">Orea Cruz</p>
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className="w-1/5 p-2 flex items-center justify-center">
                            <img className="w-14 h-14 rounded-full" src={'/profiles/profile4.jpg'} alt="Rounded avatar" />
                        </div>
                        <div className="w-4/5 flex items-center h-16">
                            <p className="font-semibold text-start">Peanut Butter</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className='px-5 pt-5'>
                <p className='font-semibold text-xl pb-2'>Friends</p>

                <div className='flex w-full'>
                    <div className="w-1/5 p-2 flex items-center justify-center">
                        <img className="w-14 h-14 rounded-full" src={'/profiles/profile5.jpg'} alt="Rounded avatar" />
                    </div>
                    <div className="w-4/5 flex items-center h-16">
                        <p className="font-semibold text-start">Cat Noodles</p>
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className="w-1/5 p-2 flex items-center justify-center">
                        <img className="w-14 h-14 rounded-full" src={'/profiles/profile6.jpg'} alt="Rounded avatar" />
                    </div>
                    <div className="w-4/5 flex items-center h-16">
                        <p className="font-semibold text-start">Orea Cruz</p>
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className="w-1/5 p-2 flex items-center justify-center">
                        <img className="w-14 h-14 rounded-full" src={'/profiles/profile7.jpg'} alt="Rounded avatar" />
                    </div>
                    <div className="w-4/5 flex items-center h-16">
                        <p className="font-semibold text-start">Peanut Butter</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SideBar;
