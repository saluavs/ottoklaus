import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from "firebase"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    juguete: {
      codigo: "",
      nombre: "",
      stock: 0,
      precio: 0,
    },
    edit: false,
    loading: false,
    juguetes: []
  },
  mutations: {
    loadingTable(state) {
      state.loading = true;
    },

    setJuguetes(state, juguetes) {
      state.juguetes = juguetes;
      state.loading = false;
    },

    eliminarJuguete(state, juguete) {
      state.juguetes = state.juguetes.filter((j) => {
        return j.codigo !== juguete.codigo;
      });
    },
    actualizarJuguete(state, juguete) {
      state.juguetes = state.juguetes.map((j) => {
        if (j.codigo == juguete.codigo) return juguete;
        else return j;
      });
    },

    agregarJuguete(state, juguete) {
      state.juguetes.push(juguete);
    },
  },
  actions: {

    agregarJuguete({
      commit
    }, juguete) {
      commit("loadingTable");
      Firebase
        .firestore()
        .collection("juguetes")
        .add(juguete)
        .then(commit("loadingTable"));
    },
    // listado de juguetes
    getJuguetes({
      commit
    }) {
      commit("loadingTable");
      Firebase
        .firestore()
        .collection("juguetes")
        // metodo para recibir cualaquier cambio que hagamos en tiempo rela de la BD
        .onSnapshot((snapshot) => {
          const juguetes = [];
          snapshot.forEach((doc) => {
            juguetes.push({
              id: doc.id,
              data: doc.data()
            });
            commit("setJuguetes", juguetes);
          });

        })
    },
    // eliminar juguete
    eliminarJuguete({
      commit
    }, jugueteID) {
      commit("loadingTable");
      Firebase
        .firestore()
        .collection("juguetes")
        .doc(jugueteID)
        .delete()
        .then(commit("loadingTable"));
    },
    // funcion asyncrona para actualizar datos
    async actualizarJuguete({
      commit
    }, {
      juguete,
      id
    }) {
      commit("loadingTable");
      Firebase
        .firestore()
        .collection("juguetes")
        .doc(id)
        .set(juguete)
        .then(commit("loadingTable"));
    },

    getJuguegtesByPart({
      commit
    }) {
      commit("loadingTable");
      Firebase
        .firestore()
        .collection("juguetes")
        .where("codigo", "==", "A0001")
        .where("precio", ">", "2000")
        .onSnapshot((snapshot) => {
          const juguetes = [];
          snapshot.forEach((doc) => {
            juguetes.push({
              id: doc.id,
              data: doc.data()
            });
          });

          console.log(juguetes)
        });
    },
  },
  modules: {},
  getters: {
    juguetesConStock({
      juguetes
    }) {
      return juguetes.filter((juguete) => juguete.data.stock > 0);
    }
  }
})