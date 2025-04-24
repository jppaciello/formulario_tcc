document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("securityForm");
    const resultDiv = document.getElementById("result");
    const respostas = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Coletar dados do formulário
        const companyName = document.getElementById("companyName").value;
        const cloudUsage = document.getElementById("cloudUsage").value;
        
        // Lista de todas as perguntas do formulário (nomes dos radio groups)
        const questions = [
            "securityPolicy", "mfa", "backup", "training", "encryption",
            "audit", "accessControl", "incidentPlan", "monitoring",
            "identityManagement", "secureConnections", "accessLogging",
            "dataRetention", "lgpdCompliance", "versionControl", "pentests",
            "securityOfficer", "dataIsolation", "vendorContractSecurity",
            "assetInventory", "firewall", "riskAssessment", "byodPolicy",
            "patchManagement", "policyReview", "incidentReporting",
            "thirdPartySecurity", "dlp"
        ];

        let score = 0;

        // Calcular pontuação
        questions.forEach(question => {
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            if (selectedOption && selectedOption.value === "1") {
                score += 1; // 1 ponto para cada resposta "Sim"
            }
        });

        // Pontuação adicional para uso de nuvem
        if (cloudUsage === "total") score += 2;
        else if (cloudUsage === "parcial") score += 1;

        // Avaliação
        let nivel = "";
        let cor = "";
        let impacto = "";
        let impactoFinanceiro = "";

        if (score >= 24) {
            nivel = "Preparada";
            cor = "green";
            impacto = "Sua empresa demonstra uma base sólida de boas práticas em segurança digital.";
            impactoFinanceiro = "Impacto financeiro mínimo. A empresa está bem posicionada para adotar soluções SaaS com eficiência.";
        } else if (score >= 15) {
            nivel = "Em Desenvolvimento";
            cor = "orange";
            impacto = "Sua empresa está no caminho certo! Porém, há áreas para melhorar.";
            impactoFinanceiro = "Investimentos pontuais podem acelerar a adoção segura de SaaS.";
        } else {
            nivel = "Oportunidade de Crescimento";
            cor = "red";
            impacto = "Sua empresa está em uma fase inicial em termos de segurança.";
            impactoFinanceiro = "Investimentos em segurança são essenciais para garantir a proteção de dados e continuidade do negócio.";
        }

        // Armazenar resultados
        respostas.push({
            companyName,
            score,
            nivel,
            cor,
            impacto,
            impactoFinanceiro
        });

        // Gerar tabela de resultados
        let tableHTML = `
            <h3>Resultado para ${companyName}</h3>
            <div class="score-summary">
                <p><strong>Pontuação Total:</strong> ${score}/30</p>
                <p><strong>Nível de Segurança:</strong> <span style="color: ${cor}">${nivel}</span></p>
            </div>
            <div class="assessment">
                <h4>Diagnóstico:</h4>
                <p>${impacto}</p>
                <h4>Recomendações Financeiras:</h4>
                <p>${impactoFinanceiro}</p>
            </div>
            <h4>Histórico de Avaliações</h4>
            <table class="results-table">
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>Pontuação</th>
                        <th>Nível</th>
                    </tr>
                </thead>
                <tbody>
        `;

        respostas.forEach(resposta => {
            tableHTML += `
                <tr>
                    <td>${resposta.companyName}</td>
                    <td>${resposta.score}</td>
                    <td style="color: ${resposta.cor}">${resposta.nivel}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        resultDiv.innerHTML = tableHTML;
        resultDiv.classList.remove("hidden");

        // Opcional: Scroll para o resultado
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});