<template>
  <main class="home">
    <h1>Welcome to our Knowledge Graph</h1>

    <div>
      <input v-model="message" placeholder="enter the entity here">
      <button @click="search"> search </button>
    </div>

    <p>
      <!--We are here to help! Please read the <router-link :to="{name: 'faq'}">F.A.Q</router-link> first,
      and if you don't find the answer to your question, <router-link :to="{name: 'tickets'}">send us a ticket!</router-link>-->
      This is our Knowledge Graph. Please enter the entity you want to search.
    </p>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
      }
    },

    methods: {
      search() {
        this.$router.push('/testDemo')
      }
    }

  }
</script>
