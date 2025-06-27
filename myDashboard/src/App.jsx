import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App
