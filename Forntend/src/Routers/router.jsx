import React from 'react'
import AddFinancial from '../pages/AddFinancial';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

const router = createBrowserRouter([
    {
        path: '/AddFinancial',
        element: <AddFinancial/>,
    }
])

export default router
