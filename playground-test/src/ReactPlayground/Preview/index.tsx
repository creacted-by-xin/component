import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../components/PlaygroundContext";
// import CompilerWorker  from "./compiler.worker?worker";
import { compile } from "./compiler";
import iframeRaw from './iframe.html?raw';
import { IMPORT_MAP_File_NAME } from '../files';
import { Message } from "../components/Message";

interface MessageData {
    data: {
        type: string,
        message: string
    }
}

export default function Preview() {

    const { files } = useContext(PlaygroundContext);
    const [compiledCode, setCompiledCode] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        const res = compile(files);
        setCompiledCode(res);
    }, [files]);

// const compilerWorkerRef = useRef<Worker>(null);

//     useEffect(() => {
//         if(!compilerWorkerRef.current) {
//             compilerWorkerRef.current = new CompilerWorker();
//             compilerWorkerRef.current.addEventListener('message', ({data}) => {
//                 console.log('worker', data);
//                 if(data.type === 'COMPILED_CODE') {
//                     setCompiledCode(data.data);
//                 } else {
//                     //console.log('error', data);
//                 }
//             })
//         }
//     }, []);

    // useEffect(() => {
    //     compilerWorkerRef.current?.postMessage(files)
    // }, [files]);

    const getIframeUrl = () => {
        const res = iframeRaw.replace('<script type="importmap"></script>',
            `<script type="importmap">${files[IMPORT_MAP_File_NAME].value
            }</script>`).replace(
                '<script type="module" id="appSrc"></script>',
                `<script type="module" id="appSrc">${compiledCode}</script>`,
            );

            return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
    };

    useEffect(() => {
        setIframeUrl(getIframeUrl())
    }, [files[IMPORT_MAP_File_NAME].value, compiledCode]);

    const [error, setError] = useState('')

    const handleMessage = (msg: MessageData) => {
        const { type, message } = msg.data
        if (type === 'ERROR') {
          setError(message)
        }
    }
        useEffect(() => {
        window.addEventListener('message', handleMessage)
        return () => {
          window.removeEventListener('message', handleMessage)
        }
    }, [])

    return <div style={{ height: '100%' }}>
        {/* <Editor file={{
            name: 'dist.js',
            value: compiledCode,
            language: 'javascript'
        }} /> */}

        {iframeUrl && <><iframe
            src={iframeUrl}
            style={{
                width: '100%',
                height: '100%',
                padding: 0,
                border: 'none',
            }}
        />
        <Message type='error' content={error}/></>
        }
    </div>
}