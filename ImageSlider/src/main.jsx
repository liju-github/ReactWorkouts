import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageSliderV1 from './ImageSliderV1.jsx'
import ImageSliderV2 from './ImageSliderV2.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/v1" element={<ImageSliderV1 />} />
        <Route path="/v2" element={<ImageSliderV2 />} />
      </Routes>
    </Router>
  </StrictMode>,
)
