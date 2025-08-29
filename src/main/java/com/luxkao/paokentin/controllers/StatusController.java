package com.luxkao.paokentin.controllers;

import com.luxkao.paokentin.controllers.dto.FornadaStatusDTO;
import com.luxkao.paokentin.model.entities.Fornada;
import com.luxkao.paokentin.model.entities.Pao;
import com.luxkao.paokentin.model.repositories.RepositoryFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.sql.SQLException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/status")
@CrossOrigin(origins = "*")
public class StatusController {

    private final RepositoryFacade repository;

    public StatusController(RepositoryFacade repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<FornadaStatusDTO>> getStatus() {
        try {
            List<Pao> paes = repository.findAllPaes();
            List<Fornada> ultimasFornadas = repository.findLatestFornadas();

            Map<Integer, Fornada> mapaFornadas = ultimasFornadas.stream()
                    .collect(Collectors.toMap(Fornada::getIdPao, Function.identity()));

            List<FornadaStatusDTO> statusList = paes.stream().map(pao -> {
                FornadaStatusDTO statusDTO = new FornadaStatusDTO(pao);
                Fornada fornada = mapaFornadas.get(pao.getId());

                if (fornada != null) {
                    statusDTO.setDataHoraInicio(fornada.getDataHoraInicio());
                    LocalDateTime agora = LocalDateTime.now();
                    LocalDateTime horaFim = fornada.getDataHoraInicio().plusMinutes(pao.getTempoPreparoMinutos());

                    if (agora.isBefore(horaFim)) {
                        statusDTO.setStatus("Assando");
                        statusDTO.setTempoRestanteSegundos(Duration.between(agora, horaFim).toSeconds());
                    } else {
                        statusDTO.setStatus("Pronto");
                        statusDTO.setTempoRestanteSegundos(0);
                    }
                }
                return statusDTO;
            }).collect(Collectors.toList());

            return new ResponseEntity<>(statusList, HttpStatus.OK);

        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar status das fornadas.", e);
        }
    }
}