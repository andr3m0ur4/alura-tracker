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
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import TemporizadorTarefa from "./TemporizadorTarefa.vue";

export default defineComponent({
  name: 'FormularioTarefa',
  props: ['aoSalvarTarefa'],
  components: {
    TemporizadorTarefa
  },
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  methods: {
    salvarTarefa(tempoDecorrido: number) : void {
      const projeto = this.projetos.find(projeto => projeto.id == this.idProjeto);
      if (!projeto) {
        this.store.commit(NOTIFICAR, {
          titulo: 'Ops!',
          texto: 'Selecione um projeto antes de finalizar a tarefa!',
          tipo: TipoNotificacao.FALHA
        });
        return;
      }

      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(projeto => projeto.id == this.idProjeto)
      });
      this.descricao = '';
    }
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos),
      store
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
