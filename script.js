container = document.querySelector(".container");


function criarQuizz1() {
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Comece pelo começo</h1>
        </div>

        <div class="criacaoConteudo">
            <div class="box-input"><input placeholder="Título do seu quizz"></div>
            <div class="box-input"><input placeholder="URL da imagem do seu quizz"></div>
            <div class="box-input"><input placeholder="Quantidade de perguntas do quizz"></div>
            <div class="box-input"><input placeholder="Quantidade de níveis do quizz"></div>
        </div>

        <div class="botaoVermelho370" onclick="pegarValues1()">Prosseguir pra criar perguntas</div>
    </div> 
    `
   
}

let tituloQuizz, imgquizz, qtdPerg, qtdniveis  = null;
let tituloOK = null

function pegarValues1 () {
    tituloQuizz = document.querySelector(".criacaoConteudo div:nth-child(1) input").value;

    if ((tituloQuizz === null) || (tituloQuizz.length < 20) || (tituloQuizz.length > 65)) {
        alert("Por favor, insira um título válido, que tenha entre 20 e 65 caracteres.");
    } else {
        tituloOK = tituloQuizz;
    }


    imgquizz = document.querySelector(".criacaoConteudo div:nth-child(2) input").value;

    qtdPerg = document.querySelector(".criacaoConteudo div:nth-child(3) input").value;
    qtdniveis = document.querySelector(".criacaoConteudo div:nth-child(4) input").value;
    criarQuizz2();
}


function criarQuizz2() {
    console.log(tituloOK)
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Crie suas perguntas</h1>
        </div>

        <div class="criacaoConteudo">
            <h2>Pergunta 1</h2>
            <div class="box-input" ><input placeholder="Texto da pergunta"></div>
            <div class="box-input"><input placeholder="Cor de fundo da pergunta"></div>

            <h2>Resposta correta</h2>
            <div class="box-input"><input placeholder="Resposta correta"></div>
            <div class="box-input"><input placeholder="URL da imagem"></div>

            <h2>Respostas incorretas</h2>
            <div class="box-input"><input placeholder="Resposta incorreta 1"></div>
            <div class="box-input"><input placeholder="URL da imagem 1"></div>
            <br>
            <div class="box-input"><input placeholder="Resposta incorreta 2"></div>
            <div class="box-input"><input placeholder="URL da imagem 2"></div>
            <br>
            <div class="box-input"><input placeholder="Resposta incorreta 3"></div>
            <div class="box-input"><input placeholder="URL da imagem 3"></div>
        </div>

        <div class="criacaoConteudoMini">
            <h2>Pergunta 2</h2>
            <img src="img/editar.svg" alt="">
        </div>

        <div class="criacaoConteudoMini">
            <h2>Pergunta 3</h2>
            <img src="img/editar.svg" alt="">
        </div>

        <div class="botaoVermelho370" onclick="criarQuizz3()">Prosseguir pra criar níveis</div>
    </div>
    `
}

function criarQuizz3() {
    console.log(tituloOK)
    container.innerHTML = `
    <div class="criacaoQuizz">
    <div class="criacaoTitulo">
        <h1>Agora, decida os níveis</h1>
    </div>

    <div class="criacaoConteudo">
        <h2>Nível 1</h2>
        <div class="box-input" ><input placeholder="Título do nível"></div>
        <div class="box-input"><input placeholder="% de acerto mínima"></div>
        <div class="box-input"><input placeholder="URL da imagem do nível"></div>
        <div class="box-input"><input placeholder="Descrição do nível"></div>
    </div>tituloQuizz
    <div class="criacaoConteudoMini">
        <h2>Nível 3</h2>
        <img src="img/editar.svg" alt="">
    </div>

    <div class="botaoVermelho370" onclick="EnviarQuizz()">Finalizar Quizz</div>
</div> 
    `
}

function criarQuizz4() {
    console.log(tituloOK)
    container.innerHTML = `
    <div class="criacaoQuizz">
    <div class="criacaoTitulo">
        <h1>Seu quizz está pronto!</h1>
    </div>

   
    <div class="botaoVermelho221" onclick="acessarQuizz()">Acessar Quizz</div>
    <div class="botaoVermelho221" onclick="voltarprahome()">Voltar pra home</div>
</div>
    `
}

criandoQuizz = {
	title: tituloOK,
	image: "imgquizz",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}


function EnviarQuizz() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", criandoQuizz);
    promise.then(quizzEnviado);
    promise.catch(erroCriacaoQuizz);
}

function quizzEnviado() {
    console.log("Login efetuado!")
    criarQuizz4();
 }
 function erroCriacaoQuizz(erro) {
    console.log("Deu ruim");
 }

function voltarprahome() {
    window.location.reload();
}