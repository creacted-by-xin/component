import LoginForm from './LoginForm/Login'
import './index.css'

function App() {
    
    return (
        <div className='login-img'>
            <div className='form-wrapper'>
            <div style={{fontWeight:'bold',fontSize:'22px'}}>登录</div>
            <LoginForm />
            </div>
        </div>
    )
}

export default App
