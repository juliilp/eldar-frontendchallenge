import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro";
import Home from "./vistas/Home";
import UserProvider from "./context/userContext";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/registro" Component={Registro} />
          <Route path="/" Component={Home} />
          {/* <Route path="/**" Component={Home} /> */}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
