// ========== GERADOR DE SENHAS ==========
document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTOS DOM =====
    const passwordInput = document.getElementById('password');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const funMessage = document.getElementById('funMessage');

    // Checkboxes
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const avoidSimilarCheck = document.getElementById('avoidSimilar');
    const guaranteeTypesCheck = document.getElementById('guaranteeTypes');

    // ===== CONSTANTES =====
    const CHARS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%&*+-=<>?'
    };

    const SIMILAR_CHARS = 'O0oIl1';

    // ===== FUNÇÃO: Pegar caracteres disponíveis =====
    function getAvailableChars() {
        let chars = '';

        if (uppercaseCheck.checked) chars += CHARS.uppercase;
        if (lowercaseCheck.checked) chars += CHARS.lowercase;
        if (numbersCheck.checked) chars += CHARS.numbers;
        if (symbolsCheck.checked) chars += CHARS.symbols;

        // Evitar caracteres semelhantes
        if (avoidSimilarCheck.checked) {
            chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
        }

        return chars;
    }

    // ===== FUNÇÃO: Pegar tipos ativos =====
    function getActiveTypes() {
        const types = [];
        if (uppercaseCheck.checked) types.push(CHARS.uppercase);
        if (lowercaseCheck.checked) types.push(CHARS.lowercase);
        if (numbersCheck.checked) types.push(CHARS.numbers);
        if (symbolsCheck.checked) types.push(CHARS.symbols);
        return types;
    }

    // ===== FUNÇÃO: Verificar se está no modo "ultra seguro" =====
    function isUltraSecureMode() {
        const allTypesChecked = 
            uppercaseCheck.checked &&
            lowercaseCheck.checked &&
            numbersCheck.checked &&
            symbolsCheck.checked;

        const length = parseInt(lengthSlider.value);
        const isLong = length >= 40;
        const avoidSimilar = avoidSimilarCheck.checked;
        const guarantee = guaranteeTypesCheck.checked;

        // Todas as opções mais seguras ativadas
        return allTypesChecked && isLong && avoidSimilar && guarantee;
    }

    function getFunnyUltraSecureMessage() {
        const messages = [
            'Nem mesmo o L poderia desvendar essa senha',
            'Até o Batman teria dificuldade com essa',
            'O Dumbledore aprovaria essa senha',
            'Essa senha tem mais camadas que a matriz',
            'O Sherlock Holmes ficaria confuso com isso',
            'Até o Einstein precisaria de um tempo para decifrar',
            'Essa senha é mais segura que o cofre do Gringotes',
            'O Neo tentaria desviar dessa senha',
            'Essa senha deixaria o Gandalf impressionado',
            'Até o Rick Sanchez respeitaria essa senha',
            'Essa senha é mais complexa que o enigma de Duna',
            'O Tony Stark usaria essa senha no Jarvis',
            'Essa senha tem mais código que o Matrix',
            'Até o Q da MI6 aprovaria essa senha',
            'O Batman colocaria essa senha no Batcomputador',
            'Essa senha é mais forte que o Adamantium',
            'O Professor Xavier teria orgulho dessa senha',
            'Até o Deadpool levaria essa senha a sério',
            'Essa senha é mais protegida que a Fortaleza da Solidão',
            'O Aragorn juraria proteger essa senha',
            'Essa senha é mais épica que Senhor dos Anéis',
            'Até o Tyrion Lannister beberia por essa senha',
            'Essa senha é mais inteligente que o Sherlock',
            'O Doutor Strange veria 14 milhões de futuros e todos têm essa senha',
            'Até o Goku precisaria de mais uma transformação para quebrar essa',
            'Essa senha é mais secreta que a ordem dos Jedi',
            'O Legolas enxergaria longe, mas não essa senha',
            'Essa senha é mais difícil que o cubo mágico'
        ];

        return messages[Math.floor(Math.random() * messages.length)];
    }

    // ===== FUNÇÃO: Gerar senha =====
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const chars = getAvailableChars();
        const types = getActiveTypes();
        const guarantee = guaranteeTypesCheck.checked;

        // Verificar se há caracteres disponíveis
        if (!chars) {
            passwordInput.value = '⚠️ Selecione um tipo';
            return '';
        }

        let password = '';

        // Garantir pelo menos um de cada tipo selecionado
        if (guarantee && types.length > 0) {
            for (const type of types) {
                const typeChars = type.split('');
                const randomIndex = Math.floor(Math.random() * typeChars.length);
                password += typeChars[randomIndex];
            }
        }

        // Preencher o restante da senha
        const charsArray = chars.split('');
        while (password.length < length) {
            const randomIndex = Math.floor(Math.random() * charsArray.length);
            password += charsArray[randomIndex];
        }

        // Embaralhar a senha
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        // Cortar se exceder o tamanho (por segurança)
        if (password.length > length) {
            password = password.substring(0, length);
        }

        return password;
    }

    // ===== FUNÇÃO: Calcular força da senha =====
    function calculateStrength(password) {
        if (!password) {
            return {
                entropy: 0,
                strength: 'none',
                strengthLabel: '—',
                crackTime: '—'
            };
        }

        const length = password.length;
        const chars = getAvailableChars();
        const poolSize = chars.length || 1;
        const entropy = length * Math.log2(poolSize);

        let strength = 'weak';
        let strengthLabel = 'Fraca';
        let crackTimeStr = 'Instantes';

        if (entropy >= 80) {
            strength = 'strong';
            strengthLabel = 'Forte';
            crackTimeStr = '> 1000 anos';
        } else if (entropy >= 60) {
            strength = 'good';
            strengthLabel = 'Boa';
            crackTimeStr = '~ 50 anos';
        } else if (entropy >= 40) {
            strength = 'fair';
            strengthLabel = 'Média';
            crackTimeStr = '~ 1 dia';
        } else if (entropy >= 30) {
            strength = 'weak';
            strengthLabel = 'Fraca';
            crackTimeStr = '~ 1 hora';
        } else if (entropy > 0) {
            strength = 'weak';
            strengthLabel = 'Fraca';
            crackTimeStr = 'Instantes';
        }

        return {
            entropy: Math.round(entropy),
            strength,
            strengthLabel,
            crackTime: crackTimeStr
        };
    }

    // ===== FUNÇÃO: Atualizar indicadores de força =====
    function updateStrength(password) {
        if (!password) {
            strengthFill.className = 'strength-fill';
            strengthFill.style.width = '0%';
            strengthText.textContent = '—';
            funMessage.textContent = '🔒 Gere uma senha para começar';
            funMessage.style.background = 'var(--bg-yellow-light)';
            funMessage.style.color = 'var(--accent-yellow)';
            funMessage.style.fontWeight = '500';
            return;
        }

        const result = calculateStrength(password);

        // Atualizar barra de força
        strengthFill.className = `strength-fill ${result.strength}`;
        strengthText.textContent = result.strengthLabel;

        // ===== VERIFICAR MODO ULTRA SEGURO =====
        if (isUltraSecureMode() && result.strength === 'strong') {
            // Mensagem engraçada para modo ultra seguro
            funMessage.textContent = getFunnyUltraSecureMessage();
            funMessage.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            funMessage.style.color = '#ffffff';
            funMessage.style.fontWeight = '600';
            return;
        }

        // ===== MENSAGENS NORMAIS =====
        const messages = {
            strong: ['Senha fortíssima!', 'Impenetrável!', 'Poderosa!', 'Cofre seguro!'],
            good: ['Boa senha!', 'Segura!', 'Confiável!'],
            fair: ['Pode melhorar', 'Média segurança', 'Aumente os caracteres'],
            weak: ['Senha fraca!', 'Muito curta!', 'Risco!']
        };

        const messageList = messages[result.strength] || ['🔒 Gerando...'];
        const randomMessage = messageList[Math.floor(Math.random() * messageList.length)];

        funMessage.textContent = randomMessage;

        // Cores da mensagem
        if (result.strength === 'strong') {
            funMessage.style.background = 'var(--bg-green-light)';
            funMessage.style.color = 'var(--accent-green)';
            funMessage.style.fontWeight = '500';
        } else if (result.strength === 'good') {
            funMessage.style.background = 'var(--bg-green-light)';
            funMessage.style.color = '#2d8f3e';
            funMessage.style.fontWeight = '500';
        } else if (result.strength === 'fair') {
            funMessage.style.background = 'var(--bg-yellow-light)';
            funMessage.style.color = 'var(--accent-yellow)';
            funMessage.style.fontWeight = '500';
        } else {
            funMessage.style.background = '#FFE8E8';
            funMessage.style.color = '#FF4444';
            funMessage.style.fontWeight = '500';
        }
    }

    // ===== FUNÇÃO: Gerar e atualizar tudo =====
    function generateAndUpdate() {
        const password = generatePassword();
        if (password) {
            passwordInput.value = password;
            updateStrength(password);
        } else {
            updateStrength('');
        }
    }

    // ===== EVENT: Gerar senha =====
    generateBtn.addEventListener('click', generateAndUpdate);

    // ===== EVENT: Copiar senha =====
    copyBtn.addEventListener('click', async () => {
        const text = passwordInput.value;
        
        if (!text || text === '⚠️ Selecione um tipo' || text === '') {
            copyBtn.textContent = '⚠️ Nada';
            copyBtn.style.background = '#FF4444';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
                copyBtn.style.background = 'var(--primary)';
            }, 2000);
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = '✅ Copiado!';
            copyBtn.style.background = 'var(--accent-green)';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
                copyBtn.style.background = 'var(--primary)';
            }, 2000);
        } catch {
            passwordInput.select();
            document.execCommand('copy');
            copyBtn.textContent = '✅ Copiado!';
            copyBtn.style.background = 'var(--accent-green)';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
                copyBtn.style.background = 'var(--primary)';
            }, 2000);
        }
    });

    // ===== EVENT: Resetar padrão =====
    resetBtn.addEventListener('click', () => {
        uppercaseCheck.checked = true;
        lowercaseCheck.checked = true;
        numbersCheck.checked = true;
        symbolsCheck.checked = false;
        avoidSimilarCheck.checked = false;
        guaranteeTypesCheck.checked = true;

        lengthSlider.value = 16;
        lengthValue.textContent = '16';

        passwordInput.value = '';
        updateStrength('');
    });

    // ===== EVENT: Atualizar valor do slider =====
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // ===== EVENT: Atualizar senha ao mudar configurações =====
    const configInputs = [
        uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck,
        avoidSimilarCheck, guaranteeTypesCheck
    ];

    configInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (passwordInput.value && passwordInput.value !== '⚠️ Selecione um tipo') {
                generateAndUpdate();
            }
        });
    });

    lengthSlider.addEventListener('change', () => {
        if (passwordInput.value && passwordInput.value !== '⚠️ Selecione um tipo') {
            generateAndUpdate();
        }
    });

    // ===== GERAR SENHA INICIAL =====
    generateAndUpdate();
});