import React from 'react';
import '../components/Home.css'; // Importa el archivo CSS para los estilos personalizados
import fondo from '../../src/assets/fondo.jpg'; // Ruta hacia la imagen en assets


const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="welcome-text">Bienvenido a la aplicación de citas</h1>
        <p className="description-text">
          Tu solución para gestionar citas médicas de manera eficiente y cómoda.
        </p>
      </div>

      <div className="home-body">
        <div className="row">
          <div className="col-lg-6 text-center">
            <img
              src={fondo} // Cambia esta URL por la imagen de tu preferencia
              alt="Citas Médicas"
              className="home-image"
            />
          </div>
          <div className="col-lg-6">
            <h3 className="section-title">¿Qué es esta aplicación?</h3>
            <p className="section-description">
              Esta aplicación permite gestionar tus citas médicas de manera rápida, segura y fácil. 
              Con ella, puedes agendar, modificar y cancelar citas médicas de forma eficiente.
            </p>
            <h3 className="section-title">Desarrollado por:</h3>
            <p className="developer-info">
              Desarrollado por <strong>Efren David y Luis Alberto</strong>, dos desarrollador apasionado por crear soluciones tecnológicas innovadoras.
            </p>
          </div>
        </div>
      </div>

      <div className="home-footer">
        <p>© 2025 Mi Aplicación de Citas. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Home;
