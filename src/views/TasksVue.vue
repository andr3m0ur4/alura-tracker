<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <BoxTarefa v-if="listaEstaVazia">
      Você não está muito produtivo hoje =(
    </BoxTarefa>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaVue from '../components/TarefaVue.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTarefa from '../components/BoxTarefa.vue';

export default defineComponent({
  name: 'App',
  components: {
    FormularioTarefa,
    TarefaVue,
    BoxTarefa
  },
  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    }
  },
  computed: {
    listaEstaVazia() : boolean {
      return this.tarefas.length === 0;
    }
  }
});
</script>

<style>
  
</style>
