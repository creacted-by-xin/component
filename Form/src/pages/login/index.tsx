import { useState } from 'react'
import LoginForm from './LoginForm/Login';
import Register from './Register';
import './index.css'

function App() {
    const [loginRegister, setLoginRegister] = useState(false);

    function hendleRegister(value: boolean){
        setLoginRegister(value)
    };
     
    return (
        <div className='login-img'>
            <div className='form-wrapper'>
                <LoginForm hendleRegister={hendleRegister} />
            </div>

            {loginRegister && <Register hendleRegister={hendleRegister}/>}
        </div>
    )
}

export default App
