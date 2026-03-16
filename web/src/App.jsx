
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/index";
import Redirect from "./pages/Redirect"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/:shortUrl" element={<Redirect />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App