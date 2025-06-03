import { FaStethoscope, FaDog, FaCarAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";

export const icons = [
  { name: "Empleo", component: <MdWork size={32} />, url: "empleo" },
  { name: "Salud", component: <FaStethoscope size={32} /> },
  { name: "Mascotas", component: <FaDog size={32} /> },
  { name: "Vehículos", component: <FaCarAlt size={32} /> },
];
