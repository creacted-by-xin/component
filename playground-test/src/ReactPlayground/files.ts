import { type Files } from "./components/PlaygroundContext";
import main from './template/main.tsx?raw';
import App from "./template/App.tsx?raw";
import css from './template/App.css?raw'
import importMap from './template/import-map.json?raw'
import { fileName2Language } from "./utils";

export const IMPORT_MAP_File_NAME = 'import-map.json';
export const ENTRY_FILE_NAME = 'main.tsx';
export const APP_COMPONENT_FILE_NAME = 'App.tsx'

export const initFiles: Files = {
    [IMPORT_MAP_File_NAME]: {
        name: IMPORT_MAP_File_NAME,
        value: importMap,
        language: fileName2Language(IMPORT_MAP_File_NAME)
    },
    [ENTRY_FILE_NAME]: {
        name: ENTRY_FILE_NAME,
        value: main,
        language: fileName2Language(ENTRY_FILE_NAME)
    },
     [APP_COMPONENT_FILE_NAME]: {
        name: APP_COMPONENT_FILE_NAME,
        value: App,
        language: fileName2Language(APP_COMPONENT_FILE_NAME)
    },
     'App.css': {
        name: 'App.css',
        value: css,
        language: fileName2Language('App.css')
    }
}