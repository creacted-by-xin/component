
import './App.css';
import Form from './Form/index';

function App() {
  const initialValues = { name: '', password: '', agree: false}
  const onFinish = () => {
    alert('登录成功！！');
  };

  const onFinishFailed = (error: string) => {
    alert(error);
  };

  const reset = ()=>{
    return initialValues
  }

  return (
    <div>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
        {/* <Form.Item label='用户名' name='userName'
          rules={[{ type: 'string', required: true, message: '账号不能为空' },
          { type: 'string', min: 8, max: 16, message: '账号长度为6-12位' }
          ]}>
          <input></input>
        </Form.Item>
        <Form.Item label='密码' name='password'
          rules={[{ type: 'string', required: true, message: '密码不能为空' },
          { type: 'string', min: 8, max: 16, message: '密码长度为6-12位' }
          ]}>
          <input></input>
        </Form.Item> */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center',gap: '150px' }}>
          <button type='submit' style={{ cursor: 'pointer' }}>登录</button>
          <button  type="reset" style={{ cursor: 'pointer' }} onClick={reset}>重置</button>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center',gap: '4px' }}>
          <Form.Item name='agree' style={{  display: 'flex', alignItems: 'center', userSelect: 'none' }}
            rules={[{ type: 'boolean', required: true, message: '请阅读协议！' }]}>
            <input id="readed" type="checkbox" style={{ cursor: 'pointer',  margin: '0' }} />
          </Form.Item><a style={{ cursor: 'pointer', fontSize: '8px' }}>是否同意协议</a>
        </div>
      </Form>

    </div>
  )
}

export default App
