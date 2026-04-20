import { Allotment } from 'allotment';
import Header from './Header';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import 'allotment/dist/style.css';

export default function ReactPlayground() {
    return(
        <div style={{height: '100vh'}}>
            <Header/>
            <Allotment defaultSizes={[100, 100]}>
                <Allotment.Pane minSize={500}>
                    <CodeEditor/>
                </Allotment.Pane>
                <Allotment.Pane minSize={0}>
                    <Preview/>
                </Allotment.Pane>
            </Allotment>
        </div>
    )
};