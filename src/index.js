const cards = document.getElementById("cards");

const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

async function selecionarPersonagem(event) {
  event.preventDefault();
  const personagens = [];
  cards.innerHTML = "";
  let busca = parseInt(event.srcElement.buscador.value);

  if (isNaN(busca)) {
    busca = Math.ceil(Math.random() * 826);
  }

  let url = `/character/${busca}`;

  const resposta = await instance.get(url);
  personagens.push(resposta.data);

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
  console.log(personagens);
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

  console.log(personagens);
}
