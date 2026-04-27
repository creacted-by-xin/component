import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../components/PlaygroundContext";
import Editor from "../Editor";
import { compile } from "./compiler";

export default function Preview() {

    const { files} = useContext(PlaygroundContext);
    const [compiledCode, setCompiledCode] = useState('');
    console.log('files',files)

    useEffect(() => {
        const res = compile(files);
        setCompiledCode(res);
        console.log('触发')
    });

    return <div style={{height: '100%'}}>
        <Editor file={{
            name: 'dist.js',
            value: compiledCode,
            language: 'javascript'
        }}/>
    </div>
}