import React, { useEffect, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [repw, setRepw] = useState("");
  const sub = (n) => {
    n.preventDefault();
    // console.log(n.target.value); //không gọi chung chung giá trị được
    // console.log(user);//bị là nên console.log ra
    // console.log(pw);//bị là nên console.log ra
    // console.log(repw);//bị là nên console.log ra
    if (user === "" && pw === "" && repw === "") {
      alert("Please insert all three!");
    } else if (user === "") {
      alert("Please insert user!");
    } else if (pw === "") {
      alert("Please insert password!");
    } else if (repw === "") {
      alert("Please insert RetypePassword!");
    } else if (user === "" && pw === "") {
      alert("Please insert user and password!");
    } else if (pw === "" && repw === "") {
      alert("Please insert password and RetypePassWord!");
    } else if (user === "" && repw === "") {
      alert("Please insert user and Retypepassword!");
    } else if (pw !== repw) {
      alert("Your password not same as Retype");
    }

    if ((pw == repw) != "" && user !== null && pw != "" && repw != "") {
      let regis = JSON.parse(localStorage.getItem("regis")) || []; //dùng là register trong getItem thì không đưuọc vì tên component là Register,đặt tên biến không được trùng tên component
      let value = { username: user, pass: pw };
      //////////////
      if (regis.length === 0) {
        regis.push(value);
        localStorage.setItem("regis", JSON.stringify(regis));
        alert("Success !");
        setInterval(nav("/login"), 3000);
        return; //return lại để dừng sub chạy tiếp xuống dưới vì ở đây điều kiện đăng nhập đã thành công
      }
      console.log("regis", regis);
      let z = 0;
      const q = regis.map((item) => (z += item.pass.includes(value.pass))); //item.pass.includes(value.pass) :nếu chưa chứa thì là false còn chứa rồi includes rồi thì là true
      //giải thích ở trên:z mà true thì đã chứa rồi,còn nếu false thì chưa chứa,mà false là 0,true là 1 nên cộng dồn lại nếu tất z tổng =0 thì chưa có giá trị 1 là true nào là chứa rồi ,còn lại là 0 thì nó vẫn khác 0 lớn hơn 0,còn tổng z bằng không thì tất cả giá trị trong mảng đều là false là chưa chứa
      /////////////////
      console.log("z", z);
      if (z == 0) {
        regis.push(value);
        localStorage.setItem("regis", JSON.stringify(regis));
        console.log(localStorage.getItem("regis"));
        alert("Success !");
        setInterval(nav("/login"), 3000);
      } else if (z > 0) {
        alert("Account already had,insert again please");
      }
    }
  };

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
            <label htmlFor="repassword"> Retype Password</label>
            <input
              id="repassword"
              type="text"
              onChange={(e) => setRepw(e.target.value)}
            />

            <button type="submit">Register</button>
            <div className="n" onClick={() => nav("/Login")}>
              Already have account? Click me!
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

export default Register;
