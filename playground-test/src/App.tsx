import { transform } from '@babel/standalone';
import './App.css';
import { useRef } from 'react';

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const code = `import { useEffect, useState } from "react";

  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2
    });
  
    return (
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
  }
  
  export default App;
  `

  function onClick() {
    if (!textareaRef.current) {
      return
    };

    const res = transform(textareaRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'xin.tsx' 
    });

    console.log(res.code);
  }

  return (
    <>
      <textarea ref={textareaRef} style={{height:'500px', width: '300px' }}defaultValue={code}></textarea>
      <button onClick={onClick}>编译</button>
    </>
  )
}

export default App
