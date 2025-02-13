1 - Baixe a imagem Docker
    docker pull mysql

2 - Crie a imagem Docker
    2.1 docker run --name mysql-todo -d `
        -e MYSQL_ROOT_PASSWORD=root `
        -e MYSQL_DATABASE=todo_list `
        -e MYSQL_USER=admin `
        -e MYSQL_PASSWORD=admin123 `
        -p 5432:3306 `
        mysql
    2.2 docker start mysql-todo
    2.3 docker ps

3 - Acesse o Docker
    docker exec -it mysql-todo mysql -u root -p

4 - Conecte - se no banco de dados usando e veja a estrutura 
    SHOW DATABASES;

5 - Crie as tabelas    
    Tabela de Usuários
    CREATE TABLE todo_list.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf VARCHAR(11) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    Tabela de Tarefas
    CREATE TABLE todo_list.tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

uso de teste de dev (apenas desenvolvimento)
INSERT INTO todo_list.users (cpf, password) 
VALUES 
    ('12345678901', 'senhaSegura123'),
    ('98765432109', 'outraSenha456');


6 - Start o server
    node src/app.js