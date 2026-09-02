// ====== PEGANDO OS ELEMENTOS ====== //
const form = document.getElementById('imc-form');
const alturaInput = document.getElementById('altura');
const pesoInput = document.getElementById('peso');
const resultado = document.getElementById('resultado'); 

// ====== OUVINDO O SUBMIT ====== //
form.addEventListener('submit', function(event){
      event.preventDefault(); 


    // ====== COLETANDO OS DADOS ====== //
    const altura = Number(alturaInput.value) / 100; /*convertendo de CM para M)*/
    const peso = Number(pesoInput.value)


    // ====== CÁLCULO DO IMC ====== //
    const imcCalculado  = peso / altura ** 2;
    const imcExibido  = imcCalculado.toFixed(1); 



    // ====== CALCULAR NÍVEL DE IMC ====== //
    let classificacaoIMC = "nulo"
    if (imcCalculado < 18.5){
        classificacaoIMC = "Magreza"
    } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
        classificacaoIMC = "Normal"
    } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
        classificacaoIMC = "Sobrepeso"
    } else if (imcCalculado >= 30 && imcCalculado <= 34.9) {
        classificacaoIMC = "Obesidade I"
    } else if (imcCalculado >= 35) {
        classificacaoIMC = "Obesidade II"
    }
    





    // ====== RETORNO PARA O HTML ====== //
    resultado.innerHTML = `
        <div class="result-card">
            <div class="imc-value">${imcExibido}</div>
            <div class="imc-classification ${classificacaoIMC.toLowerCase()}">${classificacaoIMC}</div>
        </div>
    `;
    }
)