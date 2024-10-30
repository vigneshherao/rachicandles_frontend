import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Shop from "./components/Shop";
import About from "./components/About";
import Login from "./components/Login";

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
      ],
    },
  ]);

  return (
    <div className="w-full h-full bg-[#f3e7d9]">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
