import Todos from "./pages/Todos";
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden">
        <Todos />
      </div>
    </Provider>
  );
}
