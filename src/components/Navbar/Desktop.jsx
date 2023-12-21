import { Link } from "react-router-dom";
import useUser from "../..//hooks/useUser";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
export default function Desktop({ handlerCerrarSession }) {
  const { user } = useUser();
  return (
    <header className="hidden md:flex fixed top-0 items-center h-16 w-full bg-white px-6 justify-between z-50 ">
      <motion.article
        className="flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {user && (
          <div className="flex items-center gap-2">
            <FaUser size={25} />
            <Link
              to="/perfil"
              className="text-2xl font-semibold animate-pulse cursor-pointer"
            >
              {user?.nombre ? user.nombre : "Sin nombre"}
            </Link>
          </div>
        )}
        <Link
          className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
          to="/"
        >
          Ir a Inicio
        </Link>
      </motion.article>

      {user ? (
        <ul className="flex gap-6 items-center">
          {user.isAdmin && (
            <li>
              <Link
                to="/crearpost"
                className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
              >
                Crear post
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={handlerCerrarSession}
              className="rounded-lg py-2 px-10 font-bold bg-[rgb(74,142,204)] text-white"
            >
              Cerrar sesion
            </button>
          </li>
        </ul>
      ) : (
        <motion.ul
          className="flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, staggerChildren: 0.5 }}
        >
          <motion.li>
            <Link
              to="/login"
              className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
            >
              Login
            </Link>
          </motion.li>
          <motion.li>
            <Link
              to="/registro"
              className="rounded-lg py-[10px] px-10 font-bold bg-[rgb(74,142,204)] text-white"
            >
              Registro
            </Link>
          </motion.li>
        </motion.ul>
      )}
    </header>
  );
}
