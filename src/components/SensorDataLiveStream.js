//Assignment B
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorDataLiveStreamChart from './SensorDataLiveStreamChart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SensorDataLiveStream = () => {
    const [sensorData, setSensorData] = useState({
        Velocity: 0,
        Altitude: 0,
        Temperature: 0,
        StatusMessage: '',
        IsAscending: false,
        IsActionRequired: false,
    });
    const [chartData, setChartData] = useState({
        velocity: [],
        temperature: [],
        altitude: [],
        timestamps: [],
    });

    const establishWebSocket = () => {
        const socket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS');

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setSensorData(response);

            const newData = {
                timestamp: new Date().toLocaleTimeString(),
                velocity: response.Velocity,
                temperature: response.Temperature,
                altitude: response.Altitude,
            };

            setChartData((prevData) => ({
                velocity: [...prevData.velocity, newData.velocity],
                temperature: [...prevData.temperature, newData.temperature],
                altitude: [...prevData.altitude, newData.altitude],
                timestamps: [...prevData.timestamps, newData.timestamp],
            }));

            if (response.IsActionRequired) {
                socket.close();
                showToast();
            }
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            socket.close();
        };
    }

    useEffect(() => {
        establishWebSocket()
    }, []);

    const showToast = () => {
        toast.error(
            <div>
                <p className='p-2 text-2xl text-[#C80815]'>Critical status change! Action required.</p>
                <div className='flex justify-center'>
                    <button className='m-4 p-2 shadow-2xl rounded-full bg-[#F0ECE5] text-[#31304D]' onClick={() => handleUserAction('take-action')}>Take Action</button>
                    <button className='m-4 p-2 shadow-2xl rounded-full bg-[#F0ECE5] text-[#31304D]' onClick={() => handleUserAction('ignore')}>Ignore</button>
                </div>
            </div>,
            {
                toastId: 'criticalAlert',
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
                position: toast.POSITION.TOP_CENTER,
            }
        );
    }

    const handleUserAction = (actionName) => {
        if (actionName !== 'ignore') {
            axios.get('https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum', {
            }).then((response) => {
                establishWebSocket();
            }).catch((error) => {
                console.error('Error:', error);
            });
        } else {
            establishWebSocket();
        } toast.dismiss();
    };

    return (
        <div className='p-4 font-bold text-[#F0ECE5] w-full'>
            <h1 className='text-2xl'>Sensor Data - Live Stream</h1>
            <div className='py-10 text-lg'>
                <p className='flex justify-between p-2 border-b'>
                    <p>Velocity:</p>
                    <p>{sensorData.Velocity}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Altitude:</p>
                    <p>{sensorData.Altitude}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Temperature:</p>
                    <p>{sensorData.Temperature}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Status:</p>
                    <p>{sensorData.StatusMessage}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Ascending:</p>
                    <p>{sensorData.IsAscending ? 'Yes' : 'No'}</p>
                </p>
                <p className='flex justify-between p-2 border-b'>
                    <p>Action Required:</p>
                    <p>{sensorData.IsActionRequired ? 'Yes' : 'No'}</p>
                </p>
            </div>
            <ToastContainer />

            <SensorDataLiveStreamChart data={chartData} />
        </div>
    );
};

export default SensorDataLiveStream;
