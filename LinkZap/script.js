// ---------- Create link, show URL and loading spinner ----------

const criarAgora = document.getElementById('criar-agora')
const linkInput = document.getElementById('link-input')
const linkInput2 = document.getElementById('link-input2')
const shortUrlEl = document.getElementById('short-url')
const spinnerOverlay = document.querySelector('.spinner-overlay')
const select = document.getElementById('drop-list')
const inputWrapper = document.querySelector('.input-wrapper')

shortUrlEl.addEventListener('click', function () {
  navigator.clipboard.writeText(shortUrlEl.textContent).then(
    function () {
      alert('Link copiado para a área de transferência!')
    },
    function () {
      alert('Erro ao copiar link.')
    },
  )
  return false
})

// function enviarRequisicao() {

//   const selected = document.querySelector('.iti__selected-dial-code')
//   console.log(selected.textContent)

//   spinnerOverlay.style.display = 'flex';
//   criarAgora.disabled = true;
//   // Monta a data com o valor dos inputs
//   let mesInput = encodeURIComponent(linkInput.value);
//   let whatsInput = linkInput2.value.replace(/\D/g, "");
//   let cod = selected.textContent.replace("+", "");
//   console.log(cod)

//   const data = 'url=https://wa.me/' + encodeURIComponent(cod + whatsInput + "?text=" + mesInput);
//   // Envia a requisição
//   const xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
//   xhr.addEventListener('readystatechange', function () {
//     if (this.readyState === this.DONE) {
//       const response = JSON.parse(this.responseText);
//       if (response.result_url) {
//         const urlEncurtada = response.result_url;
//         // Atualiza o elemento com a URL encurtada
//         shortUrlEl.textContent = urlEncurtada;
//         shortUrlEl.style.cursor = 'pointer';
//         // Esconde os inputs e o botão de criar
//         linkInput.style.display = 'none';
//         linkInput2.style.display = 'none';
//         inputWrapper.style.display = 'none'
//         // Mostra o elemento com a URL encurtada
//         shortUrlEl.style.display = 'block';
//         shortUrlEl.style.textAlign = 'center';
//         spinnerOverlay.style.display = 'none';
//         criarAgora.disabled = false;
//         currentStep = 3;
//         closePopup();

//       } else {
//         console.log('Erro: resposta do servidor inválida.');
//         console.log(this.responseText);
//       }
//     }
//   });
//   xhr.open('POST', 'https://url-shortener-service.p.rapidapi.com/shorten');
//   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//   xhr.setRequestHeader('X-RapidAPI-Key', '5762af6cc4msh0739424ae01b6dap10b8b6jsn539149e7622d');
//   xhr.setRequestHeader('X-RapidAPI-Host', 'url-shortener-service.p.rapidapi.com');
//   xhr.send(data);

//   // Muda o texto do botão e adiciona um listener para reexibir os inputs
//   criarAgora.textContent = 'Criar Outro';
//   criarAgora.removeEventListener('click', enviarRequisicao);
//   criarAgora.addEventListener('click', function () {
//     // Exibe os inputs e o botão de criar
//     linkInput.style.display = 'block';
//     linkInput2.style.display = 'block';
//     criarAgora.style.display = 'block';
//     select.style.display = 'flex';
//     inputWrapper.style.display = 'flex'
//     // Esconde o elemento com a URL encurtada
//     shortUrlEl.style.display = 'none';
//     // Limpa o conteúdo do elemento com a URL encurtada
//     shortUrlEl.textContent = '';
//     // Muda o texto do botão de volta para 'Criar Agora'
//     criarAgora.textContent = 'Criar Agora';
//     linkInput.value = '';
//     linkInput2.value = '';
//     abrirPopUp(1);
//     criarAgora.addEventListener('click', enviarRequisicao);
//   });
// }

