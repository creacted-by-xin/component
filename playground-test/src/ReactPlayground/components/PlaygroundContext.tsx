import { createContext, useState, type PropsWithChildren } from "react";
import { fileName2Language } from "../utils";
import { initFiles } from "../files";

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

export function PlaygroundProvider(props: PropsWithChildren) {
    const { children } = props;
    const [files, setFiles] = useState<Files>(initFiles);
    const [selectedFileName, setSelectedFileName] = useState('main.tsx');
    const [theme, setTheme] = useState<Theme>('light');

    console.log('files-PlaygroundProvider', files)

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