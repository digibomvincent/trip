import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Itinerary from './Itinerary.jsx'
import OsakaKyoto from './pages/OsakaKyoto.jsx'
import Kamakura from './pages/Kamakura.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Itinerary />} />
        <Route path="/map/osaka-kyoto" element={<OsakaKyoto />} />
        <Route path="/map/kamakura" element={<Kamakura />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
