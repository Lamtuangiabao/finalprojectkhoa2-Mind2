import React, { useState } from "react";
import "./pre.css";
import { useNavigate } from "react-router-dom";
const Pre = () => {
  const [isActive, SetActive] = useState(false);
  const [ok, setOk] = useState(false);
  const a = Array(20).fill(null);
  let b;
  //Lưu ý:sử dụng biến cục bộ thì không xài lại được ,nên hãy xài biến global để có thể cập nhập thêm hoặc cập nhập lại giá trị bất cứ khi nào
  //thật ra xài biến cục bộ vẫn được thì mỗi lần muốn gán lại thì tạo một biến cục bộ mới chứa giá trị cũ và cập nhập như bình thường
  let i = 0;
  const navigate = useNavigate();
  ///////////////
  ///////////////
  const onfinish = (value) => {
    if (!localStorage.users) {
      //nếu value của key tên users chưa có giá trị thì tạo mảng rỗng có tên key users
      const users = [];
      users.push(value);
      localStorage.setItem("users", JSON.stringify(users)); //chuyển dữ liệu thành dạng string = stringtify rồi lưu trữ vào localStorage bằng setItem với key là "users"
    } else {
      const users = JSON.parse(localStorage.getItem("users")); //lấy dữ liệu value của key có tên là "users" ra bằng getItem rồi sau đó JSON.parse để chuyển nó thành dữ liệu dạng JSON để cập nhập thêm dữ liệu mới
      users.push(value);
      localStorage.setItem("users", JSON.stringify(users));
    }
    console.log(localStorage.users); //là cái content nội dung value chứu không phải key nằm bên trong localStorage
  };
  //////////////////////////////////
  return (
    <>
      <section className="section">
        <div className="Bubble">
          {a.map((item, index) => (
            <span className="pan" key={item} style={{ "--i": index }}>
              hi
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder=" "
          className="Username"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              i += 1;
              if (i == 1) {
                console.log(i);
                b = e.target.value;
                SetActive(true);
                // SetActive(!isActive)//không thể xài cái này vì nó sẽ đổi lại label ban đầu
                // : SetActive(true);
              }
              if (i == 2) {
                console.log(i);
                setOk(true);
                ////////////////////////
                // const users = JSON.parse(localStorage.getItem("users")) || [];//cái này là để phòng rường hợp chưa có key users trong localStorage
                // users.push(value);
                // localStorage.setItem("users", JSON.stringify(users));
                /////////////////////
                let value = { user: b };
                onfinish(value);
                setInterval(() => {
                  navigate(`/main`);
                }, 2000);
              }
            }
          }}
        />
        <label htmlFor="name" className={isActive ? "hide" : "label"}>
          Your name:
        </label>
        <div id="confirm" className={isActive ? "show" : "hide"}>
          Sure?
        </div>

        <div id="confirm1" className={ok ? "show" : "hide"}>
          Ok!
        </div>
      </section>
    </>
  );
};
export default Pre;
