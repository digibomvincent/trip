import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Itinerary from './Itinerary.jsx'
import OsakaKyoto from './pages/OsakaKyoto.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Itinerary />} />
        <Route path="/map/osaka-kyoto" element={<OsakaKyoto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
