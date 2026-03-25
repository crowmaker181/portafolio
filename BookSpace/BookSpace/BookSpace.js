
const SUPABASE_URL = 'https://ztkfaceayhburqtnuuio.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0a2ZhY2VheWhidXJxdG51dWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3MjAyMiwiZXhwIjoyMDc1ODQ4MDIyfQ.d2v3BZJdDsVAWoa_u76THvm3lZ0M2DiY4c02vWxMWNE';

// Crear cliente de forma robusta (soporta diferentes nombres globales)
const supabaseGlobal = window.supabase || window.Supabase;
if (!supabaseGlobal || !supabaseGlobal.createClient) {
  console.error('Supabase no está disponible. Asegúrate de incluir el CDN antes de BookSpace.js');
}
const supabase = supabaseGlobal.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function guardarSesion(usuario) {
  localStorage.setItem("id_usuario", usuario.id_usuario);
  localStorage.setItem("nombre", usuario.nombre);
  localStorage.setItem("email", usuario.email);
  localStorage.setItem("rol", usuario.rol);
  localStorage.setItem("fecha_registro", usuario.fecha_registro);

  console.log("✅ Sesión guardada en localStorage para:", usuario);
}

// Obtiene los datos del usuario actual
function obtenerSesion() {
  const id_usuario = localStorage.getItem("id_usuario");
  const nombre = localStorage.getItem("nombre");
  const email = localStorage.getItem("email");
  const rol = localStorage.getItem("rol");
  const fecha_registro = localStorage.getItem("fecha_registro");

  if (!id_usuario) return null;
  return { id_usuario, nombre, email, rol, fecha_registro };
}

/* UTILIDADES DE INTERFAZ */
function setErrorMessage(text) {
  const el = document.getElementById('errorMessage');
  if (!el) return;
  el.textContent = text || '';
  el.style.display = text ? 'block' : 'none';
  el.style.color = '#e74c3c';
  if (!text) el.style.fontWeight = 'normal';
  else el.style.fontWeight = 'bold';
}

function createLoggedInNav(user) {
  // Reemplaza el enlace "Iniciar sesión" por un mensaje de bienvenida + botón cerrar sesión
  const loginLink = document.querySelector('.btn-login');
  if (!loginLink) return;

  const li = loginLink.closest('li') || loginLink.parentElement;
  if (!li) return;

  // Nombre visible
  const displayName = user?.user_metadata?.nombre || user?.email || 'Usuario';
  const firstName = (displayName || '').split(' ')[0];

  li.innerHTML = `
    <span class="welcome-text">¡Hola, ${escapeHtml(firstName)}!</span>
    <button id="logoutButton" class="btn-login">Cerrar sesión</button>
  `;

  // Asociar evento logout
  const logoutBtn = document.getElementById('logoutButton');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error al cerrar sesión:', error);
      } else  {
        localStorage.clear();
        // Restaurar el enlace original (opcionalmente recargar)
        window.location.href = 'login.html';
      }
    });
  }
}

