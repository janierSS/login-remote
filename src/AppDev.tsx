import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./components/Login"

function AppDev() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default AppDev
