<template>
  <div id="login">
    <h1>Acceso a la cuenta <br> "Otto Klaus"</h1>
    <br>
    <el-form label-width="100px" class="form-login" :model="formLabelAlign">
      <el-input
        placeholder="Correo electrónico"
        v-model="formLabelAlign.user"
      ></el-input>
      <el-input
        type="password"
        placeholder="Contraseña"
        v-model="formLabelAlign.password"
        autocomplete="off"
      ></el-input>
      <el-button
        type="primary"
        :loading="loading"
        class="ingresar-login"
        @click="login"
        >Ingresar</el-button
      >
    </el-form>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data() {
    return {
      formLabelAlign: {
        user: "",
        password: "",
      },
      loading: false,
    };
  },

  methods: {
    login() {
      this.loading = true;
      Firebase.auth()
        .signInWithEmailAndPassword(
          this.formLabelAlign.user,
          this.formLabelAlign.password
        )
        .then(
          () => {
            this.$router.push("juguetes");
            this.loading = false;
          },
          (reject) => {
            // var errorCode = reject.code;
            this.loading = false;
            this.$message({
              showClose: true,
              message: reject.message,
              type: "error",
            });
          }
        );
    },
  },
};
</script>

<style lang="css" scoped="">
#login {
  padding: 60px;
}
.ingresar-login {
  width: 100%;
}
.img-inicial {
  display: block;
  margin: auto;
  margin-bottom: 15px;
}
.form-login {
  display: block;
  margin: auto;
  margin-bottom: 15px;
}
.form-login {
  width: 300px;
}
.el-input {
  margin-bottom: 10px;
}
</style>
