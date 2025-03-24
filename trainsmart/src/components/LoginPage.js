import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Se eliminó la lógica de isMobileView
  useEffect(() => {
    const handleResize = () => {
      // Puedes mantener esto si deseas realizar otras acciones en el resize
      // setIsMobileView(window.innerWidth <= 850);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iniciarSesion = () => {
    setIsRegistering(false);
  };

  const register = () => {
    setIsRegistering(true);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      correo: email,  // Email que el usuario ingresa en el formulario
      contraseña: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/iniciarsesion', loginData);
      const data = response.data;

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', data);
        alert('Inicio de sesión exitoso');

        // Guardar token y email en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);  // Guarda el email en el localStorage

        // Redirigir a /form
        navigate('/form');

        // Forzar la recarga una vez que llegue a /form
        setTimeout(() => {
          window.location.reload(); // Recargar la página para asegurar que el botón de logout aparezca
        }, 100); 
      } else {
        console.error('Error:', data.message);
        alert('Error en el inicio de sesión: ' + data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      correo: email,
      contraseña: password,
      usuario: username,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/registrarusuario', registerData);

      if (response.status === 201) {
        console.log('Usuario registrado con éxito:', response.data);
        alert('Registro exitoso');
        setEmail('');
        setPassword('');
        setUsername('');
        setIsRegistering(false);
      } else {
        console.error('Error:', response.data.message);
        alert('Error en el registro: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud');
    }
  };

  // Manejo de Google Login y redirección
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);

    // Guarda los datos del usuario en localStorage o en el estado
    localStorage.setItem('googleToken', credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(decoded));

    // Redirigir a la página después del login exitoso
    navigate('/form'); 

    // Forzar la recarga una vez que llegue a /form
    setTimeout(() => {
      window.location.reload(); // Recargar la página para asegurar que el botón de logout aparezca
    }, 100); // Ajusta el tiempo si es necesario
  };

  return (
    <main className='body'>
      <div className="cotenedor__todo">
        <div className="caja__trasera">
          {/* Se eliminó la condición de isMobileView */}
          <div className="caja__trasera-Login" style={{ opacity: isRegistering ? 1 : 0 }}>
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button id="btn__iniciar--sesion" onClick={iniciarSesion}>
              Iniciar Sesión
            </button>
          </div>
          <div className="caja__trasera-register" style={{ opacity: isRegistering ? 0 : 1 }}>
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button id="btn__registrarse" onClick={register}>
              Registrarse
            </button>
          </div>
        </div>
        <div className="cotenedor__login-register" style={{ left: isRegistering ? '410px' : '10px' }}>
          {isRegistering ? (
            <form className="formulario__register" onSubmit={handleRegisterSubmit}>
              <h2>Registrarse</h2>
              <input
                type="text"
                placeholder="Correo Electrónico"
                name="correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Usuario"
                name="usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Registrarse</button>
            </form>
          ) : (
            <form className="formulario__login" onSubmit={handleLoginSubmit}>
              <h2>Iniciar Sesión</h2>
              
              <GoogleLogin 
                onSuccess={handleGoogleLoginSuccess} // Redirige tras éxito
                onError={() => {
                  console.log("Login failed");
                }}
              />
              <h5>o</h5>
              <input
                type="text"
                placeholder="Correo Electrónico"
                name="correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />  
              <input
                type="password"
                placeholder="Contraseña"
                name="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Entrar</button>
            </form>
          )}
        </div>
      </div>
      <br /><br /><br /><br /><br />
    </main>
  );
}

export default Login;