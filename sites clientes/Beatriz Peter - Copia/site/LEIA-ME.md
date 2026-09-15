# Site institucional — Beatriz Peter | Advogada

## Como usar
Suba **toda esta pasta** (mantendo a estrutura) na raiz do domínio `advbeatrizpeter.com.br`.
Os caminhos no HTML são absolutos (`/assets/...`), então a estrutura de pastas precisa ser preservada.

```
index.html
politica-de-privacidade.html
termos-de-uso.html
robots.txt
sitemap.xml
site.webmanifest
favicon.ico
assets/
  icons/   (logo, monograma, favicons)
  img/     (fotos em WebP, responsivas)
```

## O que já está pronto
- Home completa (single page com âncoras: Início, Sobre, Atuação, Conteúdos, Contato).
- Logo e monograma oficiais usados como imagem (não recriados em HTML/texto).
- Paleta oficial aplicada via variáveis CSS.
- As três fotos enviadas, cada uma com função narrativa própria (hero, sobre, contato), otimizadas em WebP com srcset responsivo.
- SEO técnico: title/description únicos, canonical, Open Graph, Twitter Card, JSON-LD (Attorney + WebSite), sitemap.xml, robots.txt, favicons completos.
- Acessibilidade: skip link, foco visível, HTML semântico, contraste AA, `prefers-reduced-motion` respeitado, menu mobile com `aria-expanded`.
- Ética da OAB (Provimento 205/2021): sem promessa de resultado, sem depoimentos, sem valores, sem comparação com outros profissionais, WhatsApp como canal de contato — não de venda agressiva.
- Páginas reais de Política de Privacidade (LGPD) e Termos de Uso.

## Pontos que EXIGEM sua confirmação (marcados no código como `[INFORMAÇÃO NECESSÁRIA]`)
Não inventei nenhum dado sobre a Beatriz. Preciso que você (ou ela) confirme:

1. **Número de inscrição na OAB** — obrigatório para publicidade de advogado.
2. **Formação acadêmica / pós-graduações / trajetória** — hoje a seção "Sobre" está honesta, mas genérica.
3. **Atendimento presencial, remoto, ou ambos** — e, se presencial, em qual cidade (o site propositalmente NÃO assume Sorocaba nem nenhuma cidade).
4. **E-mail profissional**, se ela quiser divulgar (hoje o único canal é WhatsApp).
5. **Redes sociais** (Instagram/LinkedIn), se existirem — não inventei nenhuma.
6. **Data de publicação** para as páginas de Privacidade e Termos.
7. Confirmar se haverá **Google Analytics/Meta Pixel** (isso muda a seção de cookies da Política de Privacidade).

Assim que tiver essas respostas, é rápido para eu atualizar os arquivos.

## Observação sobre o logotipo
Os arquivos de logo enviados são `.jpg` com fundo sólido (sem transparência). Usei os
recortes cujo fundo já bate exatamente com as cores oficiais (`#E9EAEC` no header,
`#26486D` no rodapé), então o logo aparece "flutuando" sem borda visível. Se quiser
liberdade total de fundo no futuro, vale pedir ao designer os arquivos em SVG ou PNG
transparente.
