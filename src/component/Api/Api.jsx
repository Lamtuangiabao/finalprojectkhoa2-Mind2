import React, { useEffect, useState } from "react";

const Api = () => {
  const [da, setDa] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "cff9ba8f8e4d0f88318134f27dd6bd98"; // Replace with your actual API key
  // lấy movie/popular/top_rated/now_playing có thể thế cụm này vào url,tham khảo từ GEMINI
  const popularMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  useEffect(() => {
    //nhớ có popularMoviesURL khai báo ở trên
    const fetchData = async () => {
      try {
        const response = await fetch(popularMoviesURL);
        const data = await response.json();
        setDa(data.results); // Update state with fetched data
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  // console.log("da", da);
  // console.log(
  //   "title",
  //   da.map((item) => item.title)
  // );
  // console.log(
  //   "overview",
  //   da.map((item) => item.overview)
  // );
  // console.log(
  //   "vote_average",
  //   da.map((item) => item.vote_average)
  // );
  // console.log(
  //   "popularity",
  //   da.map((item) => item.popularity)
  // );
  // console.log(
  //   "release_date",
  //   da.map((item) => item.release_date)
  // );
  // console.log(
  //   "original_language",
  //   da.map((item) => console.log(item))
  // );
  const en = [];
  const ja = [];
  const other = [];
  da.map((item) => {
    (item.original_language == "en" && en.push(item)) ||
      (item.original_language == "ja" && ja.push(item)) ||
      other.push(item);
  });
  console.log("en", en);
  console.log("ja", ja);
  console.log("other", other);
  const enimg = [
    "public/ShawshankRedemptionMoviePoster.jpg",
    "public/TheGodFather.png",
    "public/TheGodfatherPartII.jfif",
    "public/Schindler'sList.jfif",
    "public/12AngryMen.jfif",
    "public/TheDarkKnight.jfif",
    "public/TheGreenMile.jfif",
    "public/PulpFiction.jfif",
    "public/TheLordoftheRingsTheReturnoftheKing.jfif",
    "public/ForrestGump.jfif",
    "public/GoodFellas.jfif",
  ];

  const jaimg = [
    "public/SpiritedAway.jfif",
    "public/YourName..jfif",
    "public/GraveoftheFireflies.jfif",
    "public/DoukyuseiClassmates.jfif",
    "public/SevenSamurai.jfif",
  ];

  const otherimg = [
    "public/DilwaleDulhaniaLeJayenge.jfif",
    "public/Parasite.jfif",
    "public/TheGoodtheBadandtheUgly.jfif",
    "public/ImpossibleThings.jfif",
  ];
  /////////////
  en.length > 0
    ? en.map((item, index) => {
        //nó quy định biến đầu là item và biến thứ 2 là index chứ nó không quy định bằng tên,ví dụ biếng đầu có là index thì nó vẫn hiện ra là item
        // console.log("index", index);
        en[index].image = enimg[index];
        // key = { index };
        // en[index].push(item);
        // console.log("enIndex", en[index]);
      })
    : "";
  ////////////////
  // en.length > 0 ? (en[0].img = "item") : ""; //phải xử lý trường hợp thằng "en" chưa có giá trị lúc đầu vì chưa kịp fetch ra giá trị nên ban đầu nó sẽ là null
  // en.length > 0 ? (en[0]["img"] = "item") : ""; cách 2
  console.log("en 0", en[0]);
  return (
    <>
      <div>api</div>
      <img src="public/TheGodfatherPartII.jfif" alt="" />
      <img src={enimg[0]} alt="" />
    </>
  );
};

export default Api;
