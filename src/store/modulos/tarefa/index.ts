import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, DEFINIR_TAREFAS, REMOVE_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(item => item.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [REMOVE_TAREFA](state, id: number) {
            state.tarefas = state.tarefas.filter(item => item.id != id);
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas';
            if (filtro) {
                url += `?descricao=${filtro}`;
            }

            http.get(url)
                .then(response => commit(DEFINIR_TAREFAS, response.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data));
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(response => commit(ATUALIZA_TAREFA, tarefa));
        }
    }
}
