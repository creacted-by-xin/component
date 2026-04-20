import style from './index.module.scss';
import logoSvg from './icons/logo.svg';


export default function Header() {
    return (
        <div className={style.header}>
            <div className={style.logo}>
                <img alt='logo' src={logoSvg}></img>
                <span>React Playground</span>
            </div>
        </div>
    )
};
