import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useParams } from 'react-router-dom';
import { Container, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const ClienteDetail = () => {
    const [cliente, setCliente] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        api.get(`/clientes/${id}`)
            .then(response => setCliente(response.data))
            .catch(error => console.error('Erro ao buscar cliente:', error));
    }, [id]);

    if (!cliente) return <p>Carregando...</p>;

    return (
        <Container>
            <Card>
                {cliente.foto && (
                    <CardImg
                        top
                        width="100%"
                        src={`http://localhost:8080/api/images/${cliente.foto}`}
                        alt="Foto do cliente"
                    />
                )}
                <CardBody>
                    <CardTitle tag="h5">{cliente.nome}</CardTitle>
                    <CardText>{cliente.descricao}</CardText>
                    <CardText>Categoria: {cliente.categoria}</CardText>
                    <CardText>Data de Nascimento: {cliente.dataNascimento}</CardText>
                    <CardText>Disponível: {cliente.disponivel ? 'Sim' : 'Não'}</CardText>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ClienteDetail;
