# CLI para Gerar Controller e Route ( Principalmente para o Sequelize )

## Descrição

- Esta CLI (Command Line Interface) foi desenvolvida para facilitar a criação de arquivos de controller e routes em um projeto Node.js. Ela permite gerar um arquivo de controller ou route com um template base e organizá-lo em um diretório específico.

## Como Usar

### Pré-requisitos

Certifique-se de ter o Node.js instalado no seu sistema.

### Instalação

1. Instale a cli utilizando o seguinte comando.
   ```bash
   npm install -g controllergenerate
   ```

### Comandos Disponíveis

#### `generate-controller <controllerName> <modelName>`

Gera um arquivo de controller com o nome especificado e o organiza no diretório "controllers" na raiz do projeto.

- controllerName : O nome desejado para o arquivo de controller.
- modelName : O nome do modelo sequelize associado ao controller.

# Exemplo de Uso

```bash
controllergenerate generate-controller usuarioController Usuario
```

- Este comando criará um arquivo chamado UsuarioController.js no diretório "controllers", contendo um template base para operações CRUD associadas ao modelo Usuario.

# Estrutura do Arquivo Gerado

- O arquivo de controller gerado segue um template base que pode ser personalizado conforme suas necessidades. Ele contém métodos básicos para operações CRUD associadas ao modelo especificado.

```js
const db = require("../models");
const Usuario = db.Usuario;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    // ... (conteúdo do método login)
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};

exports.criarUsuario = async (req, res) => {
  // ... (conteúdo do método criarUsuario)
};

exports.listarTodosUsuarios = (req, res) => {
  // ... (conteúdo do método listarTodosUsuarios)
};

exports.listarUsuarioPorId = (req, res) => {
  // ... (conteúdo do método listarUsuarioPorId)
};

exports.atualizarUsuario = (req, res) => {
  // ... (conteúdo do método atualizarUsuario)
};

exports.deletarUsuario = (req, res) => {
  // ... (conteúdo do método deletarUsuario)
};
```

#### `generate-route <routeName> <controllerName>`

Gera um arquivo de route com o nome especificado e o organiza no diretório "routes" na raiz do projeto.

- routeName : O nome desejado para o arquivo de rota.
- controllerName : O nome do controller associado a rota.

# Exemplo de Uso

```bash
controllergenerate generate-route usuario usuarioController
```

- Este comando criará um arquivo chamado usuario.js no diretório "routes", contendo um template base para operações CRUD associadas ao controller usuarioController.

# Estrutura do Arquivo Gerado

- O arquivo de route gerado segue um template base que pode ser personalizado conforme suas necessidades. Ele contém métodos básicos para operações CRUD associadas ao modelo especificado.

```js
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Rota: POST /login
router.post("/login", usuarioController.login);

// Rota: GET /
router.get("/", usuarioController.listarTodosUsuarios);

// Rota: GET /:id
router.get("/:id", usuarioController.listarUsuarioPorId);

// Rota: POST /
router.post("/", usuarioController.criarUsuario);

// Rota: PUT /:id
router.put("/:id", usuarioController.atualizarUsuario);

// Rota: DELETE /:id
router.delete("/:id", usuarioController.deletarUsuario);

module.exports = router;
```

## Notas Adicionais

- Esperamos que esta CLI simplifique o processo de geração de controllers e routes em seu projeto Node.js. Se encontrar algum problema ou tiver sugestões de melhoria, sinta-se à vontade para contribuir ou entrar em contato.

- Email: [lexluthordevfull@gmail.com](mailto:lexluthordevfull@gmail.com)
- Developed with ❤️ by [@lexluthor](https://github.com/LexLuthorDev)
- Doação: https://github.com/sponsors/LexLuthorDev
- Happy coding! 👨🏻‍💻👩‍💻
