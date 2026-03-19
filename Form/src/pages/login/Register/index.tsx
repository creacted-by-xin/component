import Form from '../../../Form/index'

const Register = ()=>{
    return <div className="register">
        <Form >
            
            <div className='login'>
                <Form.Item className={'login-item'}label='头像' name='avator'
                rules={[{ type: 'string', required: true, message: '用户名不能为空'},
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,9}$/, message: '用户名必须6-10位，以字母开头，仅支持字母、数字、下划线' }
                ]}>
                <div className='avator'></div>
            </Form.Item>
                <Form.Item className={'login-item'}label='用户名' name='userName'
                rules={[{ type: 'string', required: true, message: '用户名不能为空'},
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,9}$/, message: '用户名必须6-10位，以字母开头，仅支持字母、数字、下划线' }
                ]}>
                <input></input>
            </Form.Item>
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
                <button type='submit' style={{ cursor: 'pointer' }}>注册</button>
                <button type="button" style={{ cursor: 'pointer' }} onClick={() => {}}>取消</button>
            </div>
        </Form>
    </div>
};

export default Register