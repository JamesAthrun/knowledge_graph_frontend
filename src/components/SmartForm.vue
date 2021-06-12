<template>
  <form @submit.prevent="submit">
    <section class="content">
      <div class="title">{{ title }}</div>
      <slot/>

      <div class="actions">
        <slot name="actions"/>
      </div>

      <div v-if="error" class="error">{{ error }}</div>
    </section>

    <transition name="fade">
      <Loading v-if="busy" class="overlay"/>
    </transition>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    operation: {
      type: Function,
    },
    valid: {
      type: Boolean,
    }
  },
  data() {
    return {
      error: null,
      busy: false,
    }
  },

  methods: {
    async submit() {
      if (this.valid && !this.busy) {
        this.error = null
        this.busy = true
        try {
          await this.operation()
        } catch (e) {
          this.error = e.message
        }
        this.busy = false
      }
    },
  },
}
</script>

<style>
.content > .title {
  color: inherit;
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
}

</style>
