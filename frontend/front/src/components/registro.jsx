import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export function Registro() {

  const [create, setCreate] = useState(
    {
      id: '',
      name: '',
      description: '',
      price: '',
      image: ''

    }
  )

  const handleChange = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value
    })
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(create)
    }

    fetch('http://localhost:3002/products', requestInit)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setCreate({
          id: '',
          name: '',
          description: '',
          price: '',
          images: ''
        });
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  return (
    <div className="formulario-container">
      <strong>
        <h1 id="titulo">Registrar</h1>
      </strong>
      <Form onSubmit={handleSubmit} className="formulario">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={handleChange}
            type="Number"
            name="id"
            placeholder="Id"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleChange}
            type="Number"
            placeholder="Precio"
            name="price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Descripción"
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Imagenes"
            name="images"
          />
         
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Añadir
        </Button>
      </Form>
      <div>
      <label>Vueva a recargar la pagina, cuando añada un nuvo producto </label>
      </div>
    </div>
    
  );

}

export function Tables() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      fetch('http://localhost:3002/products').then
        (res => res.json())
        .then(res => setProducts(res))
    }
    getProducts()
  }, [])

  return (
    <table className='table' style={{ width: '50%', margin: '0 auto' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td><img src={product.images} alt={product.image} style={{ maxWidth: '20%', border: '1px solid gray' }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );


}



