document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("securityForm");
    const resultDiv = document.getElementById("result");
    const respostas = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const companyName = document.getElementById("companyName").value;
        const cloudUsage = document.getElementById("cloudUsage").value;
        const securityPolicy = document.querySelector('input[name="securityPolicy"]:checked')?.value;
        const mfa = document.querySelector('input[name="mfa"]:checked')?.value;
        const backup = document.querySelector('input[name="backup"]:checked')?.value;

        let score = 0;
        if (cloudUsage === "total" || cloudUsage === "parcial") score += 2;
        if (securityPolicy === "sim") score += 2;
        if (mfa === "sim") score += 2;
        if (backup === "diario") score += 2;
        else if (backup === "semanal") score += 1;

        let nivel = "";
        let cor = "";
        let impacto = "";
        let impactoFinanceiro = "";

        if (score >= 7) {
            nivel = "Preparada";
            cor = "green";
            impacto = "Sua empresa demonstra uma base sólida de boas práticas em segurança digital e está bem posicionada para aproveitar os benefícios das soluções SaaS.";
            impactoFinanceiro = "Impacto financeiro mínimo. A empresa já possui estrutura e cultura adequadas, o que facilita a adoção com economia de recursos em médio e longo prazo.";
        } else if (score >= 4) {
            nivel = "Em Desenvolvimento";
            cor = "orange";
            impacto = "Sua empresa está no caminho certo! Ainda há espaço para evoluir, especialmente em aspectos como autenticação forte e políticas formais. Isso representa uma excelente oportunidade para amadurecimento tecnológico.";
            impactoFinanceiro = "Investimentos pontuais podem acelerar a transição para SaaS com segurança. Adotar melhores práticas agora pode evitar custos maiores no futuro.";
        } else {
            nivel = "Oportunidade de Crescimento";
            cor = "gray";
            impacto = "Sua empresa está em uma fase inicial em termos de maturidade em segurança da informação. Este é um momento ideal para planejar melhorias e construir uma base mais segura e escalável rumo ao SaaS.";
            impactoFinanceiro = "O investimento inicial pode ser mais significativo, mas é estratégico e essencial para garantir proteção de dados, continuidade do negócio e competitividade no mercado.";
        }

        respostas.push({ companyName, score, nivel, cor, impacto, impactoFinanceiro });

        let tableHTML = `
            <h3>Dashboard de Avaliações</h3>
            <table>
                <tr>
                    <th>Empresa</th>
                    <th>Pontuação</th>
                    <th>Nível</th>
                    <th>Diagnóstico</th>
                    <th>Impacto Estrutural e Financeiro</th>
                </tr>
        `;

        respostas.forEach(resposta => {
            tableHTML += `
                <tr>
                    <td>${resposta.companyName}</td>
                    <td>${resposta.score}</td>
                    <td style="color: ${resposta.cor}; font-weight: bold;">${resposta.nivel}</td>
                    <td>${resposta.impacto}</td>
                    <td>${resposta.impactoFinanceiro}</td>
                </tr>
            `;
        });

        tableHTML += "</table>";
        resultDiv.innerHTML = tableHTML;
        resultDiv.classList.remove("hidden");

        form.reset();
    });
});
