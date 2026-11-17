# 💻 TrainSmart Frontend — Interfaz Web de Analítica Deportiva y Rutinas

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?logo=reactrouter&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.13-22B5BF)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chartdotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?logo=axios&logoColor=white)

Cliente web oficial de la plataforma **TrainSmart**, estructurado para interactuar con el ecosistema backend híbrido (MySQL + MongoDB + Machine Learning). Permite a los usuarios registrar sus datos físicos, autenticarse mediante credenciales o **Google OAuth 2.0**, visualizar métricas de rendimiento deportivo y consultar rutinas de entrenamiento generadas por modelos predictivos.

---

## ✨ Características Principales

- **Arquitectura Modular de Vistas:** Separación clara entre la página de aterrizaje (`Main.js`), autenticación (`LoginPage.js`), captura de perfil biométrico (`Form.js`), panel de control (`dashboard.tsx`) y catálogo de rutinas (`RecommendationsPage.js` y `ExerciseList.js`).
- **Sincronización Dual de Registro:** Al enviar el formulario de usuario, el cliente coordina mediante `Promise.all` el almacenamiento estructurado en el endpoint relacional (`/api/registrar`) y el almacenamiento documental con archivos multimedia en MongoDB (`/mongo/registrar`).
- **Panel de Visualización de Progreso:** Gráficas dinámicas de barras, líneas, áreas y sectores implementadas con **Recharts** y **Chart.js** para analizar peso corporal, marcas personales y distribución de entrenamiento.
- **Consumo de Predicciones de Machine Learning:** Conexión directa con el motor de clustering y clasificación para renderizar la precisión del modelo (`accuracy`), el clúster asignado (`grupo_kmeans`) y la lista de ejercicios recomendados.

---

## 🛠️ Stack Tecnológico

- **Framework Principal:** React 18 (`react-scripts`)
- **Enrutamiento:** React Router DOM v6
- **Gráficas y Visualización:** Recharts, Chart.js, `react-chartjs-2`
- **Autenticación:** `@react-oauth/google`, `gapi-script`, `jwt-decode`
- **Cliente HTTP:** Axios
- **Estilos e Iconos:** CSS3 personalizado, FontAwesome, React Icons

---

## 📁 Estructura del Proyecto

```text
project_frontend_web/
├── package.json                 # Dependencias raíz (Axios)
└── trainsmart/                  # Aplicación principal React
    ├── public/
    │   ├── index.html
    │   └── static/              # Recursos visuales, logotipos y hojas de estilo
    ├── src/
    │   ├── components/
    │   │   ├── templates/       # Header.js, Main.js, Footer.js
    │   │   ├── dashboard.tsx    # Dashboard interactivo y métricas del modelo ML
    │   │   ├── ExerciseList.js  # Renderizado de tarjetas de ejercicios recomendados
    │   │   ├── Form.js          # Formulario de perfilamiento físico y subida de foto
    │   │   ├── LoginPage.js     # Autenticación de usuarios y Google Sign-In
    │   │   └── RecommendationsPage.js
    │   ├── services/
    │   │   └── recommendations.js # Servicio de consulta a /api/recommendations
    │   ├── App.js               # Enrutamiento SPA y gestión de estado de sesión
    │   └── index.js
    └── package.json
```

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/andres23328/project_frontend_web.git
cd project_frontend_web/trainsmart
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar el entorno Backend
Verifica que el backend (`project_backend_web`) esté activo en `http://localhost:5000` con CORS habilitado para `http://localhost:3000`.

### 4. Ejecutar el servidor de desarrollo
```bash
npm start
```
La aplicación estará accesible en [http://localhost:3000](http://localhost:3000).

---

## 👤 Autor

**Andrés Felipe Ardila Ardila**  
Estudiante de Ingeniería de Sistemas — Villavicencio, Meta, Colombia  
- GitHub: [@andres23328](https://github.com/andres23328)
- Correo: ardila23328@gmail.com
