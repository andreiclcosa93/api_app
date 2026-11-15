import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import { Layout } from "./components/Layout";

import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { User } from "./pages/User";
import { CreateUser } from "./pages/CreateUser";
import { EditUser } from "./pages/EditUser";
import { About } from "./pages/About";
import { Page404 } from "./pages/Page404";

import './App.scss'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Page404 />,
  
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "user/:id",
        element: <User />
      },
      {
        path: "users/create",
        element: <CreateUser />
      },
      {
        path: "user/:id/edit",
        element: <EditUser />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
