import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import DepartmentPage from './components/DepartmentPage';
import EmployeeDetailsPage from './components/EmployeeDetailsPage';
import LogoGrid from './components/LogoGrid';
import CameraPage from './components/CameraPage';
import SuccessPage from './components/SuccessPage';
import DatabaseDepartmentPage from './components/DatabaseDepartmentPage';
import { MeetingConfirmationLayout } from './components/MeetingConfirmationLayout';

const router = createBrowserRouter([
    {
        path: '/',
        index: true,
        element: <LogoGrid />,
    },
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '/innovation',
                element: <DepartmentPage />,
            },
            {
                path: 'innovation/:id/employees',
                element: <DatabaseDepartmentPage />,
            },
            {
                path: '/education',
                element: <DepartmentPage />,
            },
            {
                path: '/employee/:id',
                element: <EmployeeDetailsPage />,
            },
            {
                path: '/camera',
                element: <CameraPage />,
            },
            {
                path: '/success',
                element: <SuccessPage />,
            },
        ],
    },
    {
        path: '/orders',
        element: <MeetingConfirmationLayout />,
    },
]);

export default router;
