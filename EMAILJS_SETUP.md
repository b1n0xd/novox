# Configuração do EmailJS - Template Completo

## Template para usar no EmailJS

Copie e cole este template no painel do EmailJS (https://dashboard.emailjs.com/):

```
Assunto: {{subject}}

Nova mensagem de contato do site Misad

-----------------------------------
INFORMAÇÕES DO REMETENTE
-----------------------------------

Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{from_phone}}
Assunto: {{subject}}

-----------------------------------
MENSAGEM
-----------------------------------

{{message}}

-----------------------------------

Este email foi enviado através do formulário de contato do site www.misad.ch
Email de destino: {{to_email}}
```

## Variáveis disponíveis no template:

- `{{from_name}}` - Nome do usuário
- `{{from_email}}` - Email do usuário
- `{{from_phone}}` - Telefone do usuário
- `{{subject}}` - Assunto da mensagem
- `{{message}}` - Mensagem do usuário
- `{{to_email}}` - Email de destino (info@misad.ch)

## Passos para configurar:

1. Acesse https://dashboard.emailjs.com/
2. Vá em "Email Templates"
3. Clique em "Create New Template" ou edite o template existente
4. Cole o template acima
5. Configure o "To Email" para: info@misad.ch
6. Configure o "Reply To" para: {{from_email}}
7. Salve o template

## Exemplo de template HTML (opcional - mais bonito):

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .header {
      background-color: #4A90E2;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      background-color: white;
      padding: 20px;
      margin-top: 20px;
    }
    .info-row {
      margin: 10px 0;
      padding: 10px;
      background-color: #f9f9f9;
      border-left: 3px solid #4A90E2;
    }
    .label {
      font-weight: bold;
      color: #4A90E2;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 15px;
      margin-top: 15px;
      border-radius: 5px;
    }
    .footer {
      margin-top: 20px;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nova Mensagem de Contato - Misad</h2>
    </div>

    <div class="content">
      <h3>Informações do Remetente</h3>

      <div class="info-row">
        <span class="label">Nome:</span> {{from_name}}
      </div>

      <div class="info-row">
        <span class="label">Email:</span> {{from_email}}
      </div>

      <div class="info-row">
        <span class="label">Telefone:</span> {{from_phone}}
      </div>

      <div class="info-row">
        <span class="label">Assunto:</span> {{subject}}
      </div>

      <h3>Mensagem</h3>
      <div class="message-box">
        {{message}}
      </div>
    </div>

    <div class="footer">
      Este email foi enviado através do formulário de contato do site www.misad.ch
    </div>
  </div>
</body>
</html>
```

## Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
VITE_EMAILJS_SERVICE_ID=seu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

## Testando

Após configurar:
1. Reinicie o servidor de desenvolvimento
2. Preencha o formulário no site
3. Verifique se todos os campos estão aparecendo no email recebido
