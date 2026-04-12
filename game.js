const game = {
    inventory: [],
    balance: 100,
    database: [
        { nameitem: "Copper", price: 20, sellable: true, tier: 1 },
        { nameitem: "Aluminium", price: 45, sellable: true, tier: 2 },
        { nameitem: "Iron", price: 100, sellable: true, tier: 2 },
        { nameitem: "Thorium", price: 0, sellable: false, tier: 1 },
        { nameitem: "Particle", price: 0, sellable: false, tier: 1 },
        { nameitem: "Sodium", price: 250, sellable: true, tier: 4 },
        { nameitem: "Diamond", price: 500, sellable: true, tier: 3 },
        { nameitem: "Titanium", price: 1200, sellable: true, tier: 5 }
    ],

    init: function() {
        // Automatically try to load Storage 1 on startup
        this.loadGame(false); 
        this.refresh();
        HTMLAlert.show("Ready to Merge!");
    },

    // --- SAVE/LOAD LOGIC ---
    saveGame: function() {
        const slot = document.getElementById('save-slot').value;
        const saveData = {
            inventory: this.inventory,
            balance: this.balance
        };
        localStorage.setItem(`cristSave_slot_${slot}`, JSON.stringify(saveData));
        HTMLAlert.show(`Saved to Storage ${slot}!`);
    },

    loadGame: function(showNotice = true) {
        const slot = document.getElementById('save-slot').value;
        const saved = localStorage.getItem(`cristSave_slot_${slot}`);
        
        if (saved) {
            const data = JSON.parse(saved);
            this.inventory = data.inventory;
            this.balance = data.balance;
            this.refresh();
            if(showNotice) HTMLAlert.show(`Loaded Storage ${slot}`);
        } else {
            if(showNotice) HTMLAlert.show(`Storage ${slot} is empty!`, true);
        }
    },

    // --- GAMEPLAY LOGIC ---
    buyItem: function() {
        if (this.balance >= 20) {
            this.balance -= 20;
            const t1 = this.database.filter(i => i.tier === 1);
            const newItem = JSON.parse(JSON.stringify(t1[Math.floor(Math.random() * t1.length)]));
            this.inventory.push(newItem);
            this.refresh();
        } else {
            HTMLAlert.show("Insufficient funds!", true);
        }
    },

    handleMerge: function(index) {
        const source = this.inventory[index];
        const targetIndex = this.inventory.findIndex((item, i) => 
            i !== index && item.nameitem === source.nameitem && item.tier === source.tier
        );

        if (targetIndex !== -1 && source.tier < 5) {
            this.inventory[index].tier++;
            this.inventory[index].price = Math.floor(this.inventory[index].price * 2.2);
            this.inventory.splice(targetIndex, 1);
            this.refresh();
            HTMLAlert.show(`${source.nameitem} Merged!`);
        } else if (source.tier >= 5) {
            HTMLAlert.show("Max Tier reached!", true);
        } else {
            HTMLAlert.show("No matching item found!", true);
        }
    },

    handleSell: function(index) {
        const item = this.inventory[index];
        if (item.sellable) {
            this.balance += item.price;
            this.inventory.splice(index, 1);
            this.refresh();
        }
    },

    refresh: function() {
        PKRender.updateUI(this.inventory, this.balance);
    }
};

window.onload = () => game.init();
