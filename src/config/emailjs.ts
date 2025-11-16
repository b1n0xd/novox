// EmailJS Configuration
// Para configurar:
// 1. Crie uma conta em https://www.emailjs.com/
// 2. Crie um serviço de email (Gmail, Outlook, etc.)
// 3. Crie um template de email
// 4. Copie as chaves e cole aqui ou use variáveis de ambiente

export const EMAILJS_CONFIG = {
  // Service ID - obtido no painel do EmailJS
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',

  // Template ID - obtido no painel do EmailJS
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',

  // Public Key (anteriormente User ID) - obtido no painel do EmailJS
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

// Validação das configurações
export const isEmailJSConfigured = () => {
  return (
    EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  );
};
