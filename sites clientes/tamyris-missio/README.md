# Site — Dra. Tamyris Missio (defesa de médicos)

HTML5, CSS3 e JavaScript puro. Sem frameworks, sem build, sem backend. Abra os arquivos em qualquer editor e publique a pasta inteira.

## Estrutura
- `index.html`, `atuacao.html`, `sobre.html`, `contato.html`, `privacidade.html`, `404.html`: páginas independentes (conteúdo escrito direto no HTML).
- `assets/css/style.css`: todo o estilo; cores e fontes em variáveis no topo (`:root`).
- `assets/js/main.js`: só menu móvel e animação de entrada. O site funciona sem ele.
- `assets/img/`: `logo-tamyris.svg` (arte original vetorial extraída do cartão digital, cor #d0cecb preservada), favicons, `og-image.png` (1200×630).
- `sitemap.xml`, `robots.txt`, `.htaccess` (opcional, Apache), `definir-dominio.sh`.

## Como editar
- Textos: edite o HTML da página. Cabeçalho e rodapé se repetem em cada página (sem includes); altere nas 6.
- Contatos: WhatsApp `https://wa.me/5515991122883?text=...`, `tel:+5515991122883`, e-mail e Instagram aparecem no rodapé, na seção de contato e em `contato.html`.
- Datas do sitemap (`lastmod`) e da política de privacidade: só altere quando o conteúdo realmente mudar.

## Adaptações de identidade
- Georgia nos títulos (fonte do sistema). **Gotham-Book não foi usada**: não há arquivo nem licença web; os textos usam Arial/Helvetica, conforme o manual permite. Para usar Gotham, licencie, hospede os arquivos em `assets/fonts/` e declare `@font-face`.
- Verdes e cinza do manual usados como estão (#808d76, #6e8167, #c7c7c3). Acrescentados: verde profundo #3f4e3a (texto branco em botões/rodapé), tinta #232b21, off-white #f6f5f1.
- Branco sobre #6e8167 tem contraste 4,2:1: por isso só aparece em texto grande (≥24 px). Textos pequenos usam o verde profundo.
- O logotipo é usado sobre verde, como no manual. Não há botão flutuante de WhatsApp (evita cobrir conteúdo); o contato está no cabeçalho, nos CTAs e no rodapé.

## Publicação
1. Defina o domínio: `./definir-dominio.sh https://www.seudominio.com.br` (troca `https://SEU-DOMINIO.com.br` em canonicals, OG, JSON-LD, sitemap, robots e .htaccess).
2. Envie a pasta inteira para a raiz da hospedagem. A `404.html` usa caminhos a partir da raiz (`/assets/...`), então o site deve ficar na raiz do domínio.
3. Configure HTTPS, domínio único (com ou sem www) e 404 com status HTTP 404 (`.htaccess` cobre Apache; em Netlify/Vercel/Cloudflare Pages `404.html` já é reconhecida).
4. Em ambiente de testes, use `Disallow: /` no robots.txt e remova ao publicar.

## Pendências (antes de publicar)
1. **Domínio definitivo** (hoje `SEU-DOMINIO.com.br`, provisório em canonicals, OG, JSON-LD, sitemap e robots).
2. **Confirmar o registro `OAB/SP 503829-1`** com a cliente (grafia mantida como nos anexos).
3. **Revisar regras atuais de publicidade da advocacia** em fontes oficiais da OAB (Provimento de publicidade e Código de Ética) e validar todos os textos com a Dra. Tamyris.
4. Confirmar se os serviços específicos (processos judiciais, sindicâncias, processos ético-profissionais, consultoria preventiva, contratos, clínicas) podem ser apresentados; até lá o site fala só em "defesa de médicos".
5. Receber biografia, formação, experiência e foto real (a página Sobre usa só nome, área e registro).
6. Confirmar modalidades, horários, etapas, cidade/endereço (nada foi inferido pelo DDD).
7. Revisar a política de privacidade e confirmar logs do provedor de hospedagem escolhido.
8. Seção "Conteúdos para médicos": só lista temas em preparação; publique artigos apenas com revisão, fontes e datas reais.
9. Confirmar com a cliente a arte de compartilhamento (`og-image.png`) e o favicon (logo reduzido). O `og-image.png` foi gerado com a fonte serifada do ambiente de build, não Georgia; se quiser fidelidade, refaça em Georgia.
10. Se quiser os PDFs de papelaria para download, publique-os separadamente (não estão no site).

## Verificações executadas (ambiente de teste local)
Navegação e contatos com e sem JavaScript; menu móvel (abre, `aria-expanded`, Esc fecha); ausência de rolagem horizontal em 390, 820 e 1366 px; zero erros/avisos de console; 1 H1 por página; titles/descriptions próprios; JSON-LD parseável (JSON válido); contrastes calculados (ver acima); links internos existentes.

## Dependem da publicação
Validação no Rich Results Test/Schema.org Validator, HTTPS e redirecionamentos, status 404 real, Lighthouse (diagnóstico de laboratório), Core Web Vitals reais (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, p75, só com dados de campo), indexação.
