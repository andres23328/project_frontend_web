import React, { useState, useEffect, useCallback } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';









const initialWeightData = [
  { id: 1, week: 'Sem 1', weight: 72 }
]

const initialRecordsData = [
  { id: 1, name: 'Press', value: 80 }
]

const initialTrainingDistribution = [
  { id: 1, name: 'Pecho', value: 20 }
]

const initialTrainingTime = [
  { id: 1, day: 'L', hours: 1 }
]

export default function Dashboard() {

  interface Exercise {
    BodyPart: string;
    Desc: string;
    Equipment: string;
    Level: string;
    Rating: string;
    RatingDesc: string;
    Title: string;
    Type: string;
    id: string;
  }
  
  interface PredictionResponse {
    accuracy: number;
    grupo_kmeans: number;
    prediccion: string;
    resultados: Exercise[]; // Cambiado aquí para reflejar la estructura correcta
  }
  

  const [predictionData, setPredictionData] = useState<PredictionResponse | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const fetchPrediction = useCallback(async () => {
    console.log("Botón clickeado, solicitando nueva predicción...");
    setIsLoading(true); // Empieza la carga
    setPredictionError(null); // Limpia errores previos
    
    try {
      const response = await axios.get<PredictionResponse>("http://localhost:5000/api/predict");
      console.log("Respuesta de /predict:", response.data);
      setPredictionData(response.data);
    } catch (err: any) {
      setPredictionError(err.response ? err.response.data.message : 'Error al obtener predicción');
      setPredictionData(null);
    } finally {
      setIsLoading(false); // Termina la carga
    }
  }, []);
  
  useEffect(() => {
    fetchPrediction(); // Llamada inicial al cargar el componente
  }, [fetchPrediction]);





  const [isAuth, setIsAuthenticated] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      const storedEmail = localStorage.getItem('email');

      console.log('Token:', token);
      console.log('Stored User:', storedUser);
      console.log('Stored Email:', storedEmail);

      // Establecer el correo si existe en 'user' o en 'email'
      const email = storedUser?.email || storedEmail;

      if (token || email) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
          console.log('No autenticado, redirigiendo a login');
          navigate('/login');
      }
  }, [navigate]);











  const [weightData, setWeightData] = useState(initialWeightData)
  const [recordsData, setRecordsData] = useState(initialRecordsData)
  const [trainingDistribution, setTrainingDistribution] = useState(initialTrainingDistribution)
  const [trainingTime, setTrainingTime] = useState(initialTrainingTime)

  const [newWeight, setNewWeight] = useState('')
  const [newRecord, setNewRecord] = useState({ name: '', value: '' })
  const [newDistribution, setNewDistribution] = useState({ name: '', value: '' })
  const [newTrainingTime, setNewTrainingTime] = useState({ day: '', hours: '' })

  


  const addWeight = () => {
    if (newWeight) {
      const newWeek = `Sem ${weightData.length + 1}`
      setWeightData([...weightData, { id: Date.now(), week: newWeek, weight: parseFloat(newWeight) }])
      setNewWeight('')
    }
  }

  const addRecord = () => {
    if (newRecord.name && newRecord.value) {
      setRecordsData([...recordsData, { id: Date.now(), ...newRecord, value: parseFloat(newRecord.value) }])
      setNewRecord({ name: '', value: '' })
    }
  }

  const addDistribution = () => {
    if (newDistribution.name && newDistribution.value) {
      setTrainingDistribution([...trainingDistribution, { id: Date.now(), ...newDistribution, value: parseFloat(newDistribution.value) }])
      setNewDistribution({ name: '', value: '' })
    }
  }


  const addTrainingTime = () => {
    if (newTrainingTime.day && newTrainingTime.hours) {
      setTrainingTime([...trainingTime, { id: Date.now(), ...newTrainingTime, hours: parseFloat(newTrainingTime.hours) }]);
      setNewTrainingTime({ day: '', hours: '' });
    }
  };

  const calcularCaloriasQuemadas = (level, minutos) => {
    let caloriasQuemadasPorMinuto;
    console.log('level',level);

    switch (level) {
      case 'Beginner':
        caloriasQuemadasPorMinuto = 5;
        break;
      case 'Intermediate':
        caloriasQuemadasPorMinuto = 7;
        break;
      case 'Expert':
        caloriasQuemadasPorMinuto = 10;
        break;
      default:
        caloriasQuemadasPorMinuto = 6;
        break;
    }

    return caloriasQuemadasPorMinuto * minutos;
  };

  const calcularNivel = (horasEntrenamiento) => {
    if (horasEntrenamiento < 1) {
      return 'Beginner'; // Menos de 1 hora: nivel 'Beginner'
    } else if (horasEntrenamiento >= 1 && horasEntrenamiento < 3) {
      return 'Intermediate'; // De 1 a 3 horas: nivel 'Intermediate'
    } else {
      return 'Expert'; // Más de 3 horas: nivel 'Expert'
    }
  };

  let caloriasQuemadas = 0;

  {trainingTime.map((training) => {
    const nivel = calcularNivel(training.hours);
    caloriasQuemadas = calcularCaloriasQuemadas(nivel, training.hours * 60);
  })}



  const deleteWeight = (id: number) => {
    setWeightData(weightData.filter(item => item.id !== id))
  }

  const deleteRecord = (id: number) => {
    setRecordsData(recordsData.filter(item => item.id !== id))
  }

  const deleteDistribution = (id: number) => {
    setTrainingDistribution(trainingDistribution.filter(item => item.id !== id))
  }

  const deleteTrainingTime = (id: number) => {
    setTrainingTime(trainingTime.filter(item => item.id !== id))
  }

  





  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserParsed = storedUser ? JSON.parse(storedUser) : null;
        const storedEmail = localStorage.getItem('email') || storedUserParsed?.email;
  
        if (!storedEmail) {
          setError('No hay correo almacenado');
          return;
        }
  
        const response = await axios.get(`http://localhost:5000/api/user?correo=${storedEmail}`);
        setUserData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al obtener los datos');
      }
    };
  
    fetchData();
  }, []);
  
  // Convertir frecuencia de ejercicios a un número
  const frecuenciaEjercicios = (() => {
    switch (userData?.frecuencia_ejercicios) {
      case 'nada':
        return 1;
      case 'poco ejercicio':
        return 2;
      case 'casi siempre':
        return 3;
      default:
        return 1;
    }
  })();

  const nivelActividad = (() => {
    switch (userData?.nivel_actividad) {
      case 'Bajo':
        return 1;
      case 'Moderado':
        return 2;
      case 'Alto':
        return 3;
      default:
        return 1; // Valor predeterminado en caso de error
    }
  })();

  const genero = (() => {
    switch (userData?.genero) {
      case 'Masculino':
        return 1;
      case 'Femenino':
        return 2;
      case 'Otro':
        return 3;
      default:
        return 1; // Valor predeterminado en caso de error
    }
  })();
  
  
 
  const peso = userData?.peso || 0;
  const estatura = userData?.estatura || 1; // Evita división por cero
 
  // Ajustar TMB según el nivel de actividad
  
  
  
  let caloriasMeta;
  let horasDesdeRegistro;

  if (userData) {


  // Convertir fecha de nacimiento en un objeto Date
  const fechaNacimiento = new Date(userData.fecha_nacimiento);
  const fechaRegistro = new Date(userData.fecha_registro); 


  const fechaActual = new Date();

  // Verificar si fechaRegistro es una fecha válida antes de realizar la resta
  if (!isNaN(fechaRegistro.getTime())) {
    // Calcular la diferencia en milisegundos usando .getTime()
    const diferenciaMilisegundos = fechaActual.getTime() - fechaRegistro.getTime();

    // Convertir milisegundos a horas
    horasDesdeRegistro = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

  } else {
    console.log("Error: fecha_registro no es válida");
  }



  // Calcular la edad
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = fechaActual.getMonth();
  const mesNacimiento = fechaNacimiento.getMonth();

  // Ajustar si el cumpleaños no ha ocurrido aún este año
  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

 
 

  // Calcular TMB
  let tmb;
  if (genero === 1) { // Hombre
    tmb = (10 * userData.peso) + (6.25 * userData.estatura) - (5 * edad) + 5;

  } else { // Mujer
    tmb = (10 * userData.peso) + (6.25 * userData.estatura) - (5 * edad) - 161;
  }



    
  switch (userData.nivel_actividad) {
    case 'Bajo':
      caloriasMeta = tmb * 1.2;
      break;
    case 'Moderado':
      caloriasMeta = tmb * 1.55;
      break;
    case 'Alto':
      caloriasMeta = tmb * 1.725;
      break;
    default:
      caloriasMeta = tmb * 1.2; // Valor predeterminado en caso de error
  }

 

  
} else {
  console.log("userData es null o undefined");
}



  const tiempoEjercicio = 1;
  const caloriesBurned2 = frecuenciaEjercicios * nivelActividad * peso * tiempoEjercicio * 0.0175;

  // Calorías por quemar
  const caloriesToBurn2 = caloriasMeta - caloriesBurned2;
  


