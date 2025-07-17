// src/emailObfuscator.js
class EmailObfuscator {
  /**
   * Obfuscates email addresses to prevent spam bot harvesting
   * @param {string} email - The email address to obfuscate
   * @param {Object} options - Configuration options
   * @returns {Object} Obfuscated email data
   */
  static obfuscate(email, options = {}) {
    const defaults = {
      encodeType: 'base64', // 'base64', 'hex', or 'numeric'
      linkText: 'Contact', // Default link text
      cssClass: 'obfuscated-email', // CSS class for the link
    };

    const config = { ...defaults, ...options };

    // Validate email
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email address');
    }

    // Encode email
    const encodedEmail = this.encodeEmail(email, config.encodeType);

    // Generate HTML link
    const linkHtml = this.generateLink(encodedEmail, config);

    return {
      original: email,
      encoded: encodedEmail,
      html: linkHtml,
      script: this.generateScript(encodedEmail, config),
    };
  }

  /**
   * Validates email address format
   * @param {string} email
   * @returns {boolean}
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Encodes email using specified method
   * @param {string} email
   * @param {string} type
   * @returns {string}
   */
  static encodeEmail(email, type) {
    switch (type) {
      case 'hex':
        return email.split('')
          .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('');
      case 'numeric':
        return email.split('')
          .map(char => char.charCodeAt(0))
          .join(',');
      case 'base64':
      default:
        return btoa(email);
    }
  }

  /**
   * Generates HTML link
   * @param {string} encodedEmail
   * @param {Object} config
   * @returns {string}
   */
  static generateLink(encodedEmail, config) {
    return `<a href="#" class="${config.cssClass}" data-email="${encodedEmail}" data-encoding="${config.encodeType}">${config.linkText}</a>`;
  }

  /**
   * Generates client-side decoding script
   * @param {string} encodedEmail
   * @param {Object} config
   * @returns {string}
   */
    static generateScript(encodedEmail, config) {
    return `
        const links = document.querySelectorAll('.${config.cssClass}');
        links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const encoded = link.getAttribute('data-email');
            const encoding = link.getAttribute('data-encoding');
            let email = '';
            
            if (encoding === 'base64') {
            email = atob(encoded);
            } else if (encoding === 'hex') {
            email = encoded.match(/.{1,2}/g)
                .map(hex => String.fromCharCode(parseInt(hex, 16)))
                .join('');
            } else if (encoding === 'numeric') {
            email = encoded.split(',')
                .map(num => String.fromCharCode(parseInt(num)))
                .join('');
            }
            
            window.location.href = 'mailto:' + email;
        });
        });
    `;
    }
}

export default EmailObfuscator;