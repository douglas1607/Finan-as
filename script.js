// ==========================================
// CONEXÃO DOS BOTÕES INICIAIS (CTA)
// ==========================================

// Configuração dos botões principais do topo do site
// ==========================================
// CONEXÃO DOS BOTÕES INICIAIS (CTA) - CORRIGIDO
// ==========================================

// Monitora diretamente o clique do botão de Começar Agora
const btnComecarAgora = document.getElementById('btn-comecar-agora');

if (btnComecarAgora)
    btnComecarAgora.addEventListener('click', () => {
        const numeroWhats = "5585992826206"; // Telefone do Luís
        const mensagem = encodeURIComponent("Olá Luís, conheci seu site e gostaria de agendar uma mentoria para transformar minha vida financeira!");
        window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, '_blank');
    });

// ==========================================
// LÓGICA DAS 4 FERRAMENTAS FINANCEIRAS
// ==========================================

// --- 1. CALCULADORA DE JUROS COMPOSTOS ---
const btnJuros = document.getElementById('btn-juros');
btnJuros.addEventListener('click', () => {
    const form = document.getElementById('form-juros');
    const resultado = document.getElementById('resultado-juros');

    if (form.style.display === 'none') {
        form.style.display = 'block';
        btnJuros.innerText = 'Calcular Resultado ➔';
    } else {
        const capital = parseFloat(document.getElementById('juros-capital').value);
        const taxa = parseFloat(document.getElementById('juros-taxa').value) / 100;
        const tempo = parseInt(document.getElementById('juros-tempo').value);

        if (capital > 0 && taxa >= 0 && tempo > 0) {
            // Fórmula dos Juros Compostos: M = C * (1 + i)^t
            const montante = capital * Math.pow((1 + taxa), tempo);
            const jurosGanhos = montante - capital;

            resultado.innerHTML = `Total acumulado: R$ ${montante.toFixed(2)}<br><span style="font-size:0.85rem; color:#a7ffd5">Rendimento livre: R$ ${jurosGanhos.toFixed(2)}</span>`;
            resultado.style.display = 'block';
        } else {
            alert("Por favor, preencha todos os campos com valores válidos.");
        }
    }
});

// --- 2. SIMULADOR DE METAS ---
const btnMetas = document.getElementById('btn-metas');
btnMetas.addEventListener('click', () => {
    const form = document.getElementById('form-metas');
    const resultado = document.getElementById('resultado-metas');

    if (form.style.display === 'none') {
        form.style.display = 'block';
        btnMetas.innerText = 'Simular Tempo ➔';
    } else {
        const valorMeta = parseFloat(document.getElementById('meta-valor').value);
        const poupancaMensal = parseFloat(document.getElementById('meta-poupanca').value);

        if (valorMeta > 0 && poupancaMensal > 0) {
            const mesesNecessarios = Math.ceil(valorMeta / poupancaMensal);
            const anos = Math.floor(mesesNecessarios / 12);
            const mesesRestantes = mesesNecessarios % 12;

            let textoTempo = `${mesesNecessarios} meses`;
            if (anos > 0) {
                textoTempo = `${anos} ano(s) e ${mesesRestantes} mês(es)`;
            }

            resultado.innerHTML = `Você alcançará seu objetivo em:<br>🎯 ${textoTempo}!`;
            resultado.style.display = 'block';
        } else {
            alert("Por favor, preencha todos os campos com valores válidos.");
        }
    }
});

// --- 3. CONTROLE DE GASTOS (REGRA 50/30/20) ---
const btnGastos = document.getElementById('btn-gastos');
btnGastos.addEventListener('click', () => {
    const form = document.getElementById('form-gastos');
    const resultado = document.getElementById('resultado-gastos');

    if (form.style.display === 'none') {
        form.style.display = 'block';
        btnGastos.innerText = 'Analisar Orçamento ➔';
    } else {
        const renda = parseFloat(document.getElementById('gastos-renda').value);
        const despesas = parseFloat(document.getElementById('gastos-despesas').value);

        if (renda > 0 && despesas >= 0) {
            const sobra = renda - despesas;
            const percentualGasto = (despesas / renda) * 100;

            if (sobra < 0) {
                resultado.innerHTML = `⚠️ Orçamento no Vermelho!<br>Você está gastando R$ ${Math.abs(sobra).toFixed(2)} a mais do que ganha.`;
            } else {
                resultado.innerHTML = `Sobra para investimentos: R$ ${sobra.toFixed(2)}<br><span style="font-size:0.85rem; color:#a7ffd5">Você comprometeu ${percentualGasto.toFixed(0)}% da renda.</span>`;
            }
            resultado.style.display = 'block';
        } else {
            alert("Por favor, informe a sua renda corretamente.");
        }
    }
});

