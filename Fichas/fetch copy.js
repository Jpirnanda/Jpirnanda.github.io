function traduzirCombustivel(texto) {
  if (texto.indexOf('FLEX') !== -1) {
    return 'FLEX'
  } else if (texto.indexOf('DIES.') !== -1 || texto.indexOf('DIESEL') !== -1) {
    return 'DIESEL'
  } else if (texto.indexOf('(HÍBRIDO)') !== -1) {
    return 'HÍBRIDO'
  } else {
    return 'Outro' // Se nenhuma das condições for atendida
  }
}

function traduzirTransmissao(texto) {
  if (texto.indexOf('AUT.') !== -1 || texto.indexOf('AT.') !== -1) {
    return 'AUTOMÁTICO'
  } else if (texto.indexOf('MEC.') !== -1) {
    return 'MANUAL'
  } else {
    return 'Outro' // Se nenhuma das condições for atendida
  }
}

function traduzirMarca(texto) {
  return (
    '' +
    texto
      .replace('AUT.', '')
      .replace('AT', '')
      .replace('MEC.', '')
      .replace('16V', '')
      .replace('FLEX', '')
      .replace('DIES.', '')
      .replace('DIESEL', '')
      .replace('4P', '')
      .replace('5P', '')
  )
}

function determinarQualidade(amText, kmText) {
z
  const amTextSplittado = parseInt(amText.split('/')[0], 10)
  const dataAtual = new Date()
  const anoAtual = dataAtual.getFullYear().toString().slice(-2)
  const resultado = anoAtual - amTextSplittado
  const km = parseFloat(kmText.replace('.', ''))
  const srcImg = document.querySelector('.img')

  console.log(resultado)
  console.log(km)
  console.log(15000 * resultado)
  console.log(20000 * resultado)
  if (km <= resultado * 15000) {
    srcImg.src = 'bgQual.png'
  } else if (km <= resultado * 20000) {
    srcImg.src = 'bgCust.png'
  } else {
    srcImg.src = 'bgPrec.png'
  }

  console.log(srcImg.src)
}
let data_array = []
$(document).ready(function () {
  sizeAdjust()

  const placaInp = document.querySelector('input[name="placa"]')
  placaInp.addEventListener('input', function () {
    textoPlaca = placaInp.value.toUpperCase()
    placaInp.value = textoPlaca
    let divMaisAlta = placaInp.closest('.imgDiv')
    handlePlacaInput(divMaisAlta)
  })

  document.querySelector('.multiple').addEventListener('input', function () {
    const textareaText = this.value

    if (textareaText !== '') {
      let tamanhoDaLista = 0
      let placas = []

      if (textareaText.includes(',')) {
        placas = textareaText.split(',')
        tamanhoDaLista = placas.length
      }
      if (textareaText.includes('\n')) {
        placas = textareaText.split('\n')
        tamanhoDaLista = placas.length
      } else {
        placas = [textareaText]
        tamanhoDaLista = 1
      }

      const divOriginal = document.querySelector('.imgDiv')

      // Remove a div original fora do loop
      divOriginal.remove()

      if (tamanhoDaLista > 0) {
        console.log('Há mais de uma placa na lista.')
        for (const placa of placas) {
          const novoDiv = document.createElement('div')
          novoDiv.innerHTML = divOriginal.innerHTML
          novoDiv.id = placa
          novoDiv.className = 'imgDiv'
          const novaPlaca = novoDiv.querySelector('input[name="placa"]')
          novaPlaca.value = placa
          console.log('Div criada. O valor da placa da nova div é ')
          console.log(placa)
          document.body.appendChild(novoDiv)
          handlePlacaInput(novoDiv)
        }
      }
      sizeAdjust()
    } else {
    }
  })

  fetch(
    'https://sheets.googleapis.com/v4/spreadsheets/17QfIGiuhb-G9SFhxQMeINdHWIorw5LBHf0dkxQ5vwTs/values/VU/?alt=json&key=AIzaSyAa2ls3JkyzujXofxxTqjxVMRivGMgcArQ',
  )
    .then((response) => response.json())
    .then((data) => {
      var headers = data.values[1] // Pegar o segundo array com os títulos das colunas
      var values = data.values.slice(2) // Pegar os arrays de dados sem o header
      // Transformar o JSON em um array de objetos
      for (var i = 0; i < values.length; i++) {
        var row_object = {}
        for (var j = 0; j < headers.length; j++) {
          row_object[headers[j]] = values[i][j]
        }
        data_array.push(row_object)
      }
    })


  document.getElementById('btn').addEventListener('click', function () {
    const divsToPrint = document.querySelectorAll('.imgDiv')
    console.log('clickado')
    divsToPrint.forEach(function (element) {
      const name = element.id
      console.log(name)
      html2canvas(element, {
        dip: 1200,
        scale: 3, // Aumenta a escala para 2
      }).then(function (canvas) {
        document.body.appendChild(canvas)
        var imgdata = canvas.toDataURL('image/png')
        var doc = new jspdf.jsPDF()
        doc.addImage(imgdata, 'png', 10, 0, 190, 277)
        doc.save('Ficha ' + name + '.pdf')
        document.body.removeChild(canvas)
      })
    })
  })

  function sizeAdjust() {
    // const docs = document.querySelectorAll('.imgDiv').length
    // const div = document.querySelector('.imgDiv')
    // const colunaEsq = document.querySelector('.left-col')
    // var n = 0
    // console.log('docs')
    // console.log(docs)
    // for (var i = 0; i < docs; i++) {
    //   n = n + 1
    // }
    // console.log('n')
    // console.log(n)
    // const style = getComputedStyle(div)
    // const paddingTop = parseInt(style.paddingTop, 10) // Obtém o padding superior como um número inteiro
    // const paddingBottom = parseInt(style.paddingBottom, 10) // Obtém o padding inferior como um número inteiro
    // const height = parseInt(style.height, 10)
    // altura = (paddingBottom + paddingTop + height) * n
    // console.log('Altura:')
    // console.log(altura)
    // console.log('n')
    // console.log(n)
    // colunaEsq.style.height = altura + 'px'
  }
})

