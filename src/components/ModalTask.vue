<template>
  <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="corpo"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="rodape"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: 'ModalTask',
  props: {
    mostrar: {
      tupe: Boolean,
      required: true
    }
  }
});
</script>

<style scoped>

</style>
