<template>
  <div>
    <h1>Agregar Juguete</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <!-- input codigo -->
      <el-form-item label="Código">
        <el-input v-model="form.codigo"></el-input>
      </el-form-item>

      <!-- input nombre -->
      <el-form-item label="Nombre">
        <el-input v-model="form.nombre"></el-input>
      </el-form-item>

      <!-- input stock -->
      <el-form-item label="Stock">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>

      <!-- input precio -->
      <el-form-item label="Precio">
        <el-input v-model="form.precio"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="info" @click="volver">Volver</el-button>
        <el-button type="primary" @click="Agregar(form)"
          >Agregar Juguete</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        codigo: "",
        nombre: "",
        stock: "",
        precio: "",
      },
    };
  },
  methods: {
    ...mapActions(["agregarJuguete"]),
    Agregar(juguete) {
      // validacion para que guarde Juuetes sin los datos correspondiente
      if (
        this.form.codigo != "" &&
        this.form.nombre != "" &&
        this.form.stock != "" &&
        this.form.precio != ""
      ) {
        this.agregarJuguete(juguete);
        const options = {
          type: "success",
          message: "Juguete agregado",
        };

        this.$message({
          ...options,
        });
        this.$router.push({
          name: "Juguetes",
        });
      } else {
        this.$message.error("Debe llenar todos los campos del Juguete");
        this.form.codigo = "";
        this.form.nombre = "";
        this.form.stock = "";
        this.form.precio = "";
      }
    },
    volver() {
      this.$router.push({
        name: "Juguetes",
      });
    },
  },
};
</script>
