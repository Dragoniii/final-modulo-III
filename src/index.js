const cards = document.getElementById

const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

async function selecionarPersonagem(event) {
  event.preventDefault();
  let busca = parseInt(event.srcElement.buscador.value);
  
  if (isNaN(busca)) {
    busca = Math.ceil(Math.random()*826)
  }

  return(console.log(busca))
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

  //organizapersonagens (personagens);
  return(console.log("Funcionando até aqui " + pagina))
}

/*
function organizapersonagens (personagens) {
  personagens.array.forEach(personagem => {
    
  });

}

*/