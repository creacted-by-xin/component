import {LoadingOutlined, CheckOutlined, CloseOutlined, DeleteOutlined} from '@ant-design/icons';
import {Progress} from 'antd'

export interface UploadListType {
    fileId: number,
    status: 'ready' | 'uploading' | 'success' | 'error',
    name: string,
    size: number,
    percent: number,
    raw?: File
}

interface UploadListprops {
    fileList: UploadListType[],
    onRemove?: (file: UploadListType) => void
}

export default function UploadList( props: UploadListprops) {
    const {fileList, onRemove}= props;
    console.log('UploadList',UploadList)
  return (
    <ul className="upload-list">
    {
       fileList.map((file, id)=>{
        return (
            <li  className={`upload-item upload-item-${file.status}`} key={id}>
                <div >
                <span>
                    {
                        (file.status === 'ready' || file.status === 'uploading' ) && <LoadingOutlined />
                    }
                    {
                        (file.status === 'success' ) && <CheckOutlined />
                    }
                    {
                        (file.status === 'error' ) && <CloseOutlined />
                    }
                    {file.name}
                </span>
                <span className='delete-btn'>
                        <DeleteOutlined onClick={()=>{onRemove?.(file)}}/>
                </span></div>
                
                {
                 file.status === 'uploading'? <Progress className='progress' size="small" percent={file.percent || 0}/> : ''
                        }
            </li>
        )
       })
    }
    </ul>
  )
}
