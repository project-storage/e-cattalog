import React, { useEffect } from 'react';
import Dashboard from '../../components/view/admin/Dashboard';
import userService from '../../service/userService';
import { useNavigate } from 'react-router-dom';

const HomePageAdmin = () => {
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
    <div>
      <Dashboard />
    </div>
  );
}

export default HomePageAdmin;
