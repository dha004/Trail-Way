import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Trails from './pages/Trails'
import TrailDetail from './pages/TrailDetail'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trails" element={<Trails />} />
        <Route path="/trail/:id" element={<TrailDetail />} />
      </Routes>
    </div>
  )
}
