package com.luxkao.paokentin.model.repositories;

import com.luxkao.paokentin.model.entities.Pao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class PaoRepository {

    private final DataSource dataSource;

    public PaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Pao create(Pao pao) throws SQLException {
        String sql = "INSERT INTO pao(nome, descricao, tempo_preparo_minutos, cor_hex) VALUES (?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstm.setString(1, pao.getNome());
            pstm.setString(2, pao.getDescricao());
            pstm.setInt(3, pao.getTempoPreparoMinutos());
            pstm.setString(4, pao.getCorHex());
            pstm.executeUpdate();

            try (ResultSet generatedKeys = pstm.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    pao.setId(generatedKeys.getInt(1));
                }
            }
        }
        return pao;
    }

    public Optional<Pao> findById(int id) throws SQLException {
        String sql = "SELECT * FROM pao WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql)) {

            pstm.setInt(1, id);

            try (ResultSet rs = pstm.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRowToPao(rs));
                }
            }
        }
        return Optional.empty();
    }

    public List<Pao> findAll() throws SQLException {
        String sql = "SELECT * FROM pao";
        List<Pao> paes = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql);
             ResultSet rs = pstm.executeQuery()) {

            while (rs.next()) {
                paes.add(mapRowToPao(rs));
            }
        }
        return paes;
    }

    public void update(Pao pao) throws SQLException {
        String sql = "UPDATE pao SET nome = ?, descricao = ?, tempo_preparo_minutos = ?, cor_hex = ? WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql)) {

            pstm.setString(1, pao.getNome());
            pstm.setString(2, pao.getDescricao());
            pstm.setInt(3, pao.getTempoPreparoMinutos());
            pstm.setString(4, pao.getCorHex());
            pstm.setInt(5, pao.getId());
            pstm.executeUpdate();
        }
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM pao WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql)) {

            pstm.setInt(1, id);
            pstm.executeUpdate();
        }
    }

    private Pao mapRowToPao(ResultSet rs) throws SQLException {
        Pao pao = new Pao();
        pao.setId(rs.getInt("id"));
        pao.setNome(rs.getString("nome"));
        pao.setDescricao(rs.getString("descricao"));
        pao.setTempoPreparoMinutos(rs.getInt("tempo_preparo_minutos"));
        pao.setCorHex(rs.getString("cor_hex"));
        return pao;
    }
}