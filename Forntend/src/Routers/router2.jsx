import React from 'react';
import AddFinancial from '../pages/AddFinancial';
import EditFinancial from '../pages/EditFinancial';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';

const router2 = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/AddFinancial',
        element: <AddFinancial />,
    },
    {
        path: '/EditFinancial/:userId', // เพิ่ม :id เพื่อให้สามารถรับพารามิเตอร์จาก URL
        element: <EditFinancial />,
    }
]);

export default router2;
