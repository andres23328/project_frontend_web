import React, { useState, useEffect } from 'react';
import { AiOutlineArrowRight, AiOutlineUp } from 'react-icons/ai'; 
import { FaRuler as Ruler, FaWeight as Weight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importación de FontAwesome
import { faArrowRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const [showButton, setShowButton] = useState(false);
  const [formData, setFormData] = useState({
    altura: '',
    peso: ''});

    // Mostrar el botón cuando se hace scroll hacia abajo
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 200) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  const [resultado, setResultado] = useState(null);
  const [visible, setVisible] = useState(false);
  const [marginTop, setMarginTop] = useState('-70px'); 
  const [width, setWidth] = useState("350px");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para hacer scroll hacia arriba
  const scrollUp = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 0) {
      window.requestAnimationFrame(scrollUp);
      window.scrollTo(0, currentScroll - (currentScroll / 10)); // Desplazamiento suave
    }
  };


  const calcularIMC = (event) => {
    event.preventDefault();
    const { altura, peso } = formData;
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    setResultado(imc.toFixed(2)); // Si tienes un estado 'resultado'
    setWidth(prevWidth => (prevWidth === '350px' ? '574px' : '350px'));
  };

  const handleButtonClick = () => {
    setMarginTop(marginTop === '-70px' ? '-350px' : '-70px');
  };
  

  return (
    <main>
      {/* Inicio */}
      <div className="cotainer__cover div__offset" id="Inicio">
        <div className="cover">
          <section className="text__cover">
            <h2>Importancia del Índice de Masa Corporal (IMC) en la Salud</h2>
            <p>
              El Índice de Masa Corporal (IMC) es un indicador ampliamente utilizado para evaluar el estado de salud relacionado con el peso corporal. Un IMC dentro de los rangos saludables puede reducir el riesgo de desarrollar enfermedades crónicas, como hipertensión, diabetes tipo 2 y problemas cardiovasculares. Sin embargo, el IMC por sí solo no es una medida perfecta, ya que no distingue entre masa muscular y grasa. Por eso, es importante acompañar su cálculo con otros análisis clínicos y asesoría médica para obtener una evaluación más completa de la salud general.
            </p>

            <button className="der btn__text-cover btn__text" onClick={() => { handleButtonClick(); setVisible(!visible); }} style={{ marginTop: "20px",marginLeft: "160px"  }}>
              {visible ? 'Ocultar IMC' : 'Calcular IMC'}
            </button>
      
            {/* Contenedor principal con flex para alinear horizontalmente */}
            {visible && (
              <div className="cont flex justify-between mt-4" style={{ width }}>
                {/* Formulario para calcular el IMC */}
                <form onSubmit={calcularIMC} className="cal">
                  <div className="mb-4 relative">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200" />
                    <input
                      type="number"
                      name="altura"
                      placeholder="Altura (cm)"
                      value={formData.altura}
                      onChange={handleInputChange}
                      className="w-full py-2 pl-10 pr-3 bg-indigo-300 text-white placeholder-indigo-200 rounded"
                      required
                      min="0"
                    />
                  </div>
                  <div className="mb-6 relative">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200" />
                    <input
                      type="number"
                      name="peso"
                      placeholder="Peso (kg)"
                      value={formData.peso}
                      onChange={handleInputChange}
                      className="w-full py-2 pl-10 pr-3 bg-indigo-300 text-white placeholder-indigo-200 rounded"
                      required
                      
                    />
                  </div>
                  <button
                    type="submit"
                    className="but"
                  >
                    Calcular IMC
                  </button>
                </form>
      
                {/* Formulario para mostrar el resultado al lado derecho */}
                {resultado && (
                  <form className="cal2 ml-8"> {/* Añadir margen izquierdo para separar */}
                    <div className="text-center">
                      <p className="text-2xl font-bold">Tu IMC es: {resultado}</p>
                      <p className="mt-2">
                        {resultado < 18.5 && "Bajo peso"}
                        {resultado >= 18.5 && resultado < 25 && "Peso normal"}
                        {resultado >= 25 && resultado < 30 && "Sobrepeso"}
                        {resultado >= 30 && "Obesidad"}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            )}
            
      
          </section>
          <section className="image__cover">
             <img src="/static/images/Cover/image.png" alt="Hero" style={{ marginTop, marginLeft: "-200px" }} /> 
          </section>
          {visible && resultado && (  
            <div className="hola">
              <h3>¿Te gustaría tener una rutina de ejercicios personalizada?</h3>
              <p>
                Basado en tus datos de altura, peso e IMC, nuestra IA puede crear una rutina de ejercicios diseñada específicamente para ti.  
                <br/><strong>Inicia sesión</strong> para acceder a esta herramienta y empezar a mejorar tu salud de manera personalizada.
              </p>
              <button className="btn__text-cover btn__text" onClick={() => window.location.href = '/login'}>
                Empezar
              </button>
              
            </div>
          )}
          
        </div>
      </div>
      

      {/* Generador de confianza */}
      <div className="container__trust container__card-primary">
        <div className="trst card__primary">
          <div className="text__trust text__card-primary">
            <p>PRIMERO, ENFOCA EN LA SALUD</p>
            <h1>Gestiona tu progreso fitness con datos precisos</h1>
          </div>
          <div className="container__trust container__box-carPrimary">
            <div className="card__trust box__card-primary">
              <img src="/static/images/Trust area/anchor.png" alt="Anchor" />
              <h2>Control total de tu salud física</h2>
              <p>Monitorea tu estado físico en tiempo real y recibe predicciones sobre tu IMC para un mejor control de tu progreso.</p>
            </div>
            <div className="card__trust box__card-primary">
              <img src="/static/images/Trust area/archive.png" alt="Archive" />
              <h2>Informes detallados sobre tu evolución</h2>
              <p>Accede a análisis completos de tu rendimiento y predicciones futuras basadas en tu historial de IMC y actividades.</p>
            </div>
            <div className="card__trust box__card-primary">
              <img src="/static/images/Trust area/user.png" alt="User" />
              <h2>Experiencia personalizada para tus metas</h2>
              <p>Crea planes de entrenamiento personalizados y recibe recomendaciones según tus objetivos de salud y estado físico.</p>
            </div>
          </div>
        </div>
      </div>
      

      {/* Sobre nosotros */}
      <div className="container__about div__offset">
        <div className="about">
          <div className="text__about">
            <h1>Transformación Fitness en Acción</h1>
            <p>Únete a nuestro equipo y descubre cómo el análisis de tu IMC puede transformar tu salud.</p>
            <a href="#" className="btn__text-about btn__text">Descubre más</a>
          </div>
          <div className="image__about">
            <img src="/static/images/About/about-1.png" alt="Sobre el gimnasio 1" />
            <img src="/static/images/About/about-2.png" alt="Sobre el gimnasio 2" />
          </div>
        </div>
      </div>
      

      {/* Servicios */}
      <div className="container__service container__card-primary div__offset">
        <div className="service card__primary">
          <div className="text__service text__card-primary">
            <p>NUESTROS SERVICIOS</p>
            <h1>Soluciones para mejorar tu rendimiento físico</h1>
          </div>
          <div className="container__card-service container__box-carPrimary">
            <div className="card__service box__card-primary">
              <img src="/static/images/Services/grid.png" alt="Grid" />
              <h2>Monitoreo de Progreso</h2>
              <p>Controla y visualiza tu evolución física con nuestras herramientas de monitoreo de IMC y peso.</p>
              <a href="#"><FontAwesomeIcon icon={faArrowRight} /></a>
            </div>
            <div className="card__service box__card-primary">
              <img src="/static/images/Services/cart.png" alt="Cart" />
              <h2>Planes Personalizados</h2>
              <p>Accede a rutinas y dietas personalizadas basadas en tu IMC y objetivos de salud.</p>
              <a href="#"><FontAwesomeIcon icon={faArrowRight} /></a>
            </div>
            <div className="card__service box__card-primary">
              <img src="/static/images/Services/camera.png" alt="Camera" />
              <h2>Seguimiento en Tiempo Real</h2>
              <p>Monitorea tu rendimiento durante los entrenamientos con nuestras soluciones en tiempo real.</p>
              <a href="#"><FontAwesomeIcon icon={faArrowRight} /></a>
            </div>
          </div>
        </div>
      </div>
      

      {/* Botón para subir */}
      {showButton && (
        <div 
          id="button-up" 
          onClick={scrollUp} 
          style={{
            transform: showButton ? 'scale(1)' : 'scale(0)'}}>
          <AiOutlineUp size={30} color="#000" />
        </div>
      )}
      
    </main>
  );
};

export default Main;
