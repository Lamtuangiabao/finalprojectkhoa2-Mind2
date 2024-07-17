import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./component/main/Mainpage.jsx";
import Pre from "./component/pre/Pre.jsx";
import StoreComponent from "./component/store/StoreComponent.jsx";
import Api from "./component/Api/Api.jsx";
import Collection from "./component/collection/Collection.jsx";
import Register from "./component/register/Register.jsx";
import Fav from "./component/favorite/Fav.jsx";
import Login from "./component/login/Login.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreComponent>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pre />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/fav" element={<Fav />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* //Nếu muốn bọc storeComponent riêng thì bọc trong element */}
        <Route path="/main" element={<App />}></Route>
        <Route path="storecomponent" element={<StoreComponent />}></Route>
        <Route path="api" element={<Api />}></Route>
        <Route path="collection/:name" element={<Collection />}></Route>
        {/*code navigate không lấy trong store xài được phải xài trực tiếp ở trang muốn navigate , phải có dấu"/" trước chữ collection */}
      </Routes>
    </BrowserRouter>
  </StoreComponent>
);
