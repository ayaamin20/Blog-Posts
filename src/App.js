import "./App.css";
import Tabs from "./SharedComponents/Tabs/Tabs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from "./Components/PostDetails/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">Posts</header>

        <Routes>
          <Route path="/" element={<Tabs />} />
          <Route path={`/posts/:id`} element={<PostDetails />} />
          <Route path={`/user/:id`} element={<Tabs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
