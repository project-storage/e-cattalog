import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import orderService from '../../service/orderService';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutStatusChart = () => {
  const [countProcess, setCountProcess] = useState(0);
  const [countFail, setCountFail] = useState(0);
  const [countPass, setCountPass] = useState(0);
  const [countToCustomer, setCountToCustomer] = useState(0);

  const fetchData = async () => {
    try {
      const [passRes, processRes, failRes, toCustomerRes] = await Promise.all([
        orderService.searchPass(),
        orderService.searchProcess(),
        orderService.searchFail(),
        orderService.searchToCustomer()
      ]);
      setCountPass(passRes.data.data.length);
      setCountProcess(processRes.data.data.length);
      setCountFail(failRes.data.data.length);
      setCountToCustomer(toCustomerRes.data.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const data = {
    labels: ['Approved', 'In Process', 'Rejected', 'Sent to Customer'],
    datasets: [
      {
        label: 'Order Status',
        data: [countPass, countProcess, countFail, countToCustomer],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)'
        ],
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
        text: 'Order Status Distribution'
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value, context) => {
          return value;
        }
      }
    }
  };

  return (
    <div className="card p-2">
      <Doughnut className='w-100 h-100' data={data} options={options} />
    </div>
  );
};

export default DoughnutStatusChart;
