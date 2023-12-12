import React from 'react';
import { Line } from 'react-chartjs-2';

const SensorDataLiveStreamChart = ({ data }) => {
    const { velocity, temperature, altitude, timestamps } = data;
    const chartData = {
        labels: timestamps,
        datasets: [
            {
                label: 'Velocity',
                yAxisID: 'y-axis-1',
                data: velocity,
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Altitude',
                yAxisID: 'y-axis-2',
                data: altitude,
                borderColor: 'red',
                fill: false,
            },
            {
                label: 'Temperature',
                yAxisID: 'y-axis-3',
                data: temperature,
                borderColor: 'green',
                fill: false,
            },
        ],
    };

    const chartOptions = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: true,
                    },
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: true,
                    },
                },
                {
                    id: 'y-axis-3',
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false,
                    },
                },
            ],
        },
    };

    return (
        <div className='bg-[#FFFFFF]'>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default SensorDataLiveStreamChart;
