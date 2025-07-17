# Email Obfuscator

A JavaScript library for obfuscating email addresses to prevent spam bot harvesting.

## Features
- Multiple encoding methods (base64, hex, numeric)
- Customizable link text and CSS classes
- Easy integration with web pages
- Prevents email harvesting by spam bots
- Client-side decoding for user interaction

## Installation

```bash
npm install gtmrobox/email-obfuscator

## Usage

```javascript
import EmailObfuscator from '@gtmrobox/email-obfuscator';

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