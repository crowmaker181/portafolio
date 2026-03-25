window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});












const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuLateral = document.getElementById('menu-lateral-personal');

// Mostrar/Ocultar botón hamburguesa al hacer scroll
function actualizarVisibilidadHamburguesa() {
  if (window.scrollY > 10) {
    btnHamburguesa.style.display = 'flex';
  } else {
    btnHamburguesa.style.display = 'none';
  }
}

// Ejecutar al cargar la página
actualizarVisibilidadHamburguesa();

// También al hacer scroll
window.addEventListener('scroll', actualizarVisibilidadHamburguesa);

// 👉 Mostrar/Ocultar menú lateral
btnHamburguesa.addEventListener('click', (e) => {
  e.stopPropagation();
  btnHamburguesa.classList.toggle('activo');
  menuLateral.classList.toggle('activo');
});

// 👉 Cerrar al hacer clic fuera del botón o menú
document.addEventListener('click', (e) => {
  const clickFuera = !menuLateral.contains(e.target) && !btnHamburguesa.contains(e.target);
  if (clickFuera) {
    btnHamburguesa.classList.remove('activo');
    menuLateral.classList.remove('activo');
  }
});

// 👉 Cerrar al hacer clic en cualquier enlace del menú
menuLateral.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    btnHamburguesa.classList.remove('activo');
    menuLateral.classList.remove('activo');
  });
});

// 👉 Hacer el botón draggable (arrastrable)
let offsetX = 0, offsetY = 0, arrastrando = false;

btnHamburguesa.addEventListener('mousedown', (e) => {
  arrastrando = true;
  offsetX = e.clientX - btnHamburguesa.getBoundingClientRect().left;
  offsetY = e.clientY - btnHamburguesa.getBoundingClientRect().top;
  btnHamburguesa.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!arrastrando) return;
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  btnHamburguesa.style.left = `${x}px`;
  btnHamburguesa.style.top = `${y}px`;
  btnHamburguesa.style.right = '';
  btnHamburguesa.style.transform = 'none';
});

document.addEventListener('mouseup', () => {
  if (!arrastrando) return;
  arrastrando = false;
  btnHamburguesa.style.cursor = 'grab';

  const mitadPantalla = window.innerWidth / 2;
  const posActualX = btnHamburguesa.getBoundingClientRect().left;

  if (posActualX < mitadPantalla) {
    btnHamburguesa.style.left = '0px';
    btnHamburguesa.style.right = '';
  } else {
    btnHamburguesa.style.left = '';
    btnHamburguesa.style.right = '0px';
  }
});





/*steven*/

  function mostrarMensaje(event) {
    event.preventDefault();

    const mensaje = document.getElementById("mensajeExito");
    mensaje.style.display = "block";

    const formulario = document.getElementById("formulario");
    formulario.style.display = "none";
  }



 


