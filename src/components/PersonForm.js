import React, { useState } from 'react';
import axios from 'axios';
import './PersonForm.css'; // Importa el archivo CSS

const PersonForm = () => {
  const [formData, setFormData] = useState({
    id: 0,
    numero_identificacion: '',
    tipo_identificacion: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    sexo: '',
    fecha_nacimiento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Asegurarse de que el campo número_identificacion solo tenga números
    if (name === 'numero_identificacion') {
      setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar campos
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && value.trim() === '') {
        alert(`El campo ${key} no puede estar vacío.`);
        return;
      }
    }

    // Convertir el id a entero
    const updatedFormData = {
      ...formData,
      id: parseInt(formData.id, 10), // Aquí se convierte el id a un entero
    };

    try {
      const host = process.env.REACT_APP_HOST_NODE_BACKEND;
      const port = process.env.REACT_APP_PORT_NODE_BACKEND;
      const response = await axios.put(`http://${host}:${port}/api/backend-nodejs/personas/${updatedFormData.id}`, updatedFormData);
      alert('Person updated successfully: ' + JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating person:', error);
      alert('Error updating person: ' + error.message);
    }
  };

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <h2>Update Person Information</h2>
      <div className="form-group">
        <label>id</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Ingrese el id"
          pattern="\d*"
        />
      </div>
      <div className="form-group">
        <label>Número de Identificación</label>
        <input
          type="text"
          name="numero_identificacion"
          value={formData.numero_identificacion}
          onChange={handleChange}
          placeholder="Ingrese el número de identificación"
          pattern="\d*"
        />
      </div>
      <div className="form-group">
        <label>Tipo de Identificación</label>
        <select
          name="tipo_identificacion"
          value={formData.tipo_identificacion}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="cedula">Cédula</option>
          <option value="tarjeta_identidad">Tarjeta de Identidad</option>
        </select>
      </div>
      <div className="form-group">
        <label>Primer Nombre</label>
        <input
          type="text"
          name="nombre1"
          value={formData.nombre1}
          onChange={handleChange}
          placeholder="Ingrese el primer nombre"
        />
      </div>
      <div className="form-group">
        <label>Segundo Nombre</label>
        <input
          type="text"
          name="nombre2"
          value={formData.nombre2}
          onChange={handleChange}
          placeholder="Ingrese el segundo nombre"
        />
      </div>
      <div className="form-group">
        <label>Primer Apellido</label>
        <input
          type="text"
          name="apellido1"
          value={formData.apellido1}
          onChange={handleChange}
          placeholder="Ingrese el primer apellido"
        />
      </div>
      <div className="form-group">
        <label>Segundo Apellido</label>
        <input
          type="text"
          name="apellido2"
          value={formData.apellido2}
          onChange={handleChange}
          placeholder="Ingrese el segundo apellido"
        />
      </div>
      <div className="form-group">
        <label>Sexo</label>
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div className="form-group">
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
        />
      </div>
      <button className="submit-button" type="submit">Actualizar Persona</button>
    </form>
  );
};

export default PersonForm;
