// ==========================================================
// 1. MONITORAMENTO E DIRECIONAMENTO DO BOTÃO DE WHATSAPP (CTA)
// ==========================================================
const btnComecarAgora = document.getElementById('btn-comecar-agora');

if (btnComecarAgora) {
    btnComecarAgora.addEventListener('click', () => {
        const numeroWhats = "5585992826206"; // Telefone do Luís
        const mensagem = encodeURIComponent("Olá Luís, conheci seu site e gostaria de agendar uma mentoria para transformar minha vida financeira!");
        window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, '_blank');
    });
}

// ==========================================================
// 2. LÓGICA DAS 4 FERRAMENTAS FINANCEIRAS INTERATIVAS
// ==========================================================

// --- CALCULADORA DE JUROS COMPOSTOS ---
const btnJuros = document.getElementById('btn-juros');
if (btnJuros) {
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
                const montante = capital * Math.pow((1 + taxa), tempo);
                const jurosGanhos = montante - capital;

                resultado.innerHTML = `Total acumulado: R$ ${montante.toFixed(2)}<br><span style="font-size:0.85rem; color:#a7ffd5">Rendimento livre: R$ ${jurosGanhos.toFixed(2)}</span>`;
                resultado.style.display = 'block';
            } else {
                alert("Por favor, preencha todos os campos com valores válidos.");
            }
        }
    });
}

// --- SIMULADOR DE METAS ---
const btnMetas = document.getElementById('btn-metas');
if (btnMetas) {
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
}

// --- CONTROLE DE GASTOS ---
const btnGastos = document.getElementById('btn-gastos');
if (btnGastos) {
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
}

// --- DESAFIO 52 SEMANAS ---
const btnDesafio = document.getElementById('btn-desafio');
if (btnDesafio) {
    btnDesafio.addEventListener('click', () => {
        const form = document.getElementById('form-desafio');
        const resultado = document.getElementById('resultado-desafio');

        if (form.style.display === 'none') {
            form.style.display = 'block';
            btnDesafio.innerText = 'Ver Total do Desafio ➔';
        } else {
            const valorBase = parseFloat(document.getElementById('desafio-base').value);

            if (valorBase > 0) {
                const totalAcumulado = 1378 * valorBase;
                resultado.innerHTML = `No final de 1 ano você terá:<br>💰 R$ ${totalAcumulado.toFixed(2)} economizados!`;
                resultado.style.display = 'block';
            } else {
                alert("Por favor, digite um valor inicial válido (ex: 1, 2, 5).");
            }
        }
    });
}

// ==========================================================
// 3. SENSOR DE ANIMAÇÃO AO ROLAR A PÁGINA (SCROLL)
// ==========================================================
document.addEventListener("DOMContentLoaded", function () {
    const elementosParaAnimar = document.querySelectorAll('.efeito-flutuar');
    const configuracaoSensor = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sensorVisual = new IntersectionObserver(function (entradas, sensor) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                sensor.unobserve(entrada.target);
            }
        });
    }, configuracaoSensor);

    elementosParaAnimar.forEach(elemento => {
        sensorVisual.observe(elemento);
    });
});

// ==========================================================
// 4. DIAGNÓSTICO FINANCEIRO INTELIGENTE COM CHOQUE E PIZZA
// ==========================================================
const blocosPerguntas = document.querySelectorAll(".pergunta-bloco");
const divCarregando = document.getElementById("passo-carregando");
const divResultado = document.getElementById("passo-resultado");
const spanNumAtual = document.getElementById("pergunta-atual-numero");
const containerProgresso = document.querySelector(".quiz-progresso");

let pontosCategorias = {
    gastos: 0,      // Max: 12 pontos (4 perguntas)
    reserva: 0,     // Max: 9 pontos (3 perguntas)
    investimento: 0 // Max: 9 pontos (3 perguntas)
};
let totalPontosGlobal = 0;
let instanciaGrafico = null; // Guarda a referência do gráfico para limpá-lo se reiniciar

if (blocosPerguntas.length > 0) {
    // Garante que o carregador e resultados comecem estritamente escondidos no carregamento inicial da página
    if (divCarregando) divCarregando.style.display = "none";
    if (divResultado) divResultado.style.display = "none";

    blocosPerguntas.forEach((pergunta) => {
        const botoes = pergunta.querySelectorAll(".btn-opcao");
        botoes.forEach(botao => {
            botao.addEventListener("click", () => {
                const pontos = parseInt(botao.getAttribute("data-points"));
                const categoria = pergunta.getAttribute("data-categoria");

                // Soma pontuação na categoria correspondente
                pontosCategorias[categoria] += pontos;
                totalPontosGlobal += pontos;

                const stepAtual = parseInt(pergunta.getAttribute("data-step"));
                pergunta.style.display = "none"; // Esconde a atual

                const proximaPergunta = document.querySelector(`.pergunta-bloco[data-step="${stepAtual + 1}"]`);
                
                if (proximaPergunta) {
                    proximaPergunta.style.display = "block"; // Mostra a próxima
                    if (spanNumAtual) {
                        spanNumAtual.textContent = stepAtual + 1;
                    }
                } else {
                    // Final do diagnóstico! Oculta o contador e ativa o processamento
                    if (containerProgresso) containerProgresso.style.display = "none";
                    if (divCarregando) divCarregando.style.display = "block";

                    // Simula processamento da IA por 1.8 segundos
                    setTimeout(() => {
                        if (divCarregando) divCarregando.style.display = "none";
                        if (divResultado) divResultado.style.display = "block"; // Agora revela de verdade só aqui!

                        calcularEExibirResultado(totalPontosGlobal, pontosCategorias);
                    }, 1800);
                }
            });
        });
    });
}

