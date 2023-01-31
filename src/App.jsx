import './App.css'
import './styles/loading-screen.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProductDetails from './pages/ProductDetails'
import AppNavbar from './components/AppNavbar'
import LoadinggScreen from './components/LoadinggScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    
    <HashRouter>
      <AppNavbar/>
      { isLoading && <LoadinggScreen/>}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/product/:id' element={<ProductDetails/>} />
          
          <Route element={<ProtectedRoutes/>}>
            <Route path='/purchases' element={<Purchases/>} />
          </Route>
          
        </Routes>
    </HashRouter>
  )
}

export default App
