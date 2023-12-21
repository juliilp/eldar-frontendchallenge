import React from "react";

export default function Footer() {
  const footerInfo = [
    {
      title: "Services",
      items: ["Marketing", "Diseñadores", "Desarrollador web"],
    },
    {
      title: "Nosotros",
      items: ["Nosotros", "Carreras", "Historia", "Equipo"],
    },
    {
      title: "Soporte",
      items: ["FAQs", "Contacto", "Chat en vivo"],
    },
  ];
  return (
    <footer className="flex flex-col gap-8 mt-32">
      <section className="flex w-full justify-evenly  px-8  mb-32 flex-col md:flex-row gap-8 md:gap-0">
        <article className="flex flex-col gap-6 ">
          <strong className="block text-center text-xl font-medium text-gray-900 sm:text-2xl">
            ¿Queres recibir las ultimas novedades?
          </strong>
          <div className="flex">
            <input
              type="text"
              placeholder="ejemplo@gmail.com"
              className="rounded border border-gray-600 mx-auto md:mx-0 md:border-gray-200 bg-gray-100 p-4 md:pr-32 text-sm font-medium focus:ring-0 focus:border-gray-200 focus:bg-gray200"
            />
            <button className="hidden md:block px-6 py-2 font-semibold bg-black text-white hover:bg-zinc-800 transition-colors rounded w-max">
              Suscribirse
            </button>
          </div>
        </article>
        <article className="flex gap-16 text-gray-700 flex-wrap md:flex-row justify-center">
          {/* Hice esto para no repetir tantas lineas de codigo */}
          {footerInfo.map((section, index) => (
            <section key={index}>
              <strong>{section.title}</strong>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="transition hover:text-gray-700/75 hover:underline cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </section>
      <article className="w-full h-12 bg-[#00334C] flex justify-center items-center ">
        <span className="text-xs text-white">
          © 2023 Julian Lopez Padua™. All Rights Reserved.
        </span>
      </article>
    </footer>
  );
}
