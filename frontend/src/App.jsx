import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Headers from './pages/components/Headers';
import Footers from './pages/components/Footers';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import AdminAddProduct from './pages/AdminAddProduct'; 
import Edituser from './pages/Edituser';
import ProtectedRoute from './protected/ProtectedRoute'
function App() {
  // block for js 
  return (
    <Router>
      <Toaster />
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<div> conatct</div>} />
        <Route path="/userdash" element={<div> userdash</div>} />

        <Route path="/admindash" element={
          <ProtectedRoute allowedRoles={['admin']} element={<Dashboard />}
          />} />

        <Route path="/edituser/:id" element={
          <ProtectedRoute allowedRoles={['admin']} element={<Edituser />}
          />
        } />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
              element={<AdminAddProduct />}
            />
          }
        />

      </Routes>
      <Footers />
    </Router>
  )
}

export default App
