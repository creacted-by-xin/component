import { setupTypeAcquisition } from "@typescript/ata";
import typescript from 'typescript';

export function createAta(onDownloadFile: (code: string, path: string)=> void) {
    const ata= setupTypeAcquisition({
        projectName: 'xin-ata',
        typescript: typescript,
        logger: console,
        delegate: {
            receivedFile: (code: string, path: string) => {
                console.log('自动下载的包', path);
                onDownloadFile(code, path)
            }
        }
    });

    return ata;
}