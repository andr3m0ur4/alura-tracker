<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
        <input type="text" v-model="descricao" class="input" placeholder="Qual tarefa você deseja iniciar?">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorTarefa @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TemporizadorTarefa from "./TemporizadorTarefa.vue";

export default defineComponent({
  name: 'FormularioTarefa',
  props: ['aoSalvarTarefa'],
  components: {
    TemporizadorTarefa
  },
  setup(props, { emit }) {
    const store = useStore(key);
    const descricao = ref('');
    const idProjeto = ref('');
    const projetos = computed(() => store.state.projeto.projetos);

    const salvarTarefa = (tempoDecorrido: number) : void => {
      const projeto = projetos.value.find(projeto => projeto.id == idProjeto.value);
      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops!',
          texto: 'Selecione um projeto antes de finalizar a tarefa!',
          tipo: TipoNotificacao.FALHA
        });
        return;
      }

      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(projeto => projeto.id == idProjeto.value)
      });
      descricao.value = '';
    }

    return {
      descricao,
      idProjeto,
      projetos,
      salvarTarefa
    };
  }
});
</script>

<style>
  .box.formulario {
    color: var(--text-primary);
    background-color: var(--bg-primary);
  }
</style>
