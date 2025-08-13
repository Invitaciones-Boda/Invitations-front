export class Toast {
    static show(title, message, type = 'info', options = {}, callback = null) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Guardar duración en variable CSS
        const duration = options.duration || 3000;
        toast.style.setProperty('--toast-duration', `${duration}ms`);

        toast.innerHTML = `
            <div class="toast-icon">${this.getIcon(type)}</div>
            <div class="toast-content" style="display: flex; flex-direction: column; gap: 5px; align-items: center; justify-content: center;">
                <p style=" font-size: 24px; color: #675F5C;" >${title}</p>
            </div>
            <button class="toast-close"></button>
            <div class="toast-bar"></div>
        `;

        document.body.appendChild(toast);

        // Cerrar manualmente
        toast.querySelector(".toast-close").onclick = () => toast.remove();

        // Cerrar automáticamente
        setTimeout(() => {
            toast.remove();
            if (typeof callback === "function") callback();
        }, duration);
    }

    static getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fa-solid fa-xmark"></i>',
            warning: '<i class="fas fa-exclamation-triangle gold-text"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || '<i class="fas fa-info-circle"></i>';
    }


    static success(title, message, options, callback) { this.show(title, message, 'success', options, callback); }
    static error(title, message, options, callback) { this.show(title, message, 'error', options, callback); }
    static info(title, message, options, callback) { this.show(title, message, 'info', options, callback); }
    static warning(title, message, options, callback) { this.show(title, message, 'warning', options, callback); }
}
