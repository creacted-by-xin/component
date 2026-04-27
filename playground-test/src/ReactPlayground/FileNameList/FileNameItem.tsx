import classnames from 'classnames';
import styles from '../index.module.scss';
import { useState } from 'react';

interface FileNameItemProps {
    value: string,
    actived: boolean,
    creating: boolean,
    handleCreating: () => void,
    onEditComplete: (name: string) => void
    onClick: () => void,
}

export default function FileNameItem(props: FileNameItemProps) {
    const { value, actived = false, creating, handleCreating, onEditComplete, onClick } = props;
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


    return (<div className={classnames(styles['tabs-item'], actived ? styles.actived : null)}
        onClick={onClick}
    >{
            ((isEditor || creating) ? (
                <input className={styles['tabs-item-input']}
                    autoFocus={true}
                    onBlur={handleInputBlur}
                    onChange={e => setName(e.target.value)}
                    value={name} ></input>
            ) : (
                <span onDoubleClick={handleDoubleClick}>{name}</span>
            ))
        }</div>)
}