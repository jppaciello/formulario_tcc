document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("securityForm");
    const divResultado = document.getElementById("result");
    const historicoAvaliacoes = [];

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nomeEmpresa = document.getElementById("companyName").value;
        const usoNuvem = document.getElementById("cloudUsage").value;

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

        perguntas.forEach(pergunta => {
            const opcaoSelecionada = document.querySelector(`input[name="${pergunta}"]:checked`);
            if (opcaoSelecionada && opcaoSelecionada.value === "1") {
                pontuacao += 1;
            }
        });

        if (usoNuvem === "total") pontuacao += 2;
        else if (usoNuvem === "parcial") pontuacao += 1;

        let nivelSeguranca = "";
        let classeNivel = "";
        let diagnostico = "";
        let recomendacaoGeral = "";

        if (pontuacao >= 25) {
            nivelSeguranca = "Preparada";
            classeNivel = "prepared";
            diagnostico = `Sua empresa demonstra uma base sólida de boas práticas em segurança digital.  
            As áreas de controle de acesso, backup, conformidade e resposta a incidentes estão bem estruturadas.  

            Exemplos por área:  
            - Controle de Acesso: Políticas claras e autenticação multifator implementadas.  
            - Backup e Continuidade: Rotinas automáticas e testes regulares realizados.  
            - Conformidade Legal: Alinhamento com LGPD, GDPR e ISO 27001 já em prática.  
            - Gestão de Incidentes: Procedimentos definidos e equipe treinada.  
            - Cultura de Segurança: Colaboradores conscientes e boas práticas disseminadas.`;

            recomendacaoGeral = `Impacto financeiro e estrutural mínimo. A empresa está bem posicionada para adotar soluções SaaS com eficiência.
            Objetivo: Manter e evoluir a maturidade de segurança com foco em inovação e resiliência.
            Realize auditorias periódicas e testes de penetração para avaliar continuamente a eficácia das medidas de segurança implementadas e identificar possíveis vulnerabilidades.
            Considere a implementação de um programa de conscientização contínua para garantir que todos os colaboradores estejam atualizados sobre as melhores práticas de segurança e as ameaças emergentes.
            Mantenha a conformidade com normas e legislações relevantes como ISO 27001, LGPD ou GDPR, atualizando processos e controles conforme necessário.`;

        } else if (pontuacao >= 15) {
            nivelSeguranca = "Em Desenvolvimento";
            classeNivel = "progress";
            diagnostico =  `Sua empresa está no caminho certo, com sinais positivos de atenção à segurança digital.  
            Algumas áreas mostram avanços importantes, mas ainda existem oportunidades de melhoria em pontos estratégicos.  

            Exemplos por área:  
            - Controle de Acesso: Políticas básicas em vigor, porém sem autenticação forte.  
            - Backup e Continuidade: Backups realizados, mas sem testes regulares de recuperação.  
            - Conformidade Legal: Conhecimento inicial sobre normas como LGPD, mas sem alinhamento formal.  
            - Gestão de Incidentes: Ausência de plano estruturado, mas com intenção de desenvolvimento.  
            - Cultura de Segurança: Ações pontuais de conscientização, ainda não contínuas.`;

            recomendacaoGeral = `Investimentos pontuais em segurança e cultura organizacional, baseada na transformação digital, podem acelerar a adoção segura de SaaS. 
            Objetivo: Fortalecer áreas críticas para mitigar riscos e aumentar a confiança em soluções SaaS.
            Desenvolva e aplique políticas formais de segurança, abordando controle de acesso, uso de dispositivos e gestão de dados.
            Implemente backups regulares e automatizados, com testes periódicos de restauração para garantir a disponibilidade dos dados em caso de falhas.
            Adote gerenciamento de identidade e autenticação multifator (MFA) para proteger o acesso aos sistemas críticos e às soluções SaaS utilizadas.`;

        } else {
            nivelSeguranca = "Oportunidade de Crescimento";
            classeNivel = "attention";
            diagnostico = `Sua empresa está em uma fase inicial em termos de segurança da informação.  
            Há riscos significativos associados à falta de práticas consolidadas, o que pode comprometer a adoção segura de soluções SaaS.  

            Exemplos por área:  
            - Controle de Acesso: Falta de políticas ou uso de senhas fracas e compartilhadas.  
            - Backup e Continuidade: Ausência de rotinas definidas de backup ou ferramentas utilizadas de forma manual.  
            - Conformidade Legal: Desconhecimento ou falta de adequação à LGPD e outras normas.  
            - Gestão de Incidentes: Não há plano definido para lidar com falhas ou ataques.  
            - Cultura de Segurança: Treinamentos inexistentes e baixa conscientização entre os colaboradores.`;
            
            recomendacaoGeral = `Investimentos em segurança são essenciais para garantir a proteção de dados e continuidade do negócio. 
            Objetivo: Construir uma base mínima de proteção para evitar vulnerabilidades críticas.
            Crie um inventário de ativos, listando todos os sistemas, dispositivos, dados e usuários com acesso à rede da empresa.
            Mantenha todos os softwares atualizados, aplicando correções de segurança assim que forem disponibilizadas pelos fornecedores.
            Elabore um plano básico de resposta a incidentes, definindo quem deve ser acionado, como conter o incidente e como registrar a ocorrência.
            Direcione investimentos iniciais para ferramentas essenciais de proteção, como antivírus, firewall e soluções básicas de backup, mesmo que sejam de baixo custo.`;
        }

        historicoAvaliacoes.push({
            nomeEmpresa,
            pontuacao,
            nivelSeguranca,
            classeNivel
        });

        const porcentagem = Math.round((pontuacao / 30) * 100);

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
                        <h2><i class="fas fa-chart-line"></i> Plano de Ação</h2>
                        <p>${recomendacaoGeral}</p>
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

        const medidor = document.querySelector('.gauge');
        if (medidor) {
            medidor.style.transition = 'background 1s ease-out';
            setTimeout(() => {
                medidor.style.transform = 'rotate(0deg)';
            });
        }

        // Enviar dados para o backend
        fetch("http://localhost:3000/salvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeEmpresa,
                pontuacao,
                nivelSeguranca
            })
        })
        .then(response => response.json())
        .then(data => console.log("Dados salvos no SQLite:", data))
        .catch(error => console.error("Erro ao salvar no backend:", error));
    });
});
