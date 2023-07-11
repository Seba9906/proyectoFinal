const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      clientes: [],
      url: 'https://seba9906.pythonanywhere.com/clientes',
      error: false,
      cargando: true,
      id: 0,
      nombre: '',
      clave: '',
      email: '',
      telefono: '',
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.clientes = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(id) {
      const url = `${this.url}/${id}`;
      const options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.text())
        .then(res => {
          alert('Registro Eliminado');
          location.reload();
        });
    },
    grabar() {
      const cliente = {
        nombre: this.nombre,
        clave: this.clave,
        email: this.email,
        telefono: this.telefono,
      };
      const options = {
        body: JSON.stringify(cliente),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
      fetch(this.url, options)
        .then(() => {
          alert('Registro grabado');
          window.location.href = './clientes.html';
        })
        .catch(err => {
          console.error(err);
          alert('Error al Grabar');
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
});

app.mount('#app');
