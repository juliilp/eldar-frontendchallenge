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
    <footer className="flex flex-col gap-8 mt-16">
      <section className="flex w-full justify-evenly  px-8  mb-32 flex-col md:flex-row gap-8 md:gap-0">
        <article className="flex gap-16 text-gray-700  flex-col  items-center  text-center justify-center flex-wrap md:flex-row md:gap-32 md:text-start md:items-start  ">
          {/* Hice esto para no repetir tantas lineas de codigo */}
          {footerInfo.map((section, index) => (
            <section key={index}>
              <strong className="text-xl md:text-2xl">{section.title}</strong>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="transition hover:text-gray-700/75 hover:underline cursor-pointer md:text-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </section>
      <article className="w-full py-4 bg-[#00334C] flex justify-center flex-col gap-4 items-center ">
        <span className="text-xl text-white ">
          Si lees ésto tenes que contratarme 😁
        </span>
        <span className="text-xs text-white">
          © 2023 Julian Lopez Padua™. All Rights Reserved.
        </span>
      </article>
    </footer>
  );
}
