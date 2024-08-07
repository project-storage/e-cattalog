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
    const [dataValues, setDataValues] = useState([]);
    const dataC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const fetchOrderBySale = async () => {
        try {
            const res = await orderService.searchOrderBySale();
            const fetchedRecords = res.data.data;

            // แปลงวันที่และกรองข้อมูลตามเดือนที่ต้องการ
            const filteredRecords = fetchedRecords.filter(record => {
                const recordDate = new Date(record.date);
                const currentYear = new Date().getFullYear();
                return recordDate.getFullYear() === currentYear;
            });
            filteredRecords.forEach((data) => {
                const recordDate = new Date(data.date);
                dataC[recordDate.getMonth()] += data.totalPrice;
            });
            setDataValues(dataC);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrderBySale();
    }, []);

    // สีของแต่ละเดือน
    const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];

    const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    // ข้อมูลสำหรับกราฟ
    const data = {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        datasets: [
            {
                label: 'ยอดขาย',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
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
                text: 'ยอดรวมคำสั่งซื้อ'
            }
        }
    };

    return (
        <div className="card p-2">
            <Bar className='w-100 h-100' data={data} options={options} />
        </div>
    );
}

export default BarChart;
