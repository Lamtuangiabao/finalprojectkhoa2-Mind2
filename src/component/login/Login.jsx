import { useNavigate } from "react-router-dom";
import "./login.css";
import React, { useState } from "react";

const Login = () => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  //////////
  const sub = (n) => {
    n.preventDefault();
    if (user === "") {
      alert("Please insert user!");
    } else if (pw === "") {
      alert("Please insert password!");
    }
    ///////////////
    if (user !== "" && pw !== "") {
      ////////////
      console.log(user, pw);
      let regis = JSON.parse(localStorage.getItem("regis"));
      console.log(regis);
      let d;
      regis &&
        regis.map((item, index) => {
          if (item.username == user && item.pass == pw) {
            d = item;
          }
        });
      console.log("d", d);
      // console.log(regis[regis.length - 1].username);
      // console.log(regis[regis.length - 1].pass);
      if (d) {
        localStorage.setItem("login", JSON.stringify(d));
        alert("Success");
        setInterval(nav("/main"), 2000);
      } else {
        alert("Account not existed!");
      }
      ////////////
      // let log = JSON.parse(localStorage.getItem("login")) || []; //dùng là register trong getItem thì không đưuọc vì tên component là Register,đặt tên biến không được trùng tên component
      // let value = { usernmame: user };
      // log.push(value);
      // localStorage.setItem("login", JSON.stringify(log));
      // console.log(localStorage.getItem("login"));
      // alert("Success !");
      // setInterval(nav("/main"), 3000);
    }
  };
  /////
  return (
    <>
      <div className="back">
        <div className="form">
          <form className="f1" action="submit" onSubmit={sub}>
            {/* //lưu ý khi xài form thì ở onSubmit thì gọi function như trên,còn không code trực tiếp ở trong onSubmit ,nhớ phải có e.preventdefault() */}
            <label htmlFor="username">UserName</label>
            <input
              id="user"
              type="text"
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="password"> Password</label>
            <input
              id="password"
              type="text"
              onChange={(e) => setPw(e.target.value)}
            />

            <button type="submit">Login</button>
            <div className="navregi" onClick={() => nav("/register")}>
              Haven't have account? Click me!
            </div>
          </form>
          <div className="d" onClick={() => nav("/main")}>
            Want to experience first no account wanted? Click me!
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
