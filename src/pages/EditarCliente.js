import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EditarCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/clientes/${id}`)
            .then(response => setCliente(response.data))
            .catch(error => console.error('Erro ao buscar cliente:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCliente({
            ...cliente,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/clientes/${id}`, cliente)
            .then(response => {
                navigate('/'); // Redireciona após salvar
            })
            .catch(error => console.error('Erro ao atualizar cliente:', error));
    };

    return (
        <Container className="mt-4">
            <h2>Editar Cliente</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Nome:</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={cliente.name || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">Descrição:</Label>
                    <Input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={cliente.descricao || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="foto">Foto:</Label>
                    <Input
                        type="text"
                        id="foto"
                        name="foto"
                        value={cliente.foto || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="categoria">Categoria:</Label>
                    <Input
                        type="text"
                        id="categoria"
                        name="categoria"
                        value={cliente.categoria || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dataNascimento">Data de Nascimento:</Label>
                    <Input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={cliente.dataNascimento || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input
                            type="checkbox"
                            name="disponivel"
                            checked={cliente.disponivel || false}
                            onChange={handleChange}
                        />{' '}
                        Disponível
                    </Label>
                </FormGroup>
                <Button color="primary" type="submit">Salvar</Button>
            </Form>
        </Container>
    );
};

export default EditarCliente;
