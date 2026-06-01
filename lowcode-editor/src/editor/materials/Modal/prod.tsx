import { useState, forwardRef, useImperativeHandle } from "react";
import { type CommonComponentProps } from "../../interface";
import { Modal as AntdModal } from 'antd';
import React from 'react';


export interface ModalRef {
    open: ()=> void,
    close: ()=> void,
};

const Modal: React.ForwardRefRenderFunction<ModalRef, CommonComponentProps> = ({ id, title, children, styles, onOk, onCancel, }, ref)=> {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, ()=> {
        return {
            open: ()=>{ setOpen(true) },
            close: ()=>{ setOpen(false) }
        }
    },[]);

    return (
        <AntdModal
            title={title}
            style={styles}
            open={open}
            onCancel={() => {
                onCancel && onCancel();
                setOpen(false);
            }}
            onOk={() => {
                onOk && onOk();
            }}
            destroyOnClose
        >
            {children}
        </AntdModal>
    )
};

export default  forwardRef(Modal);