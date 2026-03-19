import { useState } from 'react'
import LoginForm from './LoginForm/Login';
import Register from './Register';
import './index.css'

function App() {
    const [loginRegister, setLoginRegister] = useState(true)
    return (
        <div className='login-img'>
            <div className='form-wrapper'>
                <div style={{fontWeight:'bold',fontSize:'22px'}}>登录</div>
                <LoginForm />
            </div>

            {loginRegister && <Register/>}
        </div>
    )
}

export default App
