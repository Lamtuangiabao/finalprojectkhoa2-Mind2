////////////////////////////////
// const [f, setf] = useState(2);
// // setf(1);
// useEffect(() => {
// // setf((pre) => pre + 1);//go infinite with no bracket
// // f = f + 1;
// setf(f + 1); //go infinite with no bracket
// // setf(1); //not go infinite no bracket
// console.log("f trong useE", f);
// giải thích not go infinite: Asynchronous Updates in React: React updates are asynchronous. This means that when you call setf(1), the state update doesn't happen immediately. It gets scheduled for the next update cycle.
// useEffect Runs at a Specific Point: The useEffect hook runs after the component has rendered and before the DOM is updated. This means that when the console.log("f trong useE", f); statement executes inside the useEffect, the value of f might still be the old value (2) because the update hasn't been applied yet.
// Here's a breakdown of what happens:
// Initial Render:
// The component renders for the first time with f set to its initial value (2).
// console.log("f ngoài", f); logs the initial value (2).
// The useEffect hook runs because it's the initial render.
// State Update:
// Inside the useEffect, setf(1) triggers a state update to change f to 1.
// Asynchronous Update:
// React schedules the state update for the next update cycle.
// useEffect Console Log:
// The console.log("f trong useE", f); statement executes before the state update is applied.
// At this point, f might still have the old value (2) because the update hasn't happened yet.
// Component Re-render (Not Shown):
// React detects the state change and schedules a re-render of the component (not explicitly shown in the code).
// No Infinite Loop:
// Even though the dependency array in useEffect isn't empty, the asynchronous nature of updates and the timing of the console.log statement prevent an infinite loop.
// The useEffect runs only once after the initial render (not again because f doesn't change).
// }, []); //bracket to make sure run only once
// console.log("f ngoài", f);
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////if render with useState anh setc is undefined it will infinite loop no matter the value in set is//
// const [c, setc] = useState([]);
// setc(undefined);
//giải thích: Calling setState (or its functional equivalent with useState) always triggers a re-render of the component and its descendants. This is because React needs to update the virtual DOM and potentially the real DOM to reflect the changes in state.
// Scenario:
// You have a component with useState for count and a useEffect hook with an empty dependency array ([]).
// What Happens:
// Initial Render:
//The component renders for the first time with count at its initial value (usually 0).
// useEffect runs because it's the initial render, and the dependency array is empty.
// State Update:
// Inside the useEffect, setCount(1) updates the state, changing count to 1.
// Re-render:
// React detects the state change and triggers a re-render of the component.
// useEffect Skipped:
// Since the dependency array is empty ([]), the useEffect hook won't run again because it already ran once after the initial render. Even though setCount triggers a re-render, the useEffect itself isn't affected by subsequent state changes due to its empty dependency array.
// Key Points:
// The empty dependency array in useEffect ensures the code inside the effect runs only once after the initial render.
// useState updates always trigger re-renders, regardless of where they occur (within useEffect or elsewhere).
// Subsequent re-renders caused by state changes don't trigger the useEffect again if its dependency array is empty.
// In essence:
// useEffect with an empty array controls the execution of the code within it. It runs once after the initial render.
// useState updates drive re-renders, even if triggered from within useEffect.
// Additional Notes:
// This behavior allows you to perform side effects like fetching data or setting up subscriptions only once after the component mounts.
// Remember that the component itself will re-render whenever the state changes, even if the useEffect with the empty array doesn't run again.
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log("da before fetch:", da);
// Asynchronous Behavior:
// setState is asynchronous, meaning it doesn't guarantee immediate state updates. The actual update happens in a separate batch at the end of the event loop.
// This asynchrony is crucial for performance optimization. By batching updates, React avoids unnecessary re-renders, especially when multiple setState calls occur within a short timeframe.
// Understanding the Process:
// Scheduling Update: When you call setState, React schedules the state update for later.
// Batching Updates (Optional): If multiple setState calls happen within the same event loop, React might batch them together to optimize performance.
// State Update and Re-render: At the end of the event loop, React performs the state update(s) and triggers a re-render of the component(s) whose state has changed.
// Key Points:
// Don't rely on the state being updated immediately after calling setState.
// Use the callback function for actions that require the updated state.
// Asynchronous nature is essential for performance.
// State Update:
// When you call setDa to update the state, the change is registered internally by React.
// Console.log Placement:
// Before State Update:
// If you place console.log before the setDa call, it will log the previous state value. This is because the state hasn't been updated yet.
// If you place console.log before calling setDa to update the state, it will log the previous state value.
// At this point, the virtual DOM hasn't changed, and the re-render hasn't been triggered.
// Virtual DOM Update:
// After State Update (Before Re-render):
// After the state update, React creates a new virtual DOM reflecting the updated state.but the REAl DOM might not be updated yet.
// Virtual DOM and Re-render:
// React maintains an in-memory representation of the UI called the virtual DOM.
// When the state changes (like with setDa), React creates a new virtual DOM reflecting the updated state.
// It then compares the previous virtual DOM with the new virtual DOM to identify the minimal changes needed in the real DOM.
// Based on this comparison, React schedules a re-render of the component to update the actual UI on the screen.
// console.log Placement:
// You can place console.log statements anywhere in your component's code.
// Its position determines what it logs relative to the virtual DOM and re-render:
// If you place console.log after calling setDa but before the re-render, it will log the updated state value.
// React has registered the state change, but the virtual DOM comparison and re-render haven't happened yet.
// Console.log after setDa:
// If you place console.log after the setDa call but before the re-render, it will log the updated state value. This is because the state has been updated in memory, but the real DOM hasn't been changed yet.
// Diffing and Re-render:
// React compares the previous virtual DOM with the new one to identify minimal changes. Based on the diff, it schedules a re-render of the component.
// Console.log Irrelevant in Re-render:
// There's no point in placing console.log within the re-render function itself. The re-render function is for building the updated UI based on the state, not for logging messages.
// Real DOM Update:
// Finally, React applies the necessary changes to the actual DOM in the browser, reflecting the updated UI.
// Key Points:
// console.log is a debugging tool that runs in the JavaScript engine.
// Its placement determines what state value it captures: before or after state updates.
// The virtual DOM is an in-memory representation for comparison, not a separate environment for code execution.
// before re-render the state in useState already been updated
// However, due to optimizations, React might not always call render for every re-render (e.g., with React.memo).
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// Explain the sequence: Successful Fetch:
// After a successful fetch, the then block executes.
// Inside the then block:
// The response is parsed as JSON.
// The parsed data is used to update the da state variable using setDa.
// State Update Registered:

