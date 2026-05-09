import style from './index.module.scss';
import logoSvg from './icons/logo.svg';
import { MoonOutlined, SunOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import { message } from 'antd'
import { PlaygroundContext } from './components/PlaygroundContext';
import copy from 'copy-to-clipboard';
import { useContext } from 'react';
import { downloadFiles } from './utils';

import styles from './index.module.scss'

export default function Header() {
    const { files, theme, setTheme } = useContext(PlaygroundContext);

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
                <ShareAltOutlined style={{ marginLeft: '10px' }}
                    onClick={() => {
                        copy(window.location.href);
                        message.success('分享链接已复制。')
                    }}
                />
                <DownloadOutlined
                    style={{ marginLeft: '10px' }}
                    onClick={async () => {
                        await downloadFiles(files);
                        message.success('下载完成')
                    }}
                />
            </div>
        </div>
    )
};
