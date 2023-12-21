import { Link } from "react-router-dom";
import useUser from "../..//hooks/useUser";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
export default function Mobile({ handlerCerrarSession }) {
  const { user } = useUser();

  const [switchMenu, setSwitchMenu] = useState(false);
  const handlerSwitch = () => setSwitchMenu((prev) => !prev);
  return (
    <header className="flex md:hidden  justify-between w-full items-center fixed top-0 bg-white z-20">
      <article className="flex justify-between items-center w-full px-2 mt-2">
        <Link
          className="rounded-lg py-2 px-6 font-bold bg-[rgb(74,142,204)] text-white"
          to="/"
        >
          Inicio
        </Link>
        {user && (
          <h2 className="text-lg font-semibold">
            {user?.nombre ? user.nombre : "Sin nombre"}
          </h2>
        )}

        <FiMenu onClick={handlerSwitch} size={35} />
      </article>

      <AnimatePresence>
        {switchMenu && (
          <motion.article
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1, top: 48 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 items-center w-full flex justify-center bg-white  py-8 "
          >
            {user ? (
              <ul className="flex flex-col gap-6 items-center">
                {user.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/crearpost"
                        className="rounded-lg py-[10.5px] px-6 font-bold bg-[rgb(74,142,204)] text-white"
                      >
                        Crear post
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handlerCerrarSession}
                        className="rounded-lg py-2 px-6 font-bold bg-[rgb(74,142,204)] text-white"
                      >
                        Cerrar sesion
                      </button>
                    </li>
                  </>
                )}
              </ul>
            ) : (
              <ul className="flex flex-col gap-6">
                <li>
                  <Link
                    to="/login"
                    className="rounded-lg py-[10px] px-[50px] font-bold bg-[rgb(74,142,204)] text-white"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/registro"
                    className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
                  >
                    Registro
                  </Link>
                </li>
              </ul>
            )}
          </motion.article>
        )}
      </AnimatePresence>
    </header>
  );
}
