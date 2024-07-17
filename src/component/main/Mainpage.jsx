import React, { useContext, useEffect, useState } from "react";
import "./mainpage.css";
import Cxt from "../store/store";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const store = useContext(Cxt);
  //
  const [encount, setEncount] = useState(-1); //mới vô chưa re-render nên chưa cập nhập lại nên phải trừ ra trường hợp đầu tiên là undeffined
  const [enimg, setEnimg] = useState();
  const [entitle, setEntitle] = useState();
  //
  const [jacount, setJacount] = useState(-1); //mới vô chưa re-render nên chưa cập nhập lại nên phải trừ ra trường hợp đầu tiên là undeffined
  const [jaimg, setJaimg] = useState();
  const [jatitle, setJatitle] = useState();
  //
  const [othercount, setOthercount] = useState(-1); //mới vô chưa re-render nên chưa cập nhập lại nên phải trừ ra trường hợp đầu tiên là undeffined
  const [otherimg, setOtherimg] = useState();
  const [othertitle, setOthertitle] = useState();
  const change = () => {
    store.theme.set(!store.theme.theme);
  };
  //////////////
  const nav = useNavigate();
  // ///////////////log
  const log = () => {
    let login = JSON.parse(localStorage.getItem("login"));
    const u = login;
    delete u.username;
    delete u.pass;
    console.log("loggggg", u);
    localStorage.setItem("login", JSON.stringify(u));
    let user = JSON.parse(localStorage.getItem("users"));
    console.log("user", user[user.length - 1].user);
    nav("/login");
  };

  //////////
  //////////////carousel ////
  useEffect(() => {
    if (encount > store.en.en.length) {
      setEncount(0);
    } //không được để cái này trong setInterval vì sao nó không chạy mà để ở ngoài mới chạy??
    //
    if (jacount > store.ja.ja.length) {
      setJacount(0);
    }
    //
    if (othercount > store.other.other.length) {
      // phải có 3 cái biến count cho mỗi mảng phim vì chiều dài mỗi mảng khác nhau
      setOthercount(0);
    }
    //
    const intervalId = setInterval(() => {
      setEncount(encount + 1);
      console.log("đếm ", encount);
      setEntitle(store.en.en[encount].title);
      setEnimg(store.en.en[encount].img);
      // console.log(encount, store.movie.movie[encount].title);
      //
      setJacount(jacount + 1);
      setJatitle(store.ja.ja[jacount].title);
      setJaimg(store.ja.ja[jacount].img);
      //
      setOthercount(othercount + 1);
      setOthertitle(store.other.other[othercount].title);
      setOtherimg(store.other.other[othercount].img);
      //
    }, 2500);

    return () => {
      clearInterval(intervalId);
    }; //có clear và useEffect để chống lag máy vì interval nó sẽ re-schedule để re-render và trong khi re-render đó nó sẽ re-schedule lần nữa khi chưa re-render xong nên cần xóa biến trước trong interval
  });
  // console.log(encount);//bị là nên clg lại ở đây
  //  [encount]//có dept là count hay khoong thì nó vẫn không bị chạy trùng thời gian nhau vì use effect chạy sau khi component render xong
  ////////////////carousel  ở trên////////
  //////welcome para////////
  let user = JSON.parse(localStorage.getItem("users"));
  console.log(user);
  console.log("user", user[user.length - 1].user);
  // console.log("đúng không", user[user.length - 1]);//cái này xuất ra giá trị là object cuối cùng của mảng user nếu có giá tri là true không thì false
  let login = JSON.parse(localStorage.getItem("login")) || {};
  console.log("login", login != {}); //là true //object bản chất là false??tìm hiểu thêm
  console.log("login", login.username);
  // console.log("đúng không", login[login.length - 1] ); //cái này sẽ xuất ra giá trị cuối cùng trong mảng của login nếu login có giá trị thì true còn không có giá trị là false,còn nếu không muốn nó false mà true dù không có giá trị thì: login[login.length - 1]==null hoặc == undefined
  // null,undefined đồng nghĩa với false
  return (
    <>
      {console.log(store.theme.theme)}
      <button
        style={{ position: "fixed", left: "0.2%", width: "5%" }}
        onClick={() => change()}
      >
        set
      </button>
      {/* ////////////// */}
      <div className="page">
        <button onClick={() => nav("/collection/english")}>English</button>
        <button onClick={() => nav("/collection/japan")}>Japan</button>
        <button onClick={() => nav("/collection/other")}>Others</button>
        <button onClick={() => nav("/fav")}>Favorite</button>
        {login.username && ( //Nếu như có tài khoản login thì nút logout còn chưa thì nút login
          <button onClick={() => log()}>Logout</button>
        )}
        {login.username == undefined && (
          <button onClick={() => nav("/login")}>Login</button>
        )}
        <button onClick={() => nav("/register")}>Register</button>
      </div>
      {/* //////// */}
      <div // các thẻ nằm trong container để cho hiệu ứng scroll
        className={"container"}
        style={{
          backgroundColor: store.theme.theme ? "antiquewhite" : "black",
          color: store.theme.theme ? "darkblue" : "antiquewhite",
        }}
      >
        {/* //////// */}
        <div className="one">
          <div>
            {login.username == undefined && (
              <p className="para">Welcome {user[user.length - 1].user} !</p>
            )}
            {login.username && (
              <p className="para">Welcome {login.username} !</p>
            )}
          </div>
        </div>
        {/* ///////////// */}
        <div className="two">
          <div
            onClick={() => nav("/collection/english")} //code navigate không lấy trong store xài được,và phải có dấu"/" trước chữ collection
            className="carousel"
            style={{
              backgroundColor: store.theme.theme ? "antiquewhite" : "black",
              color: store.theme.theme ? "darkblue" : "antiquewhite",
            }}
          >
            <div className="caption">English Movie</div>
            <img src={enimg} alt="" />
            <p className="title"> {entitle} </p>
          </div>
        </div>
        {/* ////// */}
        <div className="two">
          <div
            onClick={() => nav("/collection/japan")}
            className="carousel"
            style={{
              backgroundColor: store.theme.theme ? "antiquewhite" : "black",
              color: store.theme.theme ? "darkblue" : "antiquewhite",
            }}
          >
            <div className="caption">Japanese Movie</div>
            <img src={jaimg} alt="" />
            <p className="title"> {jatitle} </p>
          </div>
        </div>
        {/* ///// */}
        <div className="two">
          <div
            onClick={() => nav("/collection/other")}
            className="carousel"
            style={{
              backgroundColor: store.theme.theme ? "antiquewhite" : "black",
              color: store.theme.theme ? "darkblue" : "antiquewhite",
            }}
          >
            <div className="caption">Others Movie</div>
            <img src={otherimg} alt="" />
            <p className="title"> {othertitle}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
