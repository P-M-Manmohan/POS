import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import UpdateModal from './UpdateModal.jsx'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, name , stock ,cost, price) {
  return { id, name, stock ,cost, price };
}


export default function CustomizedTables( {count, setCount, update, setUpdate}) {
    
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null);
    const [products, setProducts] = useState(null);

    const getProducts = async () => {
    try{
        const result = await fetch('http://localhost:8080/product');
        const json = await result.json();
    
        console.log("products",json);

        const rows = json.map(product => createData(product.id, product.name,product.stock,product.cost,product.price));

        setProducts(rows);
    }catch(Err){
        console.log(Err);
    }
    }

    useEffect( () =>{
        console.log(update);
    if(update || products == null){
        getProducts();
        setUpdate(false);
    }},[update] )
    

    
  return (
    <> 
    <TableContainer component={Paper} className='h-80'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Stock</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { products!=null && products.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" >
              <button id={row.id} className='justify-self-center h-max' onClick={ () => { setModal(true); setData(row)} }>
                <div className={`${row.stock<5 ? "text-red-500 font-bold" : ""}`}>{row.id}</div>
              </button>
              </StyledTableCell>
              <StyledTableCell align="left"><div className={`${row.stock<5 ? "text-red-500 font-bold" : ""}`}>{row.name}</div></StyledTableCell>
              <StyledTableCell align="left"><div className={`${row.stock<5 ? "text-red-500 font-bold" : ""}`}>{row.stock}</div></StyledTableCell>
              <StyledTableCell align="left"><div className={`${row.stock<5 ? "text-red-500 font-bold" : ""}`}>{row.price}</div></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      { modal && <UpdateModal setModal={setModal} data={data} mode={'Update'} count={count} setCount={setCount} /> }
    </>
  );
}

