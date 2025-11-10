import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import SearchProfile from "./pages/searchProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-profile" element={<SearchProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
