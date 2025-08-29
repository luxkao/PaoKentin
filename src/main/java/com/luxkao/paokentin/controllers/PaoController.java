package com.luxkao.paokentin.controllers;

import com.luxkao.paokentin.model.entities.Pao;
import com.luxkao.paokentin.model.repositories.RepositoryFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/paes")
@CrossOrigin(origins = "*")
public class PaoController {

    private final RepositoryFacade repository;

    public PaoController(RepositoryFacade repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Pao> create(@RequestBody Pao pao) {
        try {
            Pao novoPao = repository.createPao(pao);
            return new ResponseEntity<>(novoPao, HttpStatus.CREATED);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar pão.", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Pao>> findAll() {
        try {
            List<Pao> paes = repository.findAllPaes();
            return new ResponseEntity<>(paes, HttpStatus.OK);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar pães.", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pao> findById(@PathVariable int id) {
        try {
            return repository.findPaoById(id)
                    .map(pao -> new ResponseEntity<>(pao, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar pão.", e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pao> update(@PathVariable int id, @RequestBody Pao pao) {
        try {
            if (repository.findPaoById(id).isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            pao.setId(id);
            repository.updatePao(pao);
            return new ResponseEntity<>(pao, HttpStatus.OK);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar pão.", e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        try {
            if (repository.findPaoById(id).isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            repository.deletePao(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao deletar pão.", e);
        }
    }
}