import React from "react";
import { useParams } from "react-router-dom";
import PacienteForm from "../components/paciente/PacienteForm";

const PacientePage = () => {
  const { id } = useParams();  // Extraemos el id del paciente de la URL

  return (
    <div className="paciente-page">
      <PacienteForm pacienteId={id} />
    </div>
  );
};

export default PacientePage;
