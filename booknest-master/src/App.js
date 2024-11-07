import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/User/SignUp/SignUp';
import SignIn from './components/User/SignIn/SignIn';
import Cart from './components/User/Cart/Cart';
import Checkout from './components/User/Checkout/Checkout';
import MyAccount from './components/User/MyAccount/MyAccount';
import Donate from './components/DonateBooks/Donate';
import DonateForm from './components/DonateBooks/DonateForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory } from './router-config/categorySlice';
import { fetchTopProduct } from './router-config/topProductSlice';
// import { addBook } from './router-config/addBookSlice';
import FreeBooks from './components/FreeBooks/FreeBooks';
import Update from './components/User/MyAccount/Update';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Books from './components/Books/Books';
// import BookList from './components/Books/BookList';
import SellboooksForm from './components/SellBook/SellBook';
import { fetchState } from './router-config/stateSlice';
import { fetchCitiesByState } from './router-config/citySlice';
import About from './components/About/About';
import UserBooks from './components/User/MyAccount/UserBooks';

import OrderDetails from './components/User/MyAccount/Order/OrderDetails';
import ViewDescription from './components/ViewDescription/ViewDescription';

import Contact from "./components/Contact/Contact";
import UpdateBooks from './components/User/MyAccount/UpdateBook/UpdateBook';
import Donetors from './components/Donetors/Donetors';
import ForgetPassword from './components/User/ForgetPassword/ForgetPassword';
import ChangePassword from './components/User/ChangePassword/ChangePassword';
import BookList from './components/Books/BookList';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCategory());
    dispatch(fetchTopProduct());
    dispatch(fetchState());
    dispatch(fetchCitiesByState());
    // dispatch(addBook());
  },[]);

  return <> 
  <Routes>
   <Route path='/' element={ <Home/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/signin' element={<SignIn/>}/>
   <Route path='/contact' element={<Contact/>}/>
   <Route path='/aboutUs' element={<About/>}/>
   <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
   <Route path='/freebooks' element={<FreeBooks/>}/>
   <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
   <Route path='/myaccount' element={<ProtectedRoute><MyAccount/></ProtectedRoute>}/>
   <Route path='/donate' element={<Donate/>}/>
   <Route path='/donateform' element={<ProtectedRoute><DonateForm/></ProtectedRoute>}/>
   <Route path='/sellbooks' element={<ProtectedRoute><SellboooksForm/></ProtectedRoute>}/>
   <Route path='/update' element={<ProtectedRoute><Update/></ProtectedRoute>}/>
   <Route path= "/viewDescription" element={<ViewDescription/>}/>
   <Route path="/book" element={<Books/>}/>
   {/* <Route path="/bookList" element={<BookList/>}/> */}

   <Route path='/userBook' element={<UserBooks/>} />
  <Route path='/updateBooks' element={<UpdateBooks/>}/>
  <Route path='/orderDetails' element={<OrderDetails/>}/>
  <Route path='/contact' element={<Contact/>}/>

   <Route path='/userBook' element={<ProtectedRoute><UserBooks/></ProtectedRoute>} />
  <Route path='/updateBooks' element={<ProtectedRoute><UpdateBooks/></ProtectedRoute>}/>
  <Route path='/orderDetails' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
  <Route path='/donetors' element={<Donetors />} />
  <Route path='/forgetPassword'element={<ForgetPassword/>}/>
  <Route path='/changePassword' element={<ChangePassword/>}/>
 
  </Routes>
  </>
}
export default App;
