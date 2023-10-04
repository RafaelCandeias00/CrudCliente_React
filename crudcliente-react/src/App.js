import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React, { useEffect, useState } from 'react';

function App() {
  const baseUrl="https://localhost:44311/api/Clientes";
  const [data, setData]=useState([]);

  const [clienteSelecionado, setClienteSelecionado]=useState({
    id:'',
    cpf:'',
    nome:'',
    dataNascimento:'',
    sexo:'',
    estado:'',
    endereco:'',
    cidade:''
  })

  const [modalIncluir, setModalIncluir]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalExcluir, setModalExcluir]=useState(false);

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir=()=>{
    setModalExcluir(!modalExcluir);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setClienteSelecionado({
      ...clienteSelecionado,
      [name]: value
    });
    console.log(clienteSelecionado);
  }

  const pedidoGet=async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPost=async()=>{
    delete clienteSelecionado.id;
    await axios.post(baseUrl, clienteSelecionado)
    .then(response => {
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPut=async()=>{
    await axios.put(baseUrl+"/"+clienteSelecionado.id, clienteSelecionado)
    .then(response=>{
      var resposta = response.data;
      var dadosAux = data;
      dadosAux.map(cliente=>{
        if(cliente.id===clienteSelecionado.id){
          cliente.nome=resposta.nome;
          cliente.dataNascimento=resposta.dataNascimento;
          cliente.sexo=resposta.sexo;
          cliente.endereco=resposta.endereco;
          cliente.estado=resposta.estado;
          cliente.cidade=resposta.cidade;
        }
      });
      abrirFecharModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoDelete=async()=>{
    await axios.delete(baseUrl+"/"+clienteSelecionado.id)
    .then(response=>{
      setData(data.filter(cliente=> cliente.id !== response.data));
      abrirFecharModalExcluir();
    }).catch(error=>{
      console.log(error)
    })
  }

  const selecionarCliente=(cliente, opcao)=>{
    setClienteSelecionado(cliente);
    (opcao==="Editar") ? 
    abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  useEffect(()=>{
    pedidoGet();
  })
  return (
    <div className="cliente-container">
      <br/>
      <h3>Cadastro de Clientes</h3>
      <header>
        <button onClick={()=>abrirFecharModalIncluir()} className="btn btn-success">Incluir Novo Cliente</button>
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
            <th>Operações</th>
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
                <button className='btn btn-primary' onClick={()=>selecionarCliente(cliente, "Editar")}>Editar</button>{" "}
                <button className='btn btn-danger' onClick={()=>selecionarCliente(cliente, "Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Cliente</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>CPF: </label>
            <br/>
            <input type='text' className='form-control' name="cpf" onChange={handleChange}/>
            <br/>

            <label>Nome: </label>
            <br/>
            <input type='text' className='form-control' name="nome" onChange={handleChange}/>
            <br/>

            <label>Data de Nascimento: </label>
            <br/>
            <input type='date' className='form-control' name="dataNascimento" onChange={handleChange}/>
            <br/>

            <label>Sexo: </label>
            <br/>
            <input type='text' className='form-control' name="sexo" onChange={handleChange}/>
            <br/>

            <label>Estado: </label>
            <br/>
            <input type='text' className='form-control' name="estado" onChange={handleChange}/>
            <br/>

            <label>Endereço: </label>
            <br/>
            <input type='text' className='form-control' name="endereco" onChange={handleChange}/>
            <br/>

            <label>Cidade: </label>
            <br/>
            <input type='text' className='form-control' name="cidade" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()}>Incluir</button> {" "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalBody>
            <div className='form-group'>
              <label>ID: </label> <br/>
              <input type='text' className='form-control' name="id" readOnly onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.id}/>

              <label>CPF: </label> <br/>
              <input type='text' className='form-control' name="cpf" readOnly onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.cpf}/>

              <label>Nome:</label> <br/>
              <input type='text' className='form-control' name="nome" onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.nome}/>

              <label>Data de Nascimento</label> <br/>
              <input type='date' className='form-control' name="dataNascimento" readOnly onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.dataNascimento}/>

              <label>Sexo:</label> <br/>
              <input type='text' className='form-control' name="sexo" onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.sexo}/>

              <label>Estado:</label> <br/>
              <input type='text' className='form-control' name="estado" onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.estado}/>

              <label>Endereço:</label> <br/>
              <input type='text' className='form-control' name="endereco" onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.endereco}/>

              <label>Cidade:</label> <br/>
              <input type='text' className='form-control' name="cidade" onChange={handleChange} 
              value={clienteSelecionado && clienteSelecionado.cidade}/>
            </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPut()}>Editar</button> {" "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste cliente: {clienteSelecionado && clienteSelecionado.nome}?
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>pedidoDelete()}>Sim</button>
          <button className='btn btn-secondary' onClick={()=>abrirFecharModalExcluir()}>Não</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
