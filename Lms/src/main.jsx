// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Error from './component/Error'
import Registration from './component/Registration'
import Login from './component/Login'
import Home from './component/Home'
import { StrictMode } from 'react'


const appRouter=createBrowserRouter([
  {path:'/',
   element:<App/>,
  errorElement:<Error/>,
  children:[
    {
      path:'/userhome',
      element:<Home/>
    },
    {
      path:'/',
      element:<Registration/>
    },
    {
    path:'/register',
    element:<Registration/>
  },
  {
    path:'/login',
    element:<Login/>
  }]
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={appRouter} />
  </StrictMode>
  
  
)
