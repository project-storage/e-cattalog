import React from 'react'
import CardAdmin from './Card/CardAdmin'

const Dashboard = () => {
  return (
    <div className='dashboard-admin'>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <CardAdmin />

          {/* /.row (main row) */}
        </div>{/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

export default Dashboard