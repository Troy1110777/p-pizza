// import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Homescreens from './screens/Homescreens';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';
import Adminscreen from './screens/Adminscreen';
import Addpizza from './screens/Addpizza';
import Orderslist from './screens/Orderslist';
import Pizzaslist from './screens/Pizzaslist';
import Userslist from './screens/Userslist';
import Editpizza from './screens/Editpizza';
import ForgetPassword from './screens/Forget_password';
import ResetPassword from './screens/Reset_password';
// import Edituser from './screens/Edituser';
import Errorpage from './screens/Errorpage';
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homescreens />} />
          <Route path="/cart" exact element={<Cartscreen />} />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/forget_password" exact element={<ForgetPassword />} />
          <Route path="/reset_password/:reset_token" element={<ResetPassword />} />
          <Route path="/orders" exact element={<Ordersscreen />} />
          <Route path="/admin" element={<Adminscreen />} >
            <Route path="/admin" index element={<Userslist />} />
            <Route path="/admin/userslist" exact element={<Userslist />} />
            {/* <Route path="/admin/userslist/:userid" element={<Edituser />} /> */}
            <Route path="/admin/orderslist" exact element={<Orderslist />} />
            <Route path="/admin/pizzaslist" element={<Pizzaslist />} />
            <Route path="/admin/editpizza/:pizzaid" element={<Editpizza />} />
            <Route path="/admin/addpizza" element={<Addpizza />} />
          </Route>
          
          <Route path="*" element={<Errorpage/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
