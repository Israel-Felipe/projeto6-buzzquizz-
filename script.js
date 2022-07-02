container = document.querySelector(".container");


function criarQuizz1() {
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Comece pelo começo</h1>
        </div>

        <div class="criacaoConteudo">
            <div class="box-input"><input type="text" required placeholder="Título do seu quizz (min 20 e max 65 caracteres)"></div>
            <div class="box-input"><input type="url" required placeholder="URL da imagem do seu quizz (começar com http)"></div>
            <div class="box-input"><input type="number" required placeholder="Quantidade de perguntas do quizz (min 3)"></div>
            <div class="box-input"><input type="number" required placeholder="Quantidade de níveis do quizz (min 2)"></div>
        </div>

        <div class="botaoVermelho370" onclick="pegarValues1()">Prosseguir pra criar perguntas</div>
    </div> 
    `
   
}

let tituloQuizz, imgQuizz, qtdPerg, qtdNiveis;

function pegarValues1 () {
    tituloQuizz = document.querySelector(".criacaoConteudo div:nth-child(1) input").value;
    imgQuizz = document.querySelector(".criacaoConteudo div:nth-child(2) input").value;
    qtdPerg = document.querySelector(".criacaoConteudo div:nth-child(3) input").value;
    qtdNiveis = document.querySelector(".criacaoConteudo div:nth-child(4) input").value;


    if ((tituloQuizz.length < 20) || (tituloQuizz.length > 65) ||
        (imgQuizz.substring(0,4) !== "http") ||
        (Number(qtdPerg) < 3) ||
        (Number(qtdNiveis) < 2)) {
        alert("Escreve certinho aí pf"); 
        
    } 
    else {
        criarQuizz2();
    }
}

let arrayPerguntasAbertas = [];
let arrayPerguntasFechadas = [];

function criarQuizz2() {
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Crie suas perguntas</h1>
        </div>
    </div>
    `
        for (let i=0; i<qtdPerg; i++) {
            
        let perguntaModelo = `
        <div class="perguntaAberta escondido">
            <div class="criacaoConteudo">
            <h2>Pergunta ${i+1}</h2>
                <div class="box-input textoPergunta"><input type="text" required placeholder="Texto da pergunta"></div> 
                <div class="box-input corPergunta"><input type="color" required placeholder="Cor de fundo da pergunta"></div>

                <h2>Resposta correta</h2>
                <div class="box-input respostaCorreta"><input type="text" required placeholder="Resposta correta"></div>
                <div class="box-input urlRespostaCorreta"><input type="url" required placeholder="URL da imagem"></div>

                <h2>Respostas incorretas</h2>
                <div class="box-input respostaIncorreta1"><input type="text" required placeholder="Resposta incorreta 1"></div>
                <div class="box-input urlRespostaIncorreta1"><input type="url" required placeholder="URL da imagem 1"></div>
                <br>
                <div class="box-input respostaIncorreta2"><input type="text" placeholder="Resposta incorreta 2"></div>
                <div class="box-input urlRespostaIncorreta2"><input type="url" pattern="https?://.+"placeholder="URL da imagem 2"></div>
                <br>
                <div class="box-input respostaIncorreta3"><input type="text" placeholder="Resposta incorreta 3"></div>
                <div class="box-input urlRespostaIncorreta3"><input type="url" placeholder="URL da imagem 3"></div>
            </div>
        </div>`
        let perguntaModeloFechado = `
        <div class="perguntaFechada">
            <div class="criacaoConteudoMini">
                <h2>Pergunta ${i+1}</h2>
                <img src="img/editar.svg" onclick="editarPergunta(this)">
            </div>
        </div>`

        arrayPerguntasAbertas.push(`${perguntaModelo}`);
        arrayPerguntasFechadas.push(`${perguntaModeloFechado}`);
        
        container.innerHTML += arrayPerguntasAbertas[i];
        container.innerHTML += arrayPerguntasFechadas[i];
        }

        document.querySelector(".perguntaAberta").classList.remove("escondido");
        document.querySelector(".perguntaFechada").classList.add("escondido");

        container.innerHTML += `<div class="botaoVermelho370" onclick="pegarValues2()">Prosseguir pra criar níveis</div>`
}


function editarPergunta(elemento) {
    let perguntasAbertas = document.querySelectorAll(".perguntaAberta");

    for (let i=0; i<perguntasAbertas.length; i++) {
        perguntasAbertas[i].classList.add("escondido");
    }
        

    let perguntasFechadas = container.querySelectorAll(".perguntaFechada");
    for (let i=0; i<perguntasFechadas.length; i++) {
        perguntasFechadas[i].classList.remove("escondido");
    }

   

    let elementoPai = elemento.parentNode;
    let elementoAvo = elementoPai.parentNode;


    let elementoAnterior = elementoAvo.previousElementSibling;

    elementoAvo.classList.add("escondido");

    elementoAnterior.classList.remove("escondido");

}



let arrayPerguntasCriadas = [];

