import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

import Chat from "./pages/chat";
import Email from "./pages/email";
import Reset from "./pages/reset";
import Businessprofile from "./pages/businessprofile";
import Clientprofile from "./pages/clientprofile";
import PaymentPage from './components/PaymentButton';
import Displayclientprofile from './pages/displayclientprofile';
import Displaybusinessprofile from './pages/displaybusinessprofile';
import ServicePage from './pages/servicepage'
import CreateAd from './pages/createad'


import LocationComponent from './pages/location';
import ClientHome from './pages/clienthome';
import BusinessHome from './pages/businesshome'

import ImageUpload from './pages/imageupload'




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/" element={<ClientHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clienthome" element={<ClientHome />} />
        <Route path='/businesshome' element={<BusinessHome/>}/>
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/email" element={<Email />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/businessprofile" element={<Businessprofile />} />
        <Route path="/clientprofile" element={<Clientprofile />} />
        <Route path="/location" element={<LocationComponent />} />
        <Route path="/displayclientprofile" element={<Displayclientprofile />} />
        <Route path="/displaybusinessprofile" element={<Displaybusinessprofile />} />
        <Route path="/servicepage" element={<ServicePage />} />
        <Route path="/createad" element={<CreateAd />} />
        <Route path="/createad" element={<CreateAd />} />
        <Route path="/imageupload" element={<ImageUpload />} />




        

      </Routes>
    </BrowserRouter>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
