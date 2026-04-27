import { transform } from "@babel/standalone";
import {type Files } from "../components/PlaygroundContext";
import { ENTRY_FILE_NAME } from "../files";

export const babelTransform = (code: string, filename: string, files: Files) => {
    let result = ''
     try{
        result = transform(code, {
            presets: ['react', 'typescript'],
            filename,
            retainLines: true
        }).code!
     } catch(e) {
         console.error('编译出错', e);
     }
    return result
}


export const compile = (files: Files)=> {
    const main =  files[ENTRY_FILE_NAME];
    return babelTransform(main.value, main.name, files)
}