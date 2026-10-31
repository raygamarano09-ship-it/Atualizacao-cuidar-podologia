
document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS
  const botaoAbrir = document.getElementById("abrirAvaliacao");
  const modal = document.getElementById("modalAvaliacao");
  const botaoFechar = document.getElementById("fecharAvaliacao");

  const estrelas = document.querySelectorAll(".estrela");
  const email = document.getElementById("emailAvaliacao");
  const comentario = document.getElementById("comentario");
  const botaoEnviar = document.getElementById("enviarAvaliacao");

  let nota = 0;

  // ABRIR A JANELA
  if (botaoAbrir && modal) {
    botaoAbrir.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.add("aberto");
    });
  } else {
    console.error("Botão ou janela de avaliação não encontrados.");
  }

  // FECHAR A JANELA
  if (botaoFechar && modal) {
    botaoFechar.addEventListener("click", () => {
      modal.classList.remove("aberto");
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("aberto");
      }
    });
  }

  // ESTRELAS
  estrelas.forEach((estrela) => {
    estrela.addEventListener("click", () => {

      nota = Number(estrela.dataset.nota);

      estrelas.forEach((item) => {
        item.classList.toggle(
          "selecionada",
          Number(item.dataset.nota) <= nota
        );
      });

    });
  });

  // INICIALIZAR SUPABASE
  let banco = null;

  if (window.supabase && window.supabase.createClient) {

    const SUPABASE_URL = "https://mquahhvooknzibrzrfvn.supabase.co";
    const SUPABASE_KEY = "sb_publishable__nLHj5Nse0fdbAn1mWj3uQ_YuZXCRAy";

    banco = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

  } else {
    console.error("Biblioteca do Supabase não carregada.");
  }

  // ENVIAR AVALIAÇÃO
  if (botaoEnviar) {
    botaoEnviar.addEventListener("click", async () => {

      if (!email.value.trim()) {
        alert("Digite seu e-mail!");
        email.focus();
        return;
      }

      if (!email.checkValidity()) {
        alert("Digite um e-mail válido!");
        email.focus();
        return;
      }

      if (nota === 0) {
        alert("Selecione as estrelas!");
        return;
      }

      if (!comentario.value.trim()) {
        alert("Escreva um comentário!");
        comentario.focus();
        return;
      }

      if (!banco) {
        alert("Não foi possível conectar ao banco de dados.");
        return;
      }

      botaoEnviar.disabled = true;
      botaoEnviar.textContent = "Enviando...";

      try {

        const { error } = await banco
          .from("avaliacoes")
          .insert([{
            email: email.value.trim(),
            nota: nota,
            comentario: comentario.value.trim()
          }]);

        if (error) {
          console.error(error);
          alert("Erro ao salvar a avaliação.");
          return;
        }

        alert("Avaliação enviada com sucesso!");

        email.value = "";
        comentario.value = "";
        nota = 0;

        estrelas.forEach((item) => {
          item.classList.remove("selecionada");
        });

        modal.classList.remove("aberto");

      } catch (erro) {
        console.error(erro);
        alert("Erro de conexão. Tente novamente.");

      } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar avaliação";
      }

    });
  }

});
