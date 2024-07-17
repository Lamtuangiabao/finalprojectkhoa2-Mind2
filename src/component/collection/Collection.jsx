import { useNavigate, useParams } from "react-router-dom";
import "./collection.css";
import React, { useContext, useEffect, useState } from "react";
import Cxt from "../store/store";

const Collection = () => {
  const store = useContext(Cxt);
  const [choice, setChoice] = useState([]);
  const { name } = useParams(); //cho list item
  const nav = useNavigate();
  //////////////
  const [title, setTitle] = useState();
  const [ima, setIma] = useState();
  const [overview, setOverview] = useState();
  const [popularity, setPopularity] = useState();
  const [releasedate, setReleasedate] = useState();
  const [orginaltitle, setOrginaltitle] = useState();
  const [votecount, setVotecount] = useState();
  const [voteaverage, setVoteaverage] = useState();

  ////////favorite////
  const [p, setP] = useState([]);
  // c = [choice.find((item) => item.id === e)]; //xài này để đẩygiá trị là  1 object vào 1 biến c dựa trên mảng choice
  const add = (n, index) => {
    const favorite = [...choice];
    favorite[index].n = null;
    console.log();
    if (!store.fav.fav.includes(favorite[index])) {
      //Neesu trong favorite đã chứa phim này thì không cho vào nữa
      store.fav.set([...store.fav.fav, favorite[index]]);
      store.cur.set([...store.fav.fav, favorite[index]]); //current là để cập nhập khi không tìm ra tên phim hoặc đánh bậy hoặc null,lưu ý :xài tiếng anh tránh gõ bằng telex vì nếu sai chính tả phải xóa hết đánh lại từ đầu,xóa nửa chừng nó không trả kết quả??Tìm hiểu thêm
    }

    //
  };
  //
  ///////// show/////
  const show = (n) => {
    choice.map((item, index) => {
      if (n == item.id) {
        setTitle(item.title);
        setIma(item.img);
        setOverview(item.overview);
        setVoteaverage(item.vote_average);
        setPopularity(item.popularity);
        setReleasedate(item.release_date);
        setOrginaltitle(item.original_title);
        setVotecount(item.vote_count);
      }
    });
  };
  //////làm list item /////////
  useEffect(() => {
    name == "english"
      ? setChoice(store.en.en)
      : name == "japan"
      ? setChoice(store.ja.ja)
      : setChoice(store.other.other);
  }, [name]);
  ///////////nếu đã login thì sẽ có nút logout/////////
  let login = JSON.parse(localStorage.getItem("login")) || {};
  return (
    <>
      {/* ////////show/////// */}
      <div className="showi">
        <div>
          <img className="im1" src={ima} alt="" />
        </div>
        {/* ///page/// */}
        <div className="page2">
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
        {/* ///////show content///// */}
        <div className="block">
          <div style={{ color: "aquamarine" }}>{title}</div>
          <div>Overview:{overview}</div>
          <div>Popularity:{popularity}</div>
          <div>Release Date:{releasedate}</div>
          <div>Original Title:{orginaltitle}</div>
          <div>Vote Count:{votecount}</div>
          <div>Vote Average:{voteaverage}</div>
        </div>

        <button className="but1">Watch now</button>
      </div>
      {/* //////item////// */}
      <div className="cover">
        {choice.map((item, index) => {
          // choice[index].n = 1; //sửa ở đây//tại vì để ở đây nên mỗi lần re-render nó lại trả về n=1 ,phải để trong store thì khi re-render mới không bị trả lại lần n=1 lần nữa
          return (
            <>
              {/* //muốn return trong loop phải có <></> */}
              <div onClick={() => show(item.id)} key={index} className="item">
                <div className="title1">{item.title}</div>
                <div>
                  <img className="img1" src={item.img} alt="nthing" />
                  {/* //xài onclick thì phải có ()=>... */}
                </div>
                {(item.n == 1 && (
                  <button className="but3" onClick={() => add(item.id, index)}>
                    MyFav
                  </button>
                )) ||
                  (item.n != 1 && <div className="but3">Added</div>)}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Collection;
