import Todos from "./pages/Todos";
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {

  return (
    <Provider store={store}>
      <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Todos />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
