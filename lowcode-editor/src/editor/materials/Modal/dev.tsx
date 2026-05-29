import { useRef, useEffect } from "react";
import { type CommonComponentProps } from "../../interface";
import { useMamerialDrop } from '../../hooks/useMamerialDrop';

export default function Modal({ id, title, children, style }: CommonComponentProps) {
    const ref = useRef(null);
    if (!id) return null;
    const { canDrop, drop } = useMamerialDrop(id, ['Button', 'Container']);

    useEffect(() => {
        drop(ref)
    }, []);

    return (
        // 业务数据id，用自定义ID
        <div data-component-id={id}
            ref={ref}
            className={`border min-h-25 p-5 ${canDrop ? 'border-2 border-blue-700' : ''} `}
            style={style}
        >
            <h4>{title}</h4>
            <div>{children}</div>
        </div>
    )
}
