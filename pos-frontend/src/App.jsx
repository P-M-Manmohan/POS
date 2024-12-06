import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import Login from "./pages/login";
import { useState } from 'react';

const App = () => {
    
    const [ dayStart,setDayStart ] = useState(false);

  const router=createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={ dayStart ? <MainPage setDayStart={ setDayStart } /> : <Login setDayStart={setDayStart}/>}>
    </Route>)
  )

  return <RouterProvider router={router} />
}

export default App
