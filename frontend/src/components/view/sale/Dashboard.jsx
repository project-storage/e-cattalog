import React from 'react'
import CardSale from '../../sale/CardSale'
import ChartSale from '../../sale/ChartSale'
const Dashboard = () => {
  return (
    <div className="container mt-2">
      <CardSale />
      <ChartSale />
    </div>
  )
}

export default Dashboard