document.addEventListener("DOMContentLoaded", () => {
  inicializarModalAvaliacao();
  inicializarEstrelas();
  configurarEnvioAvaliacao();
});

function inicializarModalAvaliacao() {
  const modal = document.getElementById("modalAvaliacao");
  const botaoAbrir = document.getElementById("abrirAvaliacao");
  const botaoFechar = document.getElementById("fecharAvaliacao");

  if (!modal) return;

  if (botaoAbrir) {
    botaoAbrir.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.add("aberto");
      limparFeedback();
    });
  }

  if (botaoFechar) {
    botaoFechar.addEventListener("click", () => fecharModal(modal));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) fecharModal(modal);
    });
  }
}

function fecharModal(modal) {
  modal.classList.remove("aberto");
  limparFormularioAvaliacao();
  limparFeedback();
}

function inicializarEstrelas() {
  const estrelas = document.querySelectorAll(".estrela");
  
  estrelas.forEach((estrela) => {
    estrela.addEventListener("click", () => {
      const notaSelecionada = Number(estrela.dataset.nota);
      
      estrelas.forEach((item) => {
        item.classList.toggle("selecionada", Number(item.dataset.nota) <= notaSelecionada);
      });
    });
  });
}

function configurarEnvioAvaliacao() {
  const botaoEnviar = document.getElementById("enviarAvaliacao");
  if (!botaoEnviar) return;

  botaoEnviar.addEventListener("click", async () => {
    limparFeedback();
    
    const dados = coletarDadosFormulario();
    if (!dados) return;

    const banco = conectarSupabase();
    if (!banco) {
      mostrarFeedback("Erro ao conectar com o banco de dados.", "erro");
      return;
    }

    await enviarDadosParaBanco(banco, dados, botaoEnviar);
  });
}

function coletarDadosFormulario() {
  const email = document.getElementById("emailAvaliacao");
  const comentario = document.getElementById("comentario");
  const estrelasSelecionadas = document.querySelectorAll(".estrela.selecionada");

  if (!email.value.trim() || !email.checkValidity()) {
    mostrarFeedback("Digite um e-mail válido!", "erro");
    email.focus();
    return null;
  }

  if (estrelasSelecionadas.length === 0) {
    mostrarFeedback("Selecione as estrelas!", "erro");
    return null;
  }

  if (!comentario.value.trim()) {
    mostrarFeedback("Escreva um comentário!", "erro");
    comentario.focus();
    return null;
  }

  return {
    email: email.value.trim(),
    nota: estrelasSelecionadas.length,
    comentario: comentario.value.trim()
  };
}

function conectarSupabase() {
  if (window.supabase && window.supabase.createClient) {
    return window.supabase.createClient(
      "https://mquahhvooknzibrzrfvn.supabase.co",
      "sb_publishable__nLHj5Nse0fdbAn1mWj3uQ_YuZXCRAy"
    );
  }
  return null;
}

async function enviarDadosParaBanco(banco, dados, botaoEnviar) {
  botaoEnviar.disabled = true;
  botaoEnviar.textContent = "Enviando...";

  try {
    const { error } = await banco.from("avaliacoes").insert([dados]);

    if (error) {
      console.error(error);
      mostrarFeedback("Erro ao salvar a avaliação.", "erro");
      return;
    }

    mostrarFeedback("Avaliação enviada com sucesso!", "sucesso");
    limparFormularioAvaliacao();
    
    setTimeout(() => {
      const modal = document.getElementById("modalAvaliacao");
      if (modal) modal.classList.remove("aberto");
      limparFeedback();
    }, 2000);

  } catch (erro) {
    console.error(erro);
    mostrarFeedback("Erro de conexão. Tente novamente.", "erro");
  } finally {
    botaoEnviar.disabled = false;
    botaoEnviar.textContent = "Enviar avaliação";
  }
}

function limparFormularioAvaliacao() {
  const email = document.getElementById("emailAvaliacao");
  const comentario = document.getElementById("comentario");
  
  if (email) email.value = "";
  if (comentario) comentario.value = "";
  
  document.querySelectorAll(".estrela").forEach((item) => {
    item.classList.remove("selecionada");
  });
}

function mostrarFeedback(mensagem, tipo) {
  const containerAvaliacao = document.querySelector(".avaliacao");
  if (!containerAvaliacao) return;

  let feedback = document.getElementById("mensagemStatusAvaliacao");
  if (!feedback) {
    feedback = document.createElement("p");
    feedback.id = "mensagemStatusAvaliacao";
    feedback.setAttribute("role", "status");
    containerAvaliacao.insertBefore(feedback, document.getElementById("enviarAvaliacao"));
  }

  feedback.textContent = mensagem;
  feedback.className = `feedback-status ${tipo}`;
}

function limparFeedback() {
  const feedback = document.getElementById("mensagemStatusAvaliacao");
  if (feedback) {
    feedback.textContent = "";
    feedback.className = "";
  }
}