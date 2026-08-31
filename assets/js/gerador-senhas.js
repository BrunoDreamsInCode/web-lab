// ========== GERADOR DE SENHAS - VERSÃO FINAL ==========

(function() {
    'use strict';

    // ===== CONSTANTES =====
    const CONFIG = {
        MIN_LENGTH: 4,
        MAX_LENGTH: 30,          // 🔥 LIMITE MÁXIMO = 30
        DEFAULT_LENGTH: 16
    };

    const CHARS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%&*+-=<>?'
    };

    const SIMILAR_CHARS = 'O0oIl1';

    const STRENGTH_MESSAGES = {
        strong: ['🛡️ Senha fortíssima!', '🔒 Impenetrável!', '💪 Poderosa!', '🏦 Cofre seguro!'],
        good: ['✅ Boa senha!', '🔐 Segura!', '👍 Confiável!'],
        fair: ['📈 Pode melhorar', '⚖️ Média segurança', '🔧 Aumente os caracteres'],
        weak: ['⚠️ Senha fraca!', '📏 Muito curta!', '🚨 Risco!']
    };

    // ===== EASTER EGG: Mensagens ultra seguras =====
    const ULTRA_SECURE_MESSAGES = [
        '🔥 MODO ULTRA SEGURO ATIVADO!',
        '🦸‍♂️ Nem o Batman quebra essa!',
        '🔐 Mais seguro que o cofre do Banco Central!',
        '💀 Até o NSA teria trabalho com essa!',
        '🚀 Essa senha foi para a NASA!',
        '🛡️ Escudo impenetrável ativado!',
        '⚡ 30 caracteres de pura segurança!',
        '🏆 Você atingiu o nível máximo de segurança!',
        '🔒 Lockdown total ativado!',
        '💎 Senha nível diamante!',
        '🎯 Alvo: segurança máxima!',
        '🛸 Essa senha é de outro mundo!',
        '🧠 Gênio da segurança!',
        '🔥 Modo Deus da Segurança ativado!',
        '🔐 Até o Edward Snowden aprovaria essa!',
        '⚡ Over 9000 de segurança!',
        '🦄 Senha lendária!',
        '🏅 Nível máximo atingido!',
        '💥 Poder absoluto da segurança!',
        '🎆 Show de segurança!'
    ];

    // ===== DOM ELEMENTS =====
    const DOM = {
        password: document.getElementById('password'),
        generateBtn: document.getElementById('generateBtn'),
        copyBtn: document.getElementById('copyBtn'),
        resetBtn: document.getElementById('resetBtn'),
        lengthSlider: document.getElementById('length'),
        lengthValue: document.getElementById('lengthValue'),
        strengthFill: document.getElementById('strengthFill'),
        strengthText: document.getElementById('strengthText'),
        funMessage: document.getElementById('funMessage'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        symbols: document.getElementById('symbols'),
        avoidSimilar: document.getElementById('avoidSimilar'),
        guaranteeTypes: document.getElementById('guaranteeTypes')
    };

    // ===== VALIDAÇÕES =====
    function validateElements() {
        const missing = Object.entries(DOM)
            .filter(([key, element]) => !element)
            .map(([key]) => key);

        if (missing.length > 0) {
            console.error('Elementos DOM não encontrados:', missing.join(', '));
            return false;
        }
        return true;
    }

    // ===== FUNÇÕES DE CARACTERES =====
    function getAvailableChars() {
        let chars = '';

        if (DOM.uppercase.checked) chars += CHARS.uppercase;
        if (DOM.lowercase.checked) chars += CHARS.lowercase;
        if (DOM.numbers.checked) chars += CHARS.numbers;
        if (DOM.symbols.checked) chars += CHARS.symbols;

        if (DOM.avoidSimilar.checked) {
            chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
        }

        return chars;
    }

    function getActiveTypes() {
        const types = [];
        if (DOM.uppercase.checked) types.push(CHARS.uppercase);
        if (DOM.lowercase.checked) types.push(CHARS.lowercase);
        if (DOM.numbers.checked) types.push(CHARS.numbers);
        if (DOM.symbols.checked) types.push(CHARS.symbols);
        return types;
    }

    function hasAtLeastOneType() {
        return DOM.uppercase.checked || 
               DOM.lowercase.checked || 
               DOM.numbers.checked || 
               DOM.symbols.checked;
    }

    // ===== FUNÇÃO PRINCIPAL: GERAR SENHA =====
    function generatePassword() {
        if (!hasAtLeastOneType()) {
            DOM.password.value = '⚠️ Selecione um tipo';
            return '';
        }

        const length = Math.min(
            parseInt(DOM.lengthSlider.value) || CONFIG.DEFAULT_LENGTH,
            CONFIG.MAX_LENGTH
        );
        
        const chars = getAvailableChars();
        const types = getActiveTypes();
        const guarantee = DOM.guaranteeTypes.checked;

        let password = '';

        if (guarantee && types.length > 0) {
            for (const type of types) {
                const typeChars = type.split('');
                const randomIndex = Math.floor(Math.random() * typeChars.length);
                password += typeChars[randomIndex];
            }
        }

        const charsArray = chars.split('');
        while (password.length < length) {
            const randomIndex = Math.floor(Math.random() * charsArray.length);
            password += charsArray[randomIndex];
        }

        password = password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('')
            .substring(0, length);

        return password;
    }

    // ===== CÁLCULO DE FORÇA =====
    function calculateStrength(password) {
        if (!password) {
            return getEmptyStrength();
        }

        const length = password.length;
        const poolSize = getAvailableChars().length || 1;
        const entropy = length * Math.log2(poolSize);

        return getStrengthByEntropy(entropy);
    }

    function getEmptyStrength() {
        return {
            entropy: 0,
            strength: 'none',
            strengthLabel: '—',
            crackTime: '—'
        };
    }

    function getStrengthByEntropy(entropy) {
        if (entropy >= 80) {
            return { entropy: Math.round(entropy), strength: 'strong', strengthLabel: 'Forte', crackTime: '> 1000 anos' };
        } else if (entropy >= 60) {
            return { entropy: Math.round(entropy), strength: 'good', strengthLabel: 'Boa', crackTime: '~ 50 anos' };
        } else if (entropy >= 40) {
            return { entropy: Math.round(entropy), strength: 'fair', strengthLabel: 'Média', crackTime: '~ 1 dia' };
        } else if (entropy >= 30) {
            return { entropy: Math.round(entropy), strength: 'weak', strengthLabel: 'Fraca', crackTime: '~ 1 hora' };
        } else {
            return { entropy: Math.round(entropy) || 0, strength: 'weak', strengthLabel: 'Fraca', crackTime: 'Instantes' };
        }
    }

    // ==========================================================
    // 🎯 EASTER EGG - MODO ULTRA SEGURO
    // ==========================================================
    function isUltraSecureMode() {
        // 1. TODAS as 4 flags marcadas
        const allTypesChecked = 
            DOM.uppercase.checked &&
            DOM.lowercase.checked &&
            DOM.numbers.checked &&
            DOM.symbols.checked;

        // 2. Tamanho MÁXIMO (30 caracteres)
        const length = parseInt(DOM.lengthSlider.value);
        const isMaxLength = length === CONFIG.MAX_LENGTH;

        // 3. Opções extras de segurança
        const avoidSimilar = DOM.avoidSimilar.checked;
        const guarantee = DOM.guaranteeTypes.checked;

        console.log('🎯 Easter Egg Check:', {
            allTypesChecked,
            isMaxLength,
            length,
            maxLength: CONFIG.MAX_LENGTH,
            avoidSimilar,
            guarantee,
            ativo: allTypesChecked && isMaxLength && avoidSimilar && guarantee
        });

        // ATIVA SOMENTE com TODAS as condições
        return allTypesChecked && isMaxLength && avoidSimilar && guarantee;
    }

    function getRandomUltraSecureMessage() {
        return ULTRA_SECURE_MESSAGES[Math.floor(Math.random() * ULTRA_SECURE_MESSAGES.length)];
    }

    // ===== ATUALIZAR INTERFACE =====
    function updateStrength(password) {
        if (!password) {
            resetStrengthDisplay();
            return;
        }

        const result = calculateStrength(password);

        // Atualizar barra
        DOM.strengthFill.className = `strength-fill ${result.strength}`;
        DOM.strengthText.textContent = result.strengthLabel;

        // Atualizar mensagem
        updateFunMessage(password, result);
    }

    function resetStrengthDisplay() {
        DOM.strengthFill.className = 'strength-fill';
        DOM.strengthFill.style.width = '0%';
        DOM.strengthText.textContent = '—';
        DOM.funMessage.textContent = '🔒 Gere uma senha para começar';
        DOM.funMessage.style.background = 'var(--bg-yellow-light)';
        DOM.funMessage.style.color = 'var(--accent-yellow)';
        DOM.funMessage.style.fontWeight = '500';
        DOM.funMessage.style.animation = 'none';
        DOM.funMessage.style.backgroundSize = '';
        DOM.funMessage.style.fontSize = '';
        DOM.funMessage.style.padding = '';
        DOM.funMessage.style.borderRadius = '';
        DOM.funMessage.style.textShadow = '';
        DOM.funMessage.style.border = '';
        DOM.funMessage.style.boxShadow = '';
    }

    function updateFunMessage(password, result) {
        // ======================================================
        // 🎯 EASTER EGG: Verifica condições ESPECÍFICAS
        // ======================================================
        if (isUltraSecureMode() && result.strength === 'strong') {
            // Ativa o easter egg com estilo especial
            const message = getRandomUltraSecureMessage();
            DOM.funMessage.textContent = message;
            DOM.funMessage.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24, #f093fb, #f5576c, #4facfe, #43e97b)';
            DOM.funMessage.style.backgroundSize = '300% 300%';
            DOM.funMessage.style.animation = 'gradientMove 3s ease infinite';
            DOM.funMessage.style.color = '#ffffff';
            DOM.funMessage.style.fontWeight = '700';
            DOM.funMessage.style.fontSize = '20px';
            DOM.funMessage.style.padding = '16px 24px';
            DOM.funMessage.style.borderRadius = '12px';
            DOM.funMessage.style.textShadow = '0 0 30px rgba(255,255,255,0.3)';
            DOM.funMessage.style.border = '2px solid rgba(255,255,255,0.5)';
            DOM.funMessage.style.boxShadow = '0 0 50px rgba(255,107,107,0.4)';
            return;
        }

        // Mensagem normal
        const messages = STRENGTH_MESSAGES[result.strength] || ['🔒 Gerando...'];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        DOM.funMessage.textContent = randomMessage;

        // Resetar estilos
        DOM.funMessage.style.animation = 'none';
        DOM.funMessage.style.backgroundSize = '';
        DOM.funMessage.style.fontSize = '';
        DOM.funMessage.style.padding = '';
        DOM.funMessage.style.borderRadius = '';
        DOM.funMessage.style.textShadow = '';
        DOM.funMessage.style.border = '';
        DOM.funMessage.style.boxShadow = '';

        // Cores normais
        const colors = {
            strong: { bg: 'var(--bg-green-light)', color: 'var(--accent-green)' },
            good: { bg: 'var(--bg-green-light)', color: '#2d8f3e' },
            fair: { bg: 'var(--bg-yellow-light)', color: 'var(--accent-yellow)' },
            weak: { bg: '#FFE8E8', color: '#FF4444' }
        };

        const color = colors[result.strength] || colors.weak;
        DOM.funMessage.style.background = color.bg;
        DOM.funMessage.style.color = color.color;
        DOM.funMessage.style.fontWeight = '500';
    }

    function generateAndUpdate() {
        const password = generatePassword();
        if (password) {
            DOM.password.value = password;
            updateStrength(password);
        } else {
            updateStrength('');
        }
    }

    // ===== FUNÇÕES DE COPIA =====
    async function copyPassword() {
        const text = DOM.password.value;

        if (!text || text === '⚠️ Selecione um tipo') {
            showCopyFeedback('⚠️ Nada', '#FF4444');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            showCopyFeedback('✅ Copiado!', 'var(--accent-green)');
        } catch {
            DOM.password.select();
            document.execCommand('copy');
            showCopyFeedback('✅ Copiado!', 'var(--accent-green)');
        }
    }

    function showCopyFeedback(text, color) {
        DOM.copyBtn.textContent = text;
        DOM.copyBtn.style.background = color;
        setTimeout(() => {
            DOM.copyBtn.textContent = 'Copiar';
            DOM.copyBtn.style.background = 'var(--primary)';
        }, 2000);
    }

    // ===== RESET =====
    function resetToDefaults() {
        DOM.uppercase.checked = true;
        DOM.lowercase.checked = true;
        DOM.numbers.checked = true;
        DOM.symbols.checked = false;
        DOM.avoidSimilar.checked = false;
        DOM.guaranteeTypes.checked = true;

        DOM.lengthSlider.value = CONFIG.DEFAULT_LENGTH;
        DOM.lengthValue.textContent = CONFIG.DEFAULT_LENGTH;

        DOM.password.value = '';
        updateStrength('');
    }

    // ===== CONFIGURAR SLIDER =====
    function setupSlider() {
        DOM.lengthSlider.min = CONFIG.MIN_LENGTH;
        DOM.lengthSlider.max = CONFIG.MAX_LENGTH;
        DOM.lengthSlider.value = CONFIG.DEFAULT_LENGTH;
        DOM.lengthSlider.step = 1;
        DOM.lengthValue.textContent = CONFIG.DEFAULT_LENGTH;

        DOM.lengthSlider.addEventListener('input', () => {
            DOM.lengthValue.textContent = DOM.lengthSlider.value;
        });

        DOM.lengthSlider.addEventListener('change', () => {
            const currentPassword = DOM.password.value;
            if (currentPassword && currentPassword !== '⚠️ Selecione um tipo') {
                generateAndUpdate();
            }
        });
    }

    // ===== EVENT LISTENERS =====
    function setupEventListeners() {
        DOM.generateBtn.addEventListener('click', generateAndUpdate);
        DOM.copyBtn.addEventListener('click', copyPassword);
        DOM.resetBtn.addEventListener('click', resetToDefaults);

        const configInputs = [
            DOM.uppercase, DOM.lowercase, DOM.numbers, DOM.symbols,
            DOM.avoidSimilar, DOM.guaranteeTypes
        ];

        configInputs.forEach(input => {
            input.addEventListener('change', () => {
                const currentPassword = DOM.password.value;
                if (currentPassword && currentPassword !== '⚠️ Selecione um tipo') {
                    generateAndUpdate();
                }
            });
        });
    }

    // ===== CSS ANIMATION (injetada) =====
    function injectEasterEggStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== INIT =====
    function init() {
        if (!validateElements()) return;

        injectEasterEggStyles();
        setupSlider();
        setupEventListeners();
        generateAndUpdate();

        console.log('✅ Gerador de senhas inicializado (max: 30 caracteres)');
        console.log('🎯 Easter Egg: ativa com 30 caracteres + todas as flags!');
    }

    // ===== INICIAR =====
    document.addEventListener('DOMContentLoaded', init);

})();