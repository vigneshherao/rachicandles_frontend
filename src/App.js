import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Shop from "./components/Shop";
import About from "./components/About";

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
