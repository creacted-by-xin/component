import { useRef } from 'react';
import Form from '../../../Form/index';
import type { FormRefType } from '../../../Form/Form';



function LoginForm(props:{hendleRegister: (value: boolean) => void} ) {
    const {hendleRegister} =props;
    const initialValues = { loginId: '', password: '', agree: false };
    const FormRef = useRef<FormRefType>(null);
    const onFinish = () => {
        alert('登录成功！！');
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    };

    const onFinishFailed = (error: string) => {
        // alert(error);
    };

    const handleReset = () => {
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    };

    const register = ()=>{
        hendleRegister(true)
    }

    return (
        <div className='login-wrapper'>
            <div style={{fontWeight:'800',fontSize:'26px'}}>登录</div>
            <Form ref={FormRef} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
                    <div className='login-form'>
                        <Form.Item label='账号' name='loginId'
                            rules={[{ type: 'string', required: true, message: '账号不能为空'},
                            { pattern: /^\d{6,12}$/, message: '账号必须6-12位，仅支持数字' }
                            ]}>
                            <input></input>
                        </Form.Item>
                        <Form.Item label='密码' name='password'
                            rules={[{ type: 'string', required: true, message: '密码不能为空' },
                            { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/, message: '密码必须6-12位，同时包含大写字母、小写字母、数字' }
                            ]}>
                            <input></input>
                        </Form.Item>
                    </div>

                    <div className='login-btn'>
                        <button type='submit' style={{ cursor: 'pointer' }}>登录</button>
                        <button type="button" style={{ cursor: 'pointer' }} onClick={() => handleReset()}>重置</button>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', justifyContent:'start', alignItems: 'center'}}>
                            
                            <Form.Item name='agree' rules={[{ type: 'boolean', required: true, validator: (rule: any, value: any) => value === true, message: '请阅读协议！' }]}>
                                <input id="readed" type="checkbox" style={{ cursor: 'pointer', marginTop: '15px' }} />
                            </Form.Item>
                            <a style={{ cursor: 'pointer', fontSize: '8px' }}>是否阅读《协议》</a>
                        </div>
                        <a style={{ cursor: 'pointer', fontSize: '8px', marginLeft: 'auto'}} onClick={register}>注册账号</a>
                    </div>
             </Form>
        </div>
    )
}

export default LoginForm 
