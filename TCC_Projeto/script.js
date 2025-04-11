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
            impacto = "A empresa está pronta para adotar soluções SaaS com segurança. As práticas atuais indicam uma cultura madura em proteção de dados, o que minimiza riscos e favorece a escalabilidade.";
            impactoFinanceiro = "Baixo impacto financeiro. A empresa provavelmente já investiu em ferramentas, políticas e treinamentos. A economia virá da redução de custos com infraestrutura física, manutenção e suporte.";
        } else if (score >= 4) {
            nivel = "Parcialmente Preparada";
            cor = "orange";
            impacto = "A empresa está em um estágio intermediário. Existem boas práticas, mas ainda há lacunas críticas que devem ser preenchidas para evitar riscos à segurança da informação.";
            impactoFinanceiro = "Médio impacto financeiro e estrutural. Serão necessários investimentos moderados em segurança, treinamentos e revisão de processos antes da migração total para SaaS.";
        } else {
            nivel = "Não Preparada";
            cor = "red";
            impacto = "A empresa ainda não está pronta para SaaS. Há falhas importantes em políticas, autenticação e backup, o que pode trazer riscos graves à continuidade e segurança dos dados.";
            impactoFinanceiro = "Alto impacto financeiro e estrutural. A migração exigirá investimentos consideráveis em estrutura tecnológica, capacitação da equipe e revisão de processos internos.";
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
