import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Button, Container, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ListarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate(); // Adicionado para navegação

    useEffect(() => {
        api.get('/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error('Erro ao buscar clientes:', error));
    }, []);

    const handleDelete = (id) => {
        api.delete(`/clientes/${id}`)
            .then(() => {
                setClientes(clientes.filter(cliente => cliente.id !== id));
            })
            .catch(error => console.error('Erro ao excluir cliente:', error));
    };

    const handleEdit = (id) => {
        navigate(`/editar/${id}`); // Navega para a página de edição
    };

    return (
        <Container>
            <h2>Lista de Clientes</h2>
            <Table striped>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Foto</th>
                    <th>Categoria</th>
                    <th>Data de Nascimento</th>
                    <th>Disponível</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {clientes.map(cliente => (
                    <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.descricao}</td>
                        <td><img src={cliente.foto} alt={cliente.name} style={{ width: '100px' }} /></td>
                        <td>{cliente.categoria}</td>
                        <td>{cliente.dataNascimento}</td>
                        <td>{cliente.disponivel ? 'Sim' : 'Não'}</td>
                        <td>
                            <Button color="success" onClick={() => handleEdit(cliente.id)} className="me-2">Editar</Button>
                            <Button color="danger" onClick={() => handleDelete(cliente.id)}>Excluir</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ListarClientes;
