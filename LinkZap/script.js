// ---------- Create link, show URL and loading spinner ----------

const criarAgora = document.getElementById("criar-agora");
const linkInput = document.getElementById("link-input");
const linkInput2 = document.getElementById("link-input2");
const shortUrlEl = document.getElementById("short-url");
const copyBtn = document.getElementById("copy-btn");
const openBtn = document.getElementById("open-btn");
const linkCard = document.getElementById("link-card");
const spinnerOverlay = document.querySelector(".spinner-overlay");
const select = document.getElementById("drop-list");
const inputWrapper = document.querySelector(".input-wrapper");

// Copy button
if (copyBtn) {
  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(shortUrlEl.textContent).then(
      function () {
        alert("Link copiado para a área de transferência!");
      },
      function () {
        alert("Erro ao copiar link.");
      },
    );
  });
}

// Open button
if (openBtn) {
  openBtn.addEventListener("click", function () {
    const href = shortUrlEl.getAttribute("href") || shortUrlEl.textContent;
    if (href) window.open(href, "_blank");
  });
}

function enviarRequisicao() {
  const selected = document.querySelector(".iti__selected-dial-code");
  console.log(selected.textContent);

  spinnerOverlay.style.display = "flex";
  criarAgora.disabled = true;

  console.log(linkInput.value);
  // Monta a URL do WhatsApp com o valor dos inputs
  let mesInput = encodeURIComponent(linkInput.value);
  console.log(mesInput);
  let whatsInput = linkInput2.value.replace(/\D/g, "");
  let cod = selected.textContent.replace("+", "");

  const urlWhatsApp = "https://wa.me/" + cod + whatsInput + "?text=" + mesInput;

  // Atualiza o elemento com a URL do WhatsApp
  shortUrlEl.textContent = urlWhatsApp;
  shortUrlEl.setAttribute("href", urlWhatsApp);
  shortUrlEl.style.cursor = "pointer";

  // Esconde os inputs e o botão de criar
  linkInput.style.display = "none";
  linkInput2.style.display = "none";
  inputWrapper.style.display = "none";

  // Mostra o elemento com a URL do WhatsApp (cartão com ações)
  if (linkCard) linkCard.style.display = "block";
  shortUrlEl.style.textAlign = "center";
  spinnerOverlay.style.display = "none";
  criarAgora.disabled = false;
  currentStep = 3;
  closePopup();

  // Muda o texto do botão e adiciona um listener para reexibir os inputs
  criarAgora.textContent = "Criar Outro";
  criarAgora.removeEventListener("click", enviarRequisicao);
  criarAgora.addEventListener("click", function () {
    // Exibe os inputs e o botão de criar
    linkInput.style.display = "block";
    linkInput2.style.display = "block";
    criarAgora.style.display = "block";
    select.style.display = "flex";
    inputWrapper.style.display = "flex";

    // Esconde o cartão do link e limpa
    if (linkCard) linkCard.style.display = "none";
    shortUrlEl.textContent = "";
    shortUrlEl.removeAttribute("href");

    // Muda o texto do botão de volta para 'Criar Agora'
    criarAgora.textContent = "Criar Agora";
    linkInput.value = "";
    linkInput2.value = "";
    abrirPopUp(1);
    criarAgora.addEventListener("click", enviarRequisicao);
  });
}

criarAgora.addEventListener("click", enviarRequisicao);

// ---------- FT popup, close button, checkbox ----------

const elements = document.querySelectorAll(".tutorial");
const popup = document.querySelector(".popup");
const stepNumber = document.querySelector("#step-number");
const stepDescription = document.querySelector("#step-description");
const closeButton = document.querySelector("#close-button");

let currentStep = 1;

const popupContents = {
  1: "Digite aqui a mensagem à ser enviada.",
  2: "Digite o seu número do whatsapp.",
  3: "Clique no botão para gerar seu link e compartilhe!",
};

const popupTitles = {
  1: "Passo 1 - Mensagem",
  2: "Passo 2 - Número",
  3: "Passo 3 - Tudo ok!",
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
  const vwToPixels = (vw) => (vw * window.innerWidth) / 100;

  const isMobile = window.innerWidth < 768;
  const topPosition = isMobile
    ? elementTop + elementRect.height + 10
    : elementTop;
  const leftPosition = isMobile
    ? window.innerWidth / 2 - vwToPixels(38)
    : elementLeft + elementWidth + 10;

  popup.style.top = `${topPosition}px`;
  popup.style.left = `${leftPosition}px`;
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
  currentStep++;
  const nextElement = Array.from(elements).find((element) => {
    return Number(element.getAttribute("data-step")) === currentStep;
  });

  if (nextElement) {
    abrirPopUp(currentStep);
  } else {
    currentStep = 1;
  }
}

function abrirPopUp(step) {
  const element = Array.from(elements).find((element) => {
    return Number(element.getAttribute("data-step")) === step;
  });

  if (element) {
    showPopup(element);
    currentStep = step;
    stepNumber.textContent = popupTitles[currentStep];
    stepDescription.textContent = popupContents[currentStep];
    closeButton.textContent = popupButton[currentStep];
  }
}

closeButton.addEventListener("click", closePopup);

elements.forEach((element) => {
  // Verifica se o elemento não é o botão com id "criar-agora"
  if (!element.matches("#criar-agora")) {
    element.addEventListener("click", () => {
      const step = Number(element.getAttribute("data-step"));
      abrirPopUp(step);
    });
  }
});

abrirPopUp(1);