function handlePlacaInput(placa) {
  const placaFormatada = placa.trim().toUpperCase();

  console.log('Entrando na função handle...')
  const placa = div.querySelector('input[name="placa"]')
  const textoPlaca = placa.value.toUpperCase() // Converter o texto em maiúsculas
  const am = div.querySelector('input[name="am"]')
  const trans = div.querySelector('input[name="trans"]')
  const km = div.querySelector('input[name="km"]')
  const comb = div.querySelector('input[name="comb"]')
  const mmv = div.querySelector('input[name="MMV"]')
  const descricao = div.querySelector('textarea[name="descricao"]')
  const preco = div.querySelector('textarea[name="preco"]')
  const rs = div.querySelector('textarea[name="rs"]')
  const pos = div.querySelector('textarea[name="pos"]')
  const cc = div.querySelector('textarea[name="cc"]')

  if (placaFormatada.length === 7 && /^[A-Z0-9]+$/.test(placaFormatada)) {
    // Verificar se foram inseridos sete dígitos
    console.log('A placa tem 7 dígitos.')
    console.log(data_array.length)
    for (let i = 0; i < data_array.length; i++) {
      console.log('Testando campo:')
      console.log(data_array[i])
      if (data_array[i]['PLACA'] === textoPlaca) {
        amText = data_array[i]['ANO/MOD']
        kmText = data_array[i]['KM']
        console.log(data_array[i]['MODELO'])
        combText = traduzirCombustivel(data_array[i]['MODELO'])
        transText = traduzirTransmissao(data_array[i]['MODELO'])
        mmvText = traduzirMarca(data_array[i]['MODELO'])
        descricaoText = 'Veículo com manual e chave reserva'
        precoText = data_array[i]['VALOR ATUAL']
          .replace('R$', '')
          .replace(',00', '')

        result = determinarQualidade(amText, kmText)

        srcValor = parseFloat(kmText)
        am.value = amText
        km.value = kmText
        comb.value = combText
        trans.value = transText
        mmv.value = mmvText
        descricao.value = descricaoText
        preco.value = precoText
        rs.value = 'R$'
        pos.value = ',00'
        cc.value = 'Garantia de 3 meses com a Toyoserra.'

        break
      }
    }
  } else {
    console.log('A placa não tem 7 dígitos.')
    am.value = ''
    trans.value = ''
    km.value = ''
    comb.value = ''
    mmv.value = ''
    descricao.value = ''
    preco.value = ''
    rs.value = ''
    pos.value = ''
    cc.value = ''
  }
}
