import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import MainPage from "./pages/MainPage"
import React from 'react'


const App = () => {

  //Add new Job
  const addProduct= async (newJob)=>{
    const res= await fetch('/api/products',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(newJob)
    });
    return;
  } 



  const router=createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={ <MainPage /> }>
    </Route>)
  )

  return <RouterProvider router={router} />
}

export default App
