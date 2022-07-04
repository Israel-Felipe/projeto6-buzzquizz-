
let meusQuizzes = [];
let quizzes;
let quizzAtual;
let acertos = 0;
let tentativas=0;
const tela2 = document.querySelector('.tela2');
const todosOsQuizzes = document.querySelector(".todos-os-quizzes .conteudo");
const conteudoSeusQuizzes = document.querySelector('.seus-quizzes .conteudo');

Renderizar();
setTimeout(botaoCriarQuizz, 200); 

function Renderizar(){
    const quizPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    quizPromise.then(renderizarTodosOsQuizzes);
}

function renderizarTodosOsQuizzes(response) {
    quizzes = response.data
    todosOsQuizzes.innerHTML = ""
    conteudoSeusQuizzes.innerHTML = ""
    for (let i = 0; i < quizzes.length; i++) {

        if(meusQuizzesIds.includes(quizzes[i].id)==true){

            conteudoSeusQuizzes.innerHTML +=
                `<div class="quizz" id="quizz${i}" onclick="mostrarTela2(this)">
                    <h2>${quizzes[i].title}</h2>
                </div>`;
            document.getElementById("quizz" + i).style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.85)25%, transparent 75%), url("${quizzes[i].image}")`;

        }else if(meusQuizzesIds.includes(quizzes[i].id) !==true){

            todosOsQuizzes.innerHTML +=
                `<div class="quizz" id="quizz${i}" onclick="mostrarTela2(this)">
                    <h2>${quizzes[i].title}</h2>
                </div>`;
            document.getElementById("quizz" + i).style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.85)25%, transparent 75%), url("${quizzes[i].image}")`;

        }

    }
};

function mostrarTela2(quizzSelecionado) {
    quizzAtual=quizzSelecionado
    let selecionado = quizzSelecionado.id;
    numeroDoQuizz = selecionado.replace('quizz', '');
    document.querySelector('.responder-quizz').classList.remove('escondido');
    document.querySelector('main').classList.add('escondido');
    tela2.innerHTML =
        `<div class="quizz-banner">
            <img src="${quizzes[numeroDoQuizz].image}"/>
            <h2>${quizzes[numeroDoQuizz].title}</h2>
        <div>
    `;
    for (let i = 0; i < quizzes[numeroDoQuizz].questions.length; i++) {
        tela2.innerHTML +=
            `<div class="pergunta" id="pergunta${i}" style="background-color: ${quizzes[numeroDoQuizz].questions[i].color}">
            <span><h3>${quizzes[numeroDoQuizz].questions[i].title}</h3></span>
        </div>
        <div class="conteudo" id="conteudo${i}"> 
        </div>`;

        for (let j = 0; j < quizzes[numeroDoQuizz].questions[i].answers.length; j++) {
            document.querySelector(`#conteudo${i}`).innerHTML +=
                `<div class="perguntas" style="order: ${Math.floor(Math.random() * 11)}" onclick="selecionarResposta(this)" data-id="${quizzes[numeroDoQuizz].questions[i].answers[j].isCorrectAnswer}">
                <img src="${quizzes[numeroDoQuizz].questions[i].answers[j].image}"/>
                <p>
                ${quizzes[numeroDoQuizz].questions[i].answers[j].text}
                </p>
            </div>`;
        }
    }
    tela2.innerHTML +="<div class='resultado'></div>";
}

function selecionarResposta(selecao){
    let htmlArray=selecao.parentNode.children;
    let acerto=selecao.getAttribute('data-id');
    if(acerto==="true" || acerto==="false"){
        if(acerto==="true"){
        acertos += 1;
        selecao.style.filter="opacity(100%)";
    }
    for (let i=0;i<htmlArray.length;i++){
        marcarResposta(htmlArray[i]);
    }
    selecao.style.filter="opacity(100%)";
    tentativas += 1;
    setTimeout(()=>{window.scrollBy({
        top: 300,
        behavior : "smooth"
    })},2000)
    setTimeout(resultadoDoQuizz,2000);
    } 
}

function marcarResposta(selecao){
    let acerto=selecao.getAttribute('data-id')
    if(acerto==='true'){
        selecao.style.filter="opacity(50%)"
        selecao.style.color= "green";
        selecao.setAttribute('data-id','clicked');
    }else{
        selecao.style.filter="opacity(50%)"
        selecao.style.color="red"
        selecao.setAttribute('data-id','clicked'); 
    }
}