// --- 4. DESAFIO DE DINHEIRO 52 SEMANAS ---
const btnDesafio = document.getElementById('btn-desafio');
btnDesafio.addEventListener('click', () => {
    const form = document.getElementById('form-desafio');
    const resultado = document.getElementById('resultado-desafio');

    if (form.style.display === 'none') {
        form.style.display = 'block';
        btnDesafio.innerText = 'Ver Total do Desafio ➔';
    } else {
        const valorBase = parseFloat(document.getElementById('desafio-base').value);

        if (valorBase > 0) {
            // A soma de 1 a 52 é dada pela fórmula matemática: (52 * 53) / 2 = 1378
            // Multiplicamos o resultado da soma pelo valor base escolhido
            const totalAcumulado = 1378 * valorBase;

            resultado.innerHTML = `No final de 1 ano você terá:<br>💰 R$ ${totalAcumulado.toFixed(2)} economizados!`;
            resultado.style.display = 'block';
        } else {
            alert("Por favor, digite um valor inicial válido (ex: 1, 2, 5).");
        }
    }
})
// ==========================================================
// JAVASCRIPT - SISTEMA DE ABAS DA SEÇÃO INTERATIVA
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    // 1. Pegamos todos os botões das abas e todos os blocos de conteúdo
    const botoesAba = document.querySelectorAll(".botao-aba"); // Altere para a classe real dos seus botões se for diferente
    const blocosConteudo = document.querySelectorAll(".conteudo-ferramenta"); // Altere para a classe real dos seus blocos

    // Se não encontrar os botões na página (como na página Sobre), o código para aqui e não dá erro
    if (botoesAba.length === 0) return;

    // 2. Criamos a função que vai mudar as ferramentas
    botoesAba.forEach(botao => {
        botao.addEventListener("click", function () {
            // Remove a classe 'ativo' de todos os botões para "apagar" o destaque
            botoesAba.forEach(btn => btn.classList.remove("ativo"));

            // Remove a classe 'ativo' de todos os conteúdos para escondê-los
            blocosConteudo.forEach(conteudo => conteudo.classList.remove("ativo"));

            // Adiciona a classe 'ativo' apenas no botão que foi clicado
            this.classList.add("ativo");

            // Pega o ID do conteúdo que a gente quer mostrar (guardado no data-aba do botão)
            const idAbaAlvo = this.getAttribute("data-aba");
            const conteudoAlvo = document.getElementById(idAbaAlvo);

            // Mostra o conteúdo correspondente adicionando a classe 'ativo'
            if (conteudoAlvo) {
                conteudoAlvo.classList.add("ativo");
            }
        });
    });
});
// ==========================================================
// JAVASCRIPT - SENSOR DE ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL)
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    // Pegamos todos os elementos que vão ganhar o efeito de flutuar
    const elementosParaAnimar = document.querySelectorAll('.efeito-flutuar');

    // Configuração do "sensor"
    const configuracaoSensor = {
        root: null, // Usa a própria tela do navegador como referência
        threshold: 0.15, // O efeito ativa quando 15% do elemento aparecer na tela
        rootMargin: "0px 0px -50px 0px" // Ativa um pouquinho antes de chegar para dar tempo de ver
    };

    // Criamos o sensor que monitora a tela
    const sensorVisual = new IntersectionObserver(function (entradas, sensor) {
        entradas.forEach(entrada => {
            // Se o elemento apareceu na tela do usuário...
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel'); // Adiciona a classe que faz flutuar
                sensor.unobserve(entrada.target); // Para de monitorar esse elemento (roda a animação só uma vez)
            }
        });
    }, configuracaoSensor);

    // Ativa o sensor em cada um dos elementos selecionados
    elementosParaAnimar.forEach(elemento => {
        sensorVisual.observe(elemento);
    });
});
// ==========================================
// ENGINE DO DIAGNÓSTICO FINANCEIRO INTELIGENTE
// ==========================================

// Objeto global para armazenar as respostas coletadas
let respostasUsuario = {
    passo1: '',
    passo2: '',
    passo3: ''
};

// Avança as telas do formulário
function proximoPasso(passoAtual, opcaoEscolhida) {
    // Guarda a resposta do passo anterior
    respostasUsuario[`passo${passoAtual}`] = opcaoEscolhida;

    // Remove a classe ativa do passo atual e joga no próximo
    document.getElementById(`passo-${passoAtual}`).classList.remove('ativa');
    document.getElementById(`passo-${passoAtual + 1}`).classList.add('ativa');
}

