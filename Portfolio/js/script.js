// ---------------- DARK AND LIGHT MODE ----------------
document.addEventListener('DOMContentLoaded', function () {
  // Função para alternar o modo de cores
  function toggleColorScheme(event) {
    const body = document.body
    const profilePic = document.querySelector('.profile-pic')
    const hrElements = document.querySelectorAll('.custom-hr')
    const switchText = document.querySelector('.switchText')
    const scrollTitles = document.querySelectorAll('.scroll-title')
    const isChecked = event.target.checked

    const commentHeader = document.querySelector('.comment-header')
    const commentTitle = document.querySelector('.comment-title')
    const commentIcons = document.querySelectorAll('.comment-icons i')
    const commentBox = document.querySelector('.comment-box')

    if (isChecked) {
      body.classList.add('dark')
      profilePic.classList.add('dark')
      commentHeader.classList.add('dark')
      commentTitle.classList.add('dark')
      commentBox.classList.add('dark')
      switchText.textContent = 'Dark'
      hrElements.forEach((hr) => {
        hr.classList.add('dark')
      })
      commentIcons.forEach((icon) => {
        icon.classList.add('dark')
      })
      scrollTitles.forEach((scroll) => {
        scroll.classList.add('dark')
      })
      console.log('hey')
    } else {
      body.classList.remove('dark')
      commentBox.classList.remove('dark')
      commentHeader.classList.remove('dark')
      commentTitle.classList.remove('dark')
      profilePic.classList.remove('dark')
      switchText.textContent = 'Light'
      commentIcons.forEach((icon) => {
        icon.classList.remove('dark')
      })
      hrElements.forEach((hr) => {
        hr.classList.remove('dark')
      })
      scrollTitles.forEach((scroll) => {
        scroll.classList.remove('dark')
      })
    }
  }

  toggleColorScheme({ target: { checked: true } })

  // Adiciona um listener de evento para o switch button
  const toggleSwitch = document.querySelector('.toggle-switch input')
  toggleSwitch.addEventListener('change', toggleColorScheme)

  // ---------------- Maxed Img ----------------

  // Obtém todas as imagens com a classe "clickable-image"
  const images = document.querySelectorAll('.clickable-image')

  // Obtém o modal e a imagem dentro do modal
  const modal = document.getElementById('imageModal')
  const modalImage = document.getElementById('modalImage')

  // Percorre as imagens e adiciona o evento de clique
  images.forEach((image) => {
    image.addEventListener('click', function () {
      // Exibe o modal
      modal.style.display = 'flex'
      // Define a imagem clicada como a imagem do modal
      modalImage.src = this.src
      document.body.style.overflow = 'hidden'
    })
  })

  // Fecha o modal quando o usuário clica no "X"
  const closeButton = document.getElementsByClassName('close')[0]
  closeButton.addEventListener('click', function () {
    document.body.style.overflow = ''
    modal.style.display = 'none'
  })
})

function scrollToSection() {
  var element = document.getElementById('project-holder')
  console.log(element)
  element.scrollIntoView({ behavior: 'smooth' })
}




