import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import styles from '../../index.module.scss';

export interface MessagePeops {
    type: 'error' | 'warn',
    content: string
}

export const Message: React.FC<MessagePeops> = (props) => {
    const { type, content } = props;
    const [visiable, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!!content)
    }, [content])

    return visiable ?
        (<div className={classNames(styles.msg, styles[type])}>
             <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
            <CloseOutlined
               className={styles.dismiss} onClick={()=>setVisible(false)}
            />
        </div>)
        : null
}