import Form from '../../../Form/index';
import { useRef, useState } from 'react';
import type { FormRefType } from '../../../Form/Form';

function Register(props:{hendleRegister: (value: boolean) => void}) {
    const {hendleRegister} =props;
     const initialValues = { avator:'', loginId: '', password: '', agree: false };
    
    const FormRef = useRef<FormRefType>(null);
    const onFinish = () => {
        alert('注册成功！！');
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    };

    const onFinishFailed = (error: string) => {
        alert(error);
    };

    const handleCancer = ()=>{
        hendleRegister(false);
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    };

    return (
        <div className='register-wrapper'>
            <div className='close' onClick={handleCancer}>X</div>
            <div style={{fontWeight:'900',fontSize:'30px'}}>注册</div>
            <Form ref={FormRef} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
                    <div className='register-form'>
                        <div style={{height: '50px'}}>
                        <Form.Item label='头像' name='avator' 
                            rules={[{ type: 'string', required: true, message: '用户头像不能为空'},
                            ]}>
                            <div className="avator"></div>
                        </Form.Item></div>
                        <Form.Item label='用户名' name='userName'
                            rules={[{ type: 'string', required: true, message: '用户名不能为空'},
                            { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,10}$/, message: '用户名必须4-10位，以字母开头，仅支持字母、数字、下划线' }
                            ]}>
                            <input></input>
                        </Form.Item>
                        <Form.Item label='账号' name='loginId'
                            rules={[{ type: 'string', required: true, message: '账号不能为空'},
                            { pattern: /^\d{6,12}$/, message: '账号必须6-12位，仅支持数字' }
                            ]}>
                            <input></input>
                        </Form.Item>
                        <Form.Item label='密码' name='password'
                            rules={[{ type: 'string', required: true, message: '密码不能为空' },
                            { pattern: /^(?=.*[a-z])(?=.*[A-Z]) [a-zA-Z\d]{6,11}$/, message: '密码必须6-12位，同时包含大写字母、小写字母、数字' }
                            ]}>
                            <input></input>
                        </Form.Item>
                    </div>

                    <div className='register-btn'>
                        <button type='submit' style={{ cursor: 'pointer' }}>注册</button>
                        <button type="button" style={{ cursor: 'pointer' }} onClick={handleCancer}>取消</button>
                    </div>

             </Form>
        </div>
    )
}

export default Register