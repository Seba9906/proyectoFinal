console.log(location.search);     // lee los argumentos pasados a este formulario
var id = location.search.substr(4);  // producto_update.html?id=1
console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      clientes: [],
      error: false,
      cargando: true,
      id: 0,
      nombre: '',
      clave: '',
      email: '',
      telefono: '',
      url: 'https://seba9906.pythonanywhere.com/clientes',
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.clientes = data;
          this.cargando = false;
          if (this.clientes.length > 0) {
            const cliente = this.clientes.find(c => c.id === parseInt(this.id));
            if (cliente) {
              this.nombre = cliente.nombre;
              this.clave = cliente.clave;
              this.email = cliente.email;
              this.telefono = cliente.telefono;
            }
          }
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let cliente = {
        nombre: this.nombre,
        clave: this.clave,
        email: this.email,
        telefono: this.telefono
      };
      var options = {
        body: JSON.stringify(cliente),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      };
      fetch(`${this.url}/${this.id}`, options)
        .then(function () {
          alert("Registro modificado");
          window.location.href = "clientes.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al Modificar");
        });
    }
  },
  created() {
    this.id = id;
    this.fetchData(this.url);
  },
}).mount('#app');
