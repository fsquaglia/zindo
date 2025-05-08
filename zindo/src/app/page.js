import { FaStethoscope, FaDog, FaCarAlt } from "react-icons/fa";
import ZindoLogo from "@/ui/ZindoLogo";

export default function Home() {
  const icons = [
    { name: "Salud", component: <FaStethoscope size={32} /> },
    { name: "Mascotas", component: <FaDog size={32} /> },
    { name: "Vehículos", component: <FaCarAlt size={32} /> },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-6 items-center flex-col sm:flex-row">
          {icons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center transition-colors duration-300 group-hover:bg-green-500 group-hover:text-white text-slate-500">
                {item.component}
              </div>
              <span className="mt-2 text-sm text-gray-600 group-hover:text-green-600">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </main>

      <div className="p-4">
        <ZindoLogo />
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span>Acá vamos nosotros</span>
      </footer>
    </div>
  );
}