function enviarRequisicao() {
  const selected = document.querySelector('.iti__selected-dial-code');
  console.log(selected.textContent);

  spinnerOverlay.style.display = 'flex';
  criarAgora.disabled = true;

  // Monta a URL do WhatsApp com o valor dos inputs
  let mesInput = encodeURIComponent(linkInput.value);
  let whatsInput = linkInput2.value.replace(/\D/g, "");
  let cod = selected.textContent.replace("+", "");

  console.log(mesInput)
  console.log(whatsInput)
  console.log(cod)
  
  const urlWhatsApp = 'https://wa.me/'+cod+whatsInput+"?text="+mesInput;

  // Atualiza o elemento com a URL do WhatsApp
  shortUrlEl.textContent = urlWhatsApp;
  shortUrlEl.style.cursor = 'pointer';

  // Esconde os inputs e o botão de criar
  linkInput.style.display = 'none';
  linkInput2.style.display = 'none';
  inputWrapper.style.display = 'none';

  // Mostra o elemento com a URL do WhatsApp
  shortUrlEl.style.display = 'block';
  shortUrlEl.style.textAlign = 'center';
  spinnerOverlay.style.display = 'none';
  criarAgora.disabled = false;
  currentStep = 3;
  closePopup();

  // Muda o texto do botão e adiciona um listener para reexibir os inputs
  criarAgora.textContent = 'Criar Outro';
  criarAgora.removeEventListener('click', enviarRequisicao);
  criarAgora.addEventListener('click', function () {
    // Exibe os inputs e o botão de criar
    linkInput.style.display = 'block';
    linkInput2.style.display = 'block';
    criarAgora.style.display = 'block';
    select.style.display = 'flex';
    inputWrapper.style.display = 'flex';

    // Esconde o elemento com a URL do WhatsApp
    shortUrlEl.style.display = 'none';

    // Limpa o conteúdo do elemento com a URL do WhatsApp
    shortUrlEl.textContent = '';

    // Muda o texto do botão de volta para 'Criar Agora'
    criarAgora.textContent = 'Criar Agora';
    linkInput.value = '';
    linkInput2.value = '';
    abrirPopUp(1);
    criarAgora.addEventListener('click', enviarRequisicao);
  });
}

criarAgora.addEventListener('click', enviarRequisicao);

// ---------- FT popup, close button, checkbox ----------

const elements = document.querySelectorAll('.tutorial');
const popup = document.querySelector('.popup');
const stepNumber = document.querySelector('#step-number');
const stepDescription = document.querySelector('#step-description');
const closeButton = document.querySelector('#close-button');

let currentStep = 1;

const popupContents = {
  1: "Digite aqui a mensagem à ser enviada.",
  2: "Digite o seu número do whatsapp.",
  3: "Clique no botão para gerar seu link e compartilhe!"
};

const popupTitles = {
  1: "Passo 1 - Mensagem",
  2: "Passo 2 - Número",
  3: "Passo 3 - Tudo ok!"
};

const popupButton = {
  1: "Próximo",
  2: "Próximo",
  3: "Fechar",
};

function showPopup(element) {
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top + window.pageYOffset;
  const elementLeft = elementRect.left + window.pageXOffset;
  const elementWidth = elementRect.width;
  const popupWidth = popup.offsetWidth;
  const vwToPixels = vw => (vw * window.innerWidth) / 100;


  const isMobile = window.innerWidth < 768;
  const topPosition = isMobile ? elementTop + elementRect.height + 10 : elementTop;
  const leftPosition = isMobile ? (window.innerWidth / 2) - vwToPixels(38) : elementLeft + elementWidth + 10;

  popup.style.top = `${topPosition}px`;
  popup.style.left = `${leftPosition}px`;
  popup.classList.remove('hidden');
}

function closePopup() {



  popup.classList.add('hidden');
  currentStep++;
  const nextElement = Array.from(elements).find(element => {
    return Number(element.getAttribute('data-step')) === currentStep;
  });

  if (nextElement) {
    abrirPopUp(currentStep);
  } else {
    currentStep = 1;
  }
}

function abrirPopUp(step) {
  const element = Array.from(elements).find(element => {
    return Number(element.getAttribute('data-step')) === step;
  });

  if (element) {
    showPopup(element);
    currentStep = step;
    stepNumber.textContent = popupTitles[currentStep];
    stepDescription.textContent = popupContents[currentStep];
    closeButton.textContent = popupButton[currentStep];
  }
}

closeButton.addEventListener('click', closePopup);

elements.forEach(element => {
  // Verifica se o elemento não é o botão com id "criar-agora"
  if (!element.matches('#criar-agora')) {
    element.addEventListener('click', () => {
      const step = Number(element.getAttribute('data-step'));
      abrirPopUp(step);
    });
  }
});

abrirPopUp(1)


