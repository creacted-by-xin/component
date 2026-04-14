import classNames from "classnames";
import type { FC } from "react";

interface ListProps {
    className?: string
}
export const List: FC = (props: ListProps)=> {
    const cs = classNames( props.className, "")
    return <div className={cs}>
    </div>
}