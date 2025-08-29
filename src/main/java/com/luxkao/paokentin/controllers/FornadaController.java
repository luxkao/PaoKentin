package com.luxkao.paokentin.controllers;

import com.luxkao.paokentin.controllers.dto.FornadaRequestDTO;
import com.luxkao.paokentin.model.entities.Fornada;
import com.luxkao.paokentin.model.repositories.RepositoryFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.SQLException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/fornadas")
@CrossOrigin(origins = "*")
public class FornadaController {

    private final RepositoryFacade repository;

    public FornadaController(RepositoryFacade repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Fornada> create(@RequestBody FornadaRequestDTO request) {
        try {
            Fornada novaFornada = new Fornada();
            novaFornada.setIdPao(request.getPaoId());
            novaFornada.setDataHoraInicio(LocalDateTime.now());

            Fornada fornadaSalva = repository.createFornada(novaFornada);
            return new ResponseEntity<>(fornadaSalva, HttpStatus.CREATED);

        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao registrar fornada.", e);
        }
    }
}