import Navbar from '../components/Navbar.jsx';
import Table from '../components/Table.jsx'; 
import Modal from '../components/Modal.jsx';
import TaxUpdateModal from '../components/TaxUpdateModal.jsx';
import { useState } from 'react';

const MainPage = () => { 
    const [taxRate,setTaxRate] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [taxUpdate,setTaxUpdate] = useState(false);
    const [products, setProducts] = useState(null);
    const [update, setUpdate] = useState(false);
    return (
    <>
        <Navbar setTaxUpdate={setTaxUpdate} update={update}></Navbar>
        <Table taxRate={taxRate} discount={discount} products={products} setProducts={setProducts} setUpdate={setUpdate} ></Table>
        { taxUpdate && <TaxUpdateModal taxRate={taxRate} setTaxRate={setTaxRate} discount={discount} setDiscount={setDiscount} setTaxUpdate={setTaxUpdate}/> }
        <Modal update={update} setUpdate={setUpdate}></Modal>
    </>
    )
}   

export default MainPage;
