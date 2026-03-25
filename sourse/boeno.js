document.getElementById("btnPublicar").addEventListener("click", function () {

  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || mensaje === "") {
    alert("Completa todos los campos");
    return;
  }

  const muro = document.getElementById("muro");

  const nuevo = document.createElement("div");
  nuevo.classList.add("testimonio");

  nuevo.innerHTML = `
    <strong>${nombre}</strong>
    <p>${mensaje}</p>
  `;

  muro.prepend(nuevo);

  document.getElementById("nombre").value = "";
  document.getElementById("mensaje").value = "";
});

const ctx = document.getElementById('skillsChart');

new Chart(ctx, {
    type: 'radar',
    data: {
        labels: [
            'Python',
            'Java',
            'HTML',
            'Bootstrap',
            'CSS',
            'Quality Control',
            'JavaScript',
            'SQL'
        ],
        datasets: [{
            label: 'Nivel de habilidades',
            data: [80, 80, 85, 80, 75, 90, 70, 80],
            fill: true,
            backgroundColor: '#00d9ff4c', 
            borderColor: '#00d9ff',
            pointBackgroundColor: '#00d9ff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#00d9ff'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255,255,255,0.2)'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                },
                pointLabels: {
                    color: 'white',
                    font: {
                        size: 14
                    }
                },
                ticks: {
                    backdropColor: 'transparent',
                    color: 'white'
                }
            }
        }
    }
});

const btn = document.getElementById("btnVerMas");
const proyectos = document.querySelectorAll(".proyecto-extra");

let visibles = false;

btn.addEventListener("click", () => {
  proyectos.forEach(p => {
    p.classList.toggle("d-none");
  });

  visibles = !visibles;

  btn.textContent = visibles ? "Ver menos proyectos" : "Ver más proyectos";
});