document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const modalList = document.getElementById("modal-list");
  const modalImage = document.getElementById("modal-image");
  const modalLink = document.getElementById("modal-link");
  const closeBtn = document.querySelector(".close");


  if (closeBtn) {
    console.log('achei')
  }

  const projects = {
    convite: {
      title: "Convite com Motion para Toyoserra",
      description:
        "Um site com motions desenvolvido para a Toyoserra, focado em design e impacto visual. Ele foi criado como um convite interativo para a inauguração de uma loja, com o objetivo de tornar o evento uma verdadeira experiência.",
      points: [
        "<strong>Animações</strong>: Utilização de motion design para criar um convite visualmente atraente.",
        "<strong>Personalização do Nome</strong>: Cada cliente recebe um URL único com seu nome personalizado no convite.",
        "<strong>Confirmação em Tempo Real</strong>: Todas as confirmações são enviadas para um banco de dados Firebase, gerando uma lista de confirmações em tempo real."
      ],
      image: "./projeto4.jpeg",
      link: "https://jpirnanda.github.io/Convite/"
    },
    linkzap: {
      title: "LinkZap",
      description:
        "Site desenvolvido utilizando HTML, CSS, JavaScript e Bootstrap 5, projetado como ferramenta de marketing para criar links com a API do WhatsApp. O objetivo é facilitar a criação de links com mensagens personalizadas para WhatsApp e uso no marketing.",
      points: [
        "<strong>Input de Mensagem</strong>: Permite ao usuário inserir a mensagem que deseja que o cliente envie ao entrar em contato.",
        "<strong>Input de Número de WhatsApp</strong>: Onde o usuário insere seu próprio número de WhatsApp para gerar o link da API."
      ],
      image: "./projeto6.jpeg",
      link: "https://jpirnanda.github.io/LinkZap/",
    },
    portfolio: {
      title: "Portfólio Profissional",
      description:
        "Este portfólio foi desenvolvido seguindo o fluxo completo de web design, desde a criação do wireframe até a conceitualização no Figma e o desenvolvimento do código. Ele representa a fusão entre design e funcionalidade, proporcionando uma navegação fluida e intuitiva.",
      points: [
        "<strong>Wireframe e Conceitualização</strong>: Planejamento visual no Figma para definir a estrutura e identidade do projeto.",
        "<strong>Desenvolvimento Responsivo</strong>: Implementação com HTML, CSS e JavaScript para garantir compatibilidade em diferentes dispositivos.",
        "<strong>Design Moderno</strong>: Uso das melhores práticas de web design para criar uma experiência agradável e profissional."
      ],
      image: "./projeto5.jpeg",
      link: "", // Substitua pelo link real do projeto, se houver
    },
    newscrapper: {
      title: "Newscrapper",
      description:
        "O Newscrapper é um aplicativo desenvolvido com React para a interface, utilizando Ant Design como biblioteca de design. Ele conta com uma API em Python, hospedada como web service no Render, que realiza scraping de notícias da web. Além disso, a API está integrada à IA GPT da OpenAI, permitindo resumir e reescrever as notícias com um viés personalizado definido no prompt.",
      points: [
        "<strong>Scraping de Notícias</strong>: Extração automática de conteúdos de sites de notícias.",
        "<strong>Resumo Inteligente</strong>: Utilização da IA GPT para resumir artigos e destacar informações essenciais.",
        "<strong>Personalização de Viés</strong>: Reescrita das notícias de acordo com um viés determinado no prompt.",
        "<strong>Interface Moderna</strong>: Construída com React e Ant Design para uma experiência fluida e responsiva."
      ],
      image: "./projeto7.jpeg", // Substitua pela imagem real, se houver
      link: "https://newscrapper-914a8.web.app/"
    },
    dashboard: {
      title: "Dashboard de Desempenho Digital",
      description:
        "Dashboard interativo desenvolvido no Google Looker (Data Studio) para análise de desempenho do setor digital. A ferramenta permite segmentação detalhada e sincronização em tempo real, proporcionando insights acionáveis para otimização contínua. (Dados ilustrativos)",
      points: [
        "<strong>Análise de Desempenho</strong>: Avaliação de KPIs e métricas do setor digital.",
        "<strong>Filtros e Segmentação</strong>: Personalização de dados para análise mais precisa.",
        "<strong>Sincronização em Tempo Real</strong>: Atualização automática dos dados para decisões ágeis.",
        "<strong>Design Intuitivo</strong>: Interface limpa e de fácil navegação para visualização eficiente."
      ],
      image: "./projeto2.jpeg", // Substitua pela imagem real, se houver
      link: "indisponivel" // Adicione o link real, se disponível
    },
    gestor: {
      title: "Sistema de Gestão de Estoque",
      description:
        "Sistema inovador desenvolvido em Django e Python para controle de estoque, com atualizações dinâmicas para decisões rápidas. Ele integra com planilhas, verifica anúncios em portais por API e monitora a veiculação de anúncios, economizando horas de trabalho diariamente.",
      points: [
        "<strong>Controle de Estoque</strong>: Monitoramento e gestão eficiente do estoque com atualização em tempo real.",
        "<strong>Integração com Planilhas</strong>: Conexão direta com planilhas para visualização e controle de dados.",
        "<strong>Verificação de Anúncios</strong>: Monitoramento de portais integrados via API e checagem da veiculação de anúncios.",
        "<strong>Automação de Processos</strong>: Redução significativa de horas de trabalho diárias, apontando apenas o que falta fazer."
      ],
      image: "./projeto1.jpeg", // Substitua pela imagem real, se houver
      link: "indisponivel" // Adicione o link real, se disponível
    }


  };

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function () {

      const projectKey = card.getAttribute("data-project");
      const project = projects[projectKey];

      modalTitle.textContent = project.title;
      modalText.textContent = project.description;
      modalList.innerHTML = project.points.map(point => `<li>${point}</li>`).join("");
      modalImage.src = project.image;
      modalLink.href = project.link;

      // Verifica se o link é "indisponível" e altera o comportamento do botão
      if (project.link === "indisponivel") {
        modalLink.innerHTML = `
      <div style="text-align: center; margin-top: 10px;">
        <button onclick="alert('Desculpe! Como usa dados privados, esse projeto está indisponível no momento :(. Estou trabalhando em uma reposição com dados de placeholder ;)')"
                style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Ver Projeto
        </button>
      </div>
    `;
      } else {
        modalLink.innerHTML = `
      <div style="text-align: center; margin-top: 10px;">
        <a href="${project.link}" target="_blank" 
          style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Ver Projeto
        </a>
      </div>
    `;
      }

      modal.style.display = "flex";
      const body = document.documentElement.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", function () {
    console.log('Clicado')
    modal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      const body = document.documentElement.style.overflow = "visible";
    }
  });
});
