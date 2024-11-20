import add from '../assets/images/plus.png';
import rupee from '../assets/images/rupee.png';
import box from '../assets/images/box.png';
import percentage from '../assets/images/percentage.png';
import { NavLink } from 'react-router-dom';
import ColorTabs from './Tabs.jsx';

const Navbar = () => {
  
  const linkClass=({isActive})=>
    isActive?
    'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':
    'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

  return (
      <>
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-0.5 max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start space-x-2"
          >


      {/* The add button */}

      <div className='flex flex-col items-center border-r-2 border-black h-15'>   
            <NavLink className="flex flex-col flex-shrink-0 items-center mr-4" to="/">
            <img
                className="h-9 w-9"
                src={add}
                alt="add sign"
              />
              <span className="hidden md:block text-white text-l font-bold "
                >Add</span>
            </NavLink>
      </div>


      <div className='flex flex-col items-start border-r-2 border-black h-15'>

    <div className='flex flex-1 items-center mr-2 border-b-2 border-black w-20'>
            <img
            className='h-3 w-3 mr-2'
            src={percentage}
            alt="percentage sign"
      />
              <span className="hidden md:block text-white text-l font-bold "
                >Taxes</span>
      </div>

    <div className='Inventory flex flex-1 items-center mr-2'
        onClick={()=> document.getElementById('modal1').showModal()}
      >
            <img
            className='h-3 w-3 mr-2'
            src={box}
            alt="percentage sign"
      />
              <span className="hidden md:block text-white text-l font-bold "
                >Inventory</span>

    </div>
        

      </div>
      <div className='flex flex-1 items-center mr-2'>
      <img
      className='h-5 w-5 mr-2'
      src={rupee}
      alt="percentage sign"
      />
      <span className="hidden md:block text-white text-l font-bold "
      >Ceckout</span>

      </div>

            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Day End
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
      <ColorTabs></ColorTabs>
      </>
  )
}

export default Navbar
