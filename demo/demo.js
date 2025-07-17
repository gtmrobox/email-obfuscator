// demo/demo.js
import EmailObfuscator from '../src/emailObfuscator.js';

document.addEventListener('DOMContentLoaded', () => {
  const emailContainer = document.getElementById('email-container');
  
  const result = EmailObfuscator.obfuscate('test@example.com', {
    linkText: 'Contact Us',
    encodeType: 'hex',
  });

  emailContainer.innerHTML = result.html;
  
  // Inject decoding script
  const script = document.createElement('script');
  script.textContent = result.script;
  document.body.appendChild(script);
});