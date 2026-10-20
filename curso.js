// Armazena a lista de módulos já desbloqueados (Módulo 1 liberado inicialmente)
let modulosDesbloqueados = [1];

// ==========================================
// 1. NAVEGAÇÃO E SISTEMA DE TRAVA
// ==========================================
function mudarModulo(numeroModulo) {
    // Bloqueia caso o aluno tente pular módulos
    if (!modulosDesbloqueados.includes(numeroModulo)) {
        alert("🔒 Módulo bloqueado! Responda e valide o módulo anterior para liberá-lo.");
        return;
    }

    // Esconde painéis inativos
    const todosPaineis = document.querySelectorAll('.painel-modulo-futurista');
    todosPaineis.forEach(painel => {
        painel.style.display = 'none';
        painel.classList.remove('ativo');
    });

    // Atualiza marcação ativa na sidebar
    const todosItensMenu = document.querySelectorAll('.item-modulo-futurista');
    todosItensMenu.forEach(item => item.classList.remove('ativo'));

    // Exibe o módulo desejado
    const moduloAlvo = document.getElementById(`modulo-${numeroModulo}`);
    if (moduloAlvo) {
        moduloAlvo.style.display = 'block';
        moduloAlvo.classList.add('ativo');
    }

    if (todosItensMenu[numeroModulo - 1]) {
        todosItensMenu[numeroModulo - 1].classList.add('ativo');
    }

    atualizarProgresso(numeroModulo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function atualizarProgresso(numModulo) {
    const porcentagem = Math.round((numModulo / 10) * 100);
    const barra = document.getElementById('barra-progresso');
    const texto = document.getElementById('progresso-texto');

    if (barra && texto) {
        barra.style.width = `${porcentagem}%`;
        texto.innerText = `${porcentagem}% CONCLUÍDO`;
    }
}

// ==========================================
// 2. CORREÇÃO E EXIBIÇÃO DE GABARITO INLINE
// ==========================================
function corrigirQuiz(numModulo) {
    const blocoQuiz = document.getElementById(`quiz-mod-${numModulo}`);
    if (!blocoQuiz) return;

    const perguntas = blocoQuiz.querySelectorAll('.pergunta-card-tech');
    let todasRespondidas = true;
    let acertos = 0;

    // Etapa 1: Garante preenchimento completo antes de avaliar
    perguntas.forEach((pergunta) => {
        const inputTexto = pergunta.querySelector('.input-tech');
        const radioSelecionado = pergunta.querySelector('input[type="radio"]:checked');

        let resposta = "";
        if (inputTexto) resposta = inputTexto.value.trim();
        else if (radioSelecionado) resposta = radioSelecionado.value.trim();

        if (resposta === "") {
            todasRespondidas = false;
        }
    });

    if (!todasRespondidas) {
        alert("⚠️ Por favor, responda a todas as questões antes de validar o módulo!");
        return;
    }

    // Etapa 2: Avaliação individual com resposta oficial inline
    perguntas.forEach((pergunta) => {
        const respostasValidas = pergunta.getAttribute('data-resposta').toLowerCase().split(',').map(r => r.trim());
        const respostaOficialFormatada = pergunta.getAttribute('data-gabarito-oficial') || respostasValidas[0].toUpperCase();

        const inputTexto = pergunta.querySelector('.input-tech');
        const radioSelecionado = pergunta.querySelector('input[type="radio"]:checked');

        let respostaUsuario = "";
        if (inputTexto) respostaUsuario = inputTexto.value.toLowerCase().trim();
        else if (radioSelecionado) respostaUsuario = radioSelecionado.value.toLowerCase().trim();

        let acertou = respostasValidas.some(p => respostaUsuario.includes(p));

        // Cria/Atualiza tag de Gabarito Inline
        let tagGabarito = pergunta.querySelector('.gabarito-inline');
        if (!tagGabarito) {
            tagGabarito = document.createElement('div');
            tagGabarito.className = 'gabarito-inline';
            pergunta.appendChild(tagGabarito);
        }

        if (acertou) {
            acertos++;
            pergunta.style.borderColor = "#00ff88";
            tagGabarito.innerHTML = `<span style="color:#00ff88; font-weight:700;"><i class="fa-solid fa-check"></i> Correto!</span> (Gabarito oficial: <strong>${respostaOficialFormatada}</strong>)`;
        } else {
            pergunta.style.borderColor = "#ff5555";
            tagGabarito.innerHTML = `<span style="color:#ff5555; font-weight:700;"><i class="fa-solid fa-xmark"></i> Incorreto.</span> (Sua resposta: "${respostaUsuario}" | Gabarito oficial: <strong style="color:#00ff88;">${respostaOficialFormatada}</strong>)`;
        }
    });

    // Etapa 3: Libera próximo módulo na trilha
    const proximoModulo = numModulo + 1;
    if (proximoModulo <= 10 && !modulosDesbloqueados.includes(proximoModulo)) {
        modulosDesbloqueados.push(proximoModulo);

        const listaMenu = document.querySelectorAll('.item-modulo-futurista');
        if (listaMenu[proximoModulo - 1]) {
            const modStatus = listaMenu[proximoModulo - 1].querySelector('.mod-status');
            if (modStatus) {
                modStatus.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
            }
            listaMenu[proximoModulo - 1].classList.remove('bloqueado');
        }
    }

    // Resultado final do módulo
    const divResultado = document.getElementById(`resultado-${numModulo}`);
    if (divResultado) {
        divResultado.style.display = 'block';
        divResultado.style.padding = '15px';
        divResultado.style.marginTop = '18px';
        divResultado.style.borderRadius = '8px';
        divResultado.style.background = 'rgba(0, 255, 136, 0.1)';
        divResultado.style.border = '1px solid #00ff88';
        divResultado.style.color = '#ffffff';
        divResultado.innerHTML = `🎉 <strong>Módulo ${numModulo} Validado!</strong> Você acertou ${acertos} de ${perguntas.length} questões. ${proximoModulo <= 10 ? 'O Módulo ' + proximoModulo + ' foi liberado na lista!' : 'Parabéns por concluir todo o curso!'}`;
    }
}