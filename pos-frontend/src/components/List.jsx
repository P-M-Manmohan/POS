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

function createData(id, name , stock , price) {
  return { id, name, stock , price };
}


export default function CustomizedTables( {count, setCount}) {
    
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null);
    const [products, setProducts] = useState(null);

    const getProducts = async () => {
    try{
        const result = await fetch('http://localhost:8080/product');
        const json = await result.json();


        const rows = json.map(product => createData(product.id, product.name,product.stock,product.price));

        if (count == 0){
            setCount(rows.length);
        }
        setProducts(rows);
    }catch(Err){
        console.log(Err);
    }
    }

    useEffect( () => {
     getProducts();
    },[count] )
    
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
                { row.id }
              </button>
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.stock}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      { modal && <UpdateModal setModal={setModal} data={data} mode={'Update'} count={count} setCount={setCount} /> }
    </>
  );
}

