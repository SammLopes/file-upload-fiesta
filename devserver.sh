#!/bin/sh
if [ "$FIREBASE_STUDIO" = "studio" ]; then 
    echo "🔧 Ambiente Firebase Studio detectado"
    npm install 
    npm run dev
else
    echo "🖥️ Ambiente local detectado"
    
    if [ ! -d node_modules ]; then
        echo "📦 Instalando dependências do package.json"
        npm install
    fi

    echo "🚀 Iniciando App React/TS local"
    npm run dev
fi
