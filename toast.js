export class Toast {
  static show(message, type = 'info', options = {}, callback = null) {
      const toast = document.createElement('div');
      toast.className = `toast-${type}`;
      toast.textContent = message;

      // Estilos básicos
      toast.style.cssText = `
          position: fixed;
          text-align: center;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          padding: 10px 20px;
          background: ${this.getColor(type)};
          color: white;
          border-radius: 4px;
          border: 1px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.6);
          z-index: 9999;
          font-family: 'Caveat' !important;
          font-size: 24px;
      `; 

      document.body.appendChild(toast);
      
      setTimeout(() => {
          toast.remove();
          if (typeof callback === "function") {
              callback(); // Llama al callback cuando el toast desaparezca
          }
      }, options.duration || 3000);
  }

  static getColor(type) {
      return {
          success: '#4caf4fde',
          error: '#f44336be',
          info: '#2195f3a4',
          warning: '#ff99009d'
      }[type];
  }

  static success(message, options, callback) { this.show(message, 'success', options, callback); }
  static error(message, options, callback) { this.show(message, 'error', options, callback); }
  static info(message, options, callback) { this.show(message, 'info', options, callback); }
  static warning(message, options, callback) { this.show(message, 'warning', options, callback); }
}