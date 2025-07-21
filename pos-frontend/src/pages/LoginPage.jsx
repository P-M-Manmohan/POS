import { useState } from 'react';

const LoginPage = () => {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');

    const login = async() => {
        try{
            const userData = {
                "username":uname,
                "password": password
            }
            console.log(userData)
            const result = await fetch(`${import.meta.env.REACT_APP_SERVERURL}/login`,{
                mode:"cors",
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(userData),
            })
            console.log(result)
        }
        catch(Err){
            console.log(Err);
        }
    }
    return (
        <div className="flex flex-col min-h-full min-w-full items-center justify-center">
            <h1 className="text-5xl mb-10">Seena <br /> Stores</h1>
            <div>
                <label for="uname"> Username </label>
                <input type="text" id="uname" name="uname" value={uname} onChange={e => setUname(e.target.value)}/>
            </div>
            <div>
                <label for="password"> Password </label>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button onClick={() => login()}> Login </button>
        </div>
    )

}

export default LoginPage
