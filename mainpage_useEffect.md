import React, { useContext, useEffect, useState } from "react";
import "./mainpage.css";
import Cxt from "../store/store";

const Main = () => {
const store = useContext(Cxt);
const [count, setCount] = useState(0);
const [title, setTitle] = useState();
const change = () => {
store.theme.set(!store.theme.theme);
};
/////////////////////////////////
// console.log("store movie nè", store.movie.movie[0]);
// useEffect(() => {
// const carousel = () => {
// let i = 0;
// let title;
// // console.log(i);

// // const repeat = setInterval(() => {
// if (i < store.movie.movie.length) {
// title = store.movie.movie[i].title;
// console.log(store.movie.movie[i].title);
// console.log("i", i);
// console.log("title", title);
// i = i + 1;
// console.log("i", i);
// }
// // }, 1000);
// // // repeat();
// // console.log("clear nha");
// // return clearInterval(repeat);
// };
// }, []);
// carousel();
// giải thích tại sao if (i < store.movie.movie.length...) not work:Direct DOM Manipulation (Not Recommended):

// While technically possible, directly manipulating the DOM is not generally recommended in React. It's better to manage state and let React handle the re-rendering efficiently.
// I'd be glad to explain why directly manipulating the DOM within useEffect is not recommended in React:

// 1. Breaks React's Declarative Model:

// Declarative Approach: React thrives on a declarative paradigm. You describe the desired UI state using JSX, and React handles efficiently updating the DOM to match that state.
// Bypassing the System: Direct DOM manipulation undermines this approach. You're reaching into the DOM to make changes yourself, making the code less readable and harder to maintain in the long run.
// 2. Performance Issues:

// Virtual DOM Advantage: React uses a virtual DOM, an in-memory representation of the UI. This allows React to compare changes between the current virtual DOM and the desired new state. It then updates only the necessary parts of the real DOM, resulting in efficient rendering.
// Losing Efficiency: Directly manipulating the DOM bypasses the virtual DOM. React is unaware of these changes, and it might trigger unnecessary re-renders, especially as your application scales. This can lead to performance bottlenecks.
// 3. Debugging Challenges:

// State Tracking Difficulty: When you directly manipulate the DOM, it becomes harder to track how the UI state changes. The state isn't explicitly managed by React.
// Hidden Issues: Debugging becomes more complex as you need to examine both your component code and the actual DOM structure to pinpoint problems.
// 4. Testing Challenges:

// Unit Testing Complications: React components with direct DOM manipulation can be challenging to unit test effectively. Unit tests often focus on isolating a component and its behavior, but direct DOM manipulation adds another layer of complexity.
// Mocking Requirements: To test components that manipulate the DOM directly, you might need to mock or simulate the DOM environment, which can be cumbersome and add overhead to your testing process.
// 5. Consistency and Cross-Component Issues:

// Inconsistency Risk: Direct DOM manipulation can lead to inconsistencies in the UI if multiple components try to modify the same DOM element concurrently. Consistency can become difficult to maintain.
// Cross-Component Management Challenges: When multiple components interact with the same DOM element through direct manipulation, it becomes more challenging to manage their state and interactions effectively.
// Benefits of State Management:

// By managing state in React, you gain several advantages:
// Clarity: State variables make the code more readable and easier to understand.
// Maintainability: Changes to the UI are centralized in the state management logic, making updates easier to manage.
// Predictability: React's rendering engine ensures updates to the DOM are consistent and predictable based on the state.
// Testability: State-managed components are easier to unit test, improving code quality and reliability.
// Alternatives to Direct DOM Manipulation:

// Use state variables to manage the data that drives the UI.
// Update the JSX elements in your component based on changes in the state.
// React will handle the efficient re-rendering of the DOM based on the updated state.
// In Summary:

// While direct DOM manipulation might seem like a quick solution in simple cases, for a more robust, maintainable, and performant React application, it's best to leverage React's state management approach. By embracing declarative UI descriptions and state-driven updates, you'll benefit from better readability, easier debugging, superior performance, and improved testability in the long run.
///////////////////
//////////////carousel work ở dưới////
// useEffect(() => {
// const intervalId = setInterval(() => {
// // let i = 0;

// console.log("title", title);
// setCount(count + 1);
// setTitle(store.movie.movie[count].title);
// console.log(count, store.movie.movie[count].title);
// }, 1000);

// return () => {
// clearInterval(intervalId); //preventing memory leaks When a React component unmounts, it means it's being removed from the DOM (Document Object Model), the virtual representation of the web page that the browser renders.
// //Removing event listeners that were attached in useEffect or the component's event handlers (e.g., onClick, onMouseEnter) to prevent memory leaks and potential issues.
// // Cancelling timers or intervals created within useEffect to avoid unwanted side effects after the component is no longer present.
// // Closing any external connections or resources that were opened by the component, such as database connections or subscriptions to API endpoints.
// };
// }, [count]);
////////////////carousel ở trên work
// work nhưng bị lập lại console.log trong 1 giá trị có khi có và có khi không ,ví dụ: giá trị i=0 thì in ra 2 lần và cứ thế
let i = 0;

const a = setInterval(() => {
//trong lúc component render thì setInterval cũng đang đọc,dẫn đến bị lag vì trùng nhau khi renders
//Giải thích tại sao nó chạy loạn: The setInterval function schedules a callback function to be executed repeatedly at a specified interval. However, in this case, the callback function is directly modifying the i variable, which is likely causing a re-render of the component. This re-rendering triggers another call to setInterval, which in turn modifies the i variable again, leading to an infinite loop of re-renders and preventing the callback function from executing properly
if (i < 10) {
console.log(i);
}
i = i + 1;
i > 10 && (i = 0);
}, 1000);
a;
clearInterval(a);//để ở đây không chạy vì chưa kịp setInterval xong thì bị clear mất do code chạy từ trên xuống dưới và setInterval thì set sau khi component render xong
return (
<>
{console.log(store.theme.theme)}

<!-- <button onClick={() => change()}>set</button>
<div
className={"container"}
style={{ backgroundColor: store.theme.theme ? "red" : "black" }}
// theme.theme === "light" && "{ backgroundColor: "red" }" >
<div className="one">
<div>
{/_ //thẻ div bọc (p có animation type thì không được custom style trừ scroll) _/}
{/_ Hạn chế custom style cho các thẻ như div span p ... vì nó sẽ ảnh hưởng những component khác,cách giải quyết là tạo className _/}
<p className="para">yesfsfsfsfdfdsfsdfv</p>
</div>
</div>
<div className="two">
{/_ <p className="para">dcm</p> _/}
<div style={{ color: "white", fontSize: 100 }}>
{/_ Hello {store.movie.movie[18].title} _/}
{/_ {title} _/}
</div>
<p>You clicked {title} times</p>
{/_ {store.movie.movie[count].title} _/}
</div>
</div>
</>
);
};
export default Main; -->

//////////////carousel ////
useEffect(() => {
if (count > store.movie.movie.length) {
setCount(0);
} //không được để cái này trong setInterval vì sao nó không chạy mà để ở ngoài mới chạy??

// Giải thích:setinterval hoạt động theo cách gối đầu vì vậy khi component re-render lại vì biến count thay đổi thì nó sẽ
const intervalId = setInterval(() => {
console.log("title", title);
console.log(count);
console.log("lenght", store.movie.movie.length);

      setCount(count + 1); //component chạy//setInterval chạy
      setTitle(store.movie.movie[count].title);
      console.log(count, store.movie.movie[count].title);
    }, 1000);

    return () => {
      clearInterval(intervalId);//phải clear để nó không nháy và bị gọi cùng lúc khi chưa render xong
    };

}, [count]);
////////////////carousel////////
giải thích để ở reset count=0 trong Interval thì không chạy:
Tóm tắt:code chạy từ trên xuống nên khi setInterval đến 1s mới cho setCount lại thì thằng set Count ở ngoài sẽ được update trước,còn nếu để trong cùng khoảng thời gian để setState nó sẽ lấy giá trị setState cuối cùng
when you call setState multiple times within the same render cycle for a single state variable, React will batch those updates and only use the final value in the subsequent re-render.

Here's a breakdown of the process:

State Updates Trigger Re-render: When you call setState, React schedules the component for a re-render. However, it doesn't immediately update the state or re-render the component.
Batching Updates: React batches all setState calls made within the current event handler or lifecycle method. This optimization helps minimize unnecessary re-renders, especially when dealing with multiple state updates in response to a single user interaction.
Final State Used: During the re-render, React uses the most recent state value from all the batched setState calls. So, if you call setState twice for the same state variable, the component will only re-render once and use the value from the second call.
React will batch these updates and only re-render the component once. During the re-render, it will use the updated value from the second setState call, which will be the doubled value of count.

Key Points:

Batching improves performance by reducing unnecessary re-renders.
The final state value from batched updates is used in the re-render.
Be mindful of potential side effects when using multiple setState calls within the same render cycle.
