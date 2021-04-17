<template>
    <main class="check">
        <h1>Check preventive measures here!</h1>
        <SmartForm
                class="form"
                title="Please enter the elements">
            <h3>message</h3>
            <FormInput
                    name="question"
                    v-model="question"
                    placeholder="例：农民工预防措施有哪些？" />
            <template slot="actions">
                <button
                        type="button"
                        class="secondary"
                        @click="check">
                    Check
                </button>
                <button
                        type="button"
                        class="secondary"
                        @click="clear">
                    Clear
                </button>
            </template>
        </SmartForm>

    </main>
</template>


<script>

    import {$ajax} from "../plugins/request";

    export default {
        data () {
            return {
                question: '',
                answers: '',
                prompting: '',

            }
        },
        methods: {
            check() {
                console.log(this.question)
                let q = this.question.toString()
                $ajax("KG/ask", "POST", q)
                    .then((response)=> {
                        this.answers = JSON.parse(response.data).table
                        this.prompting = JSON.parse(response.data).help
                        console.log(this.answers)
                        console.log(this.prompting)
                })
            },
            clear() {
                this.message = ''
            },
        }
    }
</script>

<style scoped>

</style>