// Calling setDa with a new value informs React that the state has changed.
// React schedules the component for re-rendering, but it doesn't happen immediately.
// Component Re-render:

// After some internal processing (potentially other state updates), React triggers the re-render of the component.
// JSX with Updated State:

// During the re-render, React has access to the updated state value (da).
// The JSX elements are evaluated again, and the component can now use the fetched data from da to render the appropriate content.
/////////////////////////////////////////////////////
//////////////////////// apiReadAccessToken////////
///api key là để mở khóa data cùng Authorization:`Bearer ${apikey}`}//chatGPT
// const apiReadAccessToken =
// "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmY5YmE4ZjhlNGQwZjg4MzE4MTM0ZjI3ZGQ2YmQ5OCIsIm5iZiI6MTcyMDE4NDQzNC42MjEzNjcsInN1YiI6IjY2ODdlYmI1NTE0ZjQ1NWNkOWRlZjY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jzou3nxK0uvkQAIgdzcYg2WR54We1iu5-pHqlg24OEM";
// const options = {
// method: "GET",
// headers: { accept: "application/json", Authorization: `Bearer ${apiReadAccessToken}` },
// };

// fetch(
// "https://api.themoviedb.org/3/movie/550?api_key=cff9ba8f8e4d0f88318134f27dd6bd98",
// options
// )
// .then((response) => response.json())
// .then((response) => console.log(response))
// .catch((err) => console.error(err));
/////////////////////ở dưới củaTMDB: Here's an example API request:https://api.themoviedb.org/3/movie/550?api_key=cff9ba8f8e4d0f88318134f27dd6bd98 trong email lam../////////////////////////////////////
// const options = {
// method: "GET",
// headers: {
// accept: "application/json",
// Authorization:
// "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmY5YmE4ZjhlNGQwZjg4MzE4MTM0ZjI3ZGQ2YmQ5OCIsIm5iZiI6MTcyMDE4NDQzNC42MjEzNjcsInN1YiI6IjY2ODdlYmI1NTE0ZjQ1NWNkOWRlZjY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jzou3nxK0uvkQAIgdzcYg2WR54We1iu5-pHqlg24OEM",
// },
// };

