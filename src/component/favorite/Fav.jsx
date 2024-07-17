import { useNavigate } from "react-router-dom";
import Cxt from "../store/store";
import "./fav.css";
import React, { useContext } from "react";

const Fav = () => {
  const nav = useNavigate();
  const store = useContext(Cxt);
  let login = JSON.parse(localStorage.getItem("login")) || {};
  // console.log("đúng không", login[login.length - 1] ); //cái này sẽ xuất ra giá trị cuối cùng trong mảng của login nếu login có giá trị thì true còn không có giá trị là false,còn nếu không muốn nó false mà true dù không có giá trị thì: login[login.length - 1]==null hoặc == undefined
  // null,undefined đồng nghĩa với false
  ////////////search/////
  const search = (n) => {
    let r = n.trim().toLowerCase();
    const filter = store.cur.cur.filter(
      //ở đây không để là store.fav.fav vì nó sẽ đảm nhận phần hiện thị ra màn hình nên cần một biến cố định là store.cur.cur về tất cả phim được chứa,còn store.fav.fav khi được set lại nó sẽ mất một số phim để lọc ra do mảng filter để hiển thị lên màn hình
      (item) => item.title.toLowerCase().includes(r) && item //không thể xài == r mà phải sử dụng include ví bằng thì nó sẽ xét tất cả giá trị chứ không từng ký tự như includes() và includes() có "s"
    );
    console.log("fil", filter);
    n !== "" ? store.fav.set(filter) : store.fav.set([...store.cur.cur]); //nếu để khác space(!" "):phải nháy ở ô input để hiện lại tất cả,nếu nó không hiện thì hãy bấm phím space thêm lần nữa//còn nếu để !==null (!=="") không có dấu cách nó sẽ hiện lại tất cả
    console.log("current", store.cur.cur);
    // console.log("storefav", store.fav.fav); //xài mảng bình thường thì không trigger set up lại UI ,phải sử dụng useState mà sử dụng useState thì vẫn bỏ vào favorite được chỉ là  cập nhập nút MyFav thành nút Added được thì phải nhấp 2,3 lần vào số phim đã cho vào favorite
  };
  return (
    <>
      <div className="page">
        <button onClick={() => nav("/main")}>Main</button>
        <button onClick={() => nav("/collection/english")}>English</button>
        <button onClick={() => nav("/collection/japan")}>Japan</button>
        <button onClick={() => nav("/collection/other")}>Others</button>
        <button onClick={() => nav("/fav")}>Favorite</button>
        {login.username && ( //Nếu như có tài khoản login thì nút logout còn chưa thì nút login
          <button onClick={() => nav("/login")}>Logout</button>
        )}
        {login.username == undefined && (
          <button onClick={() => nav("/login")}>Login</button>
        )}
        <button onClick={() => nav("/register")}>Register</button>
      </div>
      <div className="fav">
        <div className="h2">
          <h2>Your Favourite here!</h2>
        </div>

        <input
          placeholder="Search your favorite"
          onChange={
            (e) => search(e.target.value)
            // console.log(e.target.value !== " ") //nếu nó là rỗng trên input
          }
          className="in2"
          type="text"
        />

        {store.fav.fav &&
          store.fav.fav.map((item) => (
            <>
              <div className="div">
                <img className="i2" src={item.img} alt="" />
                <div className="t2">{item.original_title}</div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Fav;
