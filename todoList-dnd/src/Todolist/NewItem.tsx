import classNames from "classnames";
import type { FC } from "react";

interface NewItemProps {
    className?: string
};

export const NewItem: FC<NewItemProps> = ( props)=> {
    const cs = classNames( props.className, " h-100 border-2 border=black")
        return <div className={cs}>
        </div>
};