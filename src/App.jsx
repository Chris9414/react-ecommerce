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
import github from './assets/images/github.svg'
import facebook from './assets/images/facebook.svg'
import linkedin from './assets/images/linkedin.svg'
import copy from './assets/images/copyright.svg'

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
        <footer>
          <p><img src={copy} alt="" /> Christian Rodriguez</p>
          <p><img src={copy} alt="" /> Academlo 2023</p>
          <div className='icon-container'>
              <div className='icon-box'>
                <img src={linkedin} alt="" />
              </div>
              <div className='icon-box'>
                <img src={github} alt="" />
              </div>
              <div className='icon-box'>
                <img src={facebook} alt="" />
              </div>
          </div>
        </footer>
    </HashRouter>
  )
}

export default App
