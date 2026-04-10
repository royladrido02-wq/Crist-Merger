const PKRender = {
    tierColors: {
        1: "#cd7f32", 2: "#c0c0c0", 3: "#00ffff", 4: "#fbc02d", 5: "#ff4d4d"
    },

    updateUI: function(inventory, balance) {
        const invElement = document.getElementById('inventory');
        const balElement = document.getElementById('balance');
        
        if (balElement) balElement.innerText = balance.toLocaleString();
        if (!invElement) return;

        invElement.innerHTML = '';

        if (inventory.length === 0) {
            invElement.innerHTML = `<p style="color: #666; grid-column: 1/-1;">Inventory is empty. Buy a Crist to start!</p>`;
        }

        inventory.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.style.borderColor = this.tierColors[item.tier] || "#fff";
            
            const priceDisplay = item.sellable ? `$${item.price}` : "UNSELLABLE";
            
            card.innerHTML = `
                <div class="tier-badge" style="background: ${this.tierColors[item.tier]}">T${item.tier}</div>
                <div class="item-name">${item.nameitem}</div>
                <div class="item-value">${priceDisplay}</div>
                <div class="card-actions">
                    <button class="btn-merge" onclick="game.handleMerge(${index})">Merge</button>
                    <button class="btn-sell" onclick="game.handleSell(${index})" ${!item.sellable ? 'disabled' : ''}>Sell</button>
                </div>
            `;
            invElement.appendChild(card);
        });
    }
};
