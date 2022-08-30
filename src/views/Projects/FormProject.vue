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
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormProject',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref('');

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(projeto => projeto.id == props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = '';
      notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!');
      router.push('/projetos');
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto.value
        })
          .then(() => lidarComSucesso());
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso())
      }
    }

    return {
      nomeDoProjeto,
      salvar
    };
  }
});
</script>

<style scoped>
  
</style>
