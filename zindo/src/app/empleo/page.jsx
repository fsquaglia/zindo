"use client";

import { useState } from "react";
import Image from "next/image";

// sub componente input base
const InputBase = ({
  labelName,
  inputType,
  inputName,
  showCount = true,
  readOnlyBoolean = false,
  form,
  limitsText,
  handleChange,
  errors,
}) => {
  let autoCompleteName = "";
  if (inputName === "nombre") {
    autoCompleteName = "given-name";
  } else if (inputName === "apellido") {
    autoCompleteName = "family-name";
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="block mb-1 font-medium">{labelName}</label>
        {form[inputName] && showCount && (
          <label className="block mb-1 font-medium text-xs text-gray-600">
            {limitsText[inputName] - form[inputName].length}
          </label>
        )}
      </div>
      <input
        type={inputType}
        name={inputName}
        value={form[inputName]}
        onChange={handleChange}
        className="input"
        maxLength={limitsText[inputName]}
        {...(autoCompleteName !== "" && { autoComplete: autoCompleteName })}
        {...(readOnlyBoolean && { readOnly: true })}
      />
      {errors[inputName] && (
        <span className="text-red-500 text-sm">{errors[inputName]}</span>
      )}
    </div>
  );
};

export default function CVForm() {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    dni: "",
    telefono: "",
    email: "",
    nacionalidad: "Argentino/a",
    genero: "",
    localidad: "",
    level: "",
    pais: "Argentina",
    descripcion: "",
    perfilLaboral: "",
    experiencia: "",
    educacion: "",
    tituloEducacion: "",
    skills: "",
    disponibilidad: "",
    activo: "true", // Por defecto activo
    imageUrl: "",
    cvUrl: "",
  });

  const limitsText = {
    nombre: 30,
    apellido: 30,
    fechaNacimiento: 10,
    dni: 10,
    telefono: 15,
    email: 50,
    nacionalidad: 11,
    genero: 20,
    localidad: 50,
    level: 50,
    pais: 50,
    descripcion: 350,
    perfilLaboral: 50,
    experiencia: 350,
    educacion: 200,
    tituloEducacion: 100,
    skills: 200,
    disponibilidad: 100,
  };

  const provincesArgentina = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
  ];

  const genres = [
    "Masculino",
    "Femenino",
    "No binario",
    "Otro",
    "Prefiero no decirlo",
  ];

  const educationLevels = [
    "Primario",
    "Secundario",
    "Terciario",
    "Universitario",
    "Postgrado",
    "Otro",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    console.log(
      "Campo modificado:",
      e.target.name,
      "Nuevo valor:",
      e.target.value
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = "Campo requerido";
    if (!form.apellido) newErrors.apellido = "Campo requerido";

    const birthdate = new Date(form.fechaNacimiento);
    const today = new Date();

    if (!form.fechaNacimiento || isNaN(birthdate.getTime())) {
      newErrors.fechaNacimiento = "Fecha inválida";
    } else if (birthdate > today) {
      newErrors.fechaNacimiento = "La fecha no puede ser futura";
    }

    const dni = Number(form.dni);
    if (!dni || dni < 1000000 || dni > 99999999) {
      newErrors.dni = "DNI inválido (debe tener entre 7 y 8 dígitos)";
    }

    if (!form.perfilLaboral) newErrors.perfilLaboral = "Campo requerido";
    if (!form.telefono) newErrors.telefono = "Campo requerido";
    if (!form.localidad) newErrors.localidad = "Campo requerido";
    if (!form.level) newErrors.level = "Campo requerido";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Formulario válido. Enviar datos:", form);
    // Aquí iría la lógica para guardar en Firestore
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6 shadow rounded"
    >
      {/*** DATOS PERSONALES ***/}
      <div>
        <h2 className="text-xl font-semibold mb-4">Datos personales</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* FOTO */}
          <div className="flex justify-center items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden cursor-pointer">
              <Image
                src={
                  form?.imageUrl ||
                  `https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png`
                }
                width={48}
                height={48}
                alt="Avatar por defecto"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1">
            {/* NOMBRE */}
            <InputBase
              labelName={"Nombre"}
              inputType={"text"}
              inputName={"nombre"}
              form={form}
              limitsText={limitsText}
              handleChange={handleChange}
              errors={errors}
            />
            {/* APELLIDO */}
            <InputBase
              labelName={"Apellido"}
              inputType={"text"}
              inputName={"apellido"}
              form={form}
              limitsText={limitsText}
              handleChange={handleChange}
              errors={errors}
            />
          </div>

          {/* FECHA DE NACIMIENTO */}
          <div>
            <label className="block mb-1 font-medium">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              className="input"
            />
            {errors.fechaNacimiento && (
              <span className="text-red-500 text-sm">
                {errors.fechaNacimiento}
              </span>
            )}
          </div>

          {/* DNI */}
          <div>
            <label className="block mb-1 font-medium">DNI</label>
            <input
              type="number"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              className="input [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              inputMode="numeric"
              autoComplete="off"
            />
            {errors.dni && (
              <span className="text-red-500 text-sm">{errors.dni}</span>
            )}
          </div>

          {/* NACIONALIDAD */}
          <InputBase
            labelName={"Nacionalidad"}
            inputType={"text"}
            inputName={"nacionalidad"}
            showCount={false}
            readOnlyBoolean={true}
            form={form}
            limitsText={limitsText}
            handleChange={handleChange}
            errors={errors}
          />

          {/* GENERO */}
          <div>
            <label className="block mb-1 font-medium">Género</label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="input bg-gray-700 text-white"
            >
              <option value="" disabled>
                Seleccioná tu género
              </option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genero && (
              <span className="text-red-500 text-sm">{errors.genero}</span>
            )}
          </div>
        </div>
      </div>

      {/*** CONTACTO ***/}
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4">Contacto</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* TELEFONO */}
          <div>
            <label className="block mb-1 font-medium">Teléfono</label>
            <input
              type="number"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="input [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              inputMode="numeric"
              autoComplete="off"
            />
            {errors.telefono && (
              <span className="text-red-500 text-sm">{errors.telefono}</span>
            )}
          </div>
          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              readOnly
            />
          </div>
        </div>
      </div>

      {/*** UBICACION ***/}
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* LOCALIDAD */}
          <InputBase
            labelName={"Localidad"}
            inputType={"text"}
            inputName={"localidad"}
            form={form}
            limitsText={limitsText}
            handleChange={handleChange}
            errors={errors}
          />
          {/* PROVINCIA */}
          <div>
            <label className="block mb-1 font-medium">Provincia</label>
            <select
              name="provincia"
              value={form.provincia}
              onChange={handleChange}
              className="input bg-gray-800 text-white"
            >
              <option value="" disabled>
                Seleccioná una provincia
              </option>
              {provincesArgentina.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.provincia && (
              <span className="text-red-500 text-sm">{errors.provincia}</span>
            )}
          </div>
          {/* PAIS */}
          <InputBase
            labelName={"País"}
            inputType={"text"}
            inputName={"pais"}
            showCount={false}
            readOnlyBoolean={true}
            form={form}
            limitsText={limitsText}
            handleChange={handleChange}
            errors={errors}
          />
        </div>
      </div>

      {/*** PERFIL PROFESIONAL ***/}
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4">Perfil profesional</h2>
        <div className="grid gap-4">
          {/* PERFIL LABORAL */}
          <InputBase
            labelName={"Perfil o categoría laboral"}
            inputType={"text"}
            inputName={"perfilLaboral"}
            form={form}
            limitsText={limitsText}
            handleChange={handleChange}
            errors={errors}
          />
          {/* DESCRIPCION */}
          <div>
            {/* Descripción */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block mb-1 font-medium">
                  Descripción breve (sobre mí)
                </label>
                {form.descripcion && (
                  <label className="block mb-1 font-medium text-xs text-gray-600">
                    {limitsText.descripcion - form.descripcion.length}
                  </label>
                )}
              </div>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="input"
                rows={3}
                maxLength={limitsText.descripcion}
              />
            </div>
            {/* EXPERIENCIA LABORAL */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block mb-1 font-medium">
                  Experiencia laboral
                </label>
                {form.experiencia && (
                  <label className="block mb-1 font-medium text-xs text-gray-600">
                    {limitsText.experiencia - form.experiencia.length}
                  </label>
                )}
              </div>

              <textarea
                name="experiencia"
                value={form.experiencia}
                onChange={handleChange}
                className="input"
                rows={3}
                maxLength={limitsText.experiencia}
              />
            </div>
          </div>
        </div>
      </div>

      {/*** EDUCACION Y HABILIDADES ***/}
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4">Educación y habilidades</h2>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* EDUCACION */}
            <div>
              <label className="block mb-1 font-medium">
                Educación (mayor nivel obtenido)
              </label>
              <select
                name="educacion"
                value={form.educacion}
                onChange={handleChange}
                className="input bg-gray-800 text-white"
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.educacion && (
                <span className="text-red-500 text-sm">{errors.educacion}</span>
              )}
            </div>
            {/* TITULO EDUCACION */}
            <div>
              <label className="block mb-1 font-medium">
                Título obtenido (opcional)
              </label>
              <textarea
                name="tituloEducacion"
                value={form.tituloEducacion}
                onChange={handleChange}
                className="input"
                rows={2}
                maxLength={70}
              />
            </div>
          </div>

          {/* HABILIDADES */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              Habilidades (separadas por coma)
              <span
                className="cursor-help w-5 h-5 flex items-center justify-center text-sm bg-gray-700 text-white rounded-full"
                title="Ejemplos: Conducir, Enseñar, React, Node.js, Atención al cliente, etc."
              >
                ?
              </span>
            </label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
      </div>

      {/*** DISPONIBILIDAD ***/}
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4">Disponibilidad</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium">Modalidad</label>
            <select
              name="disponibilidad"
              value={form.disponibilidad}
              onChange={handleChange}
              className="input bg-gray-800"
            >
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Freelance">Freelance</option>
              <option value="Remoto">Remoto</option>
              <option value="Contrato">Contrato</option>
              <option value="Temporal">Temporal</option>
              <option value="Por-obra">Por obra</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Visibilidad</label>
            <select
              name="activo"
              value={form.activo}
              onChange={handleChange}
              className="input bg-gray-800 text-white"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/*** CV ***/}
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-4">Currículum</h2>
        {/* Botón para cargar el CV */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Cargar CV
          </button>
        </div>
      </div>
      <hr className="my-6" />
      {/*** ENVIAR ***/}
      <div className="py-6 flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
        >
          Guardar datos
        </button>
      </div>
    </form>
  );
}
