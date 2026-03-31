import { createBrowserRouter, Link, RouterProvider, useLocation } from 'react-router-dom';
import { useState } from 'react';
import KeepAlive, { useKeepAliveOutlet } from './keepalive';
import './App.css';

function Layout() {
  const location = useLocation();
  const element = useKeepAliveOutlet();
  return (
    <div>
      <div>当前路径为：{location.pathname}</div>
      {element}
    </div>
  );
};

function Aaa() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>默认AAA 页面</h2>
      <p>数值为：{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>加1</button>
      <br />
      <Link to="/bbb">去 Bbb 页面</Link>
      <br />
      <Link to="/ccc">去 Ccc 页面</Link>
    </div>
  );
};

function Bbb() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>BBB 页面</h2>
      <p>数值为：{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>加1</button>
      <br />
      <Link to="/">回首页</Link>
    </div>
  );
};

function Ccc() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>CCC 页面</h2>
       <p>数值为：{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>加1</button>
      <br />
      <Link to="/">回首页</Link>
    </div>
  );
};

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: (
            <Aaa />
        ) 
      },
      { 
        path: "/bbb", 
        element: (
            <Bbb />
        ) 
      },
      { path: "/ccc", element: <Ccc /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <KeepAlive keepPaths={['/bbb', '/']}>
      <RouterProvider router={router} />
    </KeepAlive>
      
  );
}

export default App;