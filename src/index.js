const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
let paginaAtual = Math.ceil(Math.random() * 38 + 2);
const paginacao = document.getElementById("pagina");
const cards = document.getElementById("cards");
const buscador = document.getElementById("buscador");

///
document.addEventListener("DOMContentLoaded", function () {
  let menuIcon = document.getElementById("menu");
  menuIcon.addEventListener("click", function () {
    window.location.reload();
  });
});

///
document.addEventListener("DOMContentLoaded", function () {
  let randomIcon = document.getElementById("random");
  randomIcon.addEventListener("click", function () {
    aleatorio();
  });
});

///
document.addEventListener("DOMContentLoaded", function () {
  let botaoBuscador = document.getElementById("botaoBuscador");
  botaoBuscador.addEventListener("click", selecionarPersonagem);
});

paginacao.innerHTML = `${paginaAtual}`;

function paginaUm() {
  paginaAtual = 1;
  paginacao.innerHTML = `${paginaAtual}`;
  carregaPersonagens(paginaAtual);
}

function paginaFinal() {
  paginaAtual = 42;

  paginacao.innerHTML = `${paginaAtual}`;
  carregaPersonagens(paginaAtual);
}

function diminuirpagina() {
  paginaAtual = paginaAtual - 1;
  if (paginaAtual <= 1) {
    paginaAtual = 1;
  }
  paginacao.innerHTML = `${paginaAtual}`;
  carregaPersonagens(paginaAtual);
}

function aumentarpagina() {
  paginaAtual = paginaAtual + 1;
  if (paginaAtual >= 42) {
    paginaAtual = 42;
  }
  paginacao.innerHTML = `${paginaAtual}`;
  carregaPersonagens(paginaAtual);
}

async function selecionarPersonagem(event) {
  event.preventDefault();
  let busca = document.getElementById("buscador").value;

  if (!isNaN(busca) && busca > 0 && busca < 827) {
    document.getElementById("buscador").value = busca;
    let url = `/character/${busca},${busca - 0 + 1},${busca - 0 + 2},${
      busca - 0 + 3
    }`;
    try {
      const resposta = await instance.get(url);
      const personagens = resposta.data;
      organizapersonagens(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens: ", error);
    }
  } else if (busca === "alive" || busca === "dead") {
    document.getElementById("buscador").value = busca;
    let url = `/character/?status=${busca}`;
    try {
      const resposta = await instance.get(url);
      const personagens = resposta.data.results;
      organizapersonagens(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens: ", error);
    }
  } else if (busca === "female" || busca === "male" || busca === "genderless") {
    document.getElementById("buscador").value = busca;
    let url = `/character/?gender=${busca}`;
    try {
      const resposta = await instance.get(url);
      const personagens = resposta.data.results;
      organizapersonagens(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens: ", error);
    }
  } else if (
    busca === "poopybutthole" ||
    busca === "humanoid" ||
    busca === "alien" ||
    busca === "disease" ||
    busca === "mythological" ||
    busca === "cronenberg" ||
    busca === "animal" ||
    busca === "robot"
  ) {
    document.getElementById("buscador").value = busca;
    let url = `/character/?species=${busca}`;
    try {
      const resposta = await instance.get(url);
      const personagens = resposta.data.results;
      organizapersonagens(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens: ", error);
    }
  } else if (isNaN(busca) && busca !== null) {
    document.getElementById("buscador").value = busca;
    let url = `/character/?name=${busca}`;
    try {
      const resposta = await instance.get(url);
      const personagens = resposta.data.results;
      organizapersonagens(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens: ", error);
    }
  }
}

async function aleatorio() {
  cards.innerHTML = "";

  const conjunto = [];
  const maximo = 826;

  for (let i = 0; i < 20; ) {
    let numeroAleatorio = Math.floor(Math.random() * maximo) + 1;
    if (!conjunto.includes(numeroAleatorio)) {
      conjunto.push(numeroAleatorio);
      i++;
    }
  }

  let url = `/character/${conjunto}`;

  const resposta = await instance.get(url);
  const personagens = resposta.data;

  organizapersonagens(personagens);
}

async function carregaPersonagens(pagina) {
  if (pagina <= 1) {
    pagina = 1;
  }

  if (pagina >= 42) {
    pagina = 42;
  }

  let url = `/character?page=${pagina}`;

  const resposta = await instance.get(url);
  const personagens = resposta.data.results;

  organizapersonagens(personagens);
}

function organizapersonagens(personagens) {
  cards.innerHTML = "";
  let row = document.createElement("div");
  row.className = "row g-3";

  personagens.forEach((personagem) => {
    let nomeDisplay =
      personagem.name.length > 12
        ? personagem.name.substring(0, 12) + "..."
        : personagem.name;

    let col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";
    let card = `
          <div class="card" style="cursor: pointer;">
            <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}">
            <div class="card-body">
              <h5 class="card-title">${nomeDisplay}</h5> <!-- Usar nomeDisplay aqui -->
              <p class="card-text">${personagem.species}</p>
            </div>
          </div>
        `;
    col.innerHTML = card;
    row.appendChild(col);

    col.addEventListener("click", () => {
      document.getElementById(
        "personagemModalLabel"
      ).innerText = `${personagem.name}`;
      const modalBody = document.querySelector("#personagemModal .modal-body");
      modalBody.innerHTML = `
          <div style="text-align: center;">
            <img src="${personagem.image}" class="img-fluid mb-2" alt="${personagem.name}" style="max-width: 100%; height: auto; max-height: 400px;">
          </div>
          <p>ID: ${personagem.id}</p>
          <p>Status: ${personagem.status}</p>
          <p>Species: ${personagem.species}</p>
          <p>Type: ${personagem.type}</p>
          <p>Gender: ${personagem.gender}</p>
          <p>Origin: ${personagem.origin.name}</p>
          <p>Location: ${personagem.location.name}</p>
        `;
      var myModal = new bootstrap.Modal(
        document.getElementById("personagemModal"),
        {}
      );
      myModal.show();
    });
  });
  cards.appendChild(row);
}
