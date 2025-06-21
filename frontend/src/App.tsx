import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewItemsPage from './pages/ViewItemsPage';
import AddItemPage from './pages/AddItemPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ViewItemsPage />} />
            <Route path="/add" element={<AddItemPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
