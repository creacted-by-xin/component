import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { fileName2Language } from "../utils";
import { initFiles } from "../files";
import { compress, uncompress } from "../utils";

export interface File {
    name: string,
    value: string,
    language: string
};

export interface Files {
    [key: string]: File
};

export type Theme = 'light' | 'dark';

interface PlaygroundContext {
    files: Files,
    selectedFileName: string,
    theme: Theme,
    setTheme: (theme: Theme)=> void
    setSelectedFileName: (fileName: string) => void,
    setFiles: (files: Files) => void,
    addFile: (fileName: string) => void,
    removeFile: (fileName: string) => void,
    updateFileName: (oldFileName: string, newFileName: string) => void
};

export const PlaygroundContext = createContext<PlaygroundContext>({
    selectedFileName: 'main.tsx'
} as PlaygroundContext);

const getFilesFromUrl = ()=> {
    let files : Files | undefined;

    try{
        const hash = uncompress(decodeURIComponent(window.location.hash.slice(1)));
        files = JSON.parse(hash);
    } catch(error) {
        console.error(error)
    };

    return files;
}

export function PlaygroundProvider(props: PropsWithChildren) {
    const { children } = props;
    const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
    const [selectedFileName, setSelectedFileName] = useState('main.tsx');
    const [theme, setTheme] = useState<Theme>('light');

    const addFile = (name: string) => {
        files[name] = {
            name,
            language: fileName2Language(name),
            value: ''
        };

        setFiles({ ...files });
    };

    const removeFile = (name: string) => {
        delete files[name]
        setFiles({ ...files });
    };

    const updateFileName = (oldFileName: string, newFileName: string) => {
        if (!files[oldFileName] || newFileName === undefined || newFileName === null) return;
        const { [oldFileName]: value, ...rest } = files;
        const newFile = {
            [newFileName]: {
                name: newFileName,
                language: fileName2Language(newFileName),
                ...value
            }
        }

        setFiles({ ...rest, ...newFile })
    };

    useEffect(()=>{
        // 1. 把 files 对象转换成 JSON 字符串
        const hash = compress(JSON.stringify(files));
        // 2. 把字符串编码后，存入浏览器地址栏的 # 部分
        window.location.hash = encodeURIComponent(hash);
    },[JSON.stringify(files)])

    return <PlaygroundContext.Provider
        value={{
            files,
            theme,
            setTheme,
            selectedFileName,
            setSelectedFileName,
            setFiles,
            addFile,
            removeFile,
            updateFileName
        }}
    >
        {children}
    </PlaygroundContext.Provider>
}