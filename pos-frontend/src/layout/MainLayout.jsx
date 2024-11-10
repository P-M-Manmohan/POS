import { Outlet } from 'react-router-dom'
import 'react-toastify/ReactToastify.css'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default MainLayout
