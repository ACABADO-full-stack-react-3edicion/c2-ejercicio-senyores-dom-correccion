import { senyoresAPI } from "../datos/senyores.js";

let senyores = [...senyoresAPI];

const principal = document.querySelector(".principal");

const getInicial = (nombre) => {
  const partesNombre = nombre.split(" ");
  const posicion = partesNombre[0].length > 2 ? 0 : 1;
  return partesNombre[posicion].charAt(0).toUpperCase();
};

const pintarListaSenyores = () => {
  for (const {
    nombre,
    foto,
    profesion,
    estado,
    twitter,
    marcado,
  } of senyores) {
    const senyorElemento = document
      .querySelector(".senyor-molde")
      .cloneNode(true);
    senyorElemento.classList.remove("senyor-molde");
    const nombreElemento = senyorElemento.querySelector(".nombre-senyor");
    nombreElemento.textContent = nombre;
    const imagen = senyorElemento.querySelector(".avatar > img");
    imagen.src = `img/${foto}`;
    imagen.alt = `${nombre} apuntándote con el dedo`;
    const profesionElemento = senyorElemento.querySelector(
      ".datos-profesion .valor-dato"
    );
    profesionElemento.textContent = profesion;
    const estadoElemento = senyorElemento.querySelector(
      ".datos-estado .valor-dato"
    );
    estadoElemento.textContent = estado;
    const twitterElemento = senyorElemento.querySelector(
      ".datos-twitter .valor-dato"
    );
    twitterElemento.textContent = twitter;
    const inicialElemento = senyorElemento.querySelector(".inicial");
    inicialElemento.textContent = getInicial(nombre);

    if (marcado) {
      senyorElemento.classList.add("marcado");
    }

    principal.append(senyorElemento);
  }
};

const pintaTotal = () => {
  const totalElemento = document.querySelector(".total");
  totalElemento.textContent = senyores.filter(
    (senyor) => senyor.marcado
  ).length;
};

const borrarListaSenyores = () => {
  const senyoresElementos = principal.querySelectorAll(
    ".senyor:not(.senyor-molde)"
  );
  for (const senyorElemento of senyoresElementos) {
    senyorElemento.remove();
  }
};

const pintaUI = () => {
  pintaTotal();
  borrarListaSenyores();
  pintarListaSenyores();
};

pintaUI();

const botonMarcarTodos = document.querySelector(".marcar-todos");
botonMarcarTodos.addEventListener("click", (evento) => {
  evento.preventDefault();
  senyores = senyores.map((senyor) => ({ ...senyor, marcado: true }));
  pintaUI();
});
