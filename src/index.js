const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
let paginaAtual = Math.ceil(Math.random() * 38 + 2);
const paginacao = document.getElementById("pagina");
const cards = document.getElementById("cards");
const buscador = document.getElementById("buscador");


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
  cards.innerHTML = "";
  let busca = parseInt(event.srcElement.buscador.value);

  if (isNaN(busca) || busca > 826) {
    busca = Math.ceil(Math.random() * 823);
    alert("Not today! lol");
    buscador.value = busca;
  }

  let url = `/character/${busca},${busca + 1},${busca + 2},${busca + 3}`;

  const resposta = await instance.get(url);
  const personagens = resposta.data;

  personagens.forEach((personagem) => {
    cards.innerHTML += `<article>
    <figure>
      <img src=${personagem.image} alt="${personagem.name}." />
    </figure>
    <aside>
    <p><h3>ID:</h3>${personagem.id}.</p>
    <p><h3>Name:</h3>${personagem.name}.</p>
    <p><h3>Status:</h3>${personagem.status}.</p>
    <p><h3>Species:</h3>${personagem.species}.</p>
    <p><h3>Location:</h3>${personagem.location.name}.</p>
    </aside>
  </article>`;
  });
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
  personagens.forEach((personagem) => {
    cards.innerHTML += `<article>
    <figure>
      <img src=${personagem.image} alt="${personagem.name}." />
    </figure>
    <aside>
    <p><h3>ID:</h3>${personagem.id}.</p>
    <p><h3>Name:</h3>${personagem.name}.</p>
    <p><h3>Status:</h3>${personagem.status}.</p>
    <p><h3>Species:</h3>${personagem.species}.</p>
    <p><h3>Location:</h3>${personagem.location.name}.</p>
    </aside>
  </article>`;
  });
}
