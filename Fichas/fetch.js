function traduzirCombustivel(texto) {
  if (!texto) return '';
  const combustiveis = [
    { termo: /\bFLEX\b/, resultado: 'FLEX' },
    { termo: /\bDIES\.?\b/, resultado: 'DIESEL' },
    { termo: /\bDIESEL\b/, resultado: 'DIESEL' },
    { termo: /\(HÍBRIDO\)/, resultado: 'HÍBRIDO' },
  ];
  const resultado = combustiveis.find(item => item.termo.test(texto));
  return resultado ? resultado.resultado : '';
}

function traduzirTransmissao(texto) {
  if (!texto) return '';
  const transmissoes = [
    { termo: /\bAUT\.?\b/, resultado: 'AUTOMÁTICO' },
    { termo: /\bAT\b/, resultado: 'AUTOMÁTICO' },
    { termo: /\bMEC\.?\b/, resultado: 'MANUAL' },
  ];
  const resultado = transmissoes.find(item => item.termo.test(texto));
  return resultado ? resultado.resultado : '';
}

function traduzirMarca(texto) {
  if (!texto) return '';
  // Remove termos isolados usando uma regex
  const termosParaRemover = /\b(AUT\.|AT|MEC\.|16V|FLEX|DIES\.|DIESEL|4P|5P)\b/g;
  return texto.replace(termosParaRemover, '').trim();
}


function determinarQualidade(amText, kmText) {
  if (!amText || !kmText) return 'Erro';
  console.log('Ano e modelo: ',amText, kmText)

  const anoFabricacao = parseInt(amText.split('/')[0], 10);
  if (isNaN(anoFabricacao)) return 'Erro';
  console.log('Ano de fabricacao: ',anoFabricacao)

  const anoAtual = new Date().getFullYear()-2000;
  const idadeVeiculo = anoAtual - anoFabricacao;
  console.log('Ano atual e idade: ',anoAtual, idadeVeiculo)

  const kmRodado = parseFloat(kmText.replace('.', ''));
  if (isNaN(kmRodado)) return 'Erro';

  const srcImg = document.querySelector('.img');
  const kmLimiteNormal = 15000 * idadeVeiculo;
  const kmLimiteAlto = 20000 * idadeVeiculo;

  if (kmRodado <= kmLimiteNormal) {
    console.log('quali')
    console.log('KM RODADO:', kmRodado)
    console.log('KM LIMITE:',kmLimiteNormal)
    srcImg.src = 'bgQual.png';
  } else if (kmRodado <= kmLimiteAlto) {
    console.log('Cust')
    srcImg.src = 'bgCust.png';
  } else {
    console.log('Prec')
    srcImg.src = 'bgPrec.png';
  }
  return 'Sucesso';
}

let data_array = [];
$(document).ready(function () {
  carregarDadosPlanilha();
  inicializarEventos();
});

function carregarDadosPlanilha() {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/17QfIGiuhb-G9SFhxQMeINdHWIorw5LBHf0dkxQ5vwTs/values/VU/?alt=json&key=AIzaSyAa2ls3JkyzujXofxxTqjxVMRivGMgcArQ';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const [headers, ...values] = data.values;
      data_array = values
        .map(row => Object.fromEntries(headers.map((header, i) => [header, row[i] || ''])))
        .filter(item => item.PLACA !== ''); // Filtra itens onde PLACA é uma string vazia
    })
    .catch(error => console.error('Erro ao carregar dados da planilha:', error));
}


function inicializarEventos() {
  document.querySelector('input[name="placa"]').addEventListener('input', handlePlacaChange);
  document.querySelector('.multiple').addEventListener('input', handleMultipleInput);
  document.getElementById('btn').addEventListener('click', gerarPDFs);
}

function handlePlacaChange(event) {
  const inputPlaca = event.target;
  inputPlaca.value = inputPlaca.value.toUpperCase();

  if (inputPlaca.value.length === 7) {
    preencherDados(inputPlaca.value, inputPlaca.closest('.imgDiv'));
  } else {
    limparCampos(inputPlaca.closest('.imgDiv'));
  }
}

function handleMultipleInput(event) {
  const text = event.target.value.trim();
  const placas = text.includes(',') ? text.split(',') : text.split('\n');
  const divOriginal = document.querySelector('.imgDiv');
  divOriginal.remove();

  placas.forEach(placa => {
    const novaDiv = document.createElement('div');
    novaDiv.className = 'imgDiv';
    novaDiv.innerHTML = divOriginal.innerHTML;
    novaDiv.querySelector('input[name="placa"]').value = placa.trim().toUpperCase();
    document.body.appendChild(novaDiv);
    preencherDados(placa, novaDiv);
  });
}

function preencherDados(placa, div) {
  const dados = data_array.find(item => item['PLACA'] === placa);
  if (dados) {
    const amText = dados['ANO/MOD'];
    const kmText = dados['KM'];
    div.querySelector('input[name="am"]').value = amText;
    div.querySelector('input[name="km"]').value = kmText;
    div.querySelector('input[name="comb"]').value = traduzirCombustivel(dados['VEÍCULO']);
    div.querySelector('input[name="trans"]').value = traduzirTransmissao(dados['VEÍCULO']);
    div.querySelector('input[name="MMV"]').value = traduzirMarca(dados['VEÍCULO']);
    div.querySelector('textarea[name="descricao"]').value = 'Veículo com manual e chave reserva';
    div.querySelector('textarea[name="preco"]').value = dados[' VR ATUAL'].replace('R$', '').replace(',00', '');
    div.querySelector('textarea[name="rs"]').value = 'R$';
    div.querySelector('textarea[name="pos"]').value = ',00';
    div.querySelector('textarea[name="cc"]').value = 'Garantia de 3 meses com a Toyoserra.';
    determinarQualidade(amText, kmText);
  } else {
    limparCampos(div);
  }
}

function limparCampos(div) {
  const campos = div.querySelectorAll('input, textarea');
  campos.forEach(campo => campo.value = '');
}

function gerarPDFs() {
  document.querySelectorAll('.imgDiv').forEach(div => {
    const placa = div.querySelector('input[name="placa"]').value.trim(); // Obtém a placa do input
    const id = placa || 'Ficha'; // Usa a placa como nome, ou 'Ficha' se não houver valor

    html2canvas(div, { scale: 3 })
      .then(canvas => {
        const doc = new jspdf.jsPDF();
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 0, 190, 277);
        doc.save(`${id}.pdf`); // Salva o PDF com o nome da placa
      })
      .catch(error => console.error('Erro ao gerar PDF:', error));
  });
}

