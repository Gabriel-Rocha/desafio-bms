
# 1 - Baixe a imagem Docker

```
    docker pull mysql
```

# 2 - Crie a imagem Docker

```
  docker run --name mysql-todo -d`  -e MYSQL_ROOT_PASSWORD=root`
  -e MYSQL_DATABASE=todo_list `  -e MYSQL_USER=admin`
  -e MYSQL_PASSWORD=admin123 `  -p 5432:3306`
  mysql
```

#### Confira se o mysql foi iniciado

```
    docker start mysql-todo
    docker ps
```

# 3 - Acesse o Docker

```
    docker exec -it mysql-todo mysql -u root -p
```

** coloque a senha definida no passo anterior **

# 4 - Conecte - se no banco de dados, veja a estrutura

```
    SHOW DATABASES;
```

# 5 - Crie as tabelas

### Tabela de Usuários

```
    CREATE TABLE todo_list.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf VARCHAR(11) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    );
```

### Tabela de Tarefas

```
CREATE TABLE todo_list.tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
```

**uso de teste (apenas desenvolvimento)
INSERT INTO todo_list.users (cpf, password)
VALUES
    ('12345678901', 'senhaSegura123'),
    ('98765432109', 'outraSenha456');**

# 6 - Start o server
#### Em outro terminou rode o comando:

Criar o package.json
```
   npm init -y
```

Instalar as Dependências
```
    npm install express mysql2 sequelize jsonwebtoken bcryptjs dotenv cors express-validator
```

Inicie o servidor
```
    node src/app.js
```

# Agora que a APP está rodando, no Insominia ou Postman vamos fazer os Requests:

## Auth User

#### Registro de usuario

**POST** http://localhost:3000/auth/register
Body Json:

```
{
    "cpf": "71715678901",
    "password": "Nãoseiasenha"
}
```

Response:

```
{
	"message": "Usuário registrado com sucesso.",
	"userId": 4
}
```

#### Login

**POST** http://localhost:3000/auth/login
Body Json:

```
{
    "cpf": "71715678901",
    "password": "Nãoseiasenha"
}
```

Response:

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTczOTQ1MzQ5NiwiZXhwIjoxNzM5NDU3MDk2fQ.-d9fgXYl58zF5FKSsejZWegnI-kJc6ApDq0ns4vIpxE"
}
```

## Tasks

#### Create task

**POST** http://localhost:3000/tasks
**Bearear Token retornado no login**
Body Json:

```
{
    "title": "Isso é meu titulo do segundo user + 1",
    "description": "Isso é minha descrição do segundo user + 1",
    "date": "2025-02-13"
}
```

Response:

```
{
	"message": "Tarefa criada com sucesso.",
	"task": {
		"status": "pendente",
		"id": 4,
		"user_id": 4,
		"title": "Isso é meu titulo do segundo user + 1",
		"description": "Isso é minha descrição do segundo user + 1",
		"date": "2025-02-13",
		"updatedAt": "2025-02-13T13:48:03.116Z",
		"createdAt": "2025-02-13T13:48:03.116Z"
	}
}
```

#### List tasks

**GET** http://localhost:3000/tasks
**Bearear Token retornado no login**

Response:

```
[
	{
		"id": 3,
		"title": "Isso é meu titulo do segundo user",
		"description": "Isso é minha descrição do segundo user",
		"date": "2025-02-13",
		"status": "pendente",
		"user_id": 4,
		"createdAt": "2025-02-13T13:32:12.000Z",
		"updatedAt": "2025-02-13T13:32:12.000Z"
	}
]
```

#### Task Id

**GET** http://localhost:3000/tasks/4
**Bearear Token retornado no login**

Response:

```
{
	"id": 4,
	"title": "Isso é meu titulo do segundo user + 1",
	"description": "Isso é minha descrição do segundo user + 1",
	"date": "2025-02-13",
	"status": "pendente",
	"user_id": 4,
	"createdAt": "2025-02-13T13:48:03.000Z",
	"updatedAt": "2025-02-13T13:48:03.000Z"
}
```

#### Update task

**GET** http://localhost:3000/tasks/4
**Bearear Token retornado no login**
Body Json:

```
{
    "status": "em andamento"
}
```

Response:

```
{
	"message": "Tarefa atualizada com sucesso.",
	"task": {
		"id": 4,
		"title": "Isso é meu titulo do segundo user + 1",
		"description": "Isso é minha descrição do segundo user + 1",
		"date": "2025-02-13",
		"status": "em andamento",
		"user_id": 4,
		"createdAt": "2025-02-13T13:48:03.000Z",
		"updatedAt": "2025-02-13T14:30:21.659Z"
	}
}
```

#### Delete task

**GET** http://localhost:3000/tasks/4
**Bearear Token retornado no login**

Response:

```
{
	"message": "Tarefa excluída com sucesso."
}
```
