import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { New } from "./pages/dashboard/new";
import { Car } from "./pages/car";
import { Layout } from "./components/layout";
import { PrivateRoutes } from "./pages/routes/PrivateRoutes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            {" "}
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <PrivateRoutes>
            {" "}
            <New />
          </PrivateRoutes>
        ),
      },
      {
        path: "/car/:id",
        element: <Car />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export { router };
