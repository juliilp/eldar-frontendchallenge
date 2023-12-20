import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./vistas/Login";
import Registro from "./vistas/Registro";
import Home from "./vistas/Home";
import UserProvider from "./context/userContext";
import isAuthenticate from "./components/isAuthenticate";
import CrearPost from "./vistas/CrearPost";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import isAdmin from "./components/isAdmin";
import EditPost from "./vistas/editPost";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" Component={Home} />

            {/* Rutas protegidas si el usuario está "logueado" */}
            <Route Component={isAuthenticate}>
              <Route path="/login" Component={Login} />
              <Route path="/registro" Component={Registro} />
            </Route>

            {/* Ruta protegida que tiene que estar logueado y ser admin */}
            <Route Component={isAdmin}>
              <Route path="/crearpost" Component={CrearPost} />
              <Route path="/editpost/:id" Component={EditPost} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
