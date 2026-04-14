import classNames from "classnames";
import type { FC } from "react";

interface ListProps {
    className?: string
};

export const List: FC<ListProps> = (props)=> {
    const cs = classNames( props.className, " h-100 border-2 border=black")
    return <div className={cs}>
    </div>
}