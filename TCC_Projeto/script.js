document.getElementById("securityForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let companyName = document.getElementById("companyName").value;
    let cloudUsage = document.getElementById("cloudUsage").value;
    let securityPolicy = document.querySelector('input[name="securityPolicy"]:checked')?.value;
    let mfa = document.querySelector('input[name="mfa"]:checked')?.value;
    let backup = document.querySelector('input[name="backup"]:checked')?.value;

    let score = 0;

    if (cloudUsage === "total" || cloudUsage === "parcial") score += 2;
    if (securityPolicy === "sim") score += 2;
    if (mfa === "sim") score += 2;
    if (backup === "diario") score += 2;
    else if (backup === "semanal") score += 1;

    let resultText = `<h3>Resultado da Avaliação</h3>`;
    resultText += `<p><strong>Empresa:</strong> ${companyName}</p>`;

    if (score >= 7) {
        resultText += `<p style="color: green;">Sua empresa está bem preparada para a migração para SaaS!</p>`;
    } else if (score >= 4) {
        resultText += `<p style="color: orange;">Sua empresa está no caminho certo, mas precisa melhorar em alguns aspectos.</p>`;
    } else {
        resultText += `<p style="color: red;">Sua empresa precisa reforçar a segurança antes de migrar para SaaS.</p>`;
    }

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = resultText;
    resultDiv.classList.remove("hidden");
});