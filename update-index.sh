#!/bin/bash

# Percorso del file index.html
INDEX_FILE="./dist/index.html"

# Contenuto da aggiungere al file index.html per il reindirizzamento
REDIRECT_CONTENT="<meta http-equiv=\"refresh\" content=\"0;url=https://ennarsh.github.io/beautyandhome-fe/index.html\" />"

# Aggiungi il contenuto di reindirizzamento al file index.html
sed -i.bak -e "s|</head>|${REDIRECT_CONTENT}</head>|" ${INDEX_FILE}