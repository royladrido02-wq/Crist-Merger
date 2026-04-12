const HTMLAlert = {
    elementId: "alert",
    timeout: null,
    show: function(message, isError = false) {
        const display = document.getElementById(this.elementId);
        if (!display) return;
        if (this.timeout) clearTimeout(this.timeout);

        display.innerText = message;
        display.style.color = isError ? "#ff4d4d" : "#4caf50";
        display.style.opacity = "1";

        this.timeout = setTimeout(() => {
            display.style.opacity = "0";
        }, 2500);
    }
};
