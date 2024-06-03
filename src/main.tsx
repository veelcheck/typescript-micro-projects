import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFound from './components/PageNotFound.tsx';
import Todo from './components/Todo.tsx';
import SnakeGame from './components/snakeComponents/SnakeGame.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: 'todo',
    element: <Todo />,
  },
  {
    path: 'snake-for-alice',
    element: <SnakeGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
