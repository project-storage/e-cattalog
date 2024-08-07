import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import orderService from '../../service/orderService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const [salesData, setSalesData] = useState({ labels: [], data: [] });

    const fetchSalesData = async () => {
        try {
            const res = await orderService.searchToCustomer();
            const fetchedRecords = res.data.data;

            // Group sales data by salesperson
            const salesByPerson = fetchedRecords.reduce((acc, record) => {
                const { title, firstName, lastName } = record.sale;
                const salesperson = `${title}${firstName} ${lastName}`;

                if (!acc[salesperson]) {
                    acc[salesperson] = 0;
                }
                acc[salesperson] += record.totalPrice;
                return acc;
            }, {});

            // Prepare data for the chart
            const labels = Object.keys(salesByPerson);
            const data = Object.values(salesByPerson);

            setSalesData({ labels, data });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    const chartData = {
        labels: salesData.labels,
        datasets: [
            {
                label: 'ยอดขาย',
                data: salesData.data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'ยอดขายของ Sale แต่ละคน'
            }
        }
    };

    return (
        <div className="card p-2">
            <Bar className='w-100 h-100' data={chartData} options={options} />
        </div>
    );
}

export default BarChart;