// fetch("https://api.themoviedb.org", options)
// .then((response) => response.json())
// .then((response) => console.log(response))
// .catch((err) => console.error(err));
////////////////////////////////////////////////////////
///////////////////////////ở dưới của Gemini lấy movie/popular/top_rated/now_playing//////////////////////////
// Giải thích:Potential Cause of Infinite Loop with setDa:
// Initial State: You initialize da as an empty array (useState([])).
// The primary reason setDa could cause an infinite loop is due to a concept called "state updates based on previous state" in React. When you update a state variable in React, the component re-renders. If the update logic within your setDa function relies on the previous value of da, it can create a loop where the state keeps getting updated based on itself, leading to continuous re-renders.
// example:setDa(da + 1).
// If result is initially empty, result[0].results would be undefined. When setDa is called with undefined, the component re-renders. However, since the state update is based on the previous state (which was empty array "da"), setDa might be called again with the same undefined value, triggering another re-render, and so on, creating an infinite loop.
// Solution:
// const [error, setError] = useState(null);
// const apiKey = "cff9ba8f8e4d0f88318134f27dd6bd98"; // Replace with your actual API key
// const popularMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
// useEffect(() => {
// const fetchData = async () => {
// try {
// const response = await fetch(popularMoviesURL);
// const data = await response.json();
// setDa(data.results); // Update state only once with fetched data
// } catch (error) {
// setError(error);
// }
// };

// fetchData();
// }, []); // Empty dependency array ensures fetching data only once
///////////////////////truy xuất data ở trên///////////////////////////
//////////////////ở dưới không thể xài await outside a function /////////////////////
// const response= await fetch(popularMoviesURL, options);
// const data=await response.json();
// result.push(data.results)
// giải thích:You cannot use await directly in the render method of a React component because React's render method expects synchronous code. await is an asynchronous keyword that pauses the execution of the function until a Promise is resolved. Since the render method needs to return JSX immediately, it's not compatible with waiting for asynchronous operations.
//////////////////////////////////////////////////////
///////////////apiKey + option/////////////////////////////////
const apiKey = "cff9ba8f8e4d0f88318134f27dd6bd98"; // Replace with your actual API key

// const options = {
// method: "GET",
// headers: {
// accept: "application/json",
// },
// };

const popularMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

// fetch(popularMoviesURL, options)
// .then((response) => {
// // i += 1;
// // console.log(i);
// console.log("1 trong response"); // Log within the first .then
// // // Return the Promise from response.json() to pass data to next .then
// console.log("da ở response", da);
// return response.json();

// console.log("response nè", response.json());//not work,explain ở dưới
// Fetch Response Body: When you make a fetch request, the response object contains a body stream that holds the actual data from the server. This stream can only be read once.
// // json() Method: The json() method on the response object is used to parse the body stream into a JSON object. However, this method consumes the stream, meaning you cannot call it again on the same response object.
// Calling json() Multiple Times: If you try to call response.json() more than once, you'll get this error because the stream has already been consumed.
// Incorrect State Update Logic: If your code updates state based on the response object itself (e.g., setDa(response)), and then tries to access response.json() later, it might lead to this error.
// })
// .then((data) => {
// // i += 1;
// if (data) {
// console.log("hello");
// } //work
// // console.log(i);//work
// console.log("2 ở trong data");
// result.push(data); //work
// console.log("result1", result); //work
// console.log("setDa", setDa(data.results), da); //not good
// console.log("da ở data:", da); //work
// Giải thích tại sao da đã có giá trị vào lần fetch đầu tiên nhưng console.log ra vẫn là rỗng:
// console.log is also asynchronous. When you place it after setState, it might still be referencing the old state object before the update has fully processed
// // Your console.log statement might be executing before the actual state update and re-render.
// Understanding the Asynchronous Nature:
// The key to remember is that both setState and console.log are asynchronous operations in React.
// setState schedules a re-render, but the UI doesn't update instantly. React batches state updates for performance.
// console.log takes a snapshot of the state at the time it's called, which might not yet reflect the scheduled update.
// Since setState is asynchronous, by the time your console.log runs, the state might not yet be reflected in the component's internal state object.
// d = result; //work
// console.log("d", d);//work
// setDa(data.results);
// If there's a loop that iterates over da and updates state within the loop body, it could lead to a loop. Consider updating state outside the loop or using a different approach
// console.log("data1 nè", data.results); // work nha
// if (data) {
// console.log("data nè", data);
// } //work
// console.log("results nè", result[0].results); //work
// result[0].results.map((item, index) => {//ngoặc 1
// key = index;
// console.log(index); //work
// console.log(item.title); //work
// console.log(item.backdrop_path); //work
// result && setDa(result[0].results); //not work
// });///ngoặc 1
// console.log("hello");//work
// console.log("Popular Movies:", data);//work
// console.log("result:", data.result);//work
// console.log("result:", result);//work
// })
// .then(console.log(result[0].results)); //not work
// .catch((err) => console.error(err)); ///dòng cuối của code luôn là error
giải thích:The fetch function is asynchronous. It makes a network request to the API and retrieves data in the future. Your console.log(result[0]) statement is outside the .then callback, which means it executes before the data is fetched and stored in the result array.
///////////////////////////////////////////////////
////////////////////////////////////
// Here's how you can handle fetching data asynchronously within a React component:
// 1. Using useEffect hook:
// The useEffect hook allows you to perform side effects in functional components.
// Inside useEffect, you can use fetch to make the API call and store the fetched data in a state variable using useState.
// 2. Using a Promise-based approach:
// You can create a separate function to handle the fetching process using fetch.
// This function would return a Promise that resolves with the data or rejects with an error.
// You can then call this function inside your component and access the data within the .then callback of the Promise.
// This approach might be useful if you need to reuse the fetching logic in different parts of your application.
// Remember to handle potential errors in both approaches using try...catch blocks or error state management.
// console.log("/da ngoài fetch", da);

