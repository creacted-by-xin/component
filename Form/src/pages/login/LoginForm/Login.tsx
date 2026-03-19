import { useRef } from 'react';
import Form from '../../../Form/index';
import type { FormRefType } from '../../../Form/Form';

function LoginForm() {
    const initialValues = { loginId: '', password: '', agree: false };
    const FormRef = useRef<FormRefType>(null);
    const onFinish = () => {
        alert('登录成功！！');
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    };

    const onFinishFailed = (error: string) => {
        alert(error);
    };

    const handleReset = () => {
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    }

    return (
        <Form ref={FormRef} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
            <div className='login'>
            <Form.Item className={'login-item'}label='账号' name='loginId'
                rules={[{ type: 'string', required: true, message: '账号不能为空'},
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,9}$/, message: '账号必须6-10位，以字母开头，仅支持字母、数字、下划线' }
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
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '150px' }}>
                <button type='submit' style={{ cursor: 'pointer' }}>登录</button>
                <button type="button" style={{ cursor: 'pointer' }} onClick={() => handleReset()}>重置</button>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Form.Item name='agree' style={{ display: 'flex', alignItems: 'center', userSelect: 'none' }}
                    rules={[{ type: 'boolean', required: true, validator: (rule: any, value: any) => value === true, message: '请阅读协议！' }]}>
                    <input id="readed" type="checkbox" style={{ cursor: 'pointer', margin: '0' }} />
                </Form.Item>
                <a style={{ cursor: 'pointer', fontSize: '8px' }}>是否阅读《协议》</a>
                <a style={{ cursor: 'pointer', fontSize: '8px', marginLeft: 'auto'}}>注册账号</a>
            </div>
        </Form>
    )
}

export default LoginForm 
