import { useState, useEffect } from 'react'
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false)

  useEffect(() => {
   if(Object.keys(paciente).length > 0) {
     setNombre(paciente.nombre)
     setPropietario(paciente.propietario)
     setEmail(paciente.email)
     setFecha(paciente.fecha)
     setSintomas(paciente.sintomas)
   }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
   e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {

      setError(true)
      return;

    } 
      setError(false)

      const objetoPaciente = {
        nombre, 
        propietario, 
        email, 
        fecha, 
        sintomas
      }

      if(paciente.id) {
        //Editando el registro
        objetoPaciente.id = paciente.id

        const pacientesActualizados = pacientes.map ( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})
      }
      else{
        //Nuevo registro
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente])
      }
     
     //Reiniciar el form
      setNombre("")
      setPropietario("")
      setEmail("")
      setFecha("")
      setSintomas("")
  }

  return (
    <div className="w-full lg:w-1/2 xl:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold text-lg">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
       
       { error &&  <Error>Todos los campos son obligatorios</Error>}

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
            <input
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre del propietario
            <input
              id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
            <input
              id="email"
              type="email"
              placeholder="Email contacto"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Fecha
            <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="Sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario
