
const Login = ({ setDayStart }) => { 
    return (
        <>
    <div className="flex flex-col bg-blue-500 place-content-center items-center h-full absolute w-full" >
        <h1 className="text-5xl font-serif p-5" >Seena Stores</h1>
        <button className="h-fit w-fit p-3 bg-slate-900 rounded text-slate-100" onClick={ () => { setDayStart(true) }} >Start Day</button>

    </div>
        </>
    )
}   

export default Login;
