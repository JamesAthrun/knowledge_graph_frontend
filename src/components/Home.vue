<template>
    <main class="home">
        <h1>Welcome to our knowledge graph</h1>
        <SmartForm
                class="form"
                title="Please enter the entity">
            <FormInput
                    name="test"
                    v-model="message"
                    placeholder="" />
            <template slot="actions">
                <button
                        type="button"
                        class="secondary"
                        @click="search">
                    Search
                </button>
                <button
                        type="button"
                        class="secondary"
                        @click="clear">
                    Clear
                </button>
            </template>
        </SmartForm>


        <div v-if="isSearched">
            <section class="list">
                <article v-for="searchResult of searchResultList" @click="getEntity(searchResult.id)">
                    <h2 v-html="searchResult.name"></h2>
                    <p v-html="searchResult.id"></p>
                    <p v-html="searchResult.des"></p>
                </article>
            </section>
        </div>
    </main>
</template>

<script>
    import RemoteData from "../mixin/RemoteData"

    export default {
        data() {
            return {
                message: '',
                searchResultList: [],
                isSearched: false,
            }
        },
        mixins: [
            RemoteData({
                searchResultList: 'questions'
            }),
        ],
        methods: {
            async search() {
                this.isSearched = true
                var url = 'KG/search?keywords=' + this.message
                var response = await this.$fetch(url)
                this.searchResultList = JSON.parse(response.data).data
                //console.log(this.searchResultList)
                //console.log(this.searchResultList[0].id)
                //this.searchResultList = [{"name":"http://www.openkg.cn/COVID-19/prevention#成年人","id":"87114"},{"name":"{\"_language\":\"zh\",\"_value\":\"成年人\"}","id":"95393"}]
            },
            clear() {
                this.message = ''
            },

            getEntity(id) {
                console.log()
                this.$router.push(`/entity/${id}`)
            },
        }
    }
</script>

<style scoped>

</style>