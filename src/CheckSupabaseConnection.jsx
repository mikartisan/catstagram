import React, { useEffect } from 'react';
import { supabase } from './supabaseClient'; // Adjust the path as necessary

const CheckSupabaseConnection = () => {
    useEffect(() => {
        const checkConnection = async () => {
            const { data, error } = await supabase
                .from('student') // Replace 'student' with a valid table name in your database
                .select('*')
                .limit(1); // Fetch just one record

            if (error) {
                console.error('Error connecting to Supabase:', error.message);
            } else {
                console.log('Connected to Supabase! Data fetched:', data);
            }
        };

        checkConnection();
    }, []);

    return null; // No UI to render
};

export default CheckSupabaseConnection;
