// demo/demo.js

import EmailObfuscator from '../src/emailObfuscator.js';

// Basic usage
const result = EmailObfuscator.obfuscate('test@example.com', {
  linkText: 'Contact Us',
  encodeType: 'base64',
});

// Add to HTML
document.getElementById('email-container').innerHTML = result.html;

// Inject decoding script
const script = document.createElement('script');
script.textContent = result.script;
document.body.appendChild(script);