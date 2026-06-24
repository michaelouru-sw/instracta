import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '@/pages/Home'
import Pricing from '@/pages/Pricing'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
