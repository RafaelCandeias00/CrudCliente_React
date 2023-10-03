import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React, { useEffect, useState } from 'react';

function App() {
  const baseUrl="https://localhost:44311/api/Clientes";
  const [data, setData]=useState([]);

  const pedidoGet=async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    pedidoGet();
  })
  return (
    <div className="cliente-container">
      <br/>
      <h3>Cadastro de Clientes</h3>
      <header>
        <button className="btn btn-success">Incluir Novo Cliente</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Sexo</th>
            <th>Estado</th>
            <th>Endereço</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map(cliente=>(
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.dataNascimento}</td>
              <td>{cliente.sexo}</td>
              <td>{cliente.estado}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.cidade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button>{" "}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