// Verificar si el IMC está en el rango normal
  const isIMCNormal = userData?.imc >= 18.5 && userData?.imc <= 24.9;
 
  let imcDeseado; 
  let mensaje;
  
  if (isIMCNormal) {
      imcDeseado = userData.imc; 
      mensaje = "Estás bien de salud.";
  } else {

      const estaturaM = estatura / 100;
      // Puedes usar el límite inferior y superior para calcular el rango de peso deseado
      const pesoDeseadoInferior = 18.5 * (estaturaM** 2);
      const pesoDeseadoSuperior = 24.9 * (estaturaM ** 2);
      
      // Imprimimos el resultado en el estado correspondiente
      const pesoDeseado = (pesoDeseadoInferior + pesoDeseadoSuperior) / 2; 
      imcDeseado = pesoDeseado / (estaturaM** 2) ;
      mensaje = `Para estar en un IMC normal, deberías pesar entre ${pesoDeseadoInferior.toFixed(2)} kg y ${pesoDeseadoSuperior.toFixed(2)} kg.`;
  }
  
  // Ejemplo de horas
  const horasEnVidaFit = horasDesdeRegistro; // 5 horas/semana como estimación


  


  //const horasNecesarias = caloriasMeta / 500;
  
// Asegúrate de que imcDeseado sea un número
imcDeseado = Number(imcDeseado); // Fuerza la conversión a número

