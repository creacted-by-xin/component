import { createContext, useState, type PropsWithChildren } from "react";
import { fileName2Language } from "../utils";
import { initFiles } from "../files";

interface File {
    name: string,
    value: string,
    language: string
};

export interface Files {
    [key: string]: File
};

interface PlaygroundContext {
    files: Files,
    selectedFileName: string,
    setSelectedFileName: (fileName: string) => void,
    setFiles: (files: Files) => void,
    addFile: (fileName: string) => void,
    removeFile: (fileName: string) => void,
    updateFileName: (oldFileName: string, newFileName: string) => void
};

export const PlaygroundContext = createContext<PlaygroundContext>({
    selectedFileName: 'App.tsx'
} as PlaygroundContext);

export function PlaygroundProvider(props: PropsWithChildren) {
    const { children } = props;
    const [files, setFiles] = useState<Files>(initFiles);
    const [selectedFileName, setSelectedFileName] = useState('App.tsx');


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