import React from 'react'
import CardSale from '../../sale/CardSale'
import LineChart from '../../sale/LineChart'
import BarChart from '../../sale/BarChart'
const Dashboard = () => {
  return (
    <div className="p-2">
      <CardSale />
      <div className="row">
        <div className="col-lg-6 ">
          <LineChart />
        </div>
        <div className="col-lg-6 ">
          <BarChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard