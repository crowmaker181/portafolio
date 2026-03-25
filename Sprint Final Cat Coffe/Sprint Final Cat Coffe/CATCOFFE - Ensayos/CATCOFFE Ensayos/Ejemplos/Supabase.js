// ===============================
// == Conexión a Supabase =======
// ===============================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://igxdmfruycueiscerken.supabase.co';  // ⬅️ Pega tu URL real aquí
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneGRtZnJ1eWN1ZWlzY2Vya2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODIxMjAsImV4cCI6MjA2ODg1ODEyMH0.z9BafzpaEaiSGEPyck_nx9Eao0J3Rd1ZoWKiWg5Jr6I';                    // ⬅️ Pega tu anon key aquí
const supabase = createClient(supabaseUrl, supabaseKey);

// ===============================
// == Guardar en Supabase =======
// ===============================
export async function guardarFormularioSupabase() {
  const datos = {
    nombre_completo: document.getElementById("nombre").value,
    correo_electronico: document.getElementById("correo").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    desea_adoptar: document.getElementById("tipo").value,
    nombre_mascota: document.getElementById("nombre_mascota").value,
    motivo_adopcion: document.getElementById("mensaje").value,
    tienes_tiempo: document.querySelector('input[name="Tiempo diario"]:checked')?.value === "Sí",
    recursos_para_cuidarlo: document.querySelector('input[name="Recursos económicos"]:checked')?.value,
    experiencia_mascotas: document.querySelector('input[name="Experiencia previa"]:checked')?.value === "Sí",
    permisos_en_vivienda: document.querySelector('input[name="Permiso de vivienda"]:checked')?.value === "Sí",
    cuidados_planeados: document.querySelector('textarea[name="Respuesta ante enfermedad"]').value
  };

  const { data, error } = await supabase
    .from('FormularioAdopcion')
    .insert([datos]);

  if (error) {
    alert("❌ Error al enviar a Supabase: " + error.message);
    console.error(error);
  } else {
    console.log("✅ Datos enviados a Supabase:", data);
  }
}