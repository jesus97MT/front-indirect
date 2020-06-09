import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#26C6DA", //azulito
            secondary: "#f3aa82", //marron
            base: "#fff6ed", // blanco amarillo
            text: "#455A64",
            separator: "#abd1d6",
            indirect1: "", //indirect mio
            indirect2: "", // indirect adivinado
            indirect3: "", //indirect public
            indirect4: "",
          },
          dark: {
            primary: "#121E3A", //azulito
            secondary: "#3D67C2", //marron
            base: "#3D67C2", // blanco amarillo
            text: "#3D67C2",
            separator: "#3D67C2",
            indirect1: "", //indirect mio
            indirect2: "", // indirect adivinado
            indirect3: "", //indirect public
            indirect4: "",
          }
        },
      },
});
