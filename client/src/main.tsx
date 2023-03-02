import React from 'react'
import ReactDOM from 'react-dom/client'
import Demo from './Demo'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Card from './Card';
import Quiz from './Quiz';
import Intro from './Intro';
import Userpage from './Userpage';
import store from './app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path:'/demo',
    element: <Demo />
  },
  {
    path: ":username/topics/:topicId",
    element: <Card />,
  },
  {
    path: ":username/topics/:topicId/quiz",
    element: <Quiz />,
  },
  {
    path: "/:name",
    element: <Userpage />,
  }
]);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
