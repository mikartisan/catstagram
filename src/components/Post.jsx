import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Stories from './Stories';

const Post = () => {
    return (
        <section>
            
            <Stories/>

            <div className="w-full 2xl:w-1/3 mx-auto">
                <div className="flex bg-white rounded-lg mt-4 md:mx-auto">
                    <div className="flex items-start px-4 py-6 w-full">
                        <img className="w-10 h-10 rounded-full object-cover mr-4 shadow" src={'profiles/profile1.jpg'} alt="avatar" />
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 -mt-1">Sushi</h2>
                                <small className="text-sm text-gray-700">4h ago</small>
                            </div>
                            <div className='pt-2'>
                                <img src={'/post/post2.jpg'} alt="Image post" className='rounded-md bg-cover w-full h-[22rem] sm:h-[20rem] md:h-[25rem] lg:h-[25rem] xl:h-[29rem]' />
                            </div>

                            <p className="mt-3 text-gray-700 text-sm text-left">
                                MEOW MEOW
                            </p>
                            <div className="mt-4 flex items-center">
                                <div className="flex mr-2 text-gray-700 text-sm mr-3">
                                    <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                        </svg>
                                    <span>271</span>
                                </div>
                                <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                    <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                    </svg>
                                    <span>79</span>
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
            </div>

            <div className="w-full 2xl:w-1/3 mx-auto">
                <div className="flex bg-white rounded-lg mt-4 md:mx-auto">
                    <div className="flex items-start px-4 py-6 w-full">
                        <img className="w-10 h-10 rounded-full object-cover mr-4 shadow" src={'profiles/profile1.jpg'} alt="avatar" />
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 -mt-1">Bubbles</h2>
                                <small className="text-sm text-gray-700">23h ago</small>
                            </div>
                            <div className='pt-2'>
                                <img src={'/post/post1.jpg'} alt="Image post" className='rounded-md bg-cover w-full h-[22rem] sm:h-[20rem] md:h-[25rem] lg:h-[25rem] xl:h-[29rem]' />
                            </div>

                            <p className="mt-3 text-gray-700 text-sm text-left">
                                Meow meow meow meow
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
            </div>

            

            
        </section>
    );
};

export default Post;
