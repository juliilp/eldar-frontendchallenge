import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro";
import Home from "./vistas/Home";
import UserProvider from "./context/userContext";
import isAuthenticate from "./components/isAuthenticate";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" Component={Home} />

          {/* Rutas protegidas si el usuario está "logueado" */}
          <Route Component={isAuthenticate}>
            <Route path="/login" Component={Login} />
            <Route path="/registro" Component={Registro} />
          </Route>

        </Routes>
      </UserProvider>
    </BrowserRouter>
    </QueryClientProvider>
  );
}
