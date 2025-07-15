const ramos = [
  // Primer Año
  { nombre: "Morfología", nivel: 1, requisitos: [] },
  { nombre: "Bases Matemáticas y Estadística", nivel: 1, requisitos: [] },
  { nombre: "Bases teóricas de Enfermería y Bioética", nivel: 1, requisitos: [] },

  { nombre: "Bases Biológicas", nivel: 2, requisitos: [] },
  { nombre: "Bases Químicas", nivel: 2, requisitos: [] },
  { nombre: "Bases del cuidado de Enfermería", nivel: 2, requisitos: ["Bases teóricas de Enfermería y Bioética"] },

  // Segundo Año
  { nombre: "Salud Pública y Epidemiológica", nivel: 3, requisitos: [] },
  { nombre: "Fisiología Básica", nivel: 3, requisitos: ["Morfología", "Bases teóricas de Enfermería y Bioética"] },
  { nombre: "Bioquímica", nivel: 3, requisitos: ["Bases Biológicas", "Bases Químicas"] },
  { nombre: "Enfermería Familiar y de la Comunidad", nivel: 3, requisitos: ["Bases del cuidado de Enfermería"] },
  { nombre: "Microbiología", nivel: 3, requisitos: [] },

  { nombre: "Fisiopatología", nivel: 4, requisitos: ["Fisiología Básica"] },
  { nombre: "Farmacología Clínica", nivel: 4, requisitos: ["Bioquímica"] },
  { nombre: "Psicología de la Salud", nivel: 4, requisitos: [] },
  { nombre: "Cuidado de Enfermería Clínico", nivel: 4, requisitos: ["Bases del cuidado de Enfermería"] },

  // Tercer Año
  { nombre: "Enfermería Psicosocial", nivel: 5, requisitos: [] },
  { nombre: "Enfermería de la Mujer y RN", nivel: 5, requisitos: ["Fisiopatología"] },
  { nombre: "Educación para la Salud", nivel: 5, requisitos: ["Psicología de la Salud"] },
  { nombre: "Cuidado de la Enfermería del Adulto I", nivel: 5, requisitos: ["Fisiopatología", "Farmacología Clínica", "Cuidado de Enfermería Clínico"] },

  { nombre: "Enfermería en Psiquiatría", nivel: 6, requisitos: ["Farmacología Clínica", "Enfermería Psicosocial"] },
  { nombre: "Fundamentos Socio-antropológicos de la Salud", nivel: 6, requisitos: [] },
  { nombre: "Cuidado de Enfermería II", nivel: 6, requisitos: ["Cuidado de la Enfermería del Adulto I"] },

  // Cuarto Año
  { nombre: "Enfermería en Urgencia", nivel: 7, requisitos: ["Cuidado de Enfermería II", "Enfermería Familiar y de la Comunidad"] },
  { nombre: "Enfermería en Salud Comunitaria", nivel: 7, requisitos: ["Cuidado de Enfermería II"] },
  { nombre: "Investigación Cualitativa y Cuantitativa", nivel: 7, requisitos: [] },

  { nombre: "Enfermería Geronto-geriátrica", nivel: 8, requisitos: ["Cuidado de Enfermería II"] },
  { nombre: "Enfermería del Niño y del Adolescente", nivel: 8, requisitos: ["Enfermería de la Mujer y RN"] },
  { nombre: "Gestión en Enfermería", nivel: 8, requisitos: [] },

  // Quinto Año
  { nombre: "Internado Comunitario", nivel: 9, requisitos: ["Enfermería Geronto-geriátrica", "Enfermería del Niño y del Adolescente"] },
  { nombre: "Investigación aplicada a la Salud", nivel: 9, requisitos: ["Gestión en Enfermería"] },

  { nombre: "Internado Hospitalario", nivel: 10, requisitos: ["Internado Comunitario", "Investigación aplicada a la Salud"] }
];

const nombresSemestres = {
  1: "Semestre I",
  2: "Semestre II",
  3: "Semestre III",
  4: "Semestre IV",
  5: "Semestre V",
  6: "Semestre VI",
  7: "Semestre VII",
  8: "Semestre VIII",
  9: "Semestre IX",
  10: "Semestre X"
};

// Lógica de generación de malla (sigue igual)
const malla = document.getElementById("malla");

const niveles = [...new Set(ramos.map(r => r.nivel))].sort((a, b) => a - b);

niveles.forEach(nivel => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("nivel");
  contenedor.innerHTML = `
    <h2>${nombresSemestres[nivel]}</h2>
    <div class="fila" id="nivel-${nivel}"></div>`;
  malla.appendChild(contenedor);
});

ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.nombre = ramo.nombre;
  div.dataset.requisitos = JSON.stringify(ramo.requisitos);

  const contenedor = document.getElementById(`nivel-${ramo.nivel}`);
  contenedor.appendChild(div);
});

function actualizarEstado() {
  document.querySelectorAll(".ramo").forEach(el => {
    const requisitos = JSON.parse(el.dataset.requisitos);
    const aprobados = document.querySelectorAll(".ramo.aprobado");
    const aprobadosNombres = Array.from(aprobados).map(e => e.dataset.nombre);
    const cumplidos = requisitos.every(req => aprobadosNombres.includes(req));

    if (cumplidos || requisitos.length === 0) {
      el.classList.add("activo");
    } else {
      el.classList.remove("activo");
    }
  });
}

document.querySelectorAll(".ramo").forEach(el => {
  el.addEventListener("click", () => {
    el.classList.toggle("aprobado");
    actualizarEstado();
  });
});

actualizarEstado();

