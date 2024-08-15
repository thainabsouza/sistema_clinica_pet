package com.clinica.projeto.service;

import com.clinica.projeto.model.Cliente;
import com.clinica.projeto.repository.ClienteRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    public ClienteServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        // Dados de teste
        Cliente cliente1 = new Cliente("João", "Descrição 1", "http://example.com/foto1.jpg", "Categoria A", LocalDate.of(1990, 1, 1), true);
        Cliente cliente2 = new Cliente("Maria", "Descrição 2", "http://example.com/foto2.jpg", "Categoria B", LocalDate.of(1985, 5, 15), false);
        List<Cliente> clientes = new ArrayList<>();
        clientes.add(cliente1);
        clientes.add(cliente2);

        // Configuração do mock
        when(clienteRepository.findAll()).thenReturn(clientes);

        // Teste
        List<Cliente> result = clienteService.findAll();
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(cliente1, result.get(0));
        assertEquals(cliente2, result.get(1));
    }

    @Test
    public void testFindById() {
        // Dados de teste
        Cliente cliente = new Cliente("João", "Descrição 1", "http://example.com/foto1.jpg", "Categoria A", LocalDate.of(1990, 1, 1), true);

        // Configuração do mock
        when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));

        // Teste
        Optional<Cliente> result = clienteService.findById(1);
        assertTrue(result.isPresent());
        assertEquals(cliente, result.get());
    }

    @Test
    public void testSave() {
        // Dados de teste
        Cliente cliente = new Cliente("João", "Descrição 1", "http://example.com/foto1.jpg", "Categoria A", LocalDate.of(1990, 1, 1), true);

        // Configuração do mock
        when(clienteRepository.save(cliente)).thenReturn(cliente);

        // Teste
        Cliente result = clienteService.save(cliente);
        assertNotNull(result);
        assertEquals(cliente, result);
    }

    @Test
    public void testDeleteById() {
        // Dados de teste
        Integer id = 1;

        // Configuração do mock
        doNothing().when(clienteRepository).deleteById(id);

        // Teste
        assertDoesNotThrow(() -> clienteService.deleteById(id));
        verify(clienteRepository, times(1)).deleteById(id);
    }
}
