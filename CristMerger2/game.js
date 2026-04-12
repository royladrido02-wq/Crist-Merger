const game = {
    inventory: [],
    balance: 100,
    CONSTANTS: {
        STARTER_BALANCE: 100,
        MAX_ALLOWED_PRICE: 50000 // Anti-inflation cap
    },
    database: [
        { nameitem: "Copper", price: 20, sellable: true, tier: 1 },
        { nameitem: "Aluminium", price: 45, sellable: true, tier: 2 },
        { nameitem: "Iron", price: 100, sellable: true, tier: 2 },
        { nameitem: "Thorium", price: 0, sellable: false, tier: 1 },
        { nameitem: "Particle", price: 0, sellable: false, tier: 1 },
        { nameitem: "Sodium", price: 250, sellable: true, tier: 4 },
        { nameitem: "Diamond", price: 500, sellable: true, tier: 3 },
        { nameitem: "Titanium", price: 1200, sellable: true, tier: 5 },
        { nameitem: "Crystal", price: 10, sellable: true, tier: 1 }
    ],

    init: function() {
        if (!this.validateDatabase()) return;

        this.loadGame(false); 
        
        // --- ANTICHEAT TRIGGER ---
        this.runAnticheat();
        
        this.refresh();
        HTMLAlert.show("Security Verified.");
    },

    // --- ANTICHEAT ENGINE ---
    runAnticheat: function() {
        let cheated = false;

        // 1. Balance Integrity Check
        // If someone edited the code to start with more money without loading a save
        if (this.balance > this.CONSTANTS.STARTER_BALANCE && localStorage.length === 0) {
            this.balance = this.CONSTANTS.STARTER_BALANCE;
            cheated = true;
        }

        // 2. Item Price Integrity Check
        // Scans inventory for items with suspiciously high prices
        this.inventory = this.inventory.filter(item => {
            if (item.price > this.CONSTANTS.MAX_ALLOWED_PRICE) {
                cheated = true;
                return false; // Remove the item
            }
            return true;
        });

        if (cheated) {
            HTMLAlert.show("Cheat Detected: Values Reset!", true);
            console.warn("Anticheat: Illegal values were corrected.");
            this.saveGame(); // Force save the corrected state
        }
    },

    validateDatabase: function() {
        let isValid = true;
        this.database.forEach((item, index) => {
            let errorMsg = "";
            if (!item.nameitem) errorMsg = `Item ${index}: Missing Name.`;
            else if (item.price < 0) errorMsg = `Item "${item.nameitem}": Negative price.`;
            else if (item.tier < 1 || item.tier > 5) errorMsg = `Item "${item.nameitem}": Invalid Tier.`;

            if (errorMsg) {
                HTMLAlert.show(errorMsg, true);
                isValid = false;
            }
        });
        return isValid;
    },

    saveGame: function() {
        const slot = document.getElementById('save-slot').value;
        const saveData = { inventory: this.inventory, balance: this.balance };
        localStorage.setItem(`cristSave_slot_${slot}`, JSON.stringify(saveData));
        HTMLAlert.show(`Stored in Slot ${slot}`);
    },

    loadGame: function(showNotice = true) {
        const slot = document.getElementById('save-slot').value;
        const saved = localStorage.getItem(`cristSave_slot_${slot}`);
        if (saved) {
            const data = JSON.parse(saved);
            this.inventory = data.inventory;
            this.balance = data.balance;
            this.runAnticheat(); // Re-verify after loading
            this.refresh();
            if(showNotice) HTMLAlert.show(`Loaded Slot ${slot}`);
        }
    },

    buyItem: function() {
        if (this.balance >= 20) {
            this.balance -= 20;
            const t1 = this.database.filter(i => i.tier === 1);
            const newItem = JSON.parse(JSON.stringify(t1[Math.floor(Math.random() * t1.length)]));
            this.inventory.push(newItem);
            this.runAnticheat(); // Verify state hasn't been injected
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
            this.runAnticheat();
            this.refresh();
            HTMLAlert.show("Merge Successful!");
        } else if (source.tier >= 5) {
            HTMLAlert.show("Max Tier!", true);
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
