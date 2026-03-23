import Form from '../../../Form/index';
import { useRef, useState } from 'react';
import type { FormRefType } from '../../../Form/Form';
import { CloseCircleOutlined } from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function Register(props: { hendleRegister: (value: boolean) => void }) {
    const { hendleRegister } = props;
    const initialValues = { avator: '', loginId: '', password: '', agree: false };
    const avatarRefer = useRef(null);

    const FormRef = useRef<FormRefType>(null);
    const onFinish = () => {
        alert('注册成功！！');
        // 插入数据到数据库
        if (FormRef.current) {
            FormRef.current.getReset();
        };

    };

    const onFinishFailed = (error: string) => {
        // alert(error);
    };

    const handleCancer = () => {
        hendleRegister(false);
        if (FormRef.current) {
            FormRef.current.getReset();
        }
    };

   const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

    return (
        <div className='register-wrapper'>
            <CloseCircleOutlined className='close' onClick={handleCancer} />
            <div style={{ fontWeight: '900', fontSize: '30px' }}>注册</div>
            <Form ref={FormRef} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
                <div className='register-form'>
                    <div style={{ height: '50px' }}>
                        <Form.Item label='头像' name='avator'
                            rules={[{ type: 'string', required: true, message: '用户头像不能为空' },
                            ]}>
                                <Upload
        name="avatar"
        // listType="picture"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
       <Avatar size={54} icon={<UserOutlined />} className="avator" />
      </Upload>
                        </Form.Item></div>
                    <Form.Item label='用户名' name='userName'
                        rules={[{ type: 'string', required: true, message: '用户名不能为空' },
                        { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,10}$/, message: '用户名必须4-10位，以字母开头，仅支持字母、数字、下划线' }
                        ]}>
                        <input></input>
                    </Form.Item>
                    <Form.Item label='账号' name='loginId'
                        rules={[{ type: 'string', required: true, message: '账号不能为空' },
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