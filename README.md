# Crist Merger 💎

![GitHub License](https://img.shields.io/github/license/Royladrido02-wq/CMerger)
![GitHub stars](https://img.shields.io/github/stars/Royladrido02-wq/CMerger)
![GitHub last commit](https://img.shields.io/github/last-commit/Royladrido02-wq/CMerger)

A modular, JavaScript-based "merge" game where players collect, combine, and sell materials to reach the ultimate Tier 5 crystals.

## 🎮 Play Now
Check out the live version of the game here:
👉 **[Crist Merger](https://Royladrido02-wq.github.io/Crist-Merger/)**

---

## 🛠 Project Architecture
This project uses a decoupled engine design to separate game logic from visual rendering:

* **`game.js`**: Core Logic. Manages the state, inventory array `[{}]`, and merge mathematics.
* **`PKRender.js`**: The Render Engine. Handles all DOM updates and dynamic Tier styling.
* **`HTMLAlert.js`**: UI Notifications. Handles non-blocking alerts via the `<p id="alert">` element.

## 💎 Game Features
* **Tier System**: Items range from Tier 1 to Tier 5 (Max).
* **Built-in Materials**: Copper, Iron, Diamond, Thorium (Unsellable), Particle (Unsellable), Titanium, Sodium, Aluminium.
* **Dynamic Economy**: Sell items to gain balance, or merge two identical items to increase their value and Tier.
* **Smart UI**: Color-coded borders and badges based on item rarity.

## 📂 Repository Details
* **Username**: Royladrido02-wq
* **Project Name**: crist-merger
* **License**: MIT

## 📝 Installation for Developers
1. Clone the repository:
   ```bash
   git clone [https://github.com/Royladrido02-wq/CMerger.git](https://github.com/Royladrido02-wq/CMerger.git)
