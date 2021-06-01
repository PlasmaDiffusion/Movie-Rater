import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ServerAPI_Test from "./serverAPI_Test";
import MovieList from "./movies/movieList";

//Redux imports
import { createStore } from "redux";
import allReducers from "./redux/reducers";
import { Provider } from "react-redux";
import ReduxTest from "./reduxTest";

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <header> Movie Rater</header>
                <div>
                    <MovieList id={1} category={"Marvel"} />
                    <MovieList id={3} category={"DC"} />
                    <MovieList id={10} category={"Top Grossing Films (2012)"} />
                    <MovieList id={54} category={"Japanese Animated Films"} />
                </div>
                <div style={{ margin: "20px" }}>
                    {/*
                    <ServerAPI_Test />
                    <ReduxTest />
                    */}
                </div>

                <footer>
                    This site uses an API from{" "}
                    <a href="https://www.themoviedb.org/">The Movie DB</a>.
                </footer>
            </div>
        );
    }
}



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);



// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// // //Redux imports
// import { Provider } from "react-redux";

// export interface IUser {
//     name: string;
//     age: number;
// }
// const App = () => {
//     const [users, setUsers] = useState<IUser[]>([
//         {
//             name: "Bijaya",
//             age: 25,
//         },
//         {
//             name: "Ram",
//             age: 25,
//         },
//     ]);

//     return (
//         <div>
//             <h1>Users list</h1>
//             <ul>
//                 {users.map((user: IUser) => {
//                     return (
//                         <li key={user.name}>
//                             {user.name} is {user.age} years old
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };


// ReactDOM.render(
//         <App />,
//     document.getElementById("app")
// );

export default App;