import React from 'react';
import '../components/Home.css'; // Importa el archivo CSS para los estilos personalizados
import salud from '../../src/assets/salud-mental.png'; // Ruta hacia la imagen en assets
import facebook from '../../src/assets/facebook.png'; // Ruta hacia la imagen en assets
import whatsapp from '../../src/assets/whatsapp.png'; // Ruta hacia la imagen en assets
import instagram from '../../src/assets/instagram.png'; // Ruta hacia la imagen en assets
import twither from '../../src/assets/twui.png'; // Ruta hacia la imagen en assets
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";


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
              src={salud} 
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

       {/* Footer Mejorado */}
       <footer className="home-footer">
        <div className="footer-content">
          <p>© 2025 Universidad de la Sierra Júarez. Todos los derechos reservados.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon instagram" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon twitter" />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="icon whatsapp" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
