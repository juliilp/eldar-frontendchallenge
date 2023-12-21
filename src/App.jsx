import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import isAuthenticate from "./components/isAuthenticate";
import isAdmin from "./components/isAdmin";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export default function App() {
  const LazyLogin = lazy(() => import("./vistas/Login"));
  const LazyRegistro = lazy(() => import("./vistas/Registro"));
  const LazyHome = lazy(() => import("./vistas/Home"));
  const LazyEditPost = lazy(() => import("./vistas/editPost"));
  const LazyCrearPost = lazy(() => import("./vistas/CrearPost"));

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<LazyHome />} />

            {/* Rutas protegidas si el usuario está "logueado" */}
            <Route Component={isAuthenticate}>
              <Route
                path="/login"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <LazyLogin />
                  </Suspense>
                }
              />
              <Route
                path="/registro"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <LazyRegistro />
                  </Suspense>
                }
              />
            </Route>

            {/* Ruta protegida que tiene que estar logueado y ser admin */}
            <Route Component={isAdmin}>
              <Route
                path="/crearpost"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <LazyCrearPost />
                  </Suspense>
                }
              />
              <Route
                path="/editpost/:id"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <LazyEditPost />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Suspense>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}
