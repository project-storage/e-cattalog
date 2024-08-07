import React from 'react'
import CardAdmin from './Card/CardAdmin'

const Dashboard = () => {
  return (
    <div className='dashboard-admin'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <CardAdmin />
        </div>
      </section>
    </div>
  )
}

export default Dashboard