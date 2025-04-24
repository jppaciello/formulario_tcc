// carregando o documento
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("securityForm");
    const resultDiv = document.getElementById("result");
    const respostas = [];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // variaveis das perguntas
        const companyName = document.getElementById("companyName").value;
        const cloudUsage = document.getElementById("cloudUsage").value;
        const securityPolicy = document.querySelector('input[name="securityPolicy"]:checked')?.value;
        const mfa = document.querySelector('input[name="mfa"]:checked')?.value;
        const backup = document.querySelector('input[name="backup"]:checked')?.value;
        const training = document.querySelector('input[name="training"]:checked')?.value;
        const encryption = document.querySelector('input[name="encryption"]:checked')?.value;
        const audit = document.querySelector('input[name="audit"]:checked')?.value;
        const accessControl = document.querySelector('input[name="accessControl"]:checked')?.value;
        const incidentPlan = document.querySelector('input[name="incidentPlan"]:checked')?.value;
        const dataClassification = document.querySelector('input[name="dataClassification"]:checked')?.value;
        const accessLogging = document.querySelector('input[name="accessLogging"]:checked')?.value;
        const passwordPolicy = document.querySelector('input[name="passwordPolicy"]:checked')?.value;
        const vendorRisk = document.querySelector('input[name="vendorRisk"]:checked')?.value;
        const userConsent = document.querySelector('input[name="userConsent"]:checked')?.value;
        const dataRetention = document.querySelector('input[name="dataRetention"]:checked')?.value;
        const mobileSecurity = document.querySelector('input[name="mobileSecurity"]:checked')?.value;
        const vulnerabilityScan = document.querySelector('input[name="vulnerabilityScan"]:checked')?.value;
        const physicalSecurity = document.querySelector('input[name="physicalSecurity"]:checked')?.value;
        const dataAnonymization = document.querySelector('input[name="dataAnonymization"]:checked')?.value;

        let score = 0;

        // Pontuação das perguntas
        if (cloudUsage === "total" || cloudUsage === "parcial") score += 2;
        if (securityPolicy === "1") score += 2;
        if (mfa === "1") score += 2;
        if (backup === "1") score += 2;
        else if (backup === "0") score += 1;
        if (training === "1") score += 2;
        if (encryption === "1") score += 2;
        if (audit === "1") score += 2;
        if (accessControl === "1") score += 2;
        if (incidentPlan === "1") score += 2;
        if (dataClassification === "1") score += 2;
        if (accessLogging === "1") score += 2;
        if (passwordPolicy === "1") score += 2;
        else if (passwordPolicy === "0") score += 1;
        if (vendorRisk === "1") score += 2;
        if (userConsent === "1") score += 2;
        if (dataRetention === "1") score += 2;
        if (mobileSecurity === "1") score += 2;
        if (vulnerabilityScan === "1") score += 2;
        if (physicalSecurity === "1") score += 2;
        if (dataAnonymization === "1") score += 2;

        let nivel = "";
        let cor = "";
        let impacto = "";
        let impactoFinanceiro = "";

        if (score >= 36) {
            nivel = "Preparada";
            cor = "green";
            impacto = "Sua empresa demonstra uma base sólida de boas práticas em segurança digital.";
            impactoFinanceiro = "Impacto financeiro mínimo. A empresa está bem posicionada para adotar soluções SaaS com eficiência.";
        } else if (score >= 24) {
            nivel = "Em Desenvolvimento";
            cor = "orange";
            impacto = "Sua empresa está no caminho certo! Porém, há áreas para melhorar.";
            impactoFinanceiro = "Investimentos pontuais podem acelerar a adoção segura de SaaS.";
        } else {
            nivel = "Oportunidade de Crescimento";
            cor = "gray";
            impacto = "Sua empresa está em uma fase inicial em termos de segurança.";
            impactoFinanceiro = "Investimentos em segurança são essenciais para garantir a proteção de dados e continuidade do negócio.";
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