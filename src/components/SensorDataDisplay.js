//Assignment A
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorDataDisplay = () => {
    const [sensorData, setSensorData] = useState({
        velocity: 0,
        altitude: 0,
        temperature: 0,
        statusMessage: '',
        isAscending: false,
        isActionRequired: false,
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus');
            setSensorData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='p-4 font-bold text-[#F0ECE5] w-full'>
            <h1 className='text-2xl'>Sensor Data</h1>
            <div className='py-10 text-lg'>
                <p className='flex justify-between p-2 border-b'>
                    <p>Velocity:</p>
                    <p>{sensorData.velocity}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Altitude:</p>
                    <p>{sensorData.altitude}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Temperature:</p>
                    <p>{sensorData.temperature}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Status:</p>
                    <p>{sensorData.statusMessage}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Ascending:</p>
                    <p>{sensorData.isAscending ? 'Yes' : 'No'}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Action Required:</p>
                    <p>{sensorData.isActionRequired ? 'Yes' : 'No'}</p>
                </p>
            </div>
            <button className='p-2 shadow-2xl rounded-full bg-[#F0ECE5] text-[#31304D]' onClick={fetchData}>Refresh Data</button>
        </div>
    );
};

export default SensorDataDisplay;
