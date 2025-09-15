import Todos from "./pages/Todos";
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {

  return (
    <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
