const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-full min-w-full items-center justify-center">
            <h1 className="text-5xl mb-10">Seena <br /> Stores</h1>
            <div>
                <label for="uname"> Username </label>
                <input type="text" id="uname" name="uname"/>
            </div>
            <div>
                <label for="password"> Password </label>
                <input type="password" id="password" name="password"/>
            </div>
            <button> Login </button>
        </div>
    )

}

export default LoginPage
