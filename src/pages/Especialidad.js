import React from "react";
import { useParams } from "react-router-dom";
import EspecialidadForm from "../components/especialidad/EspecialidadForm"; // Asegúrate de que la ruta es correcta

const EspecialidadPage = () => {
  const { id } = useParams();  // Extraemos el id de la URL

  return (
    <div className="especialidad-page">
      <EspecialidadForm especialidadId={id} />
    </div>
  );
};

export default EspecialidadPage;