const secciones = {
  combos: `
  <section id="Combos">
    <h2>🍽️ Combos del Día</h2>
  <ul class="lista-productos">
  <li>Café con leche y Croissant - <strong>$4.700 COP</strong>
    <img src="./IMG/Cafe+croasan.webp" alt="cafe+Croissant" width="50" height="50">
    <button class="agregar" data-nombre="Café con leche y Croissant" data-precio="4700">Agregar</button>
  </li>

  <li>Combo Especial: 2 Wraps Mediterráneos - <strong>$18.000 COP</strong>
    <img src="./IMG/Wrap.jpg" alt="Combo de wrap" width="50" height="50">
    <button class="agregar" data-nombre="Combo Especial: 2 Wraps Mediterráneos" data-precio="18000">Agregar</button>
  </li>

  <li>Café + Brownie - <strong>$12.000 COP</strong>
    <img src="./IMG/cafe+brownie.jpg" alt="cafe+brownie" width="50" height="50">
    <button class="agregar" data-nombre="Café + Brownie" data-precio="12000">Agregar</button>
  </li>

  <li>Capuchino + Tarta de Zanahoria - <strong>$11.500 COP</strong>
    <img src="./IMG/CapuchinoZanahoria.jpg" alt="capuchino+Pastelzanahoria" width="50" height="50">
    <button class="agregar" data-nombre="Capuchino + Tarta de Zanahoria" data-precio="11500">Agregar</button>
  </li>

  <li>Limonada Rosada + Mini Cheesecake - <strong>$10.000 COP</strong>
    <img src="./IMG/limonada+cheesecake.jpg" alt="limonada+PasteldeQueso" width="50" height="50">
    <button class="agregar" data-nombre="Limonada Rosada + Mini Cheesecake" data-precio="10000">Agregar</button>
  </li>

  <li>Americano + Galletas de Avena y Chocolate - <strong>$6.500 COP</strong>
    <img src="./IMG/Americano + Galletas de Avena y Chocolate.jpg" alt="americano+galletas" width="50" height="50">
    <button class="agregar" data-nombre="Americano + Galletas de Avena y Chocolate" data-precio="6500">Agregar</button>
  </li>

  <li>Chocolate Caliente + Rollito de Canela - <strong>$9.500 COP</strong>
    <img src="./IMG/Chocolate Caliente + Rollito de Canela.jpg" alt="chocolate+rolloCanela" width="50" height="50">
    <button class="agregar" data-nombre="Chocolate Caliente + Rollito de Canela" data-precio="9500">Agregar</button>
  </li>

  <li>Café Americano + Pan de Bono - <strong>$6.000 COP</strong>
    <img src="./IMG/americano+panBono.jpg" alt="americano+panBono" width="50" height="50">
    <button class="agregar" data-nombre="Café Americano + Pan de Bono" data-precio="6000">Agregar</button>
  </li>

  <li>Chocolate Caliente + Almojábana - <strong>$7.000 COP</strong>
    <img src="./IMG/Chocolate Caliente + Almojábana.jpg" alt="chocolate+almojabana" width="50" height="50">
    <button class="agregar" data-nombre="Chocolate Caliente + Almojábana" data-precio="7000">Agregar</button>
  </li>

  <li>Tinto + Empanada de Pollo - <strong>$5.000 COP</strong>
    <img src="./IMG/Tinto + Empanada de Pollo.jpg" alt="tinto+empanada" width="50" height="50">
    <button class="agregar" data-nombre="Tinto + Empanada de Pollo" data-precio="5000">Agregar</button>
  </li>

  <li>Café con Leche + Tostada con Mermelada - <strong>$6.800 COP</strong>
    <img src="./IMG/cafe+tostada.jpg" alt="cafe+tostada" width="50" height="50">
    <button class="agregar" data-nombre="Café con Leche + Tostada con Mermelada" data-precio="6800">Agregar</button>
  </li>

  <li>Jugo Natural + Sándwich de Jamón y Queso - <strong>$9.000 COP</strong>
    <img src="./IMG/jugo+sandwich.jpg" alt="jugo+sandwich" width="50" height="50">
    <button class="agregar" data-nombre="Jugo Natural + Sándwich de Jamón y Queso" data-precio="9000">Agregar</button>
  </li>
</ul >

  `,
  bebidascalientes: `
      <section id="bebidasCalientes">

    <h2>☕ Bebidas Calientes</h2>
   <ul class="lista-productos">
  <li>Café con Leche - <strong>$4.000 COP</strong>
    <img src="./IMG/cafeconleche.jpg" alt="Cafe con leche">
    <button class="agregar" data-nombre="Café con Leche" data-precio="4000">Agregar</button>
  </li>
  <li>Americano - <strong>$3.500 COP</strong>
    <img src="./IMG/Americano.jpg" alt="Cafe Americano">
    <button class="agregar" data-nombre="Americano" data-precio="3500">Agregar</button>
  </li>
  <li>Capuchino - <strong>$5.000 COP</strong>
    <img src="./IMG/Capuccino.jpg" alt="Capuccino">
    <button class="agregar" data-nombre="Capuchino" data-precio="5000">Agregar</button>
  </li>
  <li>Mocaccino - <strong>$5.500 COP</strong>
    <img src="./IMG/Mocaccino.jpg" alt="Mocaccino">
    <button class="agregar" data-nombre="Mocaccino" data-precio="5500">Agregar</button>
  </li>
  <li>Té Chai Latte - <strong>$6.000 COP</strong>
    <img src="./IMG/Té Chai Latte -.jpg" alt="Té Chai Latte">
    <button class="agregar" data-nombre="Té Chai Latte" data-precio="6000">Agregar</button>
  </li>
  <li>Latte de Vainilla con Canela - <strong>$6.500 COP</strong>
    <img src="./IMG/Latte de Vainilla con Canela.jpg" alt="Latte de Vainilla con Canela">
    <button class="agregar" data-nombre="Latte de Vainilla con Canela" data-precio="6500">Agregar</button>
  </li>
  <li>Espresso Doble - <strong>$4.500 COP</strong>
    <img src="./IMG/Espresso Doble -.jpg" alt="Espresso Doble">
    <button class="agregar" data-nombre="Espresso Doble" data-precio="4500">Agregar</button>
  </li>
  <li>Chocolate Caliente Cremoso - <strong>$6.000 COP</strong>
    <img src="./IMG/Chocolate Caliente Cremoso -.jpg" alt="Chocolate Caliente Cremoso">
    <button class="agregar" data-nombre="Chocolate Caliente Cremoso" data-precio="6000">Agregar</button>
  </li>
  <li>Infusión de Hierbabuena y Miel - <strong>$5.000 COP</strong>
    <img src="./IMG/Infusión de Hierbabuena y Miel.jpg" alt="Infusión de Hierbabuena y Miel">
    <button class="agregar" data-nombre="Infusión de Hierbabuena y Miel" data-precio="5000">Agregar</button>
  </li>
  <li>Flat White - <strong>$6.500 COP</strong>
    <img src="./IMG/Flat White.jpg" alt="Flat White">
    <button class="agregar" data-nombre="Flat White" data-precio="6500">Agregar</button>
  </li>
</ul>

  `,
  bebidasFrias: `
  <section id="bebidasFrias">
<h2>🧊 Bebidas Frías</h2>
    <ul class="lista-productos">
  <li>Latte Matcha Helado - <strong>$7.500 COP</strong>
    <img src="./IMG/Latte Matcha Helado.jpg" alt="Latte Matcha Helado">
    <button class="agregar" data-nombre="Latte Matcha Helado" data-precio="7500">Agregar</button>
  </li>
  <li>Limonada Rosada con Hierbabuena - <strong>$6.500 COP</strong>
    <img src="./IMG/Limonada Rosada con Hierbabuena.jpg" alt="Limonada Rosada con Hierbabuena">
    <button class="agregar" data-nombre="Limonada Rosada con Hierbabuena" data-precio="6500">Agregar</button>
  </li>
  <li>Frappé de Caramelo Salado - <strong>$9.500 COP</strong>
    <img src="./IMG/Frappé de Caramelo Salado.jpg" alt="Frappé de Caramelo Salado">
    <button class="agregar" data-nombre="Frappé de Caramelo Salado" data-precio="9500">Agregar</button>
  </li>
  <li>Smoothie de Frutos Rojos - <strong>$7.000 COP</strong>
    <img src="./IMG/Smoothie de Frutos Rojoss.jpg" alt="Smoothie de Frutos Rojos">
    <button class="agregar" data-nombre="Smoothie de Frutos Rojos" data-precio="7000">Agregar</button>
  </li>
  <li>Limonada con Menta - <strong>$5.500 COP</strong>
    <img src="./IMG/Limonada con Menta.jpg" alt="Limonada con Menta">
    <button class="agregar" data-nombre="Limonada con Menta" data-precio="5500">Agregar</button>
  </li>
  <li>Té Verde Frío con Limón y Miel - <strong>$5.500 COP</strong>
    <img src="./IMG/Té Verde Frío con Limón y Miel.jpg" alt="Té Verde Frío con Limón y Miel">
    <button class="agregar" data-nombre="Té Verde Frío con Limón y Miel" data-precio="5500">Agregar</button>
  </li>
  <li>Jugo de Mango - <strong>$5.500 COP</strong>
    <img src="./IMG/Jugo de Mango.jpg" alt="Jugo de Mango">
    <button class="agregar" data-nombre="Jugo de Mango" data-precio="5500">Agregar</button>
  </li>
  <li>Jugo de Fresa con Leche - <strong>$6.000 COP</strong>
    <img src="./IMG/Jugo de Fresa con Leche.jpg" alt="Jugo de Fresa con Leche">
    <button class="agregar" data-nombre="Jugo de Fresa con Leche" data-precio="6000">Agregar</button>
  </li>
  <li>Jugo de Maracuyá - <strong>$5.500 COP</strong>
    <img src="./IMG/Jugo de Maracuyá.jpg" alt="Jugo de Maracuyá">
    <button class="agregar" data-nombre="Jugo de Maracuyá" data-precio="5500">Agregar</button>
  </li>
  <li>Jugo de Piña - <strong>$5.000 COP</strong>
    <img src="./IMG/Jugo de Piña.jpg" alt="Jugo de Piña">
    <button class="agregar" data-nombre="Jugo de Piña" data-precio="5000">Agregar</button>
  </li>
  <li>Jugo de Naranja recién exprimido - <strong>$6.000 COP</strong>
    <img src="./IMG/Jugo de Naranja recién exprimido.jpg" alt="Jugo de Naranja recién exprimido">
    <button class="agregar" data-nombre="Jugo de Naranja recién exprimido" data-precio="6000">Agregar</button>
  </li>
  <li>Coca-Cola Clásica 350 ml - <strong>$3.500 COP</strong>
    <img src="./IMG/Coca-Cola Clásica 350 ml.jpg" alt="Coca-Cola Clásica 350 ml">
    <button class="agregar" data-nombre="Coca-Cola Clásica 350 ml" data-precio="3500">Agregar</button>
  </li>
  <li>Sprite 350 ml - <strong>$3.500 COP</strong>
    <img src="./IMG/Sprite 350 ml.jpg" alt="Sprite 350 ml">
    <button class="agregar" data-nombre="Sprite 350 ml" data-precio="3500">Agregar</button>
  </li>
  <li>Agua con gas - <strong>$3.000 COP</strong>
    <img src="./IMG/Agua con gas.jpg" alt="Agua con gas">
    <button class="agregar" data-nombre="Agua con gas" data-precio="3000">Agregar</button>
  </li>
  <li>Agua sin gas - <strong>$2.500 COP</strong>
    <img src="./IMG/Agua sin gas.jpg" alt="Agua sin gas">
    <button class="agregar" data-nombre="Agua sin gas" data-precio="2500">Agregar</button>
  </li>
  <li>Gaseosa artesanal de frutas (botella) - <strong>$5.500 COP</strong>
    <img src="./IMG/Gaseosa artesanal de frutas (botella).jpg" alt="Gaseosa artesanal de frutas (botella)">
    <button class="agregar" data-nombre="Gaseosa artesanal de frutas (botella)" data-precio="5500">Agregar</button>
  </li>
</ul>

  </section>
  `,
    Postres: `
      <section id="postres">
   <h2>🍰 Delicias Dulces</h2>
    <ul class="lista-productos">
  <li>Brownie Clásico - <strong>$5.000 COP</strong>
    <img src="./IMG/Brownie Clásico.jpg" alt="Brownie Clásico" width="50" height="50">
    <button class="agregar" data-nombre="Brownie Clásico" data-precio="5000">Agregar</button>
  </li>

  <li>Crepa de Dulce de Leche con Frutos Rojos - <strong>$6.000 COP</strong>
    <img src="./IMG/Crepa de Dulce de Leche con Frutos Rojos.jpg" alt="Crepa de Dulce de Leche con Frutos Rojos" width="50" height="50">
    <button class="agregar" data-nombre="Crepa de Dulce de Leche con Frutos Rojos" data-precio="6000">Agregar</button>
  </li>

  <li>Tarta de Zanahoria - <strong>$6.500 COP</strong>
    <img src="./IMG/Tarta de Zanahoria.jpg" alt="Tarta de Zanahoria" width="50" height="50">
    <button class="agregar" data-nombre="Tarta de Zanahoria" data-precio="6500">Agregar</button>
  </li>

  <li>Galletas de Avena y Chocolate - <strong>$2.500 COP</strong>
    <img src="./IMG/Galletas de Avena y Chocolate.jpg" alt="Galletas de Avena y Chocolate" width="50" height="50">
    <button class="agregar" data-nombre="Galletas de Avena y Chocolate" data-precio="2500">Agregar</button>
  </li>

  <li>Tiramisú - <strong>$7.000 COP</strong>
    <img src="./IMG/Tiramisú.jpg" alt="Tiramisú" width="50" height="50">
    <button class="agregar" data-nombre="Tiramisú" data-precio="7000">Agregar</button>
  </li>

  <li>Mini Cheesecake - <strong>$6.000 COP</strong>
    <img src="./IMG/Mini Cheesecake.jpg" alt="Mini Cheesecake" width="50" height="50">
    <button class="agregar" data-nombre="Mini Cheesecake" data-precio="6000">Agregar</button>
  </li>

  <li>Helado de Vainilla con Nueces - <strong>$4.500 COP</strong>
    <img src="./IMG/Helado de Vainilla con Nueces.jpg" alt="Helado de Vainilla con Nueces" width="50" height="50">
    <button class="agregar" data-nombre="Helado de Vainilla con Nueces" data-precio="4500">Agregar</button>
  </li>

  <li>Croissant de Mantequilla - <strong>$4.500 COP</strong>
    <img src="./IMG/Croissant de Mantequilla.jpg" alt="Croissant de Mantequilla" width="50" height="50">
    <button class="agregar" data-nombre="Croissant de Mantequilla" data-precio="4500">Agregar</button>
  </li>

  <li>Tarta de Frutas Mixtas - <strong>$6.000 COP</strong>
    <img src="./IMG/Tarta de Frutas Mixtas.jpg" alt="Tarta de Frutas Mixtas" width="50" height="50">
    <button class="agregar" data-nombre="Tarta de Frutas Mixtas" data-precio="6000">Agregar</button>
  </li>

  <li>Brownie con Nueces - <strong>$5.500 COP</strong>
    <img src="./IMG/Brownie con Nueces.jpg" alt="Brownie con Nueces" width="50" height="50">
    <button class="agregar" data-nombre="Brownie con Nueces" data-precio="5500">Agregar</button>
  </li>

  <li>Cupcake de Vainilla - <strong>$3.500 COP</strong>
    <img src="./IMG/Cupcake de Vainilla.jpg" alt="Cupcake de Vainilla" width="50" height="50">
    <button class="agregar" data-nombre="Cupcake de Vainilla" data-precio="3500">Agregar</button>
  </li>

  <li>Rollito de Canela - <strong>$5.000 COP</strong>
    <img src="./IMG/Rollito de Canela.jpg" alt="Rollito de Canela" width="50" height="50">
    <button class="agregar" data-nombre="Rollito de Canela" data-precio="5000">Agregar</button>
  </li>

  <li>Milhojas - <strong>$6.500 COP</strong>
    <img src="./IMG/Milhojas.jpg" alt="Milhojas" width="50" height="50">
    <button class="agregar" data-nombre="Milhojas" data-precio="6500">Agregar</button>
  </li>

  <li>Empanadas Dulces - <strong>$4.000 COP</strong>
    <img src="./IMG/Empanadas Dulces.jpg" alt="Empanadas Dulces" width="50" height="50">
    <button class="agregar" data-nombre="Empanadas Dulces" data-precio="4000">Agregar</button>
  </li>

  <li>Alfajores - <strong>$2.500 COP</strong>
    <img src="./IMG/Alfajores.jpg" alt="Alfajores" width="50" height="50">
    <button class="agregar" data-nombre="Alfajores" data-precio="2500">Agregar</button>
  </li>

  <li>Banana Bread - <strong>$4.000 COP</strong>
    <img src="./IMG/Banana Bread.jpg" alt="Banana Bread" width="50" height="50">
    <button class="agregar" data-nombre="Banana Bread" data-precio="4000">Agregar</button>
  </li>

  <li>Pan de Canela Trenzado - <strong>$4.500 COP</strong>
    <img src="./IMG/Pan de Canela Trenzado.jpg" alt="Pan de Canela Trenzado" width="50" height="50">
    <button class="agregar" data-nombre="Pan de Canela Trenzado" data-precio="4500">Agregar</button>
  </li>
</ul>

  </section>
  `,
  Panes: `
   <section id="panes">
    <h2>🍞 Variedades de Pan</h2>
    <ul class="lista-productos">
  <li>Pan Ciabatta - <strong>$3.500 COP</strong>
    <img src="./IMG/Pan Ciabatta.jpg" alt="Pan Ciabatta" width="50" height="50">
    <button class="agregar" data-nombre="Pan Ciabatta" data-precio="3500">Agregar</button>
  </li>

  <li>Pan Integral con Semillas - <strong>$3.500 COP</strong>
    <img src="./IMG/Pan Integral con Semillas.jpg" alt="Pan Integral con Semillas" width="50" height="50">
    <button class="agregar" data-nombre="Pan Integral con Semillas" data-precio="3500">Agregar</button>
  </li>

  <li>Pan Brioche - <strong>$3.000 COP</strong>
    <img src="./IMG/Pan Brioche.jpg" alt="Pan Brioche" width="50" height="50">
    <button class="agregar" data-nombre="Pan Brioche" data-precio="3000">Agregar</button>
  </li>

  <li>Pan de Queso - <strong>$2.500 COP</strong>
    <img src="./IMG/Pan de Queso.jpg" alt="Pan de Queso" width="50" height="50">
    <button class="agregar" data-nombre="Pan de Queso" data-precio="2500">Agregar</button>
  </li>

  <li>Pan de Ajo y Hierbas - <strong>$3.000 COP</strong>
    <img src="./IMG/Pan de Ajo y Hierbas.jpg" alt="Pan de Ajo y Hierbas" width="50" height="50">
    <button class="agregar" data-nombre="Pan de Ajo y Hierbas" data-precio="3000">Agregar</button>
  </li>

  <li>Pan de Chocolate - <strong>$3.500 COP</strong>
    <img src="./IMG/Pan de Chocolate.jpg" alt="Pan de Chocolate" width="50" height="50">
    <button class="agregar" data-nombre="Pan de Chocolate" data-precio="3500">Agregar</button>
  </li>

  <li>Pan Campesino - <strong>$4.000 COP</strong>
    <img src="./IMG/Pan Campesino.jpg" alt="Pan Campesino" width="50" height="50">
    <button class="agregar" data-nombre="Pan Campesino" data-precio="4000">Agregar</button>
  </li>

  <li>Pan de Maíz - <strong>$3.000 COP</strong>
    <img src="./IMG/Pan de Maíz.jpg" alt="Pan de Maíz" width="50" height="50">
    <button class="agregar" data-nombre="Pan de Maíz" data-precio="3000">Agregar</button>
  </li>
</ul>

  </section>
  `
  ,
    OpcionesSaladas: `
      <section id="comidas">
  <h3>🥪 Opciones Saladas</h3>
    <ul class="lista-productos">
  <li>Tostada de Aguacate con Huevo Poché - <strong>$9.000 COP</strong>
    <img src="./IMG/tostada.jpg" alt="Tostada de Aguacate con Huevo Poché" width="50" height="50">
    <button class="agregar" data-nombre="Tostada de Aguacate con Huevo Poché" data-precio="9000">Agregar</button>
  </li>

  <li>Wrap Mediterráneo - <strong>$10.000 COP</strong>
    <img src="./IMG/Wrap.jpg" alt="WRAP" width="50" height="50">
    <button class="agregar" data-nombre="Wrap Mediterráneo" data-precio="10000">Agregar</button>
  </li>

  <li>Emparedado de Pavo Integral - <strong>$8.500 COP</strong>
    <img src="./IMG/Emparedado de Pavo Integral.jpg" alt="Emparedado de Pavo Integral" width="50" height="50">
    <button class="agregar" data-nombre="Emparedado de Pavo Integral" data-precio="8500">Agregar</button>
  </li>

  <li>Croissant de Jamón y Queso - <strong>$7.000 COP</strong>
    <img src="./IMG/Croissant de Jamón y Queso.jpg" alt="Croissant de Jamón y Queso" width="50" height="50">
    <button class="agregar" data-nombre="Croissant de Jamón y Queso" data-precio="7000">Agregar</button>
  </li>

  <li>Panini Caprese - <strong>$9.000 COP</strong>
    <img src="./IMG/Panini Caprese.jpg" alt="Panini Caprese" width="50" height="50">
    <button class="agregar" data-nombre="Panini Caprese" data-precio="9000">Agregar</button>
  </li>

  <li>Ensalada César con Pollo - <strong>$9.500 COP</strong>
    <img src="./IMG/Ensalada César con Pollo.jpg" alt="Ensalada César con Pollo" width="50" height="50">
    <button class="agregar" data-nombre="Ensalada César con Pollo" data-precio="9500">Agregar</button>
  </li>

  <li>Bowl de Quinua con Vegetales y Falafel - <strong>$11.000 COP</strong>
    <img src="./IMG/Bowl de Quinua con Vegetales y Falafel.jpg" alt="Bowl de Quinua con Vegetales y Falafel" width="50" height="50">
    <button class="agregar" data-nombre="Bowl de Quinua con Vegetales y Falafel" data-precio="11000">Agregar</button>
  </li>

  <li>Arepa con Queso y Guacamole - <strong>$7.500 COP</strong>
    <img src="./IMG/Arepa con Queso y Guacamole.jpg" alt="Arepa con Queso y Guacamole" width="50" height="50">
    <button class="agregar" data-nombre="Arepa con Queso y Guacamole" data-precio="7500">Agregar</button>
  </li>

  <li>Tortilla Española - <strong>$6.500 COP</strong>
    <img src="./IMG/Tortilla Española.jpg" alt="Tortilla Española" width="50" height="50">
    <button class="agregar" data-nombre="Tortilla Española" data-precio="6500">Agregar</button>
  </li>

  <li>Mini Hamburguesa Veggie - <strong>$10.500 COP</strong>
    <img src="./IMG/Mini Hamburguesa Veggie.jpg" alt="Mini Hamburguesa Veggie" width="50" height="50">
    <button class="agregar" data-nombre="Mini Hamburguesa Veggie" data-precio="10500">Agregar</button>
  </li>
</ul>

  </section>
  `

};