function createLoggedOutNav() {
  // Asegura que exista el enlace "Iniciar sesión" si no hay sesión
  const existing = document.querySelector('.btn-login');
  if (existing) {
    // si existe y no es enlace, restaurarlo
    if (existing.tagName.toLowerCase() !== 'a') {
      const li = existing.closest('li') || existing.parentElement;
      if (!li) return;
      li.innerHTML = `<a href="login.html" class="btn-login">Iniciar sesión</a>`;
    }
    return;
  }
  // Si no existe, intenta añadirlo al final del nav-links
  const navList = document.querySelector('.nav-links');
  if (navList) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="login.html" class="btn-login">Iniciar sesión</a>`;
    navList.appendChild(li);
  }
}

/* Seguridad mínima para insertar texto en DOM */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* COMPROBAR SESIÓN Y ACTUALIZAR UI */
async function checkSessionAndUpdateNav() {
  try {
    const { data } = await supabase.auth.getSession();
    const session = data?.session ?? null;
    const user = session?.user ?? null;

    console.log('checkSessionAndUpdateNav -> session:', session);

    if (user && location.pathname.includes('index.html')) {
      // 🔹 Consultar tu tabla "usuarios" para obtener el id_usuario real
      const { data: perfil, error: perfilError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', user.email)
        .single();

        console.log('Perfil obtenido de tabla usuarios:', perfil);

      if (perfilError) {
        console.error('❌ Error al obtener perfil del usuario:', perfilError);
        return;
      }

      // ✅ Guardar en localStorage solo si no se ha guardado aún
      if (!localStorage.getItem("id_usuario")) {
        guardarSesion({
          id_usuario: perfil.id_usuario, // 👈 este es el ID real de tu tabla
          nombre: perfil.nombre || "usuario",
          email: perfil.email,
          rol: perfil.rol || "usuario",
          fecha_registro: perfil.fecha_registro || new Date().toISOString().split("T")[0]
        });

        console.log("🧠 Datos guardados en localStorage correctamente");
        console.log("📦 Verifica en localStorage:", obtenerSesion());
      }
    }
    // Si estamos en login.html y ya hay sesión, redirigimos
    if (user && location.pathname.includes('login.html')) {
      window.location.href = 'index.html';
    }
  }  catch (err) {
    console.error('Error al obtener sesión:', err);
  }

}



/* EVENTOS DE AUTENTICACIÓN EN TIEMPO REAL */
supabase.auth.onAuthStateChange((event, session) => {
  console.log('onAuthStateChange:', event, session);
  const user = session?.user ?? null;

  if (location.pathname.includes('index.html')) {
    if (user) createLoggedInNav(user);
    else createLoggedOutNav();
  }

  if (location.pathname.includes('login.html') && user) {
    // si el usuario ya está autenticado, ir a index
    window.location.href = 'index.html';
  }
});

/* LOGIN: manejo del formulario en login.html */
document.addEventListener('DOMContentLoaded', () => {
  // Solo en login.html
  if (location.pathname.includes('login.html')) {
    const form = document.getElementById('loginForm');
    setErrorMessage(''); // ocultar al inicio

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const emailEl = document.getElementById('email');
        const passEl = document.getElementById('password');
        const email = emailEl?.value?.trim() ?? '';
        const password = passEl?.value ?? '';

        if (!email || !password) {
          setErrorMessage('Por favor completa correo y contraseña.');
          return;
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message || 'Error al iniciar sesión.');
          } else if (data?.user) {
            console.log('Login exitoso:', data.user);
            // redirigir a index
            window.location.href = 'index.html';
          } else {
            setErrorMessage('No se pudo iniciar sesión. Verifica tus credenciales.');
          }
        } catch (err) {
          console.error('Excepción login:', err);
          setErrorMessage('Ocurrió un error inesperado.');
        }
      });
    }
  }

  // Si estamos en index.html, comprobar sesión y actualizar nav
  if (location.pathname.includes('index.html')) {
    checkSessionAndUpdateNav();
  }

  // Debug: mostrar sesión actual en consola
  supabase.auth.getSession().then(({ data }) => {
    console.log('Sesión al cargar (debug):', data?.session ?? null);
  }).catch(err => {
    console.error('Error al obtener sesión debug:', err);
  });
});

 const cart = [];
    const cartElement = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const buyCartBtn = document.getElementById("buy-cart");

    // Botón flotante del carrito
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "🛍️";
    cartBtn.className = "cart-btn";
    document.body.appendChild(cartBtn);
    cartBtn.addEventListener("click", () => cartElement.classList.toggle("hidden"));

    // Agregar al carrito
    document.querySelectorAll(".book-grid .book-card button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.parentElement;
        const title = card.querySelector("h3").textContent;
        const author = card.querySelector("p").textContent;
        const price = parseInt(card.querySelector(".price").dataset.price);
        cart.push({ title, author, price });
        updateCart();
      });
    });

    // Actualizar carrito
    function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;
      cart.forEach((book) => {
        total += book.price;
        const li = document.createElement("li");
        li.textContent = `${book.title} - ${book.author} ($${book.price.toLocaleString()})`;
        cartItems.appendChild(li);
      });
      cartTotal.textContent = `Total: $${total.toLocaleString()}`;
      if (cart.length > 0) {
        cartElement.classList.remove("hidden");
      } else {
        cartElement.classList.add("hidden");
      }
    }

    // Vaciar carrito
    clearCartBtn.addEventListener("click", () => {
      cart.length = 0;
      updateCart();
      alert("El carrito se ha vaciado.");
    });

    // Función para generar un ID de compra único (falso)
    function generatePurchaseId() {
    // Genera un número aleatorio entre -128 y 127 (rango de Int8)
    const randomInt8 = Math.floor(Math.random() * 256) - 128; 
    return randomInt8;
}

    console.log(generatePurchaseId());


  checkSessionAndUpdateNav();

    // Simular Compra (sin conexión a Supabase)
   buyCartBtn.addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío. Agrega libros antes de comprar.");
    return;
  }

  const sesion = obtenerSesion();
  

 
 
  const total = cart.reduce((sum, book) => sum + book.price, 0);
  const id_compra = generatePurchaseId();
  const id_usuario = sesion?.id_usuario;
   if (!id_usuario) {
    alert("Error: No se pudo obtener el ID del usuario.");
    return;
  }
  
  const fecha_compra = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

  console.log("Guardando compra en Supabase:");
  console.log("  id_compra:", id_compra);
  console.log("  id_usuario:", id_usuario);
  console.log("  fecha_compra:", fecha_compra);
  console.log("  total_compra:", total);

  const { data, error } = await supabase
    .from('pedido')
    .insert([
      {
        id_compra: id_compra,
        id_usuario: id_usuario,
        fecha_compra: fecha_compra,
        total_compra: total
      }
    ]);

  if (error) {
    console.error('❌ Error al guardar la compra:', error.message);
    alert("Ocurrió un error al registrar la compra. Intenta de nuevo.");
    return;
  }

  alert("¡Gracias por tu compra! 🥳\nTotal pagado: $" + total.toLocaleString() + "\nTu ID de compra es: " + id_compra);

  cart.length = 0;
  updateCart();
  cartElement.classList.add("hidden");
});

    // Buscador
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const bookCards = document.querySelectorAll(".book-grid .book-card");

    function searchBooks() {
      const term = searchInput.value.toLowerCase();
      bookCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const author = card.dataset.author.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        const match = title.includes(term) || author.includes(term) || category.includes(term);
        card.style.display = match ? "flex" : "none"; // Cambiado a flex para mantener el diseño
      });
    }

    searchInput.addEventListener("input", searchBooks);
    searchBtn.addEventListener("click", searchBooks);
