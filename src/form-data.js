import axios from 'axios';

const formData = new FormData();
formData.append('nome', nome);
formData.append('descricao', descricao);
formData.append('categoria', categoria);
formData.append('dataNascimento', dataNascimento);
formData.append('disponivel', disponivel);
if (foto) {
    formData.append('foto', foto);
}

axios.post('http://localhost:8080/api/clientes', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
    .then(response => {
        console.log('Cliente criado:', response.data);
    })
    .catch(error => {
        console.error('Erro ao criar cliente:', error);
    });
