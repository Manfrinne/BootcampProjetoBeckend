# Bootcamp Rocketseat

> Projeto Bootcamp - Iniciando no Backend

Iniciar projeto Módulo 3 - Backend;

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

    - Reiniciando o Servidor automaticamente com Nodemon;

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
        {% block head %}{% endblock %} <!-- bloco que vou trazer de outra page -->

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
    {% extends "layout.njk" %} <!-- Com essa tag eu utilizo uma página como base -->

    {% block head %} <!-- Determinar bloco para levar para base page -->
        <title>Portfolio - Frontend</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    		 rel="stylesheet">
    {% endblock %}
    ```

- Configurando arquivo .njk;
    - Instalar Plug 'Nunjucks Template';

### Usando dados dinâmicos

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

    Por causa da Template Engine eu posso enviar dados do back para o front:

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
    {% for item in itens %}  //loop com Nunjucks
    <div class="card" id="{{item.id}}"</div> //Substituir class pelos dados extraídos
    {% endfor %} //Fechar bloco do loop
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
    //lidos como string.
    nunjucks.configure("views", {
        express: server,
        autoescape: false,
    });
    ```

Todos os dados serão armazenados futuramente em um banco de dados, mas por enquanto o importante é entender que podemos separar backend e frontend.

Configurar no servidor a opção 'autoescape: false'; isso para que os links colocados diretamente nas variáveis seja formatado pelo 'Nunjucks' não como uma simples 'string'.

### Videos em Destaque

Podemos utilizar 'if' com Nunjucks, dentro do loop ele adicionou:

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
		noCache: true, //add line
});
```

## Página de Vídeo Único

- **[Passando dados do Front para o Back com Query Strings](https://skylab.rocketseat.com.br/node/iniciando-no-back-end/group/pagina-de-video-unico/lesson/passando-dados-do-front-para-o-back-com-query-strings)**

    Não vamos mais abrir os vídeos pelo 'modal', vamos abrir direto de uma Web Page por meio do Query Strings. Para isso primeiro vamos criar uma nova rota:

    ```jsx
    server.get("/video", function(req, res) {
    	const id = req.query.id
    	
    	res.send(id)
    });
    ```

    Agora eu consigo enviar qualquer coisa  por essa rota:

    [http://localhost:5000/video?id=](http://localhost:5000/video?id=algumacoisa)qualquercoisa

- **[Filtrando elementos do array de vídeos](https://skylab.rocketseat.com.br/node/iniciando-no-back-end/group/pagina-de-video-unico/lesson/filtrando-elementos-do-array-de-videos)**

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

        return res.render("video", {videos})
    })
    ```

- **[Estruturando a página de vídeo único](https://skylab.rocketseat.com.br/node/iniciando-no-back-end/group/pagina-de-video-unico/lesson/estruturando-a-pagina-de-video-unico)**
- **[Reconfigurando o iframe](https://skylab.rocketseat.com.br/node/iniciando-no-back-end/group/pagina-de-video-unico/lesson/reconfigurando-o-iframe)**
- **[Redirecionando URL com JavaScript](https://skylab.rocketseat.com.br/node/iniciando-no-back-end/group/pagina-de-video-unico/lesson/redirecionando-url-com-java-script)**
- **[Ajustes finais](https://skylab.rocketseat.com.br/node/iniciando-no-back-end/group/pagina-de-video-unico/lesson/ajustes-finais-1)**

## Meta

Manfrinne Ferreira – [@Manfrinne_R00t](https://twitter.com/Manfrinne_R00t) – m4nfrinne@gmail.com - [https://github.com/Manfrinne](https://github.com/Manfrinne)
