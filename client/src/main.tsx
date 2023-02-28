import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Card from './Card';
import Quiz from './Quiz';
import Intro from './Intro';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/demo',
    element: <Intro />
  },
  {
    path: "/topics/:topicId",
    element: <Card />,
  },
  {
    path: "topics/:topicId/quiz",
    element: <Quiz />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
