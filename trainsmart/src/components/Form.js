import React, { useState, useEffect } from 'react';
import './static/css/estilos.css';
import { useNavigate } from 'react-router-dom';

function Form({ onSubmit }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [peso, setPeso] = useState('');
    const [estatura, setEstatura] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [genero, setGenero] = useState('Masculino');
    const [nivel_actividad, setNivelActividad] = useState('Bajo');
    const [objetivo, setObjetivo] = useState('');
    const [frecuencia_ejercicios, setFrecuenciaEjercicios] = useState('nada');
    const [foto, setFoto] = useState("0");
    const [imagen, setImagen] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isAuth, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedEmail = localStorage.getItem('email');
    
        console.log('Token:', token);
        console.log('Stored User:', storedUser);
        console.log('Stored Email:', storedEmail);
    
        const email = storedUser?.email || storedEmail;
    
        if (token || email) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            console.log('No autenticado, redirigiendo a login');
            navigate('/login');
        }
    }, [navigate]);

    // Recuperar el correo de localStorage cuando el componente se monta
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedEmail = localStorage.getItem('email'); 

        if (storedUser && storedUser.email) {
            setCorreo(storedUser.email);
            if (storedUser.family_name && storedUser.given_name) {
                setNombre(storedUser.given_name);
                setApellido(storedUser.family_name);
            } 
        } else if (storedEmail) {
            setCorreo(storedEmail); 
        }

        const hasReloaded = sessionStorage.getItem('hasReloaded');
        if (!hasReloaded) {
            sessionStorage.setItem('hasReloaded', 'true');
            window.location.reload(); 
        }
    }, []);

    // Función para manejar el archivo de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('correo', correo);
        formData.append('peso', peso);
        formData.append('estatura', estatura);
        formData.append('fecha_nacimiento', fecha_nacimiento);
        formData.append('genero', genero);
        formData.append('nivel_actividad', nivel_actividad);
        formData.append('objetivo', objetivo);
        formData.append('frecuencia_ejercicios', frecuencia_ejercicios);
        formData.append('foto', foto);
        
        // Solo añadir la imagen si existe
        if (imagen) {
            formData.append('imagen', imagen);
        }

        // Enviar los datos al backend
        onSubmit(formData); // Esto debe enviar los datos al backend como FormData.
    };

    if (!isAuth) return null;

    return (
        <form className='for' onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <label htmlFor="apellido">Apellido</label>
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            <label htmlFor="correo">Correo</label>
            <input 
                type="email" 
                placeholder="Correo" 
                value={correo} 
                readOnly 
                required 
            />
            <label htmlFor="peso">Peso (kg)</label>
            <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} required />
            <label htmlFor="estatura">Estatura (cm)</label>
            <input type="number" placeholder="Estatura (cm)" value={estatura} onChange={(e) => setEstatura(e.target.value)} required />
            <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
            <input type="date" placeholder="Edad" value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} required />
            <label htmlFor="genero">Género</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
            </select>
            <label htmlFor="nivel_actividad">Nivel de Actividad</label>
            <select value={nivel_actividad} onChange={(e) => setNivelActividad(e.target.value)}>
                <option value="Bajo">Bajo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
            </select>
            <label htmlFor="objetivo">Objetivo</label>
            <input type="text" placeholder="Objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
            <label htmlFor="frecuencia_ejercicios">Frecuencia de Ejercicios</label>
            <select value={frecuencia_ejercicios} onChange={(e) => setFrecuenciaEjercicios(e.target.value)}>
                <option value="nada">nada</option>
                <option value="poco ejercicio">poco ejercicio</option>
                <option value="casi siempre">casi siempre</option>
            </select>
            <h3>Seleccione una opción:</h3>
            <label>
              <input
                type="radio"
                name="yesNo"
                value="1"
                checked={foto === "1"}
                onChange={(e) => setFoto(e.target.value)}
              />
              sí {foto === "1" }
            </label>
            <label>
              <input
                type="radio"
                name="yesNo"
                value="0"
                checked={foto === "0"}
                onChange={(e) => setFoto(e.target.value)}
              />
              no {foto === "0" }
            </label>
            {foto === "1" && (
              <div>
                <label htmlFor="imageUpload">Cargar una imagen:</label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange} // Cambiado para manejar solo la imagen
                />
                {previewUrl && (
                  <div>
                    <h4>Vista previa de la imagen:</h4>
                    <img src={previewUrl} alt="Vista previa" style={{ width: "200px", marginTop: "10px" }} />
                  </div>
                )}
              </div>
            )}
            <button type="submit">Registrar</button>
        </form>
    );
}

export default Form;