function calcularEExibirResultado(pontosTotais, scores) {
    let perfil = "";
    let conselho = "";

    // ALGORITMO DE DISTRIBUIÇÃO REAL DO DINHEIRO (CONVERSÃO EM CHOQUE)
    // Gastos: Quanto menor o score, maior é a fatia engolida de gastos descontrolados (até 95%)
    let taxaGastos = 100 - ((scores.gastos - 4) * 5.6); 
    
    // Reserva: Relacionada diretamente com a proteção (de 0% a ~20%)
    let taxaReserva = (scores.reserva - 3) * 3.3; 
    
    // Investimento: Relacionada diretamente com poupar e planejar o futuro (de 0% a ~30%)
    let taxaInvestimento = (scores.investimento - 3) * 4.1; 

    // Ajuste matemático para garantir fechamento perfeito em 100%
    let somaTemporaria = taxaGastos + taxaReserva + taxaInvestimento;
    let percentualGastos = Math.round((taxaGastos / somaTemporaria) * 100);
    let percentualReserva = Math.round((taxaReserva / somaTemporaria) * 100);
    let percentualInvestimento = 100 - (percentualGastos + percentualReserva);

    // Lógica estruturada de conselhos por faixa de pontuação (10 a 30 pontos)
    if (pontosTotais <= 15) {
        perfil = "Diagnóstico: Escassez Crítica (Vivendo no Limite)";
        conselho = "Você se encontra na zona de sobrevivência imediata. O seu orçamento está quase 100% comprometido com o seu presente, sem nenhuma gordura de proteção e absolutamente zero preparo para as próximas décadas. É urgente aplicar o método do Luís para reestruturar suas contas, fechar as torneiras de gastos invisíveis e começar a construir seu amanhã.";
    } else if (pontosTotais <= 24) {
        perfil = "Diagnóstico: Instabilidade Estrutural (Estagnado)";
        conselho = "Você consegue empatar o jogo e raramente se endivida de forma grave, mas seu dinheiro patina sem sair do lugar. O gráfico mostra que sua reserva e seus investimentos ainda são fatias tímidas, deixando sua segurança vulnerável a qualquer reviravolta ou imprevisto. Você precisa de um método de retenção inteligente para expandir o seu amanhã.";
    } else {
        perfil = "Diagnóstico: Rota de Alta Performance Financeira";
        conselho = "Parabéns! Seus hábitos de contenção de gastos e preparo de segurança estão excelentes. O seu grande desafio agora não é economizar, mas sim a EXPANSÃO: potencializar essa fatia amarela de investimentos para que ela renda mais do que a inflação e reduza os anos necessários para a sua aposentadoria definitiva.";
    }

    const h2Resultado = document.getElementById("texto-resultado");
    const pConselho = document.getElementById("conselho-resultado");

    if (h2Resultado) h2Resultado.textContent = perfil;
    if (pConselho) pConselho.textContent = conselho;

    // CONSTRUÇÃO E RENDERIZAÇÃO DO GRÁFICO (CHART.JS)
    const ctx = document.getElementById('graficoPizza');
    if (ctx) {
        // Se já existir uma instância do gráfico criada anteriormente, destrói para evitar bugs visuais
        if (instanciaGrafico) {
            instanciaGrafico.destroy();
        }

        instanciaGrafico = new Chart(ctx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: [
                    `Gastos & Despesas (${percentualGastos}%)`, 
                    `Reserva de Emergência (${percentualReserva}%)`, 
                    `Investimentos (${percentualInvestimento}%)`
                ],
                datasets: [{
                    data: [percentualGastos, percentualReserva, percentualInvestimento],
                    backgroundColor: [
                        '#a31c1c',  // Vermelho escuro/alerta para gastos engolindo o orçamento
                        '#0b4d2a',  // Verde Old Money (Segurança)
                        '#f3b61f'   // Dourado do site (Futuro/Investimentos)
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f4f7f5',
                            font: {
                                family: 'Montserrat',
                                size: 11,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        });
    }
}

// Permite resetar e refazer o quiz
function reiniciarQuiz() {
    if (divResultado) divResultado.style.display = "none";
    if (divCarregando) divCarregando.style.display = "none";
    
    pontosCategorias = { gastos: 0, reserva: 0, investimento: 0 };
    totalPontosGlobal = 0;

    // Reseta visibilidade dos passos
    blocosPerguntas.forEach((p, index) => {
        if (index === 0) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });

    if (spanNumAtual) spanNumAtual.textContent = "1";
    if (containerProgresso) containerProgresso.style.display = "block";
}