const SUPABASE_URL = 'https://ztkfaceayhburqtnuuio.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0a2ZhY2VheWhidXJxdG51dWlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI3MjAyMiwiZXhwIjoyMDc1ODQ4MDIyfQ.d2v3BZJdDsVAWoa_u76THvm3lZ0M2DiY4c02vWxMWNE'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Obtener elementos del DOM del formulario de registro
const registerForm = document.getElementById('registerForm');
const nombreRegistroInput = document.getElementById('nombreRegistro');
const emailRegistroInput = document.getElementById('emailRegistro');
const passwordRegistroInput = document.getElementById('passwordRegistro');
const confirmPasswordRegistroInput = document.getElementById('confirmPasswordRegistro');
const registerErrorMessage = document.getElementById('registerErrorMessage');

// Función para manejar el registro de usuarios
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const nombre = nombreRegistroInput.value;
    const email = emailRegistroInput.value;
    const password = passwordRegistroInput.value;
    const confirmPassword = confirmPasswordRegistroInput.value;

    registerErrorMessage.textContent = ''; // Limpiar mensajes de error previos

    // Validaciones básicas del lado del cliente
    if (password !== confirmPassword) {
        registerErrorMessage.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    if (password.length < 6) { 
        registerErrorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    }

    try {
        // 1. Registrar al usuario en Supabase Authentication (auth.users)
        // Esto creará una entrada en la tabla auth.users de Supabase.
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nombre: nombre // Puedes pasar datos adicionales que se guardarán en user_metadata
                }
            }
        });
        

        if (authError) {
            registerErrorMessage.textContent = 'Error al registrar usuario: ' + authError.message;
            console.error('Error de Supabase SignUp:', authError.message);
            return;
        }

        console.log('Usuario registrado en auth.users:', authData.user);
        
        // --- Lógica para insertar en tu tabla 'Usuarios' (sin modificar el esquema) ---
        // Insertaremos los datos adicionales en tu tabla 'Usuarios' solo si el registro en auth.users fue exitoso.
        // Si la verificación por email está activada, authData.user puede ser null aquí.
        // Para simplificar, asumiremos que si authError es null, el registro fue un éxito inicial.

        // Insertar datos en tu tabla 'Usuarios'
        const { error: dbError } = await supabase
            .from('usuarios') 
            .insert({ 
                // ¡IMPORTANTE! NO incluimos 'id_usuario' aquí.
                // Tu tabla tiene 'id_usuario SERIAL PRIMARY KEY', lo que significa
                // que la base de datos lo generará automáticamente.
                nombre: nombre,
                email: email,
                // Como 'contraseña' es NOT NULL en tu tabla original,
                // debemos enviar un valor. Usamos un PLACEHOLDER.
                // ¡Esta NO ES LA CONTRASEÑA REAL del usuario!
                // Supabase Auth se encarga de la contraseña real de forma segura.
                contraseña: 'USUARIO_REGISTRADO_VIA_SUPABASE_AUTH', // Placeholder
                rol: 'cliente', 
                fecha_registro: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
            });

        if (dbError) {
            console.error('Error al insertar en tabla Usuarios:', dbError.message);
            // Podrías añadir lógica para borrar el usuario de auth.users si falla esto,
            // pero eso haría el proceso más complejo.
            registerErrorMessage.textContent = 'Error al guardar datos adicionales. Intenta de nuevo. (Ver consola para detalles)';
            return; // Detener la ejecución si hay un error en la base de datos
        } 
        
        console.log('Datos adicionales insertados en la tabla Usuarios.');
        
        // Mensaje final y redirección
        if (authData.user) {
            // Usuario autenticado directamente (si no hay confirmación de email o ya se confirmó)
            alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        } else {
            // Usuario registrado, pero necesita verificar el email (si la confirmación está activa)
            alert('¡Registro exitoso! Se ha enviado un correo de confirmación. Por favor, verifica tu bandeja de entrada para activar tu cuenta.');
        }
        window.location.href = 'index.html'; // Redirigir al inicio de sesión
        
    } catch (err) {
        registerErrorMessage.textContent = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
        console.error('Error general de registro:', err);
    }
});

// Función para inicializar Supabase
function createClient(supabaseUrl, supabaseAnonKey) {
    return window.supabase.createClient(supabaseUrl, supabaseAnonKey);
}

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = nombreRegistroInput.value;
    const email = emailRegistroInput.value.trim(); // <-- ¡Añade .trim() aquí!
    const password = passwordRegistroInput.value;
    const confirmPassword = confirmPasswordRegistroInput.value;

    registerErrorMessage.textContent = ''; 

    // ... (resto de las validaciones y el código) ...
});