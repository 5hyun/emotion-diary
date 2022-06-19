import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// COMPONENTS
import MyButton from "./Components/MyButton";

// Header
import MyHeader from "./Components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftchild={
            <MyButton
              text={"왼쪽 버튼"}
              onClick={() => alert("왼쪽 버튼 클릭")}
            />
          }
          rightchild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => alert("오른쪽 버튼 클릭")}
            />
          }
        />
        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"negative"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"pasdad"}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
