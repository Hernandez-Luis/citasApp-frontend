import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClinicaService from '../services/ClinicaService';
import { ClinicaList } from '../components/ClinicaList';
import { ClinicaForm } from '../components/ClinicaForm';

const ClinicaPage = () => {
  const [clinicas, setClinicas] = useState([]);
  const [selectedClinica, setSelectedClinica] = useState(null);

  useEffect(() => {
    const fetchClinicas = async () => {
      const data = await ClinicaService.getClinicas();
      setClinicas(data);
    };

    fetchClinicas();
  }, []);

  const handleCreateClinica = (newClinica) => {
    ClinicaService.createClinicas(newClinica).then((clinica) => {
      setClinicas((prevClinicas) => [...prevClinicas, clinica]);
    });
  };

  const handleUpdateClinica = (updatedClinica) => {
    ClinicaService.updateClinicas(updatedClinica, updatedClinica.id).then((clinica) => {
      setClinicas((prevClinicas) =>
        prevClinicas.map((c) => (c.id === clinica.id ? clinica : c))
      );
    });
  };

  const handleDeleteClinica = (id) => {
    ClinicaService.deleteClinicas(id).then(() => {
      setClinicas(clinicas.filter((clinica) => clinica.id !== id));
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Clínicas</h1>
      <ClinicaForm onSubmit={selectedClinica ? handleUpdateClinica : handleCreateClinica} clinica={selectedClinica} />
      <ClinicaList clinicas={clinicas} onSelect={setSelectedClinica} onDelete={handleDeleteClinica} />
    </div>
  );
};

export default ClinicaPage;
