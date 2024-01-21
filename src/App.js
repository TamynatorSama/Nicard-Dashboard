import './App.css';
import Dashboard from './pages/dashboard';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Dashboard />,
      // errorElement: <ErrorPage />,
    },
  ]);
  return (
    <RouterProvider router={router} />

  )
}

export default App;
