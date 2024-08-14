package com.clinica.projeto.controller;

import com.clinica.projeto.model.Cliente;
import com.clinica.projeto.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientes() {
        try {
            List<Cliente> clientes = clienteService.findAll();
            return ResponseEntity.ok(clientes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Integer id) {
        try {
            Optional<Cliente> cliente = clienteService.findById(id);
            return cliente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        try {
            // Log para depuração
            System.out.println("Recebido cliente: " + cliente);
            Cliente savedCliente = clienteService.save(cliente);
            // Log para depuração
            System.out.println("Cliente salvo: " + savedCliente);
            return ResponseEntity.ok(savedCliente);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Integer id, @RequestBody Cliente clienteDetails) {
        try {
            Optional<Cliente> cliente = clienteService.findById(id);
            if (cliente.isPresent()) {
                Cliente clienteToUpdate = cliente.get();
                clienteToUpdate.setName(clienteDetails.getName());
                clienteToUpdate.setDescricao(clienteDetails.getDescricao());
                clienteToUpdate.setFoto(clienteDetails.getFoto());
                clienteToUpdate.setCategoria(clienteDetails.getCategoria());
                clienteToUpdate.setDataNascimento(clienteDetails.getDataNascimento());
                clienteToUpdate.setDisponivel(clienteDetails.isDisponivel());

                return ResponseEntity.ok(clienteService.save(clienteToUpdate));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Integer id) {
        try {
            if (clienteService.findById(id).isPresent()) {
                clienteService.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
