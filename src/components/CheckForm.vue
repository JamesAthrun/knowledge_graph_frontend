<template>
    <main class="login">
        <h1>Please enter all the required elements</h1>
        <SmartForm
                class="form"
                title="Please enter the elements">
            <h3>message</h3>
            <FormInput
                    name="test"
                    v-model="message"
                    placeholder="test1" />
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
    export default {
        data () {
            return {
                message: '',
            }
        },
        methods: {
            check() {

            },
            clear() {
                this.message = ''
            },
        }
    }
</script>

<style scoped>

</style>