// Incorrect update logic relying on previous state
////////////////////////////////////////////////
// const [da, setDa] = useState(0);

<!-- // const handleClick = () => { -->

// // setDa(da + 1); // This cause no an infinite loop
// setDa((pre) => {
// return pre + 1;
// }); //kết quả same

  <!-- {/* <button onClick={handleClick}>Increment</button> */} -->

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
What Happens During Re-render:

State or Prop Change: When the state of a component is updated using setState or when the component receives new props, React schedules a re-render.
render Function Called: During the re-render process, React calls the component's render function again.
JSX Returned: The render function returns JSX code that defines the component's UI.
Virtual DOM Diff: React compares the new virtual DOM generated from the render function with the previous virtual DOM.
Minimal DOM Updates: Based on the diff, React determines the minimal changes needed in the actual browser DOM and performs those updates.
Re-rendering in React.js

Refers to the process where React executes a component's render function again, potentially with updated data.
This happens when:
The component's state changes using setState.
The component receives new props from its parent.
A parent component re-renders, triggering a re-render of its children as well (unless optimized with React.memo).
The re-rendering process involves:
Generating a new virtual DOM based on the component's current state and props.
Comparing the new virtual DOM with the previous one using a diffing algorithm.
Applying minimal DOM updates to reflect the necessary changes in the actual browser DOM.
By using a callback function with setState, you can access the previous state value safely and handle the empty case:
setCount((prevCount) => (prevCount === null ? 1 : prevCount + 1));

The callback receives prevCount (previous state).
If prevCount is null (empty), we set the new count to 1 (initial value).
If prevCount has a value, we increment it normally.
React's Component Lifecycle:

React components follow a specific lifecycle:

Initialization: The component is created and the initial state is set.
Render: The component's render function is called to generate the JSX for the UI.
State Updates: If setState is called within the render function or lifecycle methods, React re-renders the component.
DOM Updates: React updates the actual DOM elements in the browser to reflect the changes in the JSX.
React doesn't blindly update the DOM for every re-render.
It performs a shallow comparison between the old and new virtual DOM to determine the minimal changes needed.
If you explicitly set the state to the same value it already has, the shallow comparison might not detect the change.
This is because React compares object references by default, not the actual values within the objects (unless you use deep comparison libraries).
Even though the values are the same, React might perceive a change due to the different object references, triggering an unnecessary re-render.
Shallow Comparison and Re-renders:

React performs a shallow comparison by default when comparing the previous and new state values.
This means it checks if the object references are the same, not necessarily the actual values within the objects.
Even if you set the state to the exact same value it already has, the object reference might change due to React's internal state management.
React interprets this change in reference as a state update, triggering a re-render of the component.
shallow comparison by default. This means it compares object references, not the actual values within the objects.

Here's a breakdown:

Object References:

Imagine objects like boxes. Each box has a unique address in memory, which is its reference. When you assign an object to a variable, you're essentially storing the memory address of that object.
Even though obj1 and obj2 have the same properties and values, they are different objects because they have different memory addresses.

The problem arises when you modify an existing object in your state. Since the object reference remains the same, React might not detect the change, even though the values within the object have changed. This can lead to unexpected behavior and potentially infinite loops
Shallow comparison checks object references, not values.
