import React, { useEffect } from 'react';
import Dashboard from '../../components/view/admin/Dashboard';
import userService from '../../service/userService';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/loading");
    } else {
      userService.userInfo()
        .then((response) => {
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          // Handle token-related errors and navigate to the appropriate route
          if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            localStorage.removeItem("token");
            navigate("/");
          }
        });
    }
  }, [navigate]);

  return (
    <div className='p-2'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">admin</a></li>
                <li className="breadcrumb-item active">dashboard</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <Dashboard />
    </div>
  );
}

export default DashboardAdmin;
