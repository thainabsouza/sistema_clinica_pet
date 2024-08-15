import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CadastroCliente = ({ cliente, onSave = () => {}, onCancel }) => {
    const [formData, setFormData] = useState(cliente || {});
    const [fotoUrl, setFotoUrl] = useState(''); // Estado para URL da foto
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            api.get(`/clientes/${id}`)
                .then(response => {
                    setFormData(response.data);
                    setFotoUrl(response.data.foto || ''); // Atualiza o URL da foto ao carregar os dados
                })
                .catch(error => console.error('Erro ao buscar cliente:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleUrlChange = (e) => {
        setFotoUrl(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            nome: formData.nome,
            descricao: formData.descricao,
            categoria: formData.categoria,
            dataNascimento: formData.dataNascimento,
            disponivel: formData.disponivel,
            foto: fotoUrl // Adiciona o URL da foto
        };

        if (formData.id) {
            // Atualizar cliente existente
            api.put(`/clientes/${formData.id}`, data)
                .then(response => {
                    if (typeof onSave === 'function') {
                        onSave(response.data);
                    }
                    navigate('/');
                })
                .catch(error => console.error('Erro ao atualizar cliente:', error));
        } else {
            // Criar novo cliente
            api.post('/clientes', data)
                .then(response => {
                    if (typeof onSave === 'function') {
                        onSave(response.data);
                    }
                    navigate('/');
                })
                .catch(error => console.error('Erro ao criar cliente:', error));
        }
    };

    return (
        <Container>
            <h2>{formData.id ? 'Editar Cliente' : 'Cadastrar Cliente'}</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input
                        type="text"
                        name="nome"
                        id="nome"
                        value={formData.nome || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input
                        type="text"
                        name="descricao"
                        id="descricao"
                        value={formData.descricao || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="fotoUrl">Foto (URL)</Label>
                    <Input
                        type="text"
                        name="fotoUrl"
                        id="fotoUrl"
                        value={fotoUrl || ''}
                        onChange={handleUrlChange}
                    />
                    {fotoUrl && (
                        <img
                            src={fotoUrl}
                            alt="Foto do cliente"
                            style={{ width: '100px', marginTop: '10px' }}
                        />
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="categoria">Categoria</Label>
                    <Input
                        type="text"
                        name="categoria"
                        id="categoria"
                        value={formData.categoria || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dataNascimento">Data de Nascimento</Label>
                    <Input
                        type="date"
                        name="dataNascimento"
                        id="dataNascimento"
                        value={formData.dataNascimento || ''}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="disponivel">Disponível</Label>
                    <Input
                        type="checkbox"
                        name="disponivel"
                        id="disponivel"
                        checked={formData.disponivel || false}
                        onChange={handleChange}
                        className="me-2"
                    />
                </FormGroup>
                <Button color="success" type="submit" className="me-2">Salvar</Button>
                <Button color="secondary" type="button" onClick={() => navigate('/')}>Cancelar</Button>
            </Form>
        </Container>
    );
};

export default CadastroCliente;

