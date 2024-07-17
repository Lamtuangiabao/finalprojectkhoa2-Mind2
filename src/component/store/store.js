import { createContext, useState } from "react";
// const [theme, setTheme] = useState(true);//không thể gọi hook ở đây phải gọi trong 1 function
const defaultValue = {
  //không cần dữ liệu ở kho này chỉ cần có ở store component và không có ngược lại
  //   theme: "light", // không được
  //   theme: true,
  //   set: () => {},
  //   theme: {
  //     value: true,
  //     set: (setTheme) => {},
  //   },
};
const Cxt = createContext(defaultValue);

export default Cxt;
