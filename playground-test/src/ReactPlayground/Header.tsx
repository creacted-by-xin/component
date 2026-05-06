import style from './index.module.scss';
import logoSvg from './icons/logo.svg';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { PlaygroundContext } from './components/PlaygroundContext';
import {useContext} from 'react'
import styles from './index.module.scss'

export default function Header() {
    const { theme, setTheme } = useContext(PlaygroundContext);

    return (
        <div className={style.header}>
            <div className={style.logo}>
                <img alt='logo' src={logoSvg}></img>
                <span>React Playground</span>
            </div>
            <div className={style.link}>
                {theme === 'light' && (
                    <MoonOutlined title='切换暗色主题'
                        className={styles.theme}
                        onClick={() => setTheme('dark')} />
                )}
                {theme === 'dark' && (
                    <SunOutlined title='切换亮色主题'
                        className={styles.theme}
                        onClick={() => setTheme('light')} />
                )}
            </div>
        </div>
    )
};
