import type { PropsWithChildren } from "react";

export interface CommonComponentProps extends PropsWithChildren {
    id: number,
    name: string,
    style?: React.CSSProperties,
    [key: string]: any
}