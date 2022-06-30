container = document.querySelector(".container");

function criarQuizz1() {
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Comece pelo começo</h1>
        </div>

        <div class="criacaoConteudo">
            <div class="box-input" ><input placeholder="Título do seu quizz"></input></div>
            <div class="box-input"><input placeholder="URL da imagem do seu quizz"></input></div>
            <div class="box-input"><input placeholder="Quantidade de perguntas do quizz"></input></div>
            <div class="box-input"><input placeholder="Quantidade de níveis do quizz"></input></div>
        </div>

        <div class="botaoVermelho370" onclick="criarQuizz2()">Prosseguir pra criar perguntas</div>
    </div> 
    `
}

function criarQuizz2() {
    container.innerHTML = `
    <div class="criacaoQuizz">
        <div class="criacaoTitulo">
            <h1>Crie suas perguntas</h1>
        </div>

        <div class="criacaoConteudo">
            <h2>Pergunta 1</h2>
            <div class="box-input" ><input placeholder="Texto da pergunta"></input></div>
            <div class="box-input"><input placeholder="Cor de fundo da pergunta"></input></div>

            <h2>Resposta correta</h2>
            <div class="box-input"><input placeholder="Resposta correta"></input></div>
            <div class="box-input"><input placeholder="URL da imagem"></input></div>

            <h2>Respostas incorretas</h2>
            <div class="box-input"><input placeholder="Resposta incorreta 1"></input></div>
            <div class="box-input"><input placeholder="URL da imagem 1"></input></div>
            <br>
            <div class="box-input"><input placeholder="Resposta incorreta 2"></input></div>
            <div class="box-input"><input placeholder="URL da imagem 2"></input></div>
            <br>
            <div class="box-input"><input placeholder="Resposta incorreta 3"></input></div>
            <div class="box-input"><input placeholder="URL da imagem 3"></input></div>
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
    container.innerHTML = `
    <div class="criacaoQuizz">
    <div class="criacaoTitulo">
        <h1>Agora, decida os níveis</h1>
    </div>

    <div class="criacaoConteudo">
        <h2>Nível 1</h2>
        <div class="box-input" ><input placeholder="Título do nível"></input></div>
        <div class="box-input"><input placeholder="% de acerto mínima"></input></div>
        <div class="box-input"><input placeholder="URL da imagem do nível"></input></div>
        <div class="box-input"><input placeholder="Descrição do nível"></input></div>
    </div>
    <div class="criacaoConteudoMini">
        <h2>Nível 2</h2>
        <img src="img/editar.svg" alt="">
    </div>

    <div class="criacaoConteudoMini">
        <h2>Nível 3</h2>
        <img src="img/editar.svg" alt="">
    </div>

    <div class="botaoVermelho370" onclick="criarQuizz4()">Finalizar Quizz</div>
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

function voltarprahome() {
    window.location.reload();
}