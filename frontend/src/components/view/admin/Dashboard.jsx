import React from 'react'
import CardAdmin from '../../admin/CardAdmin'
import LineChart from '../../admin/LineChart'
import DoughnutStatusChart from '../../admin/DoughnutStatusChart'
import BarChart from '../../admin/BarChat'

const Dashboard = () => {
  return (
    <div className='dashboard-admin'>
      <section className="content">
        <div className="container-fluid">
          <CardAdmin />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 col-12">
              <LineChart />
              <BarChart />
            </div>
            <div className="col-lg-5 col-12">
              <DoughnutStatusChart />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard