<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaVue v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <BoxTarefa v-if="listaEstaVazia">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">=(</span>
    </BoxTarefa>
    <ModalTask :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" @click="fecharModal" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição
          </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada!.descricao"
            id="descricaoDaTarefa"
          >
        </div>
      </template>
      <template v-slot:rodape>
        <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </ModalTask>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaVue from '../components/TarefaVue.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTarefa from '../components/BoxTarefa.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';
import ModalTask from '@/components/ModalTask.vue';

export default defineComponent({
  name: 'App',
  components: {
    FormularioTarefa,
    TarefaVue,
    BoxTarefa,
    ModalTask
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

    const filtro = ref('');

    // const tarefas = computed(() => store.state.tarefa.tarefas.filter(
    //   tarefa => !filtro.value || tarefa.descricao.includes(filtro.value)
    // ));

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro
    }
  }
});
</script>

<style>
  
</style>
