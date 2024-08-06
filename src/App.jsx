import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './assets/styles/App.scss'
import './components/Navigation'
import SideBar from './components/Navigation'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <SideBar /> */}
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
