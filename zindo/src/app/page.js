import Link from "next/link";
import { icons } from "@/utils/listingConfig";
import ZindoLogo from "@/ui/ZindoLogo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-6 items-center flex-col sm:flex-row">
          {icons.map((item, index) =>
            item.url ? (
              <Link href={`/${item.url}`} key={index}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center transition-colors duration-300 group-hover:bg-green-500 group-hover:text-white text-slate-500">
                    {item.component}
                  </div>
                  <span className="mt-2 text-sm text-gray-400 group-hover:text-green-400">
                    {item.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div
                key={index}
                className="flex flex-col items-center cursor-not-allowed opacity-50 relative group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-slate-500">
                  {item.component}
                </div>
                <span className="mt-2 text-sm text-gray-600">{item.name}</span>

                {/* Tooltip */}
                <div className="absolute bottom-[-2.5rem] bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  Próximamente
                </div>
              </div>
            )
          )}
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
