<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaVue v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa" />
    <BoxTarefa v-if="listaEstaVazia">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">=(</span>
    </BoxTarefa>
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button class="delete" @click="fecharModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descrição
            </label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaVue from '../components/TarefaVue.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTarefa from '../components/BoxTarefa.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'App',
  components: {
    FormularioTarefa,
    TarefaVue,
    BoxTarefa
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    }
  },
  computed: {
    listaEstaVazia() : boolean {
      return this.tarefas.length === 0;
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store
    }
  }
});
</script>

<style>
  
</style>
