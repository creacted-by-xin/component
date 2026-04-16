import { transform } from '@babel/standalone';
import type { PluginObj} from '@babel/core';
import './App.css';
import { useRef } from 'react';

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const code1 = `
    fucntion add( a, b ) {
      return (a + b)
    };

     export { add }
  `;

  const code2 = `
    import { add } from './add.ts';

    console.log('add值',add(2, 3));
  `;
  const url = URL.createObjectURL(new Blob([code1], {type: 'application/javascript'}));

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      }
    }
  };

  function onClick() {
    if (!textareaRef.current) {
      return
    };

    const res = transform(textareaRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'xin.tsx' ,
      plugins: [transformImportSourcePlugin]
    });

    console.log('res.code',res.code);
  }


  return (
    <>
      <textarea ref={textareaRef} style={{height:'500px', width: '300px' }}defaultValue={code2}></textarea>
      <button onClick={onClick}>编译</button>
    </>
  )
}

export default App
