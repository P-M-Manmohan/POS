import List from './List.jsx';
import close from '../assets/images/close.png';
import UpdateModal from './UpdateModal.jsx';
import { useState } from 'react';

const Modal = ({update, setUpdate}) => {

    const [showModal,setShowModal] = useState(false);
    const [count, setCount] = useState(0);

    const handleUpdate = () => {
        setUpdate(true);
    }

    

    return (
        <>
            <dialog id='modal1' className='modal'>
                <div className='modal-box'>
                    <div className="flex justify-between mx-4 font-bold">
                        <h2 className='text-xl' >Inventory</h2>
                        <form method="dialog">     
                            <button className='p-1 rounded transition ease-in-out delay-150 hover:- hover:scale-100 hover:bg-red-600 duration-100'>
                                <img src={close} className="h-3 w-2"/>
                            </button>
                        </form>
                    </div>
                    <List count={count} setCount={handleUpdate} update={update} setUpdate={setUpdate} />
                </div>
                <div className='flex justify-end'>
                    <button className="rounded-md m-2 bg-green-600 px-2 py-0.5" onClick={ () => { setShowModal(true) } }>Add</button>
                </div>
        { showModal && <UpdateModal setModal={setShowModal} data={null} mode={'Add'} count={count} setCount={handleUpdate} /> }
            </dialog>
      </>
  )
}

export default Modal;
