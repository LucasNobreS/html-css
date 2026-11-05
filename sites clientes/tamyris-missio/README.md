# Dra. Tamyris Missio

Site estático em HTML, CSS e JavaScript puro. Abra dist/index.html ou sirva dist em qualquer hospedagem estática. Não há dependências, compilação, backend ou envio de formulário.

## Edição
- Conteúdo: dist/index.html, contato.html, privacidade.html e 404.html.
- Aparência: dist/assets/css/style.css.
- Menu mobile: dist/assets/js/main.js. Navegação e perguntas frequentes funcionam sem JavaScript.
- Marca: SVG extraído do manual original, sem redesenho. Georgia para títulos e Arial/Helvetica para texto: não foram fornecidos arquivos/licença web de Gotham.
- Sobre e atuação estão na home para evitar páginas repetitivas sem conteúdo adicional confirmado. As áreas informadas pelo cliente estão na home: convênio, SUS, cirurgias, pinças e materiais, medicamentos e defesa médica. Biografia e novo telefone fornecidos em 05/11/2026. Não foram publicados artigos jurídicos.

## Mapa SEO
| Página | Intenção | Título |
| --- | --- | --- |
| / | Defesa de pacientes e médicos / Direito Médico e da Saúde | Direito Médico e da Saúde – Dra. Tamyris Missio |
| /contato.html | Canais de atendimento | Contato – Dra. Tamyris Missio |
| /privacidade.html | Uso do site e privacidade | Privacidade – Dra. Tamyris Missio |
| /404.html | Recuperação de navegação | Página não encontrada – Dra. Tamyris Missio |

## Antes do lançamento público
- Confirmar com a profissional a grafia OAB/SP 503829-1, preservada exatamente dos materiais.
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
Telefone e WhatsApp: +55 15 99172-6572. Botão flutuante em todas as páginas. Mensagens de contato ajustadas para pacientes e médicos. Mantidos identidade, títulos centralizados e padrão dos botões. A atuação está na home, imediatamente após a apresentação, com atalhos no primeiro bloco.
