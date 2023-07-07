const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'https://seba9906.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            precio: 0,
            stock: 0,
            motor: "",
            cilindrada: "",
            imagen: "",
            mostrarDetalle: false,
            detalleProducto: null
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
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
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                motor: this.motor,
                cilindrada: this.cilindrada,
                imagen: this.imagen,
            };
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };
            fetch(this.url, options)
                .then(function () {
                    alert('Registro grabado');
                    window.location.href = './index.html';
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al Grabar');
                });
        },
        verDetalles(producto) {
            if(this.mostrarDetalle && this.detalleProducto === producto) {
                this.mostrarDetalle = false;
            } else {
                this.detalleProducto = producto;
                this.mostrarDetalle = true;
            }
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
