# Crist Merger 💎

A modular, JavaScript-based "merge" game where players collect, combine, and sell various materials to climb through five tiers of rarity.

## 🚀 Overview
**Crist Merger** is built with a decoupled architecture. The game state (logic) is separated from the visual output (rendering), allowing for smooth performance and easy UI customization.

## 🛠 Project Structure
The project is split into four main files:

* **index.html**: The skeletal structure and CSS styling.
* **game.js**: The "Brain." Handles inventory arrays, balance math, and merge logic.
* **PKRender.js**: The "Eyes." A dedicated rendering engine that converts the game data into visual HTML elements.
* **HTMLAlert.js**: The "Voice." A non-intrusive notification system that communicates with the player via a specific `<p id="alert">` element.

## 🎮 Mechanics

### 1. Items & Tiers
Items range from **Tier 1 to Tier 5**. 
* **Built-in Materials**: Copper, Iron, Diamond, Thorium, Particle, Titanium, Sodium, Aluminium.
* **Maximum Tier**: 5. Once an item reaches Tier 5, it cannot be merged further.

### 2. Merging Logic
To upgrade an item, the player must have **two identical items** (same name and same tier) in their inventory.
* *Example*: 2x Copper (Tier 1) ➔ 1x Copper (Tier 2).

### 3. Economy
* **Buy**: Standard cost is $20 for a random Tier 1 item.
* **Sell**: Items can be sold for profit, which increases as the tier increases.
* **Unsellable Items**: Special items like *Thorium* and *Particle* are unsellable, serving as unique progression materials.

## ⚙️ Technical Features
* **Decoupled Rendering**: The game state only triggers a re-render when data actually changes, preventing unnecessary DOM manipulation.
* **CSS Grid UI**: Uses a responsive grid layout to display the inventory.
* **Dynamic Tier Coloring**: The `PKRender` engine automatically applies border colors and badges based on the item's tier property.

## 📝 Setup
1.  Clone or download the repository.
2.  Ensure all four files (`index.html`, `game.js`, `PKRender.js`, `HTMLAlert.js`) are in the same folder.
3.  Open `index.html` in any modern web browser.

---
*Created for the Crist Merger Project.*
