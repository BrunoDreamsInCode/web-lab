// ====== PEGANDO OS ELEMENTOS ====== //
const form = document.getElementById('imc-form');
const alturaInput = document.getElementById('altura');
const pesoInput = document.getElementById('peso');
const resultado = document.getElementById('resultado'); 

// ====== MAPEANDO ÍCONES E CORES ====== //
const iconesIMC = {
    'magreza': '../../assets/icons/imc/1-magro.png',
    'normal': '../../assets/icons/imc/2-normal.png',
    'sobrepeso': '../../assets/icons/imc/3-sobrepeso.png',
    'obesidadei': '../../assets/icons/imc/4-obesidadeI.png',
    'obesidadeii': '../../assets/icons/imc/5-obesidadeII.png'
};

const coresIMC = {
    'magreza': '#FFA726',
    'normal': '#4CAF50',
    'sobrepeso': '#FFEB3B',
    'obesidadei': '#FF7043',
    'obesidadeii': '#EF5350'
};

// ====== MENSAGENS POR CLASSIFICAÇÃO ====== //
const mensagensIMC = {
    'magreza': {
        titulo: 'Abaixo do peso',
        mensagem: 'Procure um nutricionista para ganhar peso de forma saudável! 🥗',
        dica: 'Alimentação equilibrada é fundamental para ganhar peso com saúde.'
    },
    'normal': {
        titulo: 'Peso normal',
        mensagem: 'Parabéns! Seu peso está dentro da faixa considerada saudável. 🎉',
        dica: 'Continue mantendo hábitos saudáveis! A chave é a consistência.'
    },
    'sobrepeso': {
        titulo: 'Sobrepeso',
        mensagem: 'Considere uma reeducação alimentar e prática de exercícios físicos. 🏃',
        dica: 'Pequenas mudanças no dia a dia fazem grande diferença!'
    },
    'obesidadei': {
        titulo: 'Obesidade Grau I',
        mensagem: 'Procure orientação médica para controle de peso. 🩺',
        dica: 'Com acompanhamento profissional, você pode alcançar seus objetivos!'
    },
    'obesidadeii': {
        titulo: 'Obesidade Grau II',
        mensagem: 'Acompanhamento médico é essencial para sua saúde! 🏥',
        dica: 'Busque ajuda profissional. Sua saúde é prioridade! 💙'  // ← CORRIGIDO
    }
};
// ====== FUNÇÃO PARA CALCULAR POSIÇÃO ====== //
function calcularPosicaoSlidebar(imc) {
    const min = 10;
    const max = 50;
    const imcLimitado = Math.max(min, Math.min(max, imc));
    return ((imcLimitado - min) / (max - min)) * 100;
}

// ====== OUVINDO O SUBMIT ====== //
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // ====== COLETANDO OS DADOS ====== //
    const altura = Number(alturaInput.value) / 100;
    const peso = Number(pesoInput.value);

    // ====== CÁLCULO DO IMC ====== //
    const imcCalculado = peso / altura ** 2;
    const imcExibido = imcCalculado.toFixed(1);

    // ====== CALCULAR NÍVEL DE IMC ====== //
    let classificacaoIMC = "nulo";
    if (imcCalculado < 18.5) {
        classificacaoIMC = "Magreza";
    } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
        classificacaoIMC = "Normal";
    } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
        classificacaoIMC = "Sobrepeso";
    } else if (imcCalculado >= 30 && imcCalculado <= 34.9) {
        classificacaoIMC = "Obesidade I";
    } else if (imcCalculado >= 35) {
        classificacaoIMC = "Obesidade II";
    }

    // ====== PEGAR COR, ÍCONE E MENSAGEM ====== //
    const chave = classificacaoIMC.toLowerCase().replace(' ', ''); // "obesidadei"
    const cor = coresIMC[chave] || '#2C3E50';
    const icone = iconesIMC[chave] || '';
    const info = mensagensIMC[chave] || mensagensIMC['normal'];

    // ====== CALCULAR POSIÇÃO DO INDICADOR ====== //
    const posicao = calcularPosicaoSlidebar(imcCalculado);

    // ====== DEBUG (remova depois) ====== //
    console.log('📊 DEBUG:');
    console.log('classificacaoIMC:', classificacaoIMC);
    console.log('chave:', chave);
    console.log('info:', info);
    console.log('info.dica:', info.dica);

    // ====== RETORNO PARA O HTML ====== //
    resultado.innerHTML = `
        <div class="result-card" style="background: ${cor}08; border-color: ${cor}; border: 2px solid;">
            <!-- ÍCONE -->
            <div class="icon-wrapper" style="background: ${cor}20; border-radius: 50%; padding: 20px; display: inline-block;">
                <img 
                    src="${icone}" 
                    alt="${classificacaoIMC}"
                    class="imc-icon"
                    style="width: 80px; height: 80px;"
                >
            </div>
            
            <!-- CLASSIFICAÇÃO -->
            <div class="imc-classification" style="background: ${cor}; color: white;">
                ${info.titulo}
            </div>
            
            <!-- IMC -->
            <div class="imc-value" style="color: ${cor};">
                ${imcExibido}
            </div>
            
            <!-- MENSAGEM -->
            <div class="imc-message">
                ${info.mensagem}
            </div>
            
            <!-- SLIDEBAR -->
            <div class="imc-slider-container">
                <div class="imc-slider">
                    <div class="imc-slider-segment segment-magreza"></div>
                    <div class="imc-slider-segment segment-normal"></div>
                    <div class="imc-slider-segment segment-sobrepeso"></div>
                    <div class="imc-slider-segment segment-obesidadei"></div>
                    <div class="imc-slider-segment segment-obesidadeii"></div>
                    
                    <div class="imc-indicator" style="left: ${posicao}%;">
                        <div class="imc-indicator-line" style="background: ${cor};"></div>
                    </div>
                </div>
                
                <div class="imc-slider-markers">
                    <div class="marker">
                        <span class="value">10</span>
                        <span>Magreza</span>
                    </div>
                    <div class="marker">
                        <span class="value">18.5</span>
                        <span>Normal</span>
                    </div>
                    <div class="marker">
                        <span class="value">24.9</span>
                        <span>Sobrepeso</span>
                    </div>
                    <div class="marker">
                        <span class="value">29.9</span>
                        <span>Obs. I</span>
                    </div>
                    <div class="marker">
                        <span class="value">34.9</span>
                        <span>Obs. II</span>
                    </div>
                    <div class="marker">
                        <span class="value">50</span>
                        <span></span>
                    </div>
                </div>
                
                <div class="imc-current-label">
                    <span class="highlight" style="color: ${cor};">${imcExibido}</span> — 
                    <span style="color: ${cor}; font-weight: 700;">${info.titulo}</span>
                </div>
            </div>
            
            <!-- DICA -->
            <div class="imc-tip">
                <h4>💡 Continue assim!</h4>
                <p>${info.dica}</p>
            </div>
        </div>
    `;
});

// ====== BOTÃO LIMPAR ====== //
document.getElementById('limparBtn').addEventListener('click', function() {
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('resultado').innerHTML = `
        <div class="result-placeholder">
            <div class="placeholder-icon">📊</div>
            <p>Aguardando dados...</p>
            <span>Preencha seus dados e clique em "Calcular IMC"</span>
        </div>
    `;
});