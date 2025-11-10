import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import SearchProfile from "./pages/searchProfile";
import ViewProfile from "./pages/viewProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-profile" element={<SearchProfile />} />
        <Route path="/profile/:name" element={<ViewProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App