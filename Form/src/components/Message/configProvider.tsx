import { createContext, type PropsWithChildren, type RefObject, useRef } from "react"
import { MessageProvider, type MessageRef } from ".";

interface ConfigProviderProps {
    messageRef?: RefObject<MessageRef>
}

export const ConfigContext = createContext<ConfigProviderProps>({});

export function ConfigProvider(porps: PropsWithChildren) {
    const { children } = porps;
    const messageRef = useRef<MessageRef>(null) as RefObject<MessageRef>;

    return (
        <ConfigContext.Provider value={{ messageRef}}>
            <MessageProvider ref={messageRef}></MessageProvider>
            {children}
        </ConfigContext.Provider>
    )

}