# Mapa SEO

| Página | URL (após definir domínio) | Intenção principal | Title | Observação |
|---|---|---|---|---|
| Início | `/` | Defesa de médicos / Dra. Tamyris Missio (marca + tema) | Defesa de Médicos \| Dra. Tamyris Missio | JSON-LD: WebSite, Person, LegalService |
| Atuação | `/atuacao.html` | Advocacia voltada à defesa médica | Advocacia voltada à defesa médica \| Dra. Tamyris Missio | Explica o foco sem listar serviços não confirmados; BreadcrumbList |
| Sobre | `/sobre.html` | Dra. Tamyris Missio advogada (navegacional) | Dra. Tamyris Missio \| Advogada | Person, BreadcrumbList |
| Contato | `/contato.html` | Contato / atendimento | Contato \| Dra. Tamyris Missio | BreadcrumbList |
| Privacidade | `/privacidade.html` | Transparência (LGPD) | Política de privacidade \| Dra. Tamyris Missio | Indexável, baixa prioridade |
| 404 | (qualquer URL inexistente) | — | Página não encontrada | `noindex`, fora do sitemap |

Termos de trabalho (hipóteses, sem volume/dificuldade medidos): defesa de médicos; advogada para médicos; defesa jurídica de médicos; advocacia voltada à defesa médica; Dra. Tamyris Missio. Não foram usados "especialista", cidade ou região.

## Checklist pós-publicação
- [ ] Domínio definitivo aplicado (`definir-dominio.sh`) e canonicals conferidos
- [ ] HTTPS ativo; redirecionamento http→https e www/sem www (301)
- [ ] 404 retorna status HTTP 404; `/index.html` redireciona para `/`
- [ ] robots.txt liberado (sem `Disallow: /` de testes) e sitemap acessível em `/sitemap.xml`
- [ ] Verificar propriedade no Google Search Console; enviar sitemap; inspecionar a home e solicitar indexação
- [ ] Conferir cobertura/indexação das 5 páginas após alguns dias
- [ ] Testar JSON-LD no Schema.org Validator e Rich Results Test (validade ≠ elegibilidade a recursos do Google; sem promessa de resultado enriquecido)
- [ ] Testar og-image em pré-visualização de WhatsApp/LinkedIn
- [ ] PageSpeed Insights/Lighthouse (diagnóstico) e acompanhar Core Web Vitals reais no Search Console
- [ ] Confirmar compressão e cache na hospedagem
- [ ] Se adicionar analytics/rastreadores, atualizar a política de privacidade antes
