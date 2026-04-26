import classnames from 'classnames';
import styles from '../index.module.scss';

interface FileNameItemProps {
    value: string,
    actived: boolean,
    onClick: ()=> void
}

export default function FileNameItem( props: FileNameItemProps) {
    const {value, actived, onClick} = props
    return (<div className={classnames(styles['tab-item'], actived ? styles.actived : null)}
    onClick={onClick}
    >{value}</div>)
}