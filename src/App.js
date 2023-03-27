import "./css/App.css";
import { useEffect, useState } from "react";

function App() {
  const [conteudo, setConteudo] = useState(<></>);

  function translateStatus(status) {
    switch(status) {
      case "Alive":
        return "Vivo";

      case "Dead":
        return "Morto";

      case "unknown":
        return "Desconhecido";

      default:
        return status;
    }
  }
  
  function translateGender(gender) {
    switch(gender) {
      case "Male":
        return "Homem";
        //break

      case "Famale":
        return "Mulher";

      case "unknown":
        return "Desconhecido";

      default:
        return gender;
    }
  }
  
  function translateSpecies(species) {
    switch(species) {
      case "Human":
        return "Humano";
        //break

      case "Alien":
        return "Alienígena";

      case "Robot":
        return "Robô";

      default:
        return species;
    }
  }

  async function carregarTodosOsPersonagens() {
    const retorno = await fetch(
      "https://rickandmortyapi.com/api/character", 
      { method: "GET" }
    )
    .then((response) => response.json())
    console.log(retorno)

    return retorno.results;
  }

  async function listaPersonagem() {
    const todosPersonagens = await carregarTodosOsPersonagens();

    return todosPersonagens.map(personagem => (
      <div className="card char">
        <img src={personagem.image} alt={personagem.name} />
        <h2>{personagem.name}</h2>
        <p>Espécie: {translateSpecies(personagem.species)}</p>
        <p>Gênero: {translateGender(personagem.gender)}</p>
        <p className="lista-secundaria">
          Participações:
          {
            personagem.episode.map(ep => (
              <span key={personagem.name+(ep.split('episode/')[1])}>
                Ep -{(ep.split('episode/')[1])},
              </span>
            ))
          }

        </p>
        <p>Status: {translateStatus(personagem.status)}</p>
      </div>
    ));
  }

  useEffect(() => {
    async function carregar() {
      setConteudo(await listaPersonagem());
    }
    carregar();
  }, []);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className="lista-principal">{conteudo}</div>
    </div>
  );
}

export default App;