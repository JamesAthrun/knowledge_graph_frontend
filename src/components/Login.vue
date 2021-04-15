<template>
    <main class="login">
        <h1>Please login to continue</h1>
        <SmartForm
                class="form"
                :title="title"
                :operation="operation"
                :valid="valid">
            <FormInput
                    name="username"
                    v-model="username"
                    placeholder="Username" />
            <FormInput
                    name="password"
                    type="password"
                    v-model="password"
                    placeholder="Password" />
            <template v-if="mode === 'signup'">
                <FormInput
                        name="verify-password"
                        type="password"
                        v-model="password2"
                        placeholder="Retype Password"
                        :invalid="retypePasswordError" />
                <FormInput
                        name="email"
                        type="email"
                        v-model="email"
                        placeholder="Email" />
            </template>

            <template slot="actions">
                <template v-if="mode === 'login'">
                    <button
                            type="button"
                            class="secondary"
                            @click="mode = 'signup'">
                        Sign up
                    </button>
                    <button
                            type="submit"
                            :disabled="!valid">
                        Login
                    </button>
                </template>
                <template v-else-if="mode === 'signup'">
                    <button
                            type="button"
                            class="secondary"
                            @click="mode = 'login'">
                        Back to login
                    </button>
                    <button
                            type="submit"
                            :disabled="!valid">
                        Create account
                    </button>
                </template>
            </template>
        </SmartForm>
    </main>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                mode: 'login',
                username: '',
                password: '',
                password2: '',
                email: '',
            }
        },
        computed: {
            title () {
                switch (this.mode) {
                    case 'login': return 'Login'
                    case 'signup': return 'Create a new account'
                }
            },
            retypePasswordError () {
                return !!this.password2 && this.password !== this.password2
            },
            signupValid () {
                return !!this.password2 && !!this.email && !this.retypePasswordError
            },

            valid () {
                return !!this.username && !!this.password &&
                    (this.mode !== 'signup' || this.signupValid)
            },
        },
        async mounted(){
            let sth = Math.random().toString()
            let k = cryptico.generateRSAKey(sth,1024)
            let modulus = String(k.n)
            let exponent = String(k.e)
            console.log(modulus,exponent)
            $.ajax({
                url:"http://192.168.3.15:8082/Verify/getDesKey",//url
                type:"POST",
                headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
                data:JSON.stringify({"exponent":exponent,"modulus":modulus}),//发送公钥
            }).then((response)=>{
                let des_key_s = JSON.parse(response.data).key
                let des_key = k.decrypt(cryptico.b64to16(des_key_s))//私钥解密
                this.$state.key = des_key
                console.log(this.$state.key)
            })
        },
        methods: {
            async operation() {
                await this[this.mode]()
            },

            async login () {
                $.ajax({
                    url:"http://192.168.3.15:8082/login",//url
                    type:"POST",
                    headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
                    data:encryptByDES(JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),this.$state.key),
                }).then((response)=>{
                    this.$state.user = response
                    console.log(this.$state.user)
                })
                this.$router.replace(this.$route.params.wantedRoute || { name: 'home' })
            },

            async signup () {
                $.ajax({
                    url:"http://192.168.3.15:8082/signup",//url
                    type:"POST",
                    headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
                    data:encryptByDES(JSON.stringify({
                        username: this.username,
                        password: this.password,
                        email: this.email,
                    }),this.$state.key),
                }).then((response)=>{
                    this.mode = 'login'
                    console.log(response)
                })

            },
        }
    }
    //DES加密
    function encryptByDES(message, key){
        let keyHex = CryptoJS.enc.Hex.parse(key);
        let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Iso10126
        });
        return encrypted.ciphertext.toString();
    }
    //DES解密
    function decryptByDES(ciphertext, key){
        let keyHex = CryptoJS.enc.Hex.parse(key);
        let decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Iso10126
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
</script>

<style lang="stylus" scoped>
    .form {
        >>> .content {
            max-width: 400px;
        }
    }
</style>
