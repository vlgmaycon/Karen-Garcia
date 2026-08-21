const URL = "https://script.google.com/macros/s/AKfycbx0gAnvDMbRhTUutjkCE3XIWZJYVMdooX7c0h6nU1AxUYyyU-ESiSBeNU1UxpVpYt_Egg/exec";

/* ===========================================
   DRA. KAREN GARCIA
   ADVOCACIA ESPECIALIZADA
===========================================*/

document.addEventListener('DOMContentLoaded', () => {

    // MENU MUDA AO ROLAR
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }
        });
    }

    // BOTÃO WHATSAPP PULSANDO
    const whatsapp = document.querySelector(".btn-whatsapp");

    if (whatsapp) {
        setInterval(() => {
            whatsapp.classList.toggle("pulse");
        }, 1200);
    }

    // ALTERNÂNCIA DE ABAS (ÁREAS DE ATUAÇÃO)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cardsGrids = document.querySelectorAll('.cards-grid');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-target');

                // Remove a classe active de todas as abas e grids
                tabButtons.forEach(btn => btn.classList.remove('active'));
                cardsGrids.forEach(grid => grid.classList.remove('active'));

                // Adiciona active na aba e grid selecionados
                button.classList.add('active');
                const targetGrid = document.getElementById(target);
                if (targetGrid) {
                    targetGrid.classList.add('active');
                }
            });
        });
    }

    // CARROSSEL DE AVALIAÇÕES (NAVEGAÇÃO POR SETAS)
    const carrossel = document.getElementById('carrossel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (carrossel && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            carrossel.scrollBy({ left: 320, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carrossel.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

    // ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA
    const cards = document.querySelectorAll(".card, .card-avaliacao");

    if (cards.length > 0 && 'IntersectionObserver' in window) {
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
    }

    /* =====================================================
       FORMULÁRIO - GOOGLE SHEETS & WHATSAPP
    ===================================================== */

    const form = document.getElementById("form-contato");
    const mensagem = document.getElementById("mensagem");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const botao = form.querySelector("button");
            botao.disabled = true;
            botao.textContent = "Enviando...";

            if (mensagem) {
                mensagem.textContent = "";
            }

            const nomeValor = form.nome.value;
            const emailValor = form.email.value;
            const telefoneValor = form.telefone.value;
            const casoValor = form.caso.value;

            const dados = {
                nome: nomeValor,
                email: emailValor,
                telefone: telefoneValor,
                caso: casoValor
            };

            try {
                await fetch(URL, {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(dados)
                });

                if (mensagem) {
                    mensagem.style.color = "#2e7d32";
                    mensagem.innerHTML = "✓ Solicitação enviada com sucesso! Redirecionando para o WhatsApp...";
                }

                form.reset();

                setTimeout(() => {
                    const texto = `Olá Dra. Karen!\n\nMeu nome é ${nomeValor}.\n\nTelefone: ${telefoneValor}\n\nE-mail: ${emailValor}\n\nGostaria de falar sobre:\n\n${casoValor}`;

                    window.open(
                        "https://wa.me/5547999602260?text=" + encodeURIComponent(texto),
                        "_blank"
                    );
                }, 1500);

            } catch (erro) {
                console.error("Erro:", erro);

                if (mensagem) {
                    mensagem.style.color = "#c62828";
                    mensagem.textContent = "Erro de conexão. Tente novamente.";
                }
            } finally {
                botao.disabled = false;
                botao.textContent = "Solicitar Atendimento";
            }
        });
    }

});