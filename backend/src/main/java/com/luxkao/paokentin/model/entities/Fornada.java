package com.luxkao.paokentin.model.entities;

import java.time.LocalDateTime;

public class Fornada {
    private int id;
    private int idPao;
    private LocalDateTime dataHoraInicio;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPao() {
        return idPao;
    }

    public void setIdPao(int idPao) {
        this.idPao = idPao;
    }

    public LocalDateTime getDataHoraInicio() {
        return dataHoraInicio;
    }

    public void setDataHoraInicio(LocalDateTime dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }
}
