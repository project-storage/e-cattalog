import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'; // Import PDFViewer
import Dashboard from '../../components/view/sale/Dashboard'
import Pdf from '../../components/sale/Pdf';

const HomePageSale = () => {
  const data = {
    customer: {
      title: 'คุณ',
      firstName: 'เบิร์น',
      lastName: 'เรกเก้',
    },
    products: [
      { id: 1, name: 'สินค้าที่หนึ่ง', qty: 2, price: 100, totalPrice: 200, discount: 10 },
      { id: 2, name: 'สินค้าที่สอง', qty: 1, price: 50, totalPrice: 50, discount: 5 },
    ],
    totalPrice: 250,
  };
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Pdf data={data}/>
    </PDFViewer>
  )
}

export default HomePageSale