import classNames from "classnames";
import { Fragment, type FC } from "react";
import Gap from "./Gap";
import Item from "./Item";
import { useTodoListStore } from "./Store";

interface ListProps {
    className?: string
};

export const List: FC<ListProps> = (props)=> {
    const list = useTodoListStore(state => state.list);

    const cs = classNames( props.className, " h-full  border=black")
    return <div className={cs}>
        {list.length ? list.map(item=> {
            return <Fragment key={item.id}>
                <Gap/>
                <Item data={item}/>
            </Fragment>
        }) : '暂无待办事项'} 
        <Gap/>
    </div>
};



