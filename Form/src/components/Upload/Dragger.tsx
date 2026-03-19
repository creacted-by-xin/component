import type { PropsWithChildren } from "react";

import React, { useState } from "react";
import classNames from "classnames";

interface DraggerProps extends PropsWithChildren {
    uploadFiles: (files: FileList)=> void
}

export default function Dragger(props: DraggerProps) {
    const { uploadFiles, children } = props;
    const [dragOver, setDragOver] = useState(false);

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragOver(false);
        uploadFiles(e.dataTransfer.files)
    }

    function handleDrag(e: React.DragEvent<HTMLDivElement>, dragOver: boolean) {
        e.preventDefault();
        setDragOver(dragOver)
    };

    const calssname = classNames('dragger', { 'dragger-isOver': dragOver })

    return <div className={calssname}
                onDragOver={(e) => { handleDrag(e, true) }}
                onDragLeave={(e) => { handleDrag(e, false) }}
                onDrop={handleDrop}>
                {children}
            </div>
}