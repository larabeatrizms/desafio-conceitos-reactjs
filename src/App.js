import React from "react";
import api from "./services/api.js";

import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repositorio ${Date.now()}`,
      url:
        "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/faq-desafios",
      techs: ["React", "Node.js"],
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((response) => {
      if (response.status === 204) {
        const repositoryIndex = repositories.findIndex(
          (repository) => repository.id === id
        );

        // if (repositoryIndex < 0) {
        //   return response.status(400).json({ error: "repository Not Found" });
        // }

        const repositoriesNew = repositories;
        repositoriesNew.splice(repositoryIndex, 1);

        setRepositories([...repositoriesNew]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
