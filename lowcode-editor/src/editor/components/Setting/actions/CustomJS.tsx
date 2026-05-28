import MonacoEditor, { type OnMount } from '@monaco-editor/react';
import { useState } from 'react';

export interface CustomJSConfig {
    type: 'customJS',
    code: string
};

interface CustomJSProps {
    defaultvalue?: string,
    onChange: (config: CustomJSConfig) => void
}

export default function CustomJS({ defaultvalue = '', onChange }: CustomJSProps) {
    const [value, setValue] = useState(defaultvalue);

    const codeChange= (value: string | undefined)=> {
        setValue(value?? '');

        onChange?.({
            type: 'customJS',
            code: value!
        })
    };

    const handleEditorMount: OnMount= (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
    };

    
    return (<div className='mt-4'>
        <div></div>
        <MonacoEditor
            width={'420px'}
            height={'260px'}
            path='action.js'
            language='javascript'
            onMount={handleEditorMount}
            onChange={codeChange}
            value={value}
            options={
                {
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    minimap: {
                        enabled: false,
                    },
                    scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    },
                }
            }
        />
    </div>)
};