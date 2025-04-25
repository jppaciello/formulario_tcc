document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("securityForm");
    const divResultado = document.getElementById("result");
    const historicoAvaliacoes = [];

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        // Coletar dados do formulário
        const nomeEmpresa = document.getElementById("companyName").value;
        const usoNuvem = document.getElementById("cloudUsage").value;
        
        // Lista de todas as perguntas do formulário
        const perguntas = [
            "securityPolicy", "mfa", "backup", "training", "encryption",
            "audit", "accessControl", "incidentPlan", "monitoring",
            "identityManagement", "secureConnections", "accessLogging",
            "dataRetention", "lgpdCompliance", "versionControl", "pentests",
            "securityOfficer", "dataIsolation", "vendorContractSecurity",
            "assetInventory", "firewall", "riskAssessment", "byodPolicy",
            "patchManagement", "policyReview", "incidentReporting",
            "thirdPartySecurity", "dlp"
        ];

        let pontuacao = 0;

        // Calcular pontuação
        perguntas.forEach(pergunta => {
            const opcaoSelecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
            if (opcaoSelecionada && opcaoSelecionada.value === "1") {
                pontuacao += 1;
            }
        });

        // Pontuação adicional para uso de nuvem
        if (usoNuvem === "total") pontuacao += 2;
        else if (usoNuvem === "parcial") pontuacao += 1;

        // Determinar nível de segurança
        let nivelSeguranca = "";
        let classeNivel = "";
        let diagnostico = "";
        let recomendacaoFinanceira = "";

        if (pontuacao >= 25) {
            nivelSeguranca = "Preparada";
            classeNivel = "prepared";
            diagnostico = "Sua empresa demonstra uma base sólida de boas práticas em segurança digital.";
            recomendacaoFinanceira = "Impacto financeiro mínimo. A empresa está bem posicionada para adotar soluções SaaS com eficiência.";
        } else if (pontuacao >= 15) {
            nivelSeguranca = "Em Desenvolvimento";
            classeNivel = "progress";
            diagnostico = "Sua empresa está no caminho certo! Porém, há áreas para melhorar.";
            recomendacaoFinanceira = "Investimentos pontuais podem acelerar a adoção segura de SaaS.";
        } else {
            nivelSeguranca = "Oportunidade de Crescimento";
            classeNivel = "attention";
            diagnostico = "Sua empresa está em uma fase inicial em termos de segurança.";
            recomendacaoFinanceira = "Investimentos em segurança são essenciais para garantir a proteção de dados e continuidade do negócio.";
        }

        // Armazenar avaliação no histórico
        historicoAvaliacoes.push({
            nomeEmpresa,
            pontuacao,
            nivelSeguranca,
            classeNivel
        });

        // Calcular porcentagem para o medidor
        const porcentagem = Math.round((pontuacao / 30) * 100);

        // Gerar o dashboard moderno
        divResultado.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1>Relatório da Avaliação</h1>
                    <div class="company-badge">${nomeEmpresa}</div>
                </div>
                
                <div class="dashboard-content">
                    <div class="score-card">
                        <div class="gauge-container">
                            <div class="gauge" style="background: conic-gradient(
                                ${classeNivel === 'prepared' ? '#4cc9f0' : classeNivel === 'progress' ? '#f8961e' : '#f72585'} 
                                0% ${porcentagem}%, #e9ecef ${porcentagem}% 100%
                            )"></div>
                            <div class="gauge-label">${pontuacao}/30</div>
                        </div>
                        <h2>Pontuação Total</h2>
                        <div class="security-level">
                            <span class="level-badge ${classeNivel}">${nivelSeguranca}</span>
                        </div>
                    </div>
                    
                    <div class="diagnostic-card">
                        <h2><i class="fas fa-clipboard-check"></i> Diagnóstico</h2>
                        <p>${diagnostico}</p>
                        <div class="progress-indicator">
                            <div class="progress-bar" style="width: ${porcentagem}%"></div>
                        </div>
                    </div>
                    
                    <div class="financial-card">
                        <h2><i class="fas fa-chart-line"></i> Recomendações Financeiras</h2>
                        <p>${recomendacaoFinanceira}</p>
                    </div>
                    
                    <div class="history-card">
                        <h2><i class="fas fa-history"></i> Histórico de Avaliações</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Empresa</th>
                                    <th>Pontuação</th>
                                    <th>Nível</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${historicoAvaliacoes.map(avaliacao => `
                                    <tr>
                                        <td>${avaliacao.nomeEmpresa}</td>
                                        <td>${avaliacao.pontuacao}</td>
                                        <td><span class="level-badge ${avaliacao.classeNivel}">${avaliacao.nivelSeguranca}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        divResultado.classList.remove("hidden");
        divResultado.scrollIntoView({ behavior: 'smooth' });

        // Atualizar o medidor com animação
        const medidor = document.querySelector('.gauge');
        if (medidor) {
            medidor.style.transition = 'background 1s ease-out';
            setTimeout(() => {
                medidor.style.transform = 'rotate(0deg)';
            }, 100);
        }
    });

});