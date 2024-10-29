import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Shop from "./components/Shop";

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