function resultadoDoQuizz(){
    let tela2Resultado=document.querySelector('.tela2 .resultado')
    if(tentativas===quizzes[numeroDoQuizz].questions.length){

        let percentagem = Math.round((acertos/tentativas)*100);
        let indiceN;
        for (let i=0; i < quizzes[numeroDoQuizz].levels.length; i++){
            if(quizzes[numeroDoQuizz].levels[i].minValue <= percentagem){
                indiceN=i
            }
        }

        tela2Resultado.innerHTML =
        `<div class="pergunta" id="resultadoQuizz" style="background-color: #EC362D">
            <span><h3>${percentagem}% de acerto: ${quizzes[numeroDoQuizz].levels[indiceN].title}</h3></span>
        </div>
        <div class="conteudo" id="conteudoResultado">
            <img src="${quizzes[numeroDoQuizz].levels[indiceN].image}"/>
            <p>${quizzes[numeroDoQuizz].levels[indiceN].text}</p> 
        </div>
        <div class="quizzFinalizado">
            <button id="reiniciarQuizz" onclick="reiniciarQuizz()"><p>Reiniciar quizz</p></button>
            <h4 onclick="voltarPraHome()">Voltar pra home</h4>
        </div>`
        ;

        setTimeout(()=>{window.scrollBy({
            top: 10000,
            behavior : "smooth"
        })},500)
    }
}

function reiniciarQuizz() {
    acertos=0;
    tentativas=0;
    window.scrollTo(0, 0);
    mostrarTela2(quizzAtual);
}
function acessarQuizz(){
    Renderizar();
    setTimeout(()=> {
        botaoCriarQuizz();
        voltarPraHome();
        mostrarTela2(document.querySelector('.seus-quizzes .conteudo').firstChild);
    },500)
}
function renderizarEVoltarParaAHome(){
    Renderizar();
    setTimeout(()=> {
        botaoCriarQuizz();
        voltarPraHome();
    },500)
}
function botaoCriarQuizz(){
    if(conteudoSeusQuizzes.innerHTML != ""){
        document.querySelector(".seus-quizzes").classList.remove("escondido");
        document.querySelector(".criar-quizz").classList.add("escondido");
    }
}

let meusQuizzesIds = JSON.parse(localStorage.getItem('meusQuizzesIds')) || [];
let meusQuizzesIdsSerializado;

/* -------------------------------------------------------------------------------------------- */

container = document.querySelector(".container");

/* ------------------------------- INICIA TELA 1 DO QUIZZ - INFORMAÇÕES BÁSICAS */
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

/* --------------------------------------------- INICIA TELA 2 DA CRIACAO - - PERGUNTAS */
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
                <div class="box-input textoPergunta"><input type="text" required placeholder="Texto da pergunta (min 20 caracteres)"></div> 
                <div class="box-input corPergunta"><input type="color" required placeholder="Cor de fundo da pergunta"></div>

                <h2>Resposta correta</h2>
                <div class="box-input respostaCorreta"><input type="text" required placeholder="Resposta correta (obrigatório)"></div>
                <div class="box-input urlRespostaCorreta"><input type="url" required placeholder="URL da imagem (obrigatório)"></div>

                <h2>Respostas incorretas</h2>
                <div class="box-input respostaIncorreta1"><input type="text" required placeholder="Resposta incorreta 1 (obrigatório)"></div>
                <div class="box-input urlRespostaIncorreta1"><input type="url" required placeholder="URL da imagem (obrigatório)"></div>
                <br>
                <div class="box-input respostaIncorreta2"><input type="text" placeholder="Resposta incorreta 2 (opcional)"></div>
                <div class="box-input urlRespostaIncorreta2"><input type="url" pattern="https?://.+"placeholder="URL da imagem (se campo acima foi preenchido)"></div>
                <br>
                <div class="box-input respostaIncorreta3"><input type="text" placeholder="Resposta incorreta 3 (opcional)"></div>
                <div class="box-input urlRespostaIncorreta3"><input type="url" placeholder="URL da imagem (se campo acima foi preenchido)"></div>
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
            alert("Tem alguma coisa errada. Dá uma conferida aí!");
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
        }

    arrayPerguntasCriadas.push(pergunta);
    }
   
    if (arrayPerguntasCriadas.length === divsPerguntas.length) {
        criarQuizz3()
    }
}

/* --------------------------------- INICIANDO TERCEIRA TELA DA CRIAÇÃO - NIVEIS --------------------------------- */
let arrayNiveisAbertas = [];
let arrayNiveisFechadas = [];