if (typeof imcDeseado !== 'number' || isNaN(imcDeseado)) {
    console.error('imcDeseado no es un número:', imcDeseado);
    imcDeseado = 0; // O maneja el caso de error como desees
} else {
    console.log('imcDeseado es un número válido:', imcDeseado);
}

const valorEstadistica = `IMC deseado esta:  ${imcDeseado.toFixed(2)} - ${mensaje}`;

  const currentMonth = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());


  const [isLoading1, setIsLoading1] = useState(false);
  
    // Función para manejar la descarga del CSV
    const handleDownload1 = async () => {
      setIsLoading1(true);
      try {
        // Realiza una solicitud GET al backend para obtener el CSV
        const response = await axios.get('http://localhost:5000/mongo/download-csv', {
          responseType: 'blob', // Importante para manejar archivos binarios
        });
  
        // Crear un enlace para descargar el archivo
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todos_los_usuarios.csv'; // Nombre del archivo al descargarse
        a.click();
  
        // Liberar el URL creado
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al descargar el CSV:', error);
      }
      setIsLoading1(false);
    };
  
  
 



  
    const calculateExercise = (level) => {
      let reps, timeInMinutes;
  
      // Determina las repeticiones y tiempo según el nivel
      switch (level) {
          case 'Beginner':
              reps = 10; // 10 repeticiones para principiante
              timeInMinutes = 5; // 5 minutos de ejercicio
              break;
          case 'Intermediate':
              reps = 20; // 20 repeticiones para intermedio
              timeInMinutes = 10; // 10 minutos de ejercicio
              break;
          case 'Expert':
              reps = 30; // 30 repeticiones para experto
              timeInMinutes = 15; // 15 minutos de ejercicio
              break;
          default:
              reps = 15; // Valor predeterminado para "desconocido"
              timeInMinutes = 8; // 8 minutos predeterminados
              break;
      }
  
      return { reps, timeInMinutes };
  };
  
 

  
  let reps = 0, timeInMinutes = 0;  // Declarar las variables fuera del if

  // Verificar que predictionData y predictionData.resultados existen antes de acceder a ellos
  if (predictionData && predictionData.resultados && predictionData.resultados.length > 0) {
    // Extraer el nivel del primer resultado
    const level = predictionData.resultados[0].Level || "desconocido";
    console.log("Nivel del ejercicio:", level);
  
    // Calcular repeticiones y tiempo en minutos basados en el nivel
    const exercise = calculateExercise(level);
    reps = exercise.reps;  // Asignar el valor a la variable reps
    timeInMinutes = exercise.timeInMinutes;  // Asignar el valor a la variable timeInMinutes
    
    console.log("Repeticiones:", reps, "Tiempo en minutos:", timeInMinutes);
  } else {
    console.log("No hay datos disponibles en predictionData.resultados");
  }




  if (!isAuth) return null;



  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#25d162', color: 'white', fontFamily: 'Arial, sans-serif' }}>
  {userData ? (
    <main style={{ padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PANEL DE ESTADÍSTICAS</h2>
          {userData.id_usuarios === 1 && (
            <>
              <button onClick={handleDownload1} disabled={isLoading1}>
                {isLoading1 ? 'Descargando...' : 'Descargar CSV'}
              </button>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <p>MES: {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}</p>
           
          </div>
        </div>

        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatBox title="Calorías quemadas:" value={caloriasQuemadas.toString()} tooltip="Total de calorías que has quemado hasta ahora." />
        <StatBox title="Calorías por quemar:" value={caloriesToBurn2.toString()}  tooltip="Calorías que necesitas quemar para alcanzar tu objetivo." />
        <StatBox title="IMC:" value={userData.imc || "N/A"} tooltip="Índice de Masa Corporal actual basado en tu peso y estatura." />
        <StatBox title="IMC deseado:" value={valorEstadistica} tooltip="IMC recomendado para estar en un rango saludable. Peso ideal entre 59.94 kg y 80.68 kg." />
        <StatBox title="Horas en VidaFit:" value={horasEnVidaFit.toString()} tooltip="Horas que has dedicado a ejercicios en VidaFit." />
        <StatBox title="Repeticiones y tiempo estimado:" value={`Repeticiones: ${reps} | Tiempo estimado: ${timeInMinutes} min`}tooltip="Repeticiones y tiempo estimado para completar el ejercicio en minutos."/>
        <StatBox title="Nombre:" value={userData.nombre || "N/A"} tooltip="Nombre del usuario registrado." />
        <StatBox title="Apellido:" value={userData.apellido || "N/A"} tooltip="Apellido del usuario registrado." />



          {error && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
        
        {isLoading ? (
          <>
            <p style={{ marginTop: '100px'}}>
              <div className='wrapper1'>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="shadow1"></div>
                <div className="shadow1"></div>
                <div className="shadow1"></div>  
              </div>
            
            Cargando predicción...</p>
          </>
        ) : predictionError ? (
          <p style={{ color: 'red' }}>{predictionError}</p>
        ) : predictionData ? (
          <>
            {predictionData.resultados.length > 0 ? (
              <>
                {isIMCNormal ? (
                  <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem' }}>
                    <p style={{ color: 'green' }}>El IMC está en el rango normal.</p>
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem' }}>
                    <p style={{ color: 'red' }}>El IMC no está en el rango normal.</p>
                  </div>
                )}
                <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem' }}>
                  <h2 style={{  margin: 0, fontSize: '1.9rem'  }}>Predicción:</h2>
                </div>
                <Predict title="Ejercicio:" content={predictionData.resultados[0].Title || "Título no disponible"} tooltip="Nombre del ejercicio recomendado" />
                <Predict title="Descripción:" content={predictionData.resultados[0].Desc || "Descripción no disponible"} tooltip="Descripción breve del ejercicio" />
                <Predict title="Equipo:" content={predictionData.resultados[0].Equipment || "Equipo no disponible"} tooltip="Equipo necesario para realizar el ejercicio" />
                <Predict title="Nivel:" content={predictionData.resultados[0].Level || "Nivel no disponible"} tooltip="Nivel de dificultad del ejercicio" />
                <Predict title="Parte del cuerpo:" content={predictionData.resultados[0].BodyPart || "Parte no disponible"} tooltip="Parte del cuerpo que trabaja el ejercicio" />
                <Predict title="Tipo:" content={predictionData.resultados[0].Type || "Tipo no disponible"} tooltip="Tipo de ejercicio (fuerza, cardio, etc.)" />
                <button onClick={fetchPrediction} style={{ width:'50%', marginLeft: '100px', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: '#FFF', borderRadius: '0.5rem', border: 'none' }}>
                  Obtener otra predicción
                </button>
              </>
            ) : (
              <>
                <p>Sin resultados disponibles</p>
              
                <button onClick={fetchPrediction} style={{ width:'50%', marginLeft: '100px', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: '#FFF', borderRadius: '0.5rem', border: 'none' }}>
                  Obtener otra predicción
                </button>
              </>
            )}
          </> 
          ) : (
            <p>{predictionError || "Cargando predicción..."}</p>
          )}
        </div>
  


          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>GRÁFICAS ESTADÍSTICAS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <ChartBox title="Progreso de Peso" tooltip="Muestra en cada semana su peso.">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <input
                  type="number"
                  placeholder="Nuevo peso"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addWeight}>Agregar Peso</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {weightData.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{item.week}: {item.weight}kg</span>
                    <button style={{ backgroundColor: "red"}} onClick={() => deleteWeight(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
            <ChartBox title="Récords Personales"tooltip="Muestra el Récords Personales.">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={recordsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <input
                  placeholder="Nombre del ejercicio"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={newRecord.value}
                  onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addRecord}>Agregar Récord</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {recordsData.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{item.name}: {item.value}</span>
                    <button style={{ backgroundColor: "red"}}  onClick={() => deleteRecord(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
            <ChartBox title="Distribución de Entrenamiento" tooltip="Muestra la distribución de tiempo o porcentaje de entrenamiento en cada grupo muscular.">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={trainingDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <input
                  placeholder="Grupo muscular"
                  value={newDistribution.name}
                  onChange={(e) => setNewDistribution({ ...newDistribution, name: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <input
                  type="number"
                  placeholder="Porcentaje"
                  value={newDistribution.value}
                  onChange={(e) => setNewDistribution({ ...newDistribution, value: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addDistribution}>Agregar Distribución</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {trainingDistribution.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{item.name}: {item.value}%</span>
                    <button style={{ backgroundColor: "red"}}  onClick={() => deleteDistribution(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
            <ChartBox title="Tiempo de Entrenamiento" tooltip="Muestra el tiempo de entrenamiento acumulado por día de la semana.">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={trainingTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="hours" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <select
                  value={newTrainingTime.day}
                  onChange={(e) => setNewTrainingTime({ ...newTrainingTime, day: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                >
                  <option value="">Seleccionar día</option>
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Horas"
                  value={newTrainingTime.hours}
                  onChange={(e) => setNewTrainingTime({ ...newTrainingTime, hours: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                 <button onClick={addTrainingTime}>Agregar Tiempo de Entrenamiento</button>

              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {trainingTime.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',   marginBottom: '0.25rem' }}>
                    <span>{item.day}: {item.hours} horas</span>
                    <button style={{ backgroundColor: "red"}}  onClick={() => deleteTrainingTime(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
          </div>
          </div>
    </main>
  ) : (
    <>

      <div className='wrapper'>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    <p className='responsi' >Cargando datos del usuario...</p>
    </>
  )}
</div>
  )
}

function StatBox({ title, value, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem', position: 'relative' }}>
      <h3 style={{ margin: 0, fontSize: '0.9rem' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</p>
      {/* Icono de exclamación */}
      <span
        style={{
          fontWeight: 'bold',
          cursor: 'pointer',
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: '#d1c4e9',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        !
      </span>
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            visibility: 'visible',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '5px',
            padding: '5px',
            position: 'absolute',
            top: '-40px',
            right: '30px',
            zIndex: 1,
            width: '200px'
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}






function getImageForBodyPart(bodyPart) {
  const images = {
    Abdominals: "static/images/parte_cuerpo/abdominales.jpg",//
    Quadriceps: "static/images/parte_cuerpo/cuadriceps.jpg", //
    Shoulders: "static/images/parte_cuerpo/hombros.avif", //
    Chest: "static/images/parte_cuerpo/cofre.png", //
    Biceps: "static/images/parte_cuerpo/Biceps.webp", //
    Triceps: "static/images/parte_cuerpo/triceps.avif", //
    Lats: "static/images/parte_cuerpo/lats.jpg", //
    Hamstrings: "static/images/parte_cuerpo/Isquiotibiales.webp", //
    "Middle Back": "static/images/parte_cuerpo/espalda_media.jpg", //
    "Lower Back": "static/images/parte_cuerpo/espalda_baja.jpg", //
    Glutes: "static/images/parte_cuerpo/gluteo.jpg", //
    Calves: "static/images/parte_cuerpo/calves.jpg", //
    Forearms: "static/images/parte_cuerpo/antebrazos.webp", //
    Traps: "static/images/parte_cuerpo/imagen_traps.jpg",
    Abductors: "static/images/parte_cuerpo/Abductors.jpg", //
    Adductors: "static/images/parte_cuerpo/Abductors.jpg", //
    Neck: "static/images/parte_cuerpo/Neck.jpg" //
  };

  return images[bodyPart] || null; // Devuelve null si no hay imagen para la parte del cuerpo
}







function Predict({ title, content, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const imageUrl = title === "Parte del cuerpo:" ? getImageForBodyPart(content) : null;

  return (
    <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem', position: 'relative' }}>
      <h3 style={{ margin: 0, fontSize: '0.9rem' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{content}</p>
      {/* Icono de exclamación */}
      <span
        style={{
          fontWeight: 'bold',
          cursor: 'pointer',
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: '#d1c4e9',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        !
      </span>
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            visibility: 'visible',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '5px',
            padding: '5px',
            position: 'absolute',
            top: '-40px',
            right: '30px',
            zIndex: 1,
            width: '200px'
          }}
        >
          {tooltip}
        </div>
      )}
        {/* Mostrar la imagen si existe */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={content}
            style={{ marginTop: '1rem', width: '30%', height: 'auto', borderRadius: '0.5rem' }}
          />
        )}
    </div>
  );
}




function ChartBox({ title, children, tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem', position: 'relative' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>
        {title}
        {/* Icono de exclamación */}
        <span
          style={{
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: '0.5rem',
            backgroundColor: '#d1c4e9',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          !
        </span>
      </h3>
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            visibility: 'visible',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '5px',
            padding: '5px',
            position: 'absolute',
            top: '-40px',
            left: '0px',
            zIndex: 1,
            width: '200px'
          }}
        >
          {tooltip}
        </div>
      )}
      {children}
    </div>
  );
}

