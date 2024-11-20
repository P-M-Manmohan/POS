import { useState , useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditableField from './EditableField.jsx';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, name, stock, unit) {
  const price = priceRow(stock, parseInt(unit,10));
  return { id, name, stock, unit, price };
}

function subtotal(items) {
  return items != null ? items.map(({ price }) => price).reduce((sum, i) => sum + i, 0) : 0;
}


export default function SpanningTable() {

    const[products, setProducts] = useState(null);

    const getProducts = async () =>{
        try {
            const result = await fetch(
                `http://localhost:8080/product`
            );
            const json = await result.json();
            const records = json.map(product => createRow(product.id, product.name, product.stock, product.price));
            setProducts(records);
            //console.log(products);
        } catch (Err){
            console.log(Err);
        }
    }
    // Log the updated products after state change and re-render

    useEffect(() => {
        getProducts();
    },[]);

    const invoiceSubtotal = subtotal(products);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key='input'>
              <TableCell><EditableField type={'number'} className='max-w-5'/></TableCell>
              <TableCell><EditableField type={"text"}/></TableCell>
              <TableCell align="right"><EditableField type={'number'}/></TableCell>
              <TableCell align="right"><EditableField type={ 'number' }/></TableCell>
              <TableCell align="right"><EditableField type={ 'number' }/></TableCell>
            </TableRow>
          {products && products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
              <TableCell align="right">{product.unit}</TableCell>
              <TableCell align="right">{ccyFormat(product.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

