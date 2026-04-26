import ReactPlayground from "./ReactPlayground";
import { PlaygroundProvider } from "./ReactPlayground/components/PlaygroundContext";
import './App.scss';

export default function App() {
  return(
    <PlaygroundProvider>
      <ReactPlayground/>
    </PlaygroundProvider>
    
  )
}