// Finaliza o quiz, ativa a tela de carregamento e calcula o diagnóstico da IA
function finalizarQuiz(opcaoEscolhida) {
    respostasUsuario.passo3 = opcaoEscolhida;

    // Esconde o passo 3 e mostra a animação de carregamento da IA
    document.getElementById('passo-3').classList.remove('ativa');
    document.getElementById('passo-carregando').classList.add('ativa');

    // Simula o tempo de resposta da IA (1.8 segundos)
    setTimeout(() => {
        document.getElementById('passo-carregando').classList.remove('ativa');

        // Gera o texto personalizado com base no perfil mapeado
        const textoDiagnostico = calcularResultadoIA(respostasUsuario);
        document.getElementById('resposta-ia-texto').innerHTML = textoDiagnostico;

        // Mostra a tela final com o resultado
        document.getElementById('passo-resultado').classList.add('ativa');
    }, 1800);
}

// Lógica de mapeamento de perfis baseada nos pilares do site
function calcularResultadoIA(dados) {
    // Caso Crítico: Não sobra nada, sem reserva e foco em pagar contas (Perfil Pilar 1 - HAJA)
    if (dados.passo1 === 'C' && dados.passo2 === 'C') {
        return `<p><strong>Diagnóstico da IA:</strong> Você se encontra atualmente no nível de <strong>Inércia Crítica</strong>. Sua vida financeira está operando no modo de sobrevivência, onde qualquer imprevisto pode desestabilizar completamente sua realidade.</p>
                <p>O maior erro aqui não é a falta de dinheiro, mas a falta de uma postura de comando. O seu pilar imediato é o <strong>PILAR 1 - HAJA</strong>. Você precisa quebrar essa inércia, organizar seus números iniciais e tomar a decisão de agir antes que o tempo passe.</p>`;
    }

    // Caso Desorganizado: Sobra um pouco mas fica na poupança ou sem rumo (Perfil Pilar 2 - REGAR)
    if (dados.passo1 === 'B' || dados.passo3 === 'B') {
        return `<p><strong>Diagnóstico da IA:</strong> Seu perfil indica um estado de <strong>Estagnação por Desorganização</strong>. Você até consegue gerar recursos e tem boas intenções, mas seu dinheiro está escorrendo por vazamentos invisíveis ou perdendo valor na poupança.</p>
                <p>Falta clareza de destino para cada real faturado. O seu pilar recomendado é o <strong>PILAR 2 - REGAR</strong>. É hora de focar na manutenção e gestão ativa, criando um orçamento estratégico para fazer o dinheiro trabalhar pelos seus objetivos reais.</p>`;
    }

    // Caso Vulnerável: Ganha bem, mas não tem proteção/blindagem (Perfil Pilar 3 - ESPADA)
    if (dados.passo1 === 'A' && dados.passo2 === 'B') {
        return `<p><strong>Diagnóstico da IA:</strong> Você tem uma ótima capacidade de geração, mas está em um estado de <strong>Vulnerabilidade Estratégica</strong>. Construir patrimônio sem blindagem é como tentar encher um balde furado.</p>
                <p>Seu foco principal agora deve ser o <strong>PILAR 3 - ESPADA</strong>. Você precisa urgentemente focar na segurança, estruturar sua reserva de emergência ideal e proteger seus ativos contra riscos externos para garantir um crescimento sustentável.</p>`;
    }

    // Perfil Avançado: Pronto para expandir (Perfil Pilar 4 - EXPANSÃO)
    return `<p><strong>Diagnóstico da IA:</strong> Parabéns! Você já possui hábitos saudáveis de controle e proteção financeira. Seu perfil foi identificado como pronto para o nível de <strong>Escala e Multiplicação</strong>.</p>
            <p>Seu direcionamento estratégico está no <strong>PILAR 4 - EXPANSÃO</strong>. O seu foco agora deve ser aprender a diversificar investimentos com inteligência, expandir suas fontes de receita e focar na construção de um patrimônio duradouro que crie um verdadeiro legado.</p>`;
}

// Permite o usuário resetar o quiz e fazer de novo
function reiniciarQuiz() {
    document.getElementById('passo-resultado').classList.remove('ativa');
    respostasUsuario = { passo1: '', passo2: '', passo3: '' };
    document.getElementById('passo-1').classList.add('ativa');
}