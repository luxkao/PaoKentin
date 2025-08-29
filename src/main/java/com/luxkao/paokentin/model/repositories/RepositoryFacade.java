package com.luxkao.paokentin.model.repositories;

import com.luxkao.paokentin.model.entities.Fornada;
import com.luxkao.paokentin.model.entities.Pao;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class RepositoryFacade {

    private final PaoRepository paoRepository;
    private final FornadaRepository fornadaRepository;

    public RepositoryFacade(PaoRepository paoRepository, FornadaRepository fornadaRepository) {
        this.paoRepository = paoRepository;
        this.fornadaRepository = fornadaRepository;
    }

    // Métodos delegados para PaoRepository
    public Pao createPao(Pao pao) throws SQLException {
        return this.paoRepository.create(pao);
    }

    public Optional<Pao> findPaoById(int id) throws SQLException {
        return this.paoRepository.findById(id);
    }



    public List<Pao> findAllPaes() throws SQLException {
        return this.paoRepository.findAll();
    }

    public void updatePao(Pao pao) throws SQLException {
        this.paoRepository.update(pao);
    }

    public void deletePao(int id) throws SQLException {
        this.paoRepository.delete(id);
    }

    // Métodos delegados para FornadaRepository
    public Fornada createFornada(Fornada fornada) throws SQLException {
        return this.fornadaRepository.create(fornada);
    }

    public List<Fornada> findLatestFornadas() throws SQLException {
        return this.fornadaRepository.findLatestFornadaForEachPao();
    }
}