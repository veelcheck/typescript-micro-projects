import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFound from './components/PageNotFound.tsx';
import Todo from './components/todo/Todo.tsx';
import SnakeGame from './components/snake/SnakeGame.tsx';
import ParentComponent from './components/childToParent/ParentComponent.tsx';
import HookForm from './components/form/HookForm.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
  {
    path: 'child-to-parent',
    element: <ParentComponent />,
  },
  {
    path: 'hook-form',
    element: <HookForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
