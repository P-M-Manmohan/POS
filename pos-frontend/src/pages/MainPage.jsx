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
    return (
    <>
        <Navbar setTaxUpdate={setTaxUpdate} ></Navbar>
        <Table taxRate={taxRate} discount={discount} products={products} setProducts={setProducts} ></Table>
        { taxUpdate && <TaxUpdateModal taxRate={taxRate} setTaxRate={setTaxRate} discount={discount} setDiscount={setDiscount} setTaxUpdate={setTaxUpdate}/> }
        <Modal></Modal>
    </>
    )
}   

export default MainPage;
