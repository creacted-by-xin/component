import { Allotment } from "allotment";
import Header from "./components/Header";
import Materail from "./components/Materail";
import EditArea from "./components/EditArea";
import Setting from "./components/Setting";
import './index.css'

export default function ReactPlayground() {
    return <div className=' h-screen flex flex-col'>
        <div className='h-15 flex items-center border-b border-black'>
           <Header/>
        </div>
        <Allotment className="flex-1">
            <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
                <Materail/>
            </Allotment.Pane>
            <Allotment.Pane>
                <EditArea/>
            </Allotment.Pane>
            <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
                <Setting/>
            </Allotment.Pane>
        </Allotment>
    </div>
}
