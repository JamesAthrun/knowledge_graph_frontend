<template>
  <main class="check">
    <h1>Check preventive measures here!</h1>
    <SmartForm
        class="form"
        title="Please enter the elements">
      <h3>message</h3>
      <FormInput
          v-model="question"
          name="question"
          placeholder="例：农民工预防措施有哪些？"/>
      <template slot="actions">
        <button
            class="secondary"
            type="button"
            @click="check">
          Check
        </button>
        <button
            class="secondary"
            type="button"
            @click="clear">
          Clear
        </button>
      </template>
    </SmartForm>

    <div v-if="isSearched">
      <section class="list">
        <article v-for="searchResult of answers">
          <h2 v-html="searchResult"></h2>
        </article>
      </section>
    </div>

  </main>
</template>


<script>

import {$ajax} from "../plugins/request";

export default {
  data() {
    return {
      question: '',
      answers: '',
      prompting: '',
      isSearched: false,
    }
  },
  methods: {
    async check() {
      console.log(this.question)
      this.isSearched = true
      $ajax("KG/ask", "POST", this.question)
          .then((response) => {
            this.answers = JSON.parse(response.data).table
            this.prompting = JSON.parse(response.data).help
            console.log(this.answers)
            console.log(this.prompting)
          })
    },
    clear() {
      this.message = ''
      this.isSearched = false
    },
  }
}
</script>

<style>

</style>