const botones = document.querySelectorAll('.menu-secciones button');
const contenido = document.getElementById('contenido');

botones.forEach(btn => {
  btn.addEventListener('click', () => {
    // Quitar clase active a todos los botones
    botones.forEach(b => b.classList.remove('active'));
    // Agregar active al botón clickeado
    btn.classList.add('active');
    // Cambiar contenido
    const seccion = btn.getAttribute('data-seccion');
    contenido.innerHTML = secciones[seccion];
  });
});

window.addEventListener('load', () => {
  const hash = location.hash.substring(1); // quitar el #
  if (hash && secciones[hash]) {
    // activar el botón que corresponde
    botones.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-seccion') === hash);
    });
    // cambiar el contenido a la sección del hash
    contenido.innerHTML = secciones[hash];
  }
});














window.onscroll = function() {
  let boton = document.getElementById("btnArriba");
  if (document.documentElement.scrollTop > 100) {
    boton.style.display = "block";
  } else {
    boton.style.display = "none";
  }
};

function subirArriba() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}





let indice = 0;
const imagenes = document.querySelectorAll('.carrusel img');

function cambiarImagen() {
  imagenes[indice].classList.remove('activo');
  indice = (indice + 1) % imagenes.length;
  imagenes[indice].classList.add('activo');
}

setInterval(cambiarImagen, 3000); // cambia cada 3 segundos









const listaCarrito = document.getElementById("lista-carrito");
const vaciarBtn = document.getElementById("vaciar-carrito");

// 👉 Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
renderCarrito();

// 👉 Vaciar carrito
vaciarBtn.addEventListener("click", () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
});

// 👉 Mostrar carrito
function renderCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precioUnitario} x${item.cantidad} = $${item.total}`;

    // botón quitar
    const quitar = document.createElement("button");
    quitar.textContent = "❌";
    quitar.style.marginLeft = "5px";
    quitar.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    });

    li.appendChild(quitar);
    listaCarrito.appendChild(li);
  });
}

// 👉 Capturar clicks de botones "Agregar" (existentes y dinámicos)
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("agregar")) return;

  const btn = e.target;
  const nombre = btn.dataset.nombre;
  const precio = parseInt(btn.dataset.precio, 10);

  const existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad += 1;
    existente.total = existente.cantidad * existente.precioUnitario;
  } else {
    carrito.push({
      nombre,
      precioUnitario: precio,
      cantidad: 1,
      total: precio
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
});


