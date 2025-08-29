package com.luxkao.paokentin.controllers.dto;

import com.luxkao.paokentin.model.entities.Pao;
import java.time.LocalDateTime;

public class FornadaStatusDTO {
    private Pao pao;
    private LocalDateTime dataHoraInicio;
    private long tempoRestanteSegundos;
    private String status;

    public FornadaStatusDTO(Pao pao) {
        this.pao = pao;
        this.status = "Aguardando fornada";
        this.tempoRestanteSegundos = 0;
    }

    public Pao getPao() {
        return pao;
    }

    public void setPao(Pao pao) {
        this.pao = pao;
    }

    public LocalDateTime getDataHoraInicio() {
        return dataHoraInicio;
    }

    public void setDataHoraInicio(LocalDateTime dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }

    public long getTempoRestanteSegundos() {
        return tempoRestanteSegundos;
    }

    public void setTempoRestanteSegundos(long tempoRestanteSegundos) {
        this.tempoRestanteSegundos = tempoRestanteSegundos;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}