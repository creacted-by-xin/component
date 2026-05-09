import axios from "axios";
import type { ChangeEvent, PropsWithChildren } from "react";
import { useRef, useState } from "react";
import Dragger from "./Dragger";
import { InboxOutlined } from '@ant-design/icons';
import './index.scss'
import type { UploadFile } from "antd";
import type {UploadListType} from './UploadList'
import UploadList from "./UploadList";

export interface UploadProps extends PropsWithChildren {
    action: string,
    multiple?: boolean
    accept?: string,
    drag?: boolean
}

export default function Upload(props: UploadProps) {
    const { action, multiple = false, accept, drag = false, children } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const fileStory: UploadListType[] =[{
    fileId: 2,
    status: 'success',
    name: '文件2',
    size: 123,
    percent: 20,
},
{
    fileId: 3,
    status: 'error',
    name: '文件3',
    size: 123,
    percent: 100,
}]
    const [ fileList, setFileList] = useState<UploadListType[]>(fileStory)

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }

    };

    const updateFileList = (file: UploadListType, updateObj: Partial<UploadListType>)=>{
        setFileList(prevList => {
            return prevList.map((item)=>{
                if(item.fileId === file.fileId){
                    return { ...item, ...updateObj}
                } else {
                    return item
                }
            })
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) { return };
        uploadFiles(files);
        //原生 <input type="file"> 有一个特性：
        // 如果用户选中了一个文件（比如 test.txt）并触发上传后，不重置 value 的话，再次选择同一个文件时，onChange 事件不会触发。
        if (inputRef.current) {
            inputRef.current?.value === ''
        }
    };

    const uploadFiles = (files: FileList) => {
        // FileList是类数组
        const postFiles = Array.from(files);
        postFiles.forEach(item => { post(item) })
    };

    const handleRemove = (file: UploadListType)=>{
        setFileList(
            (prevList) => {return(
            prevList.filter((item)=>item.fileId != file.fileId)
        )}
    )
    }

    const post = (file: File) => {
        let uploadList: UploadListType= {
            fileId: Date.now() ,
            status:'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };

        setFileList(
            (prevList)=>{return [uploadList, ...prevList]}
        );

        const formData = new FormData();
        formData.append('file', file);
        axios.post(action, formData, {
            onUploadProgress: (e)=>{
                let percentage = Math.round((e.loaded * 100) / e.total! ) || 0;
                if(e.progress! < 1) {
                    updateFileList(uploadList, {status: 'uploading', percent: percentage})
                }
            }
        }).then(
        ()=>{updateFileList(uploadList, {status: 'success', percent: 100})}
    ).catch(()=>{updateFileList(uploadList, {status: 'error', percent: 0})})

    }

    return (<><div className="upload-btn" onClick={handleClick}>
        {
            drag ? <Dragger uploadFiles={(files: FileList) => { uploadFiles(files) }}>
                <p><InboxOutlined style={{ fontSize: '50px' }} /></p>
                <p>点击或者拖拽文件到此处</p></Dragger> : children
        }
        <input type='file' className="input-btn" ref={inputRef} accept={accept} multiple={multiple} onChange={handleFileChange} />
    </div>
    <UploadList fileList={fileList} onRemove={handleRemove}/></>)
}