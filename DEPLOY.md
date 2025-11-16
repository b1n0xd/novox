# Guia de Deploy - MISAD Website

Este guia explica como fazer o deploy do site MISAD para produção.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no serviço de hospedagem (Vercel, Netlify, ou servidor próprio)
- EmailJS configurado (ver [EMAILJS_SETUP.md](EMAILJS_SETUP.md))

## 🚀 Opções de Deploy

### Opção 1: Vercel (Recomendado)

Vercel oferece deploy gratuito, SSL automático e CDN global.

#### Via GitHub (Mais fácil)

1. **Faça push para o GitHub:**
   ```bash
   git add .
   git commit -m "Preparar para deploy"
   git push origin main
   ```

2. **Configure na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - Configure as variáveis de ambiente:
     ```
     VITE_EMAILJS_SERVICE_ID=service_knkdw8d
     VITE_EMAILJS_TEMPLATE_ID=template_alt9svs
     VITE_EMAILJS_PUBLIC_KEY=lotDaboyhLweQDBz9
     ```
   - Clique em "Deploy"

3. **Configure domínio customizado:**
   - Em "Settings" > "Domains"
   - Adicione `misad.ch` e `www.misad.ch`
   - Configure os DNS conforme instruções

#### Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

### Opção 2: Netlify

1. **Build local:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify:**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `dist` para fazer upload
   - OU conecte com GitHub para deploys automáticos

3. **Configure variáveis de ambiente:**
   ```
   VITE_EMAILJS_SERVICE_ID=service_knkdw8d
   VITE_EMAILJS_TEMPLATE_ID=template_alt9svs
   VITE_EMAILJS_PUBLIC_KEY=lotDaboyhLweQDBz9
   ```

---

### Opção 3: Servidor Próprio (VPS/cPanel)

#### Passo 1: Build de Produção

```bash
# Instalar dependências
npm install

# Criar build de produção
npm run build
```

Isso criará uma pasta `dist/` com os arquivos otimizados.

#### Passo 2: Configurar Servidor Web

**Para Apache (.htaccess):**

Crie um arquivo `.htaccess` na pasta `dist/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
</IfModule>
```

**Para Nginx:**

```nginx
server {
    listen 80;
    server_name misad.ch www.misad.ch;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name misad.ch www.misad.ch;

    # SSL Configuration (use Let's Encrypt)
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/misad/dist;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Passo 3: Upload

```bash
# Via FTP/SFTP
# Faça upload da pasta dist/ para o servidor

# OU via rsync
rsync -avz dist/ user@server:/var/www/misad/
```

---

## 🌐 Configuração de DNS

Configure os seguintes registros DNS:

### Para Vercel/Netlify:
```
Tipo    Nome    Valor
A       @       IP_fornecido_pela_plataforma
CNAME   www     seu-site.vercel.app (ou netlify.app)
```

### Para servidor próprio:
```
Tipo    Nome    Valor
A       @       IP_do_seu_servidor
A       www     IP_do_seu_servidor
```

---

## ✅ Checklist Pré-Deploy

- [ ] EmailJS configurado e testado
- [ ] Variáveis de ambiente configuradas
- [ ] Build de produção testado localmente (`npm run build && npm run preview`)
- [ ] Todos os links funcionando
- [ ] Número de telefone correto (+41 22 788 06 95)
- [ ] Email info@misad.ch funcionando
- [ ] Favicon configurado
- [ ] SSL/HTTPS ativado
- [ ] DNS configurado
- [ ] Formulário de contato testado
- [ ] Site testado em mobile e desktop
- [ ] Performance verificada (Google PageSpeed)

---

## 🧪 Testar Build Local

```bash
# Build
npm run build

# Preview (teste local do build de produção)
npm run preview
```

Acesse: http://localhost:4173

---

## 📊 Monitoramento

### Google Analytics (Opcional)

1. Crie uma propriedade no [Google Analytics](https://analytics.google.com)
2. Obtenha o ID de medição (ex: G-XXXXXXXXXX)
3. Adicione no `index.html` antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade `misad.ch`
3. Verifique a propriedade
4. Envie o sitemap (se criar um)

---

## 🔒 Segurança

### Headers de Segurança (Recomendado)

Adicione ao seu servidor web:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 🐛 Troubleshooting

### Site não carrega após deploy
- Verifique se o build foi criado corretamente
- Confirme que o servidor está servindo a pasta `dist/`
- Verifique os logs do servidor

### Formulário não envia emails
- Confirme que as variáveis de ambiente EmailJS estão corretas
- Verifique o console do navegador para erros
- Teste o template no painel do EmailJS

### Erro 404 ao navegar
- Configure o servidor para SPA routing (ver configurações acima)
- Todas as rotas devem servir o `index.html`

### Imagens não aparecem
- Verifique os caminhos das imagens
- Confirme que a pasta `public/` foi incluída no build

---

## 📞 Suporte

Para problemas técnicos:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- EmailJS: [hello@emailjs.com](mailto:hello@emailjs.com)

---

## 🎉 Pós-Deploy

Após o deploy bem-sucedido:

1. ✅ Teste todas as funcionalidades
2. ✅ Verifique em diferentes navegadores
3. ✅ Teste em mobile
4. ✅ Envie um email de teste pelo formulário
5. ✅ Compartilhe o link: https://misad.ch

**Parabéns! Seu site está no ar! 🚀**
