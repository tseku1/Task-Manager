import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Dashboard = () => {
  useUserAuth();

  const {user} = useContext(UserContext);

  return (
    <DashboardLayout>
      {JSON.stringify(user)}
    </DashboardLayout>
  )
};

export default Dashboard;