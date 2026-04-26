import MonacoEditor, { type OnMount, type EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { createAta } from './ata';

interface EditorFile {
    name: string,
    value: string,
    language: string
};

interface Props {
    file: EditorFile,
    onChange?: EditorProps['onChange'],
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor( Props: Props ) {

    const { file, onChange, options } = Props;

    const handleEditorMount: OnMount = (editor, monaco) => {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true
        });

        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ,
            () => {
                editor.getAction('editor.action.formatDocument')?.run()
            }
        );

        // 创建回调函数，增加新的智能提示
        function onDownloadFile(code: string, path: string) {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
        };

        // 创建实例
        const ata = createAta(onDownloadFile);

        editor.onDidChangeModelContent(() =>
            ata(editor.getValue())
        );

        ata(editor.getValue());
    }

    return <MonacoEditor
        height='100%'
        path={file.name}
        language={file.language}
        onMount={handleEditorMount}
        onChange={onChange}
        value={file.value}
        options={{
            fontSize: 14,
            scrollBeyondLastLine: false,
            minimap: {
                enabled: false
            },
            scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6
            },
            ...options
        }}
    />
}

