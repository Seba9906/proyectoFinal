

document.getElementById("header").innerHTML = `
<nav class="navbar bg-dark navbar-dark navbar-expand-lg border-bottom border-bottom-dark" data-bs-theme="dark">
  <div class="container">
    <a class="navbar-brand" href="/index.html">Inicio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId"
      aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            CRUD
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="productos.html">CRUD Productos</a>
            <a class="dropdown-item" href="clientes.html">CRUD Clientes</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="carrito.html">Carrito</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;

document.getElementById("footer").innerHTML = `
<footer class="bg-dark text-white py-4">
<div class="container d-flex justify-content-center align-items-center flex-column">
  <h5 class="mb-3">Contáctenos</h5>
  <p class="mb-3">+54 123 456 7890</p>
  <p class="mb-3">info@pirerayen.com</p>
  <p>Almirante Chanetton 254, Zapala, Neuquén</p>

  <div class="d-flex justify-content-center mt-4">
    <a href="mailto:troncoso.seb.99@gmail.com" class="text-white me-3">
      <i class="fas fa-envelope fa-fw fa-2x"></i>
    </a>
    <a href="https://github.com/Seba9906/proyectoFinal" class="text-white me-3">
      <i class="fab fa-github fa-fw fa-2x"></i>
    </a>
  </div>

  <p class="mt-4"> © Codo a Codo-23021 - Todos los derechos reservados</p> 
</div>
</footer>
`;
