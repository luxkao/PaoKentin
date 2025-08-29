package com.luxkao.paokentin.model.repositories;

import com.luxkao.paokentin.model.entities.Fornada;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FornadaRepository {

    private final DataSource dataSource;

    public FornadaRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Fornada create(Fornada fornada) throws SQLException {
        String sql = "INSERT INTO fornada(id_pao, data_hora_inicio) VALUES (?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstm.setInt(1, fornada.getIdPao());
            pstm.setTimestamp(2, Timestamp.valueOf(fornada.getDataHoraInicio()));
            pstm.executeUpdate();

            try (ResultSet generatedKeys = pstm.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    fornada.setId(generatedKeys.getInt(1));
                }
            }
        }
        return fornada;
    }

    public List<Fornada> findLatestFornadaForEachPao() throws SQLException {
        String sql = """
            SELECT f.* FROM fornada f
            INNER JOIN (
                SELECT id_pao, MAX(data_hora_inicio) AS max_data
                FROM fornada
                GROUP BY id_pao
            ) AS latest ON f.id_pao = latest.id_pao AND f.data_hora_inicio = latest.max_data
            """;
        List<Fornada> fornadas = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement pstm = conn.prepareStatement(sql);
             ResultSet rs = pstm.executeQuery()) {

            while (rs.next()) {
                fornadas.add(mapRowToFornada(rs));
            }
        }
        return fornadas;
    }

    private Fornada mapRowToFornada(ResultSet rs) throws SQLException {
        Fornada fornada = new Fornada();
        fornada.setId(rs.getInt("id"));
        fornada.setIdPao(rs.getInt("id_pao"));
        fornada.setDataHoraInicio(rs.getTimestamp("data_hora_inicio").toLocalDateTime());
        return fornada;
    }
}