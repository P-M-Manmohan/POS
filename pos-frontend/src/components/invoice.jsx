import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";

const Invoice = ({ data }) => {
        

  return (
    <div className="invoice">
        <div className="flex flex-col items-center">
       <h1 className="text-5xl font-serif"> Seena Stores</h1>
      <h1>Invoice #1</h1>
      <p>Date: {data.date_time}</p>
        </div>
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
            <TableCell>Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.unit_price}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={5} colSpan={2} />
            <TableCell colSpan={1}>Subtotal:</TableCell>
            <TableCell align="right">₹{data.sub_total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax (%): </TableCell>
            <TableCell align="right">{data.tax_rate}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax : </TableCell>
            <TableCell align="right">₹{data.tax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount : </TableCell>
            <TableCell align="right">₹{data.discount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align="right">₹{data.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Invoice;

