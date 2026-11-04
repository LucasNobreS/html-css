#!/usr/bin/env bash
# Uso: ./definir-dominio.sh https://www.exemplo.com.br
# Substitui o domínio provisório em canonicals, Open Graph, JSON-LD, sitemap e robots.
set -e
[ -z "$1" ] && { echo "Informe o domínio com https://, sem barra final."; exit 1; }
D="${1%/}"
grep -rl "https://SEU-DOMINIO.com.br" --include=*.html --include=*.xml --include=*.txt --include=.htaccess . | xargs sed -i "s#https://SEU-DOMINIO.com.br#$D#g"
echo "Domínio definido: $D"
