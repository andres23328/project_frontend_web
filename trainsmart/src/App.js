import React, {  useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Ya no necesitas importar Router
import axios from 'axios';
import Form from './components/Form';
import Grafica from './components/dashboard.tsx';
import RecommendationsPage from './components/RecommendationsPage';
import LoginPage from './components/LoginPage';
import Header from './components/templates/Header';
import Main from './components/templates/Main';
import Footer from './components/templates/Footer';
import './App.css';
import './components/static/css/estilos.css';


function App() {





    const [contraseña, setcontraseña] = useState(null);
    const navigate = useNavigate(); // Asegúrate de usar useNavigate
    



    const getRecommendations = async (userData) => {
        try {
            const [response] = await Promise.all([
                axios.post('http://localhost:5000/api/registrar', userData),
                axios.post('http://localhost:5000/mongo/registrar', userData)
            ]);
            
            // Asegúrate de que la respuesta contenga los datos esperados
            const { imc, masaCorporalMagra, porcentajeMasaCorporal, correo } = response.data;
            
            console.log(`IMC: ${imc}, User: ${correo},,contraseña: ${contraseña} Masa Corporal Magra: ${masaCorporalMagra}, Porcentaje de Masa Corporal: ${porcentajeMasaCorporal}`);
    

            
            // Verifica si contraseña es parte de userData y guárdala si es necesario
            if (userData.contraseña) { // Asegúrate de que esta variable esté definida
                setcontraseña(userData.contraseña); // Guardar la contraseña en el estado
            }
            
            // Redirigir a la página de IMC
            navigate('/grafica');
        } catch (error) {
            console.error('Error al obtener recomendaciones:', error);
            
            // Opcional: Manejo de errores más específico
            if (error.response) {
                // El servidor respondió con un código de error
                console.error('Error:', error.response.data);
            } else {
                // El error ocurrió en la configuración de la solicitud
                console.error('Error de red o configuración:', error.message);
            }
        }
    };
    
    

    return (
        <div className="App">
            {/* Header visible en todas las páginas */}
            <Header />
            {/* Aquí se renderizan las rutas */}
            <Routes>
                {/* Ruta para la página principal */}
                <Route path="/" element={<Main />} />
                
                {/* Otras rutas */}
                <Route path="/form" element={<Form onSubmit={getRecommendations} />} />
                <Route path="/recommendation" element={<RecommendationsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/grafica" element={<Grafica />} />
            </Routes>

            {/* Footer visible en todas las páginas */}
            <Footer />
        </div>
    );
}

export default App;


