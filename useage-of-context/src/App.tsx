import { createContext, useContext } from "react"

const countContext = createContext(111);

function Aaa() {
  return <countContext.Provider value={123}><Bbb/></countContext.Provider>
};
function Bbb() {
  return <Ccc/>
};
function Ccc() {
  const count = useContext(countContext)
  return<h2>count的值为：{count} </h2>
};

export default Aaa