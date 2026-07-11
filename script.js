const URL = "https://script.google.com/macros/s/AKfycbx0gAnvDMbRhTUutjkCE3XIWZJYVMdooX7c0h6nU1AxUYyyU-ESiSBeNU1UxpVpYt_Egg/exec";

/* ===========================================
   DRA. KAREN GARCIA
   ADVOCACIA DE TRÂNSITO
===========================================*/

// MENU MUDA AO ROLAR

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scroll");

    } else {

        header.classList.remove("scroll");

    }

});

// BOTÃO WHATSAPP PULSANDO

const whatsapp = document.querySelector(".btn-whatsapp");

setInterval(() => {

    whatsapp.classList.toggle("pulse");

}, 1200);

// ANIMAÇÃO DOS CARDS

const cards = document.querySelectorAll(".card");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("show");

        }

    });

}, {

    threshold: .25

});

cards.forEach((card) => {

    observador.observe(card);

});

/* =====================================================
   FORMULÁRIO - GOOGLE SHEETS
===================================================== */

const form = document.getElementById("form-contato");

const mensagem = document.getElementById("mensagem");

if(form){

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const botao = form.querySelector("button");

    botao.disabled = true;

    botao.textContent = "Enviando...";

    mensagem.textContent = "";

    const dados = {

        nome: form.nome.value,

        email: form.email.value,

        telefone: form.telefone.value,

        caso: form.caso.value

    };

    try{

        const resposta = await fetch(URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(dados)
        });

        if (true) {

            mensagem.style.color = "#2e7d32";

            mensagem.innerHTML = "✓ Solicitação enviada com sucesso! Redirecionando para o WhatsApp...";

            const nome = form.nome.value;
            const telefone = form.telefone.value;
            const email = form.email.value;
            const caso = form.caso.value;

            form.reset();

            setTimeout(() => {

                const texto = `Olá Dra. Karen!

        Meu nome é ${nome}.

        Telefone: ${telefone}

        E-mail: ${email}

        Gostaria de falar sobre:

        ${caso}`;

                window.open(
                    "https://wa.me/5547999602260?text=" + encodeURIComponent(texto),
                    "_blank"
                );

            }, 1500);

        }

    } catch (erro) {

    console.error("Erro:", erro);

    mensagem.style.color = "#c62828";

    mensagem.textContent = "Erro de conexão.";

     }

    botao.disabled=false;

    botao.textContent="Solicitar Atendimento";

});

}