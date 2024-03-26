import React from 'react';
import {
    Box,
    Card as MuiCard, // Rename Card import to avoid conflicts
    CardContent,
    Typography
} from '@mui/material';

import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const labels = ['Jan 01', "Jan 03", "Jan 05", "Jan 07", "Jan 09", "Jan 11"];

const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'AP',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: [50, 54, 74, 63, 70, 76, 63, 70, 76, 63, 70, 76],
        },
        {
            type: 'bar',
            label: 'AR',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [67, 54, 80, 81, 56, 55, 40, 30, 20, 10, 75, 14],
            borderColor: 'white',
            borderWidth: 2,
        },
    ],
};

function Card({ title, value, color }) {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-left-${color} shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                                {title}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {value}
                            </div>
                        </div>
                        <div className="col-auto">
                            <FontAwesomeIcon icon={faCalendar} size={"2x"} style={{ color: "#dddfeb" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Dashboard() {
    return (
        <>
            <Box mt={3}>
                <MuiCard style={{ backgroundColor: "#f9faff" }}>
                    <CardContent>
                        <Typography mb={5} variant='h5'>
                            AP and AR Balance
                        </Typography>

                        <Chart type='bar' data={data} options={options} />
                    </CardContent>
                </MuiCard>
            </Box>
            <Card title="Your Title" value="Your Value" color="primary" />
        </>
    )
}

export default Dashboard;
