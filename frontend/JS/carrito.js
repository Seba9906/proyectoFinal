const app = Vue.createApp({
  data() {
    return {
      url: 'https://seba9906.pythonanywhere.com/productos',
      productos: [],
      carrito: [],
      nombre: "",
      precio: 0,
      stock: 0,
      cantidad: 0
    };
  },
  methods: {
    fetchData() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.productos = data.map(item => {
            item.cantidad = 0;
            item.subtotal = 0;
            return item;
          });
        })
        .catch(error => console.error(error));
    },
    
    agregarAlCarrito(producto) {
      if (producto.cantidad > 0) {
        const cantidad = Math.min(producto.cantidad, producto.stock); // Asegurarse de no agotar el stock
        const subtotal = producto.precio * cantidad;
    
        const itemCarrito = {
          nombre: producto.nombre,
          cantidad: cantidad,
          subtotal: subtotal.toFixed(2),
        };
    
        const index = this.carrito.findIndex(item => item.nombre === producto.nombre);
    
        if (index !== -1) {
          itemCarrito.cantidad += this.carrito[index].cantidad;
          itemCarrito.subtotal = (subtotal + parseFloat(this.carrito[index].subtotal)).toFixed(2);
          this.carrito.splice(index, 1, itemCarrito);
        } else {
          this.carrito.push(itemCarrito);
        }
    
        producto.stock -= cantidad;
        producto.cantidad = 0;
      }
    },
    
    
    removerDelCarrito(item) {
      const index = this.carrito.indexOf(item);
      if (index !== -1) {
        // Encuentra el producto correspondiente en la lista de productos
        const producto = this.productos.find(p => p.nombre === item.nombre);
        // Incrementa el stock del producto por la cantidad en el carrito
        if (producto) producto.stock += item.cantidad;
        // Quita el producto del carrito
        this.carrito.splice(index, 1);
      }
    },
    
    calcularTotal() {
      let total = 0;
      for (const item of this.carrito) {
        total += parseFloat(item.subtotal);
      }
      return total.toFixed(2);
    },
  },
  created() {
    this.fetchData();
  },
});

app.mount('#app');
