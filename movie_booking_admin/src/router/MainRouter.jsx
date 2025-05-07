import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Applayout } from "../components/Applayout";
import { ErrorPage } from "../components/ErrorPage";
import { Category } from "../components/Category";
import { ManageMovie } from "../components/ManageMovie";
import { AllMovies } from "../components/AllMovies";
import { Booking } from "../components/Booking";
import { Login } from "../components/Login";
import { useContext } from "react";
import { AuthStore } from "../store/AuthProvider";

export function MainRouter(){
    const {userData}=useContext(AuthStore)
     const isLoggedIn=Object.values(userData).length>0;

 const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },{ 
    path:"/",
    element:isLoggedIn?<Applayout/>:<Login/>,
    errorElement:<ErrorPage/>,
    children:[

          { path:"manage-category",
           element:<Category/> 
          },
          {
            path:"manage-movie",
            element:<ManageMovie/>
          },
          {
            path:"all-movies",
            element:<AllMovies/>
          },
          {
            path:"manage-showtime",
            element:<AllMovies/>
          },
          {
            path:"manage-booking",
            element:<Booking/>
          }

    ]
    

 }


])


 return <RouterProvider router={router}></RouterProvider>

}

