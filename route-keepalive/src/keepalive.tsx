import { createContext, useContext, type FC, type PropsWithChildren, type ReactNode } from "react";
import { matchPath, useLocation, useOutlet } from "react-router-dom";

interface keepAliveProps extends PropsWithChildren{
    keepPaths: Array<string | RegExp>,
    keepElements?: Record<string, ReactNode>,
    dropByPath?: (path: string) =>void
};

type keepAliveContextType = Omit<Required<keepAliveProps>, 'children'>;

const keepElements:keepAliveProps['keepElements'] = {}

const keepAliveContext = createContext<keepAliveContextType>({
    keepPaths:[],
    keepElements,
    dropByPath(path: string){
        keepElements[path] = null
    }
});

export function isKeepPath(path: string, keepPaths:keepAliveProps['keepPaths']) {
    let isKeep = false;
    keepPaths.forEach((item)=>{
        //字符串
        if(path===item){
            isKeep = true;
        };
        // 正则
        if(item instanceof RegExp && item.test(path)){
            isKeep = true;
        };
        // 字符串，忽略大小写
        if(typeof item === 'string' && item.toLowerCase() === path.toLowerCase()){
            isKeep = true;
        };
    })

    return isKeep;
}

export function useKeepAliveOutlet(){
    const location = useLocation();
    const element = useOutlet();

    // 判断是否属于keepPaths
    const {keepPaths, keepElements} = useContext(keepAliveContext);
    const isKeep = isKeepPath(location.pathname, keepPaths);

    if(isKeep){
        keepElements[location.pathname] = element;
    };

    return <>
    {
        Object.entries(keepElements).map(([path, element])=>{
            return (<div key={path} hidden={!matchPath(location.pathname, path)}>
                {element}
                </div>)
        })
    }
    {!isKeep && element}
    </>

}


const KeepAlive: FC<keepAliveProps> = (props)=>{
    const {keepPaths, ...other} = props;

    const {keepElements, dropByPath} = useContext(keepAliveContext)
    return <keepAliveContext.Provider value={{keepPaths, keepElements, dropByPath}} {...other}>
        </keepAliveContext.Provider>
};

export default KeepAlive;