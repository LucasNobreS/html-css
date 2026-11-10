# Dra. Tamyris Missio

Site estático em HTML, CSS e JavaScript puro. Abra dist/index.html ou sirva dist em qualquer hospedagem estática. Não há dependências, compilação, backend ou envio de formulário.

## Edição
- Conteúdo: dist/index.html, contato.html, privacidade.html e 404.html.
- Aparência: dist/assets/css/style.css.
- Menu mobile: dist/assets/js/main.js. Navegação e perguntas frequentes funcionam sem JavaScript.
- Marca: SVG extraído do manual original, sem redesenho. Georgia para títulos e Arial/Helvetica para texto: não foram fornecidos arquivos/licença web de Gotham.
- Home dedicada à defesa do paciente: convênios, cirurgias, materiais, medicamentos, carências e cobranças.

## Mapa SEO
| Página | Intenção | Título |
| --- | --- | --- |
| / | Defesa dos direitos do paciente | Defesa dos Direitos do Paciente – Dra. Tamyris Missio |
| /contato.html | Canais de atendimento | Contato – Dra. Tamyris Missio |
| /privacidade.html | Uso do site e privacidade | Privacidade – Dra. Tamyris Missio |
| /404.html | Recuperação de navegação | Página não encontrada – Dra. Tamyris Missio |

## Antes do lançamento público
- Confirmar com a profissional a grafia OAB/SP 503.829, atualizada conforme o mini currículo.
- Submeter textos e política de privacidade à responsável; confirmar a política completa de tratamento dos dados recebidos pelos canais externos.
- Confirmar domínio definitivo, modalidades e disponibilidade de atendimento. Endereço e cidade não foram fornecidos. Formação e experiência seguem as informações fornecidas pelo cliente; conferir nomenclatura dos títulos nos diplomas antes do lançamento público. Os 10 anos referem-se à enfermagem, não à advocacia.
- A versão inicial é privada e usa noindex,nofollow. Canonicals, Open Graph e sitemap usam o endereço real desta versão. Atualizar todas as URLs para o domínio definitivo e remover noindex apenas das páginas que devem ser indexadas após aprovação. Manter 404 fora do índice e do sitemap.
- Hospedar 404.html como página de erro com resposta HTTP 404; verificar com curl -I numa URL inexistente. Não usar fallback SPA. A resposta depende do provedor.
- Revisar publicidade profissional antes do lançamento. Fonte consultada em 04/11/2026: https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021?provimentos=True&search=205

## Pós-publicação
- Verificar HTTPS, domínio preferido e redirecionamentos 301 do alternativo e de /index.html para /.
- Verificar canonicals, og:url e og:image absolutos no domínio definitivo.
- Atualizar sitemap.xml e sua referência em robots.txt; conferir acesso e ausência de noindex involuntário.
- Cadastrar domínio no Google Search Console e enviar sitemap; inspecionar URLs. Indexação e posição não são garantidas.
- Validar JSON-LD no Schema.org; não há promessa de resultados enriquecidos.
- Testar links de contato em dispositivos reais, teclado, zoom, menu mobile e FAQ.
- Avaliar Lighthouse e dados reais de Core Web Vitals após tráfego suficiente; não há notas ou métricas de campo medidas nesta entrega.
- Confirmar logs, retenção e práticas de privacidade do provedor escolhido.

## Verificação executada
Inspeção visual desktop no navegador; FAQ interativo; páginas e âncoras locais, imagens, títulos únicos, H1 único e JSON-LD verificados. CSS contém layouts mobile/tablet e redução de movimento. Testes reais em celular/tablet, medição Lighthouse e funcionamento dos aplicativos externos não foram executados. O site não instala rastreadores próprios.

## Atualização de 05/11/2026
Telefone e WhatsApp: +55 15 99172-6572. Botão flutuante em todas as páginas. Mensagens de contato ajustadas para pacientes. Mantidos identidade, títulos centralizados e padrão dos botões. A atuação está na home, imediatamente após a apresentação, com atalhos no primeiro bloco.

## Revisão com feedback da cliente — 07/11/2026
- Versão-base: HTMLs anexados pelo cliente. Retiradas as referências ao atendimento na rede pública de todas as páginas, metadados e FAQ.
- Formação atualizada pelo mini currículo: Direito/ESAMC, Enfermagem/PUC-SP, 10 anos de atuação clínica, pós em Direito Médico e Bioética/Santa Casa.
- Incluídos palestra de 2024, autoria de capítulo com publicação prevista, congressos e cursos listados no currículo. Não foram criados eventos, premiações ou apresentações não documentadas.
- Confirmar publicação efetiva do capítulo e nomenclatura da editora; o currículo registra previsão para o segundo semestre de 2026.
- Apresentação de trabalho em congresso: solicitar título, evento, ano e modalidade antes de cadastrar separadamente da palestra.
- O currículo tem foco em defesa médica; mantido o foco no paciente do HTML mais recente, sem restaurar serviços retirados nessa versão.
- Mantidos telefone e e-mail dos HTMLs. O currículo também informa outro e-mail e domínio, cuja adoção não foi solicitada.
- OAB padronizada para 503.829 conforme currículo; conferir antes do lançamento público.

## Articoli e refino visual
Página artigos.html com estado vazio real, sem artigos fictícios. Para publicar, inserir cards com links para páginas HTML completas e metadados próprios; revisar autoria e fontes. Só então incluir páginas de conteúdo no sitemap.

Atualização 10/11/2026: fotos reais em WebP responsivo; retrato prioritário e foto interna com lazy loading. Seis perguntas do PDF adaptadas após conferência em fontes oficiais. Seção acadêmica reduzida a atualização profissional, sem destaque da palestra sobre defesa médica. Submeter redação jurídica adaptada à profissional antes do lançamento público.
