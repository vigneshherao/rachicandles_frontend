import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Shop from "./components/Shop";
import About from "./components/About";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import AdminPanel from "./components/AdminPanel";
import { ToastContainer } from "react-toastify";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/Shop",
          element: <Shop />,
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Product/:ProductId",
          element: <ProductDetails />,
        },
        {
          path: "/Admin",
          element: <AdminPanel />,
        },
      ],
    },
  ]);

  return (
    <div className="w-full h-full bg-[#f3e7d9]">
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </div>
  );
}

export default App;
