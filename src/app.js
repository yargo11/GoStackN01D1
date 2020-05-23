const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Listar repositorios
app.get("/repositories", (request, response) => {
  // TODO

  const { title } = request.query;

  const results = title
    ? repositories.filter(repositories => repositories.title.includes(title))
    : repositories;

  return response.json(results);
});

// Criar repositorios

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

// Atualizar Repositorios
app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not found' });
  }

  const repository = {
    id,
    title,
    url,
    techs
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

//Deletar Repositorios
app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not Found :( ' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

//Incrementar o valor de likes
app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not Found' });
  }

  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
