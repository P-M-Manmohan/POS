import { useState , useEffect} from "react";
import  { renderToString } from "react-dom/server";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditableField from './EditableField.jsx';
import rupee from '../assets/images/rupee.png';
import Invoice from './invoice.jsx';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

const addPrice = (id,name, stock, unit) => {
    const price = priceRow(stock, parseInt(unit,10));
    return {id, name, stock, unit, price};
}

function createRow(id, name, stock, unit) {
  //const price = priceRow(stock, parseInt(unit,10));
  //return { id, name, stock, unit, price };
  return { id, name, stock, unit };
}

function subtotal(items) {
  return items != null ? Object.values(items).map(({ price }) => price).reduce((sum, i) => sum + i, 0) : 0;
}



export default function SpanningTable({ taxRate,discount,products, setProducts } ) {
    
    const[select, setSelect] = useState(null);
    const [visible, setVisible] = useState(false);
    const[id, setId] = useState(null);
    const[name, setName] = useState(null);
    const [result, setResult] = useState(null);
    const [details, setDetails] = useState(null);
    const [length, setLength] = useState(null);
    const [invoice, setInvoice] =useState(false);

    const searchid = async () => {
        try {
            const result = await fetch(`http://localhost:8080/searchid/${id}`,{
                method : "POST",
            });
            
            if( result.status ==200 ){
                setResult( await result.json());
            }
        }
        catch (Err){
                console.error(Err);
        }
    }

    const searchname = async () => {
        try {
            const result = await fetch(`http://localhost:8080/searchname/${name}`,{
                method: "POST",
            });
            
            if( result.status == 200 ){
                setResult( await result.json());
            }
            else{
                console.log("error");
            }

        }
        catch (Err){
             console.error(Err);
        }
    }

        const getProducts = async (record) =>{
            const row=addPrice(record.id, record.name, record.stock, record.unit)
            setProducts(products => ({
                ...products,
                [row.id] : row
            }));
            setSelect(null)
    }
    // Log the updated products after state change and re-render
    //
    const addToList = (field) => {
        setSelect(createRow(field.id,field.name,field.stock,field.price));
    }


    useEffect(() => {
        if (id != null && id != "")
            searchid();
        if (id == "")
            setId(null)
    },[id])

    useEffect(() => {
        if (name != null && name != "")
            searchname();
        if (name == "")
            setName(null)

    },[name])


    const invoiceSubtotal = subtotal(products);
    const invoiceTaxes = taxRate * invoiceSubtotal /100;
    var invoiceTotal;
    if ( discount < invoiceSubtotal ) {
        invoiceTotal = invoiceTaxes + invoiceSubtotal - discount 
    }else{
        invoiceTotal =  invoiceTaxes + invoiceSubtotal;
    }

    const renameFields = (items) => {
  return Object.fromEntries(
    Object.entries(items).map(([key, value]) => {
      const { unit, stock, name, id, price } = value;
      return [
        key,
        { price: price, name: name, id: id, unit_price: unit, quantity: stock }, // Rename fields
      ];
    })
  );
};

const makeNull = () => {
    
    setSelect(null);
    setVisible(false);
    setId(null);
    setName(null);
    setResult(null);
    setDetails(null);
    setProducts(null);
    setLength(null);
    setInvoice(false);
     

}
useEffect(() => {
  const ipcRenderer = window.electronAPI?.ipcRenderer;
  if (ipcRenderer) {
    ipcRenderer.on('some-event', (data) => {
      console.log('Data received:', data);
    });
  }else{
    console.log("not loading");
  }
}, []);

    const printInvoice = () => {
        const htmlContent = renderToString(<Invoice data={details}/>);

        window.electronAPI.ipcRenderer.send('print-invoice',htmlContent);
    };

    const checkout = async () => {

        const data={
            "date_time" : new Date().toISOString(),
            "items" : Object.values(renameFields(products)),
            "discount": discount,
            "tax_rate" : taxRate,
            "tax": invoiceTaxes,
            "sub_total": invoiceSubtotal,
            "total": invoiceTotal
        };

        try {
            const result = await fetch(`http://localhost:8080/invoice`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            
            if( result.status == 200 ){
                console.log("success")
                makeNull();
                setDetails(data);
                setInvoice(true);
            }
            else{
                console.log("erro");
            }

        }
        catch (Err){
             console.error(Err);
        }
}

    useEffect(()=>{
        if (invoice){
        printInvoice();
        setInvoice(false);}
    }
    ,[invoice]);


  return (
      <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow key="search">
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      { result && visible && result.map((field) => (
          <TableRow key= {field.id} className={result.indexOf(field) == length ? "bg-green-100" : ""} >
          <TableCell> 
          <div onClick = { () => addToList(field)  }>
          {field.id}
          </div>
          </TableCell>
          <TableCell>{field.name}</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">{field.price}</TableCell>
          <TableCell align="right">{field.price}</TableCell>
          </TableRow>
      ))}
      { select ?
            <TableRow key='input' className="bg-blue-100">
              <TableCell>{ select.id }</TableCell>
              <TableCell>{ select.name }</TableCell>
              <TableCell align="right"><EditableField type={'number'} fieldName="qty" setVisible={setVisible} setInput={setName} product={select} setProducts={ getProducts }/></TableCell>
              <TableCell align="right">{select.unit}</TableCell>
              <TableCell align="right">{select.price}</TableCell>
            </TableRow> :
            <TableRow key='input' className="bg-blue-100">
              <TableCell><EditableField type={'number'} fieldName="id" setVisible={setVisible} setInput={setId} product={result} setLength={ setLength } length = { length } addToList={ addToList } className="max-w-5"/></TableCell>
              <TableCell><EditableField type={"text"} fieldName="name" setVisible={setVisible} setInput={setName} product={result} setLength={ setLength } length = { length } addToList={ addToList } /></TableCell>
              <TableCell align="right">{ /*<EditableField type={'number'} fieldName="qty" setVisible={setVisible} setInput={setName} stock={null}/>*/}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
      }
          {products && Object.values(products).map((product) => (
            <TableRow key={product.name}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
              <TableCell align="right">{product.unit}</TableCell>
              <TableCell align="right">{ccyFormat(product.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">{`${(taxRate * 1).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Discount</TableCell>
            <TableCell align="right">{`${discount}`}</TableCell>
            <TableCell align="right">{`-${discount}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      
      <div className='absolute flex flex-1 items-center bg-blue-600 fit-content px-5 py-1 rounded mt-5 right-0 mr-2' onClick={ () => checkout() }>
      <img
      className='h-5 w-5 mr-2'
      src={rupee}
      alt="percentage sign"
      />
      <span className="hidden md:block text-m font-bold "
      >Ceckout</span>
        
      </div>
      { invoice && <Invoice data={details}/> }
      </>
  );
}

