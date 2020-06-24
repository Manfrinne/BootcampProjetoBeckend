# Bootcamp Rocketseat

> Projeto Bootcamp - Iniciando no Backend

O objetivo desse projeto é desenvolver o Backend de um Web site. Utilizamos o mesmo arquivo do nosso projeto de Frontend. Vamos criar um servidor com as rotas dos arquivos HTMLs, também vamos usar uma template engine para manipular os dados do frontend de forma dinâmica.

![](public/showProject.gif)

 ## Tecnologias e ferramentas:

 <ul>
  <li>Javascript</li>
  <li>HTML</li>
  <li>CSS</li>
  <li>Node.js</li>
  <li>Nodemon</li>
  <li>Express</li>
  <li>Nunjucks</li>
 </ul>
 
## Rodando o projeto:

1 - Clone o projeto e o abra utilizando seu editor preferido.

2 - Rode um `npm install` na pasta do projeto.

3 - Rode um `npm start` para rodar o projeto.

4 - Abra o projeto em `localhost:7777`

## Iniciar projeto Módulo 3 - Backend

- Criando o Servidor:
    - Iniciando a configuração do servidor:

    ```bash
    npm init -y
    ```

    - Criando o servidor:

    ```bash
    npm install express
    ```

    - Criando Rotas;

    ```jsx
    server.get("/", function(req, res) {
        return res.send("Hack the Planet!")
    })

    server.listen(5000, function() {
        console.log("I'm a Fullstack Developer!")
    });
    ```

    - [ ]  Reiniciando o Servidor automaticamente com Nodemon;

    ```bash
    npm install -D nodemon
    ```

- Template Engine
    - Iniciando e Configurando Nunjucks;

    ```bash
    npm install nunjucks
    ```

- Trazendo o Frontend do site para o Servidor;

    ```jsx
    const nunjucks = require('nunjucks'); //Variável trazendo template engine

    server.set("view engine", "njk"); //Setup 'view engine', poderia ser HTML

    nunjucks.configure("views", {
        express: server
    });
    ```

- Página dinâmica com Nunjucks;

    ```html
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/style.css">
        {% block head %}{% endblock %} <!-- bloco que vou trazer de outra página -->

    </head>
    <body>
        <header>
            <div class="links">
                <a href="/" >Sobre</a>
                <a href="/portfolio" >Aulas</a>
            </div>
        </header>

        {% block content %}{% endblock %}

    </body>
    </html>
    ```

    ```html
    {% extends "layout.njk" %} <!-- Com essa tag acesso a página base -->

    {% block head %} <!-- Determinar bloco para levar para página base -->
        <title>Portfolio - Frontend</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    		 rel="stylesheet">
    {% endblock %}
    ```

- Configurando arquivo .njk;
    - Instalar Plug 'Nunjucks Template';

## Usando dados dinâmicos

- Exportando e importando JavaScript;

    Eu preciso transformar os arquivos das minhas páginas dinâmica  em DADOS. Pra isso, preciso criar um file.js para extrair os dados do HTML.

    ```jsx
    module.exports = [
    	{
    		//Criar objeto com os dados HTML
    	}
    ]
    ```

- Passando dados do Back para o Frontend;

    Por meio do Template Engine eu posso enviar dados do back para o frontend:

    ```jsx
    const videos = require("./data"); //variável no servidor

    server.get("/portfolio", function (req, res) {
    	return res.render("portfolio", {itens: videos}) 
    	//chamar variável na rota do servidor
    });
    ```

    No file.njk do meu Frontend eu preciso usar a variável que acabei de fazer no servidor:

    ```jsx
    //Utilizar apenas um card e fazer ele acessar os dados do 'data.js'
    {% for item in itens %}  //Estrutura de repetição com Nunjucks
    <div class="card" id="{{item.id}}"</div> //Substituir class pelos dados extraídos
    {% endfor %} //Fechar bloco de estrutura de repetição
    ```

- Atualizando página Sobre;

    Nesse exemplo ele colocou os dados direto no servidor, isto é, não em um arquivo js:

    ```jsx
    server.get("/", function (req, res) {
    	const about = {
    		avatar_url: "linkPage",
    		//todos os dados necessário
    	};

    	return res.render("about", {about: about}; //Em js pode ser apenas {about}
    });

    //Configurar autoescape como 'false' para os links não serem
    //lidos como uma string.
    nunjucks.configure("views", {
        express: server,
        autoescape: false,
    });
    ```

Todos os dados serão armazenados futuramente em um banco de dados, mas por enquanto o importante é entender que podemos separar backend e frontend.

Configurar no servidor a opção 'autoescape: false'; isso para que os links colocados diretamente nas variáveis sejam formatados pelo 'Nunjucks' não como uma simples 'string'.

## Videos em Destaque

Podemos utilizar Condicional ( 'if' ) com Nunjucks dentro da estrutura de repetição:

