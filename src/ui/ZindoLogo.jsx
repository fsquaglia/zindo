import { FaSearch } from "react-icons/fa";

export default function ZindoLogo() {
  return (
    <div className="flex flex-col space-y-1 justify-center text-center">
      <div className="flex items-center space-x-2 justify-center">
        <FaSearch className="text-green-500 text-xl" />
        <span className="text-4xl font-bold text-gray-800">Zindo</span>
      </div>
      <p className="text-sm text-gray-500">
        Todo lo que necesitás, en un solo lugar
      </p>
    </div>
  );
}
