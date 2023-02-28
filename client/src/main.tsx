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
import store from './app/store';
import { Provider } from 'react-redux'

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
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
