import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import MainLayout from "./layout/MainLayout"
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
    <Route path='/' element={ <MainLayout /> }>
    </Route>)
  )

  return <RouterProvider router={router} />
}

export default App