function pegarValues2 () {
   
    let divsPerguntas = container.querySelectorAll(".criacaoConteudo");
    let pergunta = {};

    for (let i=0; i<divsPerguntas.length; i++) {
        
        let tituloPergunta = divsPerguntas[i].querySelector(".textoPergunta input").value;
        let cordeFundoPergunta = divsPerguntas[i].querySelector(".corPergunta input").value;
        
        let respostaCorreta = divsPerguntas[i].querySelector(".respostaCorreta input").value;
        let URLrespostaCorreta = divsPerguntas[i].querySelector(".urlRespostaCorreta input").value;
        
        let respostaIncorreta1 = divsPerguntas[i].querySelector(".respostaIncorreta1 input").value;
        let URLrespostaIncorreta1 = divsPerguntas[i].querySelector(".urlRespostaIncorreta1 input").value;

        let respostaIncorreta2 = divsPerguntas[i].querySelector(".respostaIncorreta2 input").value; 
        let URLrespostaIncorreta2 = divsPerguntas[i].querySelector(".urlRespostaIncorreta2 input").value;

        let respostaIncorreta3 = divsPerguntas[i].querySelector(".respostaIncorreta3 input").value; 
        let URLrespostaIncorreta3 = divsPerguntas[i].querySelector(".urlRespostaIncorreta3 input").value;

        
        if ((respostaCorreta.length < 1) || (respostaIncorreta1.length < 1) || (tituloPergunta.length < 20) || 
        (URLrespostaCorreta.substring(0,4) !== "http") || (URLrespostaIncorreta1.substring(0,4) !== "http")) {
            alert("Em alguma pergunta tem um erro no texto da pergunta - ou na resposta correta - ou na PRIMEIRA resposta incorreta... dá uma conferida aí!");
            arrayPerguntasCriadas = [];
            break;
        } 

        else if ((respostaIncorreta2.length > 0) && (respostaIncorreta3.length > 0)) {

            if ((URLrespostaIncorreta2.substring(0,4) !== "http") || (URLrespostaIncorreta3.substring(0,4) !== "http")) {
                alert("Os textos das perguntas, as respostas corretas e as primeiras respostas incorretas já estão ok.\n Porém alguma das URLs das imagens para as respostas incorretas dois e três foi escrita errado");
                arrayPerguntasCriadas = [];
                break
            } else {
                pergunta = {                              /* PERGUNTA COM 4 RESPOSTAS */
                    title: tituloPergunta,
                    color: cordeFundoPergunta,
                    answers: [
                        {
                            text: respostaCorreta,
                            image: URLrespostaCorreta,
                            isCorrectAnswer: true
                        },
                        {
                            text: respostaIncorreta1,
                            image: URLrespostaIncorreta1,
                            isCorrectAnswer: false
                        },
                        {
                            text: respostaIncorreta2,
                            image: URLrespostaIncorreta2,
                            isCorrectAnswer: false
                        },
                        {
                            text: respostaIncorreta3,
                            image: URLrespostaIncorreta3,
                            isCorrectAnswer: false
                        }
                    ]
                }
                criarQuizz3();
            }
        }

        else if ((respostaIncorreta2.length > 0) && (respostaIncorreta3.length < 1)) {
            if ((URLrespostaIncorreta2.substring(0,4) !== "http")) {
                alert("A URL da imagem da resposta incorreta 2 de alguma pergunta foi escrita errada, confere lá.");
                arrayPerguntasCriadas = [];
                break
            } else {
                pergunta = {                              /* PERGUNTA COM 3 RESPOSTAS */
                    title: tituloPergunta,
                    color: cordeFundoPergunta,
                    answers: [
                        {
                            text: respostaCorreta,
                            image: URLrespostaCorreta,
                            isCorrectAnswer: true
                        },
                        {
                            text: respostaIncorreta1,
                            image: URLrespostaIncorreta1,
                            isCorrectAnswer: false
                        },
                        {
                            text: respostaIncorreta2,
                            image: URLrespostaIncorreta2,
                            isCorrectAnswer: false
                        }
                    ]
                }
                criarQuizz3()
            }
        }
        else {
            pergunta = {                              /* PERGUNTA COM 2 RESPOSTAS */
                    title: tituloPergunta,
                    color: cordeFundoPergunta,
                    answers: [
                        {
                            text: respostaCorreta,
                            image: URLrespostaCorreta,
                            isCorrectAnswer: true
                        },
                        {
                            text: respostaIncorreta1,
                            image: URLrespostaIncorreta1,
                            isCorrectAnswer: false
                        }
                    ]
                }
                criarQuizz3()
        }

        console.log(pergunta);
        arrayPerguntasCriadas.push(pergunta);
    }
}
    

function criarQuizz3() {
    console.log(arrayPerguntasCriadas);
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
    </div>
    <div class="criacaoConteudoMini">
        <h2>Nível 3</h2>
        <img src="img/editar.svg" alt="">
    </div>

    <div class="botaoVermelho370" onclick="EnviarQuizz()">Finalizar Quizz</div>
</div> 
    `
}

function criarQuizz4() {
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





function EnviarQuizz() {

    criandoQuizz = {
        title: tituloQuizz,
        image: imgQuizz,
        questions: arrayPerguntasCriadas,

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
        console.log(criandoQuizz);


    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", criandoQuizz);
    promise.then(quizzEnviado);
    promise.catch(erroCriacaoQuizz);
}

function quizzEnviado() {
    console.log("Quizz enviado com sucesso!")
    criarQuizz4();
 }
 function erroCriacaoQuizz(erro) {
    console.log("Deu ruim");
 }

function voltarprahome() {
    window.location.reload();
}