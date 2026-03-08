import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import DonationDetail from './screens/DonationDetail';
import ManagementDashboard from './screens/ManagementDashboard';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaign/:id" element={<DonationDetail />} />
            <Route path="/manage" element={<ManagementDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default App;
