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
          },
        },
      },
});
