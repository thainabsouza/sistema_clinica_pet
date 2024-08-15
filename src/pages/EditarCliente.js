import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

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
        <div>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={cliente.nome || ''} onChange={handleChange} required />
                </label>
                <label>
                    Descrição:
                    <input type="text" name="descricao" value={cliente.descricao || ''} onChange={handleChange} required />
                </label>
                <label>
                    Foto:
                    <input type="text" name="foto" value={cliente.foto || ''} onChange={handleChange} required />
                </label>
                <label>
                    Categoria:
                    <input type="text" name="categoria" value={cliente.categoria || ''} onChange={handleChange} required />
                </label>
                <label>
                    Data de Nascimento:
                    <input type="date" name="dataNascimento" value={cliente.dataNascimento || ''} onChange={handleChange} required />
                </label>
                <label>
                    Disponível:
                    <input type="checkbox" name="disponivel" checked={cliente.disponivel || false} onChange={handleChange} />
                </label>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditarCliente;
