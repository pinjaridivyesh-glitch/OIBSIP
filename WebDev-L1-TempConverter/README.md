# Task 3: Precision Temperature Converter

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![OASIS INFOBYTE](https://img.shields.io/badge/OASIS_INFOBYTE-Level_1_Internship-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech_Stack-HTML5_%7C_CSS3_%7C_Vanilla_JS-yellow?style=for-the-badge)

A clean, modern, and mathematically rigorous Temperature Converter web application built as part of the **Oasis Infobyte Web Development and Designing Internship (Level 1 - Task 3)**.

---

## 🌟 Application Architecture & Preview

> Open `index.html` in any modern web browser to test all conversion modes.

```
+-----------------------------------------------------------------------------------+
|  [🌡️ THERMOSYNC]       Task 1: Landing Page   Task 2: Portfolio   [Task 3: Active] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                            OASIS INFOBYTE LEVEL 1                                 |
|                         Temperature Converter                                     |
|                                                                                   |
|   Quick Presets: [Freezing 0°C] [Body Temp 37°C] [Boiling 100°C] [Abs Zero -273.15]|
|                                                                                   |
|   +------------------------------------+--------------------------------------+   |
|   | Enter Temperature                  | From Unit                            |   |
|   | [ 25.00                       [x] ]| [ Celsius (°C)                   [v] ]|   |
|   +------------------------------------+--------------------------------------+   |
|                                                                                   |
|   [  🔄 Convert Temperature  ]                [  Reset All  ]                     |
|                                                                                   |
|   -----------------------------------------------------------------------------   |
|   [🌤️ Comfortable Room / Ambient Range (25.0°C)]                                  |
|                                                                                   |
|   +-------------------+  +---------------------+  +---------------------------+   |
|   | Celsius (Source)  |  | Fahrenheit          |  | Kelvin                    |   |
|   |     25.00 °C      |  |      77.00 °F       |  |         298.15 K          |   |
|   +-------------------+  +---------------------+  +---------------------------+   |
|                                                                                   |
|   [ Applied Conversion Formulas & Step-by-Step Substitution Walkthrough ]         |
|   - Celsius -> Fahrenheit: (25 × 9/5) + 32 = 77.00 °F                             |
|   - Celsius -> Kelvin:     25 + 273.15 = 298.15 K                                 |
|                                                                                   |
|   -----------------------------------------------------------------------------   |
|   Standard Physical Benchmarks: Abs Zero (-273.15°C) | Water Freezing (0°C)...     |
+-----------------------------------------------------------------------------------+
```

---

## 🚀 Key Features

- **Robust Numerical Validation**:
  - Rejects empty, whitespace-only, and non-numeric characters using a strict regex: `/^[+-]?(\d+(\.\d*)?|\.\d+)$/`.
  - Displays instant, descriptive error feedback without crashing or producing `NaN`.

- **Comprehensive Absolute Zero Guardrail (Physical Edge Case)**:
  - Validates all input against the absolute zero thermodynamic baseline:
    - **Celsius**: `< -273.15 °C` (Rejected with alert)
    - **Fahrenheit**: `< -459.67 °F` (Rejected with alert)
    - **Kelvin**: `< 0.00 K` (Rejected with alert)
  - Clearly explains the physical limitation (the point where entropy and molecular motion cease).

- **Multi-Unit Scalability (Simultaneous Output)**:
  - Automatically calculates and renders the temperature across **Celsius (°C)**, **Fahrenheit (°F)**, and **Kelvin (K)** simultaneously.
  - Highlights the source unit card for visual clarity.

- **Mathematical Formula Transparency**:
  - Outputs a step-by-step mathematical substitution card showing the exact equations executed.

- **Dynamic Thermal Status Indicator**:
  - Automatically changes color and emoji badge based on thermal range:
    - 🌌 Absolute Zero (`≤ -273.15°C`)
    - ❄️ Freezing / Sub-Zero (`≤ 0°C`)
    - 🌤️ Room / Ambient (`18°C – 30°C`)
    - ☀️ Hot Weather (`31°C – 50°C`)
    - 🌋 Boiling / Extreme (`≥ 100°C`)

- **Quick-Fill Presets & Clear Button**:
  - 1-click test chips for Freezing, Body Temperature, Boiling, and Absolute Zero.
  - Dedicated input clear (`×`) and reset buttons.

---

## 📐 Conversion Formulas Implemented

### 1. From Celsius (°C):
- **To Fahrenheit**:  
  $$F = \left(C \times \frac{9}{5}\right) + 32$$
- **To Kelvin**:  
  $$K = C + 273.15$$

### 2. From Fahrenheit (°F):
- **To Celsius**:  
  $$C = (F - 32) \times \frac{5}{9}$$
- **To Kelvin**:  
  $$K = \left((F - 32) \times \frac{5}{9}\right) + 273.15$$

### 3. From Kelvin (K):
- **To Celsius**:  
  $$C = K - 273.15$$
- **To Fahrenheit**:  
  $$F = \left((K - 273.15) \times \frac{9}{5}\right) + 32$$

---

## 🛠️ Technology Stack

- **HTML5**: Form inputs, select dropdowns, semantic container tags.
- **CSS3**: Flexbox, CSS Grid, Glassmorphic backdrop filters, custom animations.
- **Vanilla JavaScript (ES6+)**: Regex validation, state handling, unit transformation arithmetic.
- **No dependencies**: Zero external libraries, lightning-fast execution.

---

## 📁 Folder Structure

```
WebDev-L1-TempConverter/
├── index.html        # App interface & markup
├── style.css         # Glassmorphic UI styling
├── script.js         # Validation & conversion algorithms
└── README.md         # Detailed task documentation
```

---

## 💻 How to Run Locally

1. Open your terminal or file explorer.
2. Navigate into the project folder:
   ```bash
   git clone https://github.com/pinjaridivyesh-glitch/OIBSIP.git
   cd OIBSIP/WebDev-L1-TempConverter
   ```
3. Open `index.html` in your web browser.

---

## 👤 Author
- **Developer**: Divyesh - B.Tech AIML Student
- **About Me**: I'm Divyesh, B.Tech AIML student passionate about AI/ML and Web Development. Intern at OASIS INFOBYTE.
- **Track**: Level 1 - Task 3
