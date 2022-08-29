<template>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjeto" class="label">
        Nome do Projeto
      </label>
      <input type="text" v-model="nomeDoProjeto" id="nomeDoProjeto" class="input">
    </div>
    <div class="field">
      <button class="button" type="submit">
        Salvar
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'FormProject',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(projeto => projeto.id == this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
          .then(() => this.lidarComSucesso());
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso())
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!');
      this.$router.push('/projetos');
    }
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar
    };
  }
});
</script>

<style scoped>
  
</style>
