package com.clinica.projeto;

import com.clinica.projeto.model.Cliente;
import com.clinica.projeto.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


@Component



public class StartApp implements CommandLineRunner {
    @Autowired
    private ClienteRepository clienteRepository;
    @Override
    public void run(String... args) throws Exception {
        /*Cliente cliente = new Cliente();
        cliente.setNome("Neymar");
        cliente.setDescricao("Branco");
        cliente.setCategoria("Poodle");
        cliente.setURL("http://example.com/joao2");
        cliente.setDataNascimento(LocalDate.of(2013, 10, 1));
        cliente.setDisponivel(false);

    clienteRepository.save(cliente);*/



    for (Cliente c : clienteRepository.findAll()) {
        System.out.println(c);
    }
    }
}
