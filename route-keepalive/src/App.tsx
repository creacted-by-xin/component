import { createBrowserRouter, Link, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { KeepAlive, AliveScope } from 'react-activation';

function Layout() {
  const location = useLocation();

  return (
    <div>
      <div>当前路径为：{location.pathname}</div>
      
      {/* 🔥 核心：KeepAlive 必须包在这里，根据 pathname 缓存 */}
      <KeepAlive id={location.pathname}>
        <Outlet />
      </KeepAlive>
      
    </div>
  );
};

function Aaa() {
  const [count, setCount] = useState(0);

  return (
    <div>
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
      <p>数值为：{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>加1</button>
      <br />
      <Link to="/">回首页</Link>
    </div>
  );
};

function Ccc() {
  return (
    <div>
      <Link to="/">回首页</Link>
    </div>
  );
};

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Aaa /> },
      { path: "/bbb", element: <Bbb /> },
      { path: "/ccc", element: <Ccc /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AliveScope>
      <RouterProvider router={router} />
    </AliveScope>
  );
}

export default App;