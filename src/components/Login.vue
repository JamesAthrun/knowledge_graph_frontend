<template>
  <div id="login-top">
    <div id="pic-box"></div>

    <div class="center-container">
      <div id="login">
        <div class="curtain">
          <div class="center-container" style="padding-top: 100px">
            <label class="welcome">Welcome, adventurer.</label>
            <label class="welcome">Show your certificate to advance...</label>
          </div>
          <SmartForm id="login-form" :operation="operation" :title="title" :valid="valid">
            <FormInput
                v-model="username"
                name="username"
                placeholder="Username"/>
            <FormInput
                v-model="password"
                name="password"
                placeholder="Password"
                type="password"/>
            <template v-if="mode === 'signup'">
              <FormInput
                  v-model="password2"
                  :invalid="retypePasswordError"
                  name="verify-password"
                  placeholder="Retype Password"
                  type="password"/>
              <FormInput
                  v-model="email"
                  name="email"
                  placeholder="Email"
                  type="email"/>
            </template>

            <template slot="actions">
              <template v-if="mode === 'login'">
                <button
                    class="secondary"
                    type="button"
                    @click="mode = 'signup'">
                  Sign up
                </button>
                <button
                    :disabled="!valid"
                    type="submit">
                  Login
                </button>
              </template>
              <template v-else-if="mode === 'signup'">
                <button
                    class="secondary"
                    type="button"
                    @click="mode = 'login'">
                  Back to login
                </button>
                <button
                    :disabled="!valid"
                    type="submit">
                  Create account
                </button>
              </template>
            </template>
          </SmartForm>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {$ajax} from "../plugins/request";
import {$fadeIn} from "../plugins/anime";

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
    title() {
      switch (this.mode) {
        case 'login':
          return 'Login'
        case 'signup':
          return 'Create a new account'
      }
    },
    retypePasswordError() {
      return !!this.password2 && this.password !== this.password2
    },
    signupValid() {
      return !!this.password2 && !!this.email && !this.retypePasswordError
    },

    valid() {
      return !!this.username && !!this.password &&
          (this.mode !== 'signup' || this.signupValid)
    },
  },
  async mounted() {
    $fadeIn(100, 0.5, document.getElementById("login-top"))

    console.log('login here')
    let sth = Math.random().toString()
    let k = cryptico.generateRSAKey(sth, 1024)
    let modulus = String(k.n)
    let exponent = String(k.e)
    // console.log(modulus,exponent)
    $ajax("Verify/getDesKey", "POST",
        JSON.stringify({"exponent": exponent, "modulus": modulus}),
    ).then((response) => {
      let des_key_s = JSON.parse(response.data).key
      let des_key = k.decrypt(cryptico.b64to16(des_key_s))//私钥解密
      this.$state.key = des_key
    })
  },
  methods: {
    async operation() {
      await this[this.mode]()
    },

    async login() {
      $ajax("login", "POST", encryptByDES(JSON.stringify({
        name: this.username,
        pwd: this.password,
      }), this.$state.key)).then((response) => {
        if (response.code != 1) {
          this.$message({
            type: 'error',
            message: '用户名或密码错误！'
          });
        } else {
          this.$state.user = this.username
          this.$cookies.set("user_key", encryptByDES(this.$state.key, this.$state.key))
          this.$cookies.set("user_name", this.$state.user)
          $ajax("getUserName", "GET", {userName: this.username}).then(res => {
            this.$state.id = JSON.parse(res.data)
            this.$cookies.set("user_id", this.$state.id)
            console.log(this.$state.id)
            this.$router.push('/user/home')
          })
        }
      })

      // this.$router.replace(this.$route.params.wantedRoute || { name: 'home' })
    },

    async signup() {
      $ajax("signup", "POST",
          encryptByDES(JSON.stringify({
            name: this.username,
            pwd: this.password,
            email: this.email,
          }), this.$state.key)
      ).then((response) => {
        this.mode = 'login'
        console.log(response)
      })
    },
  }
}

//DES加密
function encryptByDES(message, key) {
  let keyHex = CryptoJS.enc.Hex.parse(key);
  let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Iso10126
  });
  return encrypted.ciphertext.toString();
}

//DES解密
function decryptByDES(ciphertext, key) {
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
#login-form >>> .content {
  max-width: 400px;
  font-size: 20px;
  font-family: "华文新魏";
  color aliceblue;
}

.welcome {
  font-size: 50px;
  font-family: "华文新魏";
  color: aliceblue;
  padding: 20px;
}

#pic-box {
  width: 100%;
  background-image: url("https://gitee.com/lconq/my-img-oss/raw/master/img/bg-login.png"); //背景图得换
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: absolute;
  z-index: -1;
}

#login {
  position: fixed;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  //使子组件居中对齐
  //默认是竖直轴线上的居中
}

.curtain {
  background-color: rgba(10, 10, 10, 0.3);
  height: 100%;
  width: 2000px;
}


</style>
