import React, { useEffect, useState } from "react";
import Cxt from "./store";
import { useNavigate } from "react-router-dom";

const StoreComponent = (props) => {
  const en = [];
  const ja = [];
  const other = [];
  const [theme, setTheme] = useState(true);
  const [movi, setMovi] = useState([]);
  const [favorite, setFavorite] = useState([]); //xài state khởi tạo là mảng nếu muốn spread lại giá trị là chính favorite và nếu kiểu dữ liệu của favorite đó là mảng
  const [current, setCurrent] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "cff9ba8f8e4d0f88318134f27dd6bd98"; // Replace with your actual API key
  // lấy movie/popular/top_rated/now_playing có thể thế cụm này vào url,tham khảo từ GEMINI
  const popularMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  ///////////////api/////
  useEffect(() => {
    //nhớ có popularMoviesURL khai báo ở trên
    const fetchData = async () => {
      try {
        const response = await fetch(popularMoviesURL);
        const data = await response.json();
        setMovi(data.results); // Update state with fetched data
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  ///////////////lấy mảng riêng từng ngôn ngữ////
  movi.map((item) => {
    (item.original_language == "en" && en.push(item)) ||
      (item.original_language == "ja" && ja.push(item)) ||
      other.push(item);
  });
  ///////kiểm tra giá trị in ra////
  // console.log("movi", movi);
  // console.log("en", en);
  // console.log("ja", ja);
  // console.log("other", other);
  // console.log("fav", favorite);
  // console.log("cur", current);
  ////////////lấy mảng hình///////
  const enimg = [
    "/ShawshankRedemptionMoviePoster.jpg",
    "/TheGodFather.png",
    "/TheGodfatherPartII.jfif",
    "/Schindler'sList.jfif",
    "/12AngryMen.jfif",
    "/TheDarkKnight.jfif",
    "/TheGreenMile.jfif",
    "/PulpFiction.jfif",
    "/TheLordoftheRingsTheReturnoftheKing.jfif",
    "/ForrestGump.jfif",
    "/GoodFellas.jfif",
  ];

  const jaimg = [
    "/SpiritedAway.jfif",
    "/YourName..jfif",
    "/GraveoftheFireflies.jfif",
    "/SevenSamurai.jfif",
  ];

  const otherimg = [
    "/DilwaleDulhaniaLeJayenge.jfif",
    "/Parasite.jfif",
    "/TheGoodtheBadandtheUgly.jfif",
    "/ImpossibleThings.jfif",
    "/la-vita-e-bella-aka-life-is-beautiful-date-1997-K3715T.jpg",
  ];
  ////////////////////đẩy hình vào mảng chính của từng ngôn ngữ////////////
  en.length > 0
    ? en.map((item, index) => {
        //nó quy định biến đầu là item và biến thứ 2 là index chứ nó không quy định bằng tên,ví dụ biếng đầu có là index thì nó vẫn hiện ra là item
        en[index].img = enimg[index];
        en[index].n = 1;
      })
    : "";

  ja.length > 0
    ? ja.map((item, index) => {
        //nó quy định biến đầu là item và biến thứ 2 là index chứ nó không quy định bằng tên,ví dụ biếng đầu có là index thì nó vẫn hiện ra là item
        ja[index].img = jaimg[index];
        ja[index].n = 1; //để cho favorite nút Add//chỉ cần trang load lại haowjc save trên visual thì dữ liệu trong mảng favorite sẽ mất nên chỉ dùng thanh navbar được code trên màn hình thôi
      })
    : "";

  other.length > 0
    ? other.map((item, index) => {
        //nó quy định biến đầu là item và biến thứ 2 là index chứ nó không quy định bằng tên,ví dụ biếng đầu có là index thì nó vẫn hiện ra là item
        other[index].img = otherimg[index];
        other[index].n = 1;
      })
    : "";
  //////////////////////api////////
  // console.log(ja);
  return (
    //
    <Cxt.Provider
      value={{
        theme: { theme: theme, set: setTheme },
        movie: { movie: movi, set: setMovi },
        en: { en: en },
        ja: { ja: ja },
        other: { other: other },
        fav: { fav: favorite, set: setFavorite }, //ở đây
        cur: { cur: current, set: setCurrent },
      }}
    >
      {props.children}
    </Cxt.Provider>
  );
};

export default StoreComponent;