```html
{% if item.featured %}
	<div class="featured">Featured</div>
{% endif %}
<!-- Em alguns cards ele adicionou a class 'featured: true' -->
```

Nos cards ele adicionou uma estilização das 'Features' com CSS:

```css
.featured {
	position: absolute;
	background: #f7d05f;
	color: #111;
	padding: 2px 8px;
	right: 5px;
	border-radius: 16px;
	top: -10px;
}
```

Classes CSS dinâmicos e noCache Nunjucks:

```css
.featured-wrapper.card__image-container {  
	/* Adicionar 'position' apenas quando tiver essas duas classes */
	position: relative;
}
```

Para conseguir verificar de forma dinâmica as duas classes, no HTML eu utilizo:

```html
<div class="card__image-container {{ 'featured-wrapper' if item.featured }} ">
```

Para que o Nunjucks consiga atualizar o servidor eu preciso esvaziar o Cache. adicione a linha noCache no arquivo server.js:

```jsx
nunjucks.configure("views", {
    express: server,
    autoescape: false,
		noCache: true, //add statement
});
```

## Página de Vídeo Único

- Passando dados do Front para o Back com Query Strings

    Não vamos mais abrir os vídeos pelo 'modal', vamos abrir direto de uma Web Page por meio do Query Strings. Para isso primeiro vamos criar uma nova rota:

    ```jsx
    server.get("/video", function(req, res) {
    	const id = req.query.id
    	
    	res.send(id)
    });
    ```

    Agora eu consigo enviar qualquer coisa  por essa rota:

    [http://localhost:5000/video?id=](http://localhost:5000/video?id=algumacoisa)qualquercoisa

- Filtrando elementos do array de vídeos

    ```jsx
    server.get("/video", function(req, res) {
        const id = req.query.id

        const video = videos.find(function(video) {
            if (video.id == id) {
                return true
            }
        })

        if (!video) {
            return res.send("VIDEO NOT FOUND!")
        }

        return res.render("video", {video})
    })
    ```

- Estruturando a página de vídeo único

    Vamos copiar o card da /portfolio.njk:

    ```html
    <!-- Nunjucks padrão -->

    <section class="cards">
                <div class="card" id="{{item.id}}">
                    <div class="card__image-container {{ 'featured-wrapper' if item.featured }}">
                        <img src="https://img.youtube.com/vi/{{item.id}}/maxresdefault.jpg" alt="{{itens.title}}">
                        {% if item.featured %}
                            <div class="featured">Featured</div>
                        {% endif %}
                    </div>
                    <div class="card__content">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="card__info">
                        <p>{{item.duration}}</p>
                        <p class="card__price">{{item.price}}</p>
                    </div>
                </div>
     </section>

    <!-- Nunjucks padrão -->
    ```

    Também vamos modificar o nome da variável na roda do servidor para utilizarmos a mesma variável no arquivo video.njk:

    ```jsx
    return res.render("video", { item: video} )
    //variável 'item' pra manter mesmo nome do arquivo 'njk'

    ```

    Vamos criar uma 'class' chamada "video" no arquivo video.njk:

    ```html
    <section class="video">
    ```

    Configurar a página video.njk no CSS:

    ```css
    .video {
        max-width: 800px;
        margin: 0 auto;
    }
    ```

- Reconfigurando o iframe
Vamos copiar a tag iframe do arquivo portfolio.njk. Depois iremos colocar a tag iframe contida na tag de "class=card" no arquivo video.njk e criar a class="card__video-container":

```html
<div class="card" id="{{item.id}}">
                <div class="card__video-container">
                    <iframe src="https://www.youtube.com/embed/{{item.id}}" allowfullscreen></iframe>
                    {% if item.featured %}
                        <div class="featured">Featured</div>
                    {% endif %}
                </div>
                <div class="card__content">
                    <p>{{item.title}}</p>
                </div>
                <div class="card__info">
                    <p>{{item.duration}}</p>
                    <p class="card__price">{{item.price}}</p>
                </div>
            </div>
```

No CSS vamos configurar o iframe com o código:

```css
.card__video-container {
    position: relative;
    padding-top: 65%;
}

.card__video-container iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
}
```

- Redirecionando URL com JavaScript

Para que a URL da página video.njk carregue pelo arquivo /public/script.js precisamos reformular o código para:

```jsx
const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener("click", function() {
        modalOverlay.classList.add("active");
        const videoId = card.getAttribute("id");
        window.location.href = `/video?id=${videoId}`; //Carrega a página com o ID   
    })
};
```

## Como contribuir:

-  Faça um fork do projeto;
-  Crie uma nova branch, exemplo: `git checkout -b my-feature`;
-  Commit as modificações, exemplo: `git commit -m 'feat: My new feature'`;
-  Faça um push para a sua branch: `git push origin my-feature`.

Criado por Manfrinne Ferreira [Contato](https://www.linkedin.com/in/manfrinne-ferreira-6033121a7/)

