import classnames from 'classnames';
import styles from '../index.module.scss';
import { useState, type MouseEventHandler } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

interface FileNameItemProps {
    value: string,
    actived: boolean,
    creating: boolean,
    readonly: boolean,
    handleCreating: () => void,
    onEditComplete: (name: string) => void
    onClick: () => void,
    handleRemove: () => void,
}

export default function FileNameItem(props: FileNameItemProps) {
    const { value, actived = false, creating, readonly, handleCreating, onEditComplete, onClick, handleRemove } = props;
    console.log(creating, value);

    const [isEditor, setIsEditor] = useState(false);
    const [name, setName] = useState(value);

    function handleDoubleClick() {
        setIsEditor(true);
    };

    function handleInputBlur() {
        if (value !== name) {
            onEditComplete(name);
        };

        setIsEditor(false);
        handleCreating();
    };


    return (
        <div className={classnames(styles['tabs-item'], actived ? styles.actived : null)}
            onClick={onClick}>
            {
                ((isEditor || creating) ? (
                    <input className={styles['tabs-item-input']}
                        autoFocus={true}
                        onBlur={handleInputBlur}
                        onChange={e => setName(e.target.value)}
                        value={name} ></input>
                ) : (
                    <>
                        <span onDoubleClick={handleDoubleClick}>{name}</span>
                        {!readonly &&
                            <Popconfirm
                                title="确认删除该文件吗？"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={(e)=>{e?.stopPropagation();handleRemove()}}>
                                <CloseOutlined
                                    style={{ fontSize: '7px', marginLeft: '4px', lineHeight: '20px', verticalAlign: 'middle' }}
                                />
                            </Popconfirm>
                        }
                    </>
                ))
            }
        </div>)
}