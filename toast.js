export class Toast {
    static show(title, message, type = 'info', options = {}, callback = null) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Guardar duración en variable CSS
        const duration = options.duration || 3000;
        toast.style.setProperty('--toast-duration', `${duration}ms`);

        toast.innerHTML = `
            <div class="toast-icon">${this.getIcon(type)}</div>
            <div class="toast-content">
                <strong>${title}</strong>
            </div>
            <button class="toast-close">&times;</button>
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
            success: "✔️",
            error: "❌",
            warning: "⚠️",
            info: "ℹ️"
        };
        return icons[type] || "ℹ️";
    }

    static success(title, message, options, callback) { this.show(title, message, 'success', options, callback); }
    static error(title, message, options, callback) { this.show(title, message, 'error', options, callback); }
    static info(title, message, options, callback) { this.show(title, message, 'info', options, callback); }
    static warning(title, message, options, callback) { this.show(title, message, 'warning', options, callback); }
}
