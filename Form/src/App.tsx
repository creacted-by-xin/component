import {useRef} from 'react';
import './App.css';
import Form from './Form/index';
import type {FormRefType} from './Form/Form';

function App() {
  const initialValues = { userName: '', password: '', agree: false};
  const FormRef = useRef<FormRefType>(null);
  const onFinish = () => {
    alert('登录成功！！');
    if(FormRef.current){
      FormRef.current.getReset();
    }
  };

  const onFinishFailed = (error: string) => {
    alert(error);
  };

  const handleReset = ()=>{
    if(FormRef.current){
      FormRef.current.getReset();
    }
  }

  return (
    <div>
      <Form ref={FormRef} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
        <Form.Item label='用户名' name='userName'
          rules={[{ type: 'string', required: true, message: '用户名不能为空' },
          { type: 'string', min: 6, max: 12, message: '用户名长度为6-12位' }
          ]}>
          <input></input>
        </Form.Item>
        <Form.Item label='密码' name='password'
          rules={[{ type: 'string', required: true, message: '密码不能为空' },
          { type: 'string', min: 8, max: 16, message: '密码长度为8-16位' }
          ]}>
          <input></input>
        </Form.Item>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center',gap: '150px' }}>
          <button type='submit' style={{ cursor: 'pointer' }}>登录</button>
          <button  type="button" style={{ cursor: 'pointer' }} onClick={()=>handleReset()}>重置</button>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center',gap: '4px' }}>
          <Form.Item name='agree' style={{  display: 'flex', alignItems: 'center', userSelect: 'none' }}
            rules={[{ type: 'boolean', required: true, validator: (rule: any, value: any) => value === true ,message: '请阅读协议！' }]}>
            <input id="readed" type="checkbox" style={{ cursor: 'pointer',  margin: '0' }} />
          </Form.Item><a style={{ cursor: 'pointer', fontSize: '8px' }}>是否阅读《协议》？</a>
        </div>
      </Form>

    </div>
  )
}

export default App
