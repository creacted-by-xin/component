import MonacoEditor, { loader, type OnMount, type EditorProps } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import type { editor } from "monaco-editor";

loader.config({ monaco });

interface CssEditorProps {
  value: string,
  onChange?: EditorProps['onChange'],
  options?: editor.IStandaloneEditorConstructionOptions
}
export default function CssEditor(props: CssEditorProps) {
  const{ value, onChange, options} =props;
  
    const handleEditorMount: OnMount = (editor, monaco)=>{
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, ()=> {
          editor.getAction('monaco.action.formatDocument')?.run()
        })
    };

  return (
    <MonacoEditor
    height={'100%'}
    path='component.css'
    language="css"
    onMount={handleEditorMount}
    onChange={onChange}
    value={value}
    options={
      {
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false
        },
        fixedOverflowWidgets: true,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6
        },
        lineNumbersMinChars: 2,
        glyphMargin: false,
        folding: false,
        ...options
      }
    }
    />
  )
}