function criarQuizz3() {
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Agora, decida os níveis</h1>
        </div>
    </div>
    `
        for (let i=0; i<qtdNiveis; i++) {
            
        let nivelModelo = `
        <div class="nivelAberta escondido">
            <div class="criacaoConteudo">
                <h2>Nivel ${i+1}</h2>
                <div class="box-input tituloNivel"><input type="text" placeholder="Título do nível (min 10 caracteres)"></div>
                <div class="box-input porcentagemAcerto"><input type="number" placeholder="% de acerto mínima (numero de 0 a 100)"></div>
                <div class="box-input imagemNivel"><input type="url" placeholder="URL da imagem do nível"></div>
                <div class="box-input descricaoNivel"><input type="text" placeholder="Descrição do nível (min 30 caracteres)"></div>
            </div>
        </div>`
        let nivelModeloFechado = `
        <div class="nivelFechada">
            <div class="criacaoConteudoMini">
                <h2>Nivel ${i+1}</h2>
                <img src="img/editar.svg" onclick="editarnivel(this)">
            </div>
        </div>`

        arrayNiveisAbertas.push(`${nivelModelo}`);
        arrayNiveisFechadas.push(`${nivelModeloFechado}`);
        
        container.innerHTML += arrayNiveisAbertas[i];
        container.innerHTML += arrayNiveisFechadas[i];
        }

        document.querySelector(".nivelAberta").classList.remove("escondido");
        document.querySelector(".nivelFechada").classList.add("escondido");

        container.innerHTML += `<div class="botaoVermelho370" onclick="pegarValues3()">Finalizar Quizz</div>`;
}

function editarnivel(elemento) {
    let nivelAbertas = document.querySelectorAll(".nivelAberta");

    for (let i=0; i<nivelAbertas.length; i++) {
        nivelAbertas[i].classList.add("escondido");
    }
        

    let nivelFechadas = container.querySelectorAll(".nivelFechada");
    for (let i=0; i<nivelFechadas.length; i++) {
        nivelFechadas[i].classList.remove("escondido");
    }

   

    let elementoPai = elemento.parentNode;
    let elementoAvo = elementoPai.parentNode;


    let elementoAnterior = elementoAvo.previousElementSibling;

    elementoAvo.classList.add("escondido");

    elementoAnterior.classList.remove("escondido");

}

let arrayNiveisCriados = [];

function pegarValues3 () {
   
    let divsNiveis = container.querySelectorAll(".criacaoConteudo");
    let nivel = {};
    let verificaPorcentagem = 0;
    for (let i=0; i<divsNiveis.length; i++) {
        
        let tituloNivel = divsNiveis[i].querySelector(".tituloNivel input").value;
        let porcentagemAcertoString = divsNiveis[i].querySelector(".porcentagemAcerto input").value;
            let porcentagemAcerto = Number(porcentagemAcertoString);
        let imagemNivel = divsNiveis[i].querySelector(".imagemNivel input").value;
        let descricaoNivel = divsNiveis[i].querySelector(".descricaoNivel input").value;

        if ((imagemNivel.substring(0,4) !== "http") || (tituloNivel.length<10) || (descricaoNivel.length<30) || (porcentagemAcerto<0 || porcentagemAcerto>100)) {
            alert("Confere tudinho aí porque alguma coisa está errada!");
            arrayNiveisCriados = [];
            break
        } else {
            nivel = {
                title: tituloNivel,
                image: imagemNivel,
                text: descricaoNivel,
                minValue: porcentagemAcerto
            }
        }
        if (porcentagemAcerto === 0) {
            verificaPorcentagem = 1;
        }
        
        arrayNiveisCriados.push(nivel);
    }

    if ((arrayNiveisCriados.length === divsNiveis.length) && (verificaPorcentagem === 0)) {
        alert("É obrigatório que um dos níveis tenha a % mínima com o valor 0");
        arrayNiveisCriados = [];
    } else if ((arrayNiveisCriados.length === divsNiveis.length) && (verificaPorcentagem === 1)) {
       EnviarQuizz()
    }
}


function EnviarQuizz() {

    criandoQuizz = {
        title: tituloQuizz,
        image: imgQuizz,
        questions: arrayPerguntasCriadas,

        levels: arrayNiveisCriados
    }



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

 

 function criarQuizz4() {
    container.innerHTML = `
    <div class="criacaoQuizz">
    <div class="criacaoTitulo">
        <h1>Seu quizz está pronto!</h1>
    </div>

    <div class="criacaoConteudoFinal">
        <img src=${imgQuizz} alt="">
        <div class="gradiente"></div>
        <h1>${tituloQuizz}</h1>
    </div>
    <div class="botaoVermelho221" onclick="acessarQuizz()">Acessar Quizz</div>
    <div class="botaoVermelho221Branco" onclick="voltarprahome()">Voltar pra home</div>
</div>
    `
}

function voltarprahome() {
    window.location.reload();
}