import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import orderService from '../../service/orderService'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartSale = () => {
    const [dataValues , setDataValues] = useState([]);
    const dataC = [0,0,0,0,0,0,0,0,0,0,0,0]

    const fetchOrderBySale = async () => {
        try {
            const res = await orderService.searchOrderBySale()
            const fetchedRecords = res.data.data;

            // แปลงวันที่และกรองข้อมูลตามเดือนที่ต้องการ
            const filteredRecords = fetchedRecords.filter(record => {
                const recordDate = new Date(record.date);
                 // แปลงวันที่จาก JSON เป็น Date object
                const currentYear = new Date().getFullYear(); // เดือนปัจจุบัน (0-11)
                return recordDate.getFullYear() === currentYear;
            })
            filteredRecords.map((data) => {
                const recordDate = new Date(data.date);
                const currentMonth = recordDate.getMonth()
                dataC[recordDate.getMonth()] += data.totalPrice
            })
            setDataValues(dataC)
            } catch (error) {
                console.log(error)
            }

        }

    useEffect(() => {
            fetchOrderBySale()
        }, [])


        // ข้อมูลสำหรับกราฟ
        const data = {
            labels: ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],
            datasets: [
                {
                    label: 'ยอดขาย',
                    data: dataValues,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
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
            <div className="d-flex justify-content-center">
                <div style={{ width: "70%" }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        );
    }

    export default ChartSale