#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");

const program = new Command();

// Template base para o controller
const baseControllerTemplate = `
const db = require("../models");
const {{modelName}} = db.{{modelName}};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    // ... (conteúdo do método login)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};

exports.criar{{modelName}} = async (req, res) => {
  try {
    // ... (conteúdo do método criarUsuario)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};

exports.listarTodos{{modelName}}s = (req, res) => {
  try {
    // ... (conteúdo do método listarTodosUsuarios)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};

exports.listar{{modelName}}PorId = (req, res) => {
  try {
    // ... (conteúdo do método listarUsuarioPorId)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};

exports.atualizar{{modelName}} = (req, res) => {
  try {
    // ... (conteúdo do método atualizarUsuario)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};

exports.deletar{{modelName}} = (req, res) => {
  try {
    // ... (conteúdo do método deletarUsuario)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};
`;

const baseRouteTemplate = `
const express = require("express");
const router = express.Router();
const {{controllerName}} = require("../controllers/{{controllerName}}");

// Rota: POST /login
router.post("/login", {{controllerName}}.login);

// Rota: GET /
router.get("/", {{controllerName}}.listarTodos{{capitalizedRouteName}}s);

// Rota: GET /:id
router.get("/:id", {{controllerName}}.listar{{capitalizedRouteName}}PorId);

// Rota: POST /
router.post("/", {{controllerName}}.criar{{capitalizedRouteName}});

// Rota: PUT /:id
router.put("/:id", {{controllerName}}.atualizar{{capitalizedRouteName}});

// Rota: DELETE /:id
router.delete("/:id", {{controllerName}}.deletar{{capitalizedRouteName}});

module.exports = router;
`;

program
  .version("1.0.0")
  .description("CLI para criar diretório e gerar arquivo de controller");

program
  .command("generate-controller <controllerName> <modelName>")
  .description("Gera um arquivo de controller com o nome especificado")
  .action((controllerName, modelName, options) => {
    // Obter o diretório atual do processo em execução
    const currentDir = process.cwd();

    // Construir o caminho para o diretório controllers na raiz do projeto
    const controllersDir = path.join(currentDir, "controllers");
    const filePath = path.join(controllersDir, `${controllerName}.js`);

    // Verificar se o diretório "controllers" existe e criá-lo se não existir
    if (!fs.existsSync(controllersDir)) {
      fs.mkdirSync(controllersDir);
    }

    // Verificar se o arquivo já existe, a menos que a opção force seja fornecida
    if (!options.force && fs.existsSync(filePath)) {
      console.error(
        `O arquivo de controller ${controllerName} já existe. Use a flag -f para forçar a criação.`
      );
      return;
    }

    // Escrever o conteúdo do template no arquivo
    fs.writeFileSync(
      filePath,
      baseControllerTemplate.replace(/{{modelName}}/g, modelName)
    );

    console.log(`Arquivo de controller ${controllerName} gerado com sucesso.`);
  });

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

program
  .command("generate-route <routeName> <controllerName>")
  .description("Gera um arquivo de rota com o nome especificado")
  .action((routeName, controllerName, options) => {
    // Capitalizar a primeira letra do routeName
    const capitalizedRouteName = capitalizeFirstLetter(routeName);

    // Obter o diretório atual do processo em execução
    const currentDir = process.cwd();

    // Construir o caminho para o diretório routes na raiz do projeto
    const routesDir = path.join(currentDir, "routes");
    const filePath = path.join(routesDir, `${routeName}.js`);

    // Verificar se o diretório "routes" existe e criá-lo se não existir
    if (!fs.existsSync(routesDir)) {
      fs.mkdirSync(routesDir);
    }

    // Verificar se o arquivo já existe, a menos que a opção force seja fornecida
    if (!options.force && fs.existsSync(filePath)) {
      console.error(
        "O arquivo de rota já existe. Use a flag -f para forçar a criação."
      );
      return;
    }

    // Escrever o conteúdo do template no arquivo
    fs.writeFileSync(
      filePath,
      baseRouteTemplate
        .replace(/{{routeName}}/g, routeName)
        .replace(/{{capitalizedRouteName}}/g, capitalizedRouteName)
        .replace(/{{controllerName}}/g, controllerName)
    );

    console.log(`Arquivo de rota gerado com sucesso.`);
  });

program.parse(process.argv);
