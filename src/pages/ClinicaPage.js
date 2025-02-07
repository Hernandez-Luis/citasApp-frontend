import React from "react";
import { useParams } from "react-router-dom";
import ClinicaForm from "../components/clinica/ClinicaForm";

const ClinicaPage = () => {
  const { id } = useParams();  // Extraemos el id de la clínica de la URL
  console.log("ID de la clínica:", id);  // Asegúrate de que el id sea el esperado

  return (
    <div className="clinica-page">
      <ClinicaForm clinicaId={id} />
    </div>
  );
};

export default ClinicaPage;
