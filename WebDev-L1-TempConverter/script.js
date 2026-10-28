/**
 * PRECISION TEMPERATURE CONVERTER - JavaScript Engine
 * OASIS INFOBYTE Internship - Level 1 Task 3
 * Features:
 *   - Numeric input validation (rejection of non-numeric, empty, or malformed inputs)
 *   - Absolute zero edge case guardrail (-273.15°C / -459.67°F / 0K)
 *   - Tri-directional conversions (Celsius, Fahrenheit, Kelvin)
 *   - Dynamic formula substitution walkthrough
 *   - Thermal category indicator
 * Author: Divyesh (B.Tech AIML)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('tempConverterForm');
  const tempInput = document.getElementById('tempInput');
  const sourceUnit = document.getElementById('sourceUnit');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Alert Box Elements
  const errorAlert = document.getElementById('errorAlert');
  const alertIcon = document.getElementById('alertIcon');
  const alertTitle = document.getElementById('alertTitle');
  const alertMessage = document.getElementById('alertMessage');

  // Result Elements
  const resultsArea = document.getElementById('resultsArea');
  const valCelsius = document.getElementById('valCelsius');
  const valFahrenheit = document.getElementById('valFahrenheit');
  const valKelvin = document.getElementById('valKelvin');
  const cardCelsius = document.getElementById('cardCelsius');
  const cardFahrenheit = document.getElementById('cardFahrenheit');
  const cardKelvin = document.getElementById('cardKelvin');

  // Thermal Status Elements
  const thermalStatusBar = document.getElementById('thermalStatusBar');
  const thermalIcon = document.getElementById('thermalIcon');
  const thermalText = document.getElementById('thermalText');
  const formulaSteps = document.getElementById('formulaSteps');

  // Preset Buttons
  const presetChips = document.querySelectorAll('.chip-btn');

  // 1. Show/Hide Clear Button Based on Input Content
  tempInput.addEventListener('input', () => {
    if (tempInput.value.trim().length > 0) {
      clearInputBtn.style.display = 'block';
    } else {
      clearInputBtn.style.display = 'none';
      hideError();
    }
  });

  clearInputBtn.addEventListener('click', () => {
    tempInput.value = '';
    clearInputBtn.style.display = 'none';
    tempInput.focus();
    hideError();
  });

  // 2. Preset Click Handlers
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-val');
      const unit = chip.getAttribute('data-unit');
      tempInput.value = val;
      sourceUnit.value = unit;
      clearInputBtn.style.display = 'block';
      performConversion();
    });
  });

  // 3. Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    performConversion();
  });

  // 4. Real-time Conversion on Unit Change if Input is Populated
  sourceUnit.addEventListener('change', () => {
    if (tempInput.value.trim().length > 0) {
      performConversion();
    }
  });

  // 5. Reset All Handler
  resetBtn.addEventListener('click', () => {
    form.reset();
    clearInputBtn.style.display = 'none';
    hideError();
    resultsArea.style.display = 'none';
    tempInput.focus();
  });

  // 6. Main Conversion Function
  function performConversion() {
    const rawVal = tempInput.value.trim();

    // Validation 1: Check if empty
    if (rawVal === '') {
      showError(
        'Missing Input Value',
        'Please enter a numeric temperature value to convert (e.g. 25, -10.5, 98.6).',
        false
      );
      resultsArea.style.display = 'none';
      return;
    }

    // Validation 2: Check for valid numerical format
    // Allows optional leading + or -, digits, and an optional decimal point
    const numRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
    if (!numRegex.test(rawVal)) {
      showError(
        'Invalid Numeric Input',
        `"${rawVal}" is not a valid number. Please enter digits only with an optional single decimal point.`,
        false
      );
      resultsArea.style.display = 'none';
      return;
    }

    const inputNumber = parseFloat(rawVal);
    const unit = sourceUnit.value;

    // Validation 3: Absolute Zero Edge Case Check
    // Absolute Zero: 0 Kelvin = -273.15 Celsius = -459.67 Fahrenheit
    const ABS_ZERO_C = -273.15;
    const ABS_ZERO_F = -459.67;
    const ABS_ZERO_K = 0.0;

    let isBelowAbsoluteZero = false;
    let limitMessage = '';

    if (unit === 'c' && inputNumber < ABS_ZERO_C) {
      isBelowAbsoluteZero = true;
      limitMessage = `Input of ${inputNumber}°C is below Absolute Zero (-273.15°C). By the laws of physics, temperatures cannot exist below absolute zero!`;
    } else if (unit === 'f' && inputNumber < ABS_ZERO_F) {
      isBelowAbsoluteZero = true;
      limitMessage = `Input of ${inputNumber}°F is below Absolute Zero (-459.67°F). Temperatures lower than absolute zero are physically impossible!`;
    } else if (unit === 'k' && inputNumber < ABS_ZERO_K) {
      isBelowAbsoluteZero = true;
      limitMessage = `Input of ${inputNumber} K is below Absolute Zero (0 K). The Kelvin thermodynamic scale begins strictly at 0 K!`;
    }

    if (isBelowAbsoluteZero) {
      showError(
        '⚠️ Absolute Zero Violation (Physical Limit)',
        limitMessage,
        true // mark as absolute zero warning
      );
      resultsArea.style.display = 'none';
      return;
    }

    // Input is valid and above absolute zero! Proceed with conversions.
    hideError();

    let cVal, fVal, kVal;
    let formulaStepsHtml = '';

    if (unit === 'c') {
      cVal = inputNumber;
      // Formula: F = (C * 9/5) + 32
      fVal = (cVal * 9 / 5) + 32;
      // Formula: K = C + 273.15
      kVal = cVal + 273.15;

      formulaStepsHtml = `
        <div class="formula-step-row">
          <span class="step-label">Celsius → Fahrenheit:</span>
          <span class="step-math">(${cVal} × 9/5) + 32 = ${formatDisplay(fVal)} °F</span>
        </div>
        <div class="formula-step-row">
          <span class="step-label">Celsius → Kelvin:</span>
          <span class="step-math">${cVal} + 273.15 = ${formatDisplay(kVal)} K</span>
        </div>
      `;
    } else if (unit === 'f') {
      fVal = inputNumber;
      // Formula: C = (F - 32) * 5/9
      cVal = (fVal - 32) * 5 / 9;
      // Formula: K = (F - 32) * 5/9 + 273.15
      kVal = ((fVal - 32) * 5 / 9) + 273.15;

      formulaStepsHtml = `
        <div class="formula-step-row">
          <span class="step-label">Fahrenheit → Celsius:</span>
          <span class="step-math">(${fVal} - 32) × 5/9 = ${formatDisplay(cVal)} °C</span>
        </div>
        <div class="formula-step-row">
          <span class="step-label">Fahrenheit → Kelvin:</span>
          <span class="step-math">((${fVal} - 32) × 5/9) + 273.15 = ${formatDisplay(kVal)} K</span>
        </div>
      `;
    } else if (unit === 'k') {
      kVal = inputNumber;
      // Formula: C = K - 273.15
      cVal = kVal - 273.15;
      // Formula: F = (K - 273.15) * 9/5 + 32
      fVal = ((kVal - 273.15) * 9 / 5) + 32;

      formulaStepsHtml = `
        <div class="formula-step-row">
          <span class="step-label">Kelvin → Celsius:</span>
          <span class="step-math">${kVal} - 273.15 = ${formatDisplay(cVal)} °C</span>
        </div>
        <div class="formula-step-row">
          <span class="step-label">Kelvin → Fahrenheit:</span>
          <span class="step-math">((${kVal} - 273.15) × 9/5) + 32 = ${formatDisplay(fVal)} °F</span>
        </div>
      `;
    }

    // Display formatted numerical values
    valCelsius.textContent = formatDisplay(cVal);
    valFahrenheit.textContent = formatDisplay(fVal);
    valKelvin.textContent = formatDisplay(kVal);

    // Highlight source unit card
    highlightSourceCard(unit);

    // Update Thermal State Indicator based on Celsius value
    updateThermalStatus(cVal);

    // Injected Formula Steps
    formulaSteps.innerHTML = formulaStepsHtml;

    // Show Results Area
    resultsArea.style.display = 'block';
  }

  // Helper: Format Number for Output (2 decimal places, or precision if tiny)
  function formatDisplay(num) {
    if (Math.abs(num) >= 10000 || (Math.abs(num) < 0.001 && num !== 0)) {
      return num.toExponential(4);
    }
    return Number(num.toFixed(2)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Helper: Highlight Source Card
  function highlightSourceCard(unit) {
    cardCelsius.classList.remove('source-active');
    cardFahrenheit.classList.remove('source-active');
    cardKelvin.classList.remove('source-active');

    if (unit === 'c') cardCelsius.classList.add('source-active');
    if (unit === 'f') cardFahrenheit.classList.add('source-active');
    if (unit === 'k') cardKelvin.classList.add('source-active');
  }

  // Helper: Thermal Status & Theme
  function updateThermalStatus(celsius) {
    thermalStatusBar.className = 'thermal-status-bar';

    if (celsius <= -273.15) {
      thermalStatusBar.classList.add('theme-abs-zero');
      thermalIcon.textContent = '🌌';
      thermalText.textContent = 'Absolute Zero (Theoretical Minimum Limit)';
    } else if (celsius <= 0) {
      thermalStatusBar.classList.add('theme-freezing');
      thermalIcon.textContent = '❄️';
      thermalText.textContent = `Freezing / Sub-Zero Range (${celsius.toFixed(1)}°C)`;
    } else if (celsius <= 18) {
      thermalStatusBar.classList.add('theme-pleasant');
      thermalIcon.textContent = '🧊';
      thermalText.textContent = `Cool Environment (${celsius.toFixed(1)}°C)`;
    } else if (celsius <= 30) {
      thermalStatusBar.classList.add('theme-pleasant');
      thermalIcon.textContent = '🌤️';
      thermalText.textContent = `Comfortable Room / Ambient Range (${celsius.toFixed(1)}°C)`;
    } else if (celsius <= 50) {
      thermalStatusBar.classList.add('theme-warm');
      thermalIcon.textContent = '☀️';
      thermalText.textContent = `Hot Weather / High Ambient (${celsius.toFixed(1)}°C)`;
    } else if (celsius < 100) {
      thermalStatusBar.classList.add('theme-warm');
      thermalIcon.textContent = '🔥';
      thermalText.textContent = `Scalding / High Heat (${celsius.toFixed(1)}°C)`;
    } else {
      thermalStatusBar.classList.add('theme-boiling');
      thermalIcon.textContent = '🌋';
      thermalText.textContent = `Boiling / Extreme Thermal Range (${celsius.toFixed(1)}°C)`;
    }
  }

  // Error Display Handlers
  function showError(title, message, isAbsZero = false) {
    errorAlert.style.display = 'flex';
    alertTitle.textContent = title;
    alertMessage.textContent = message;

    if (isAbsZero) {
      errorAlert.className = 'alert-box abs-zero';
      alertIcon.textContent = '🛑';
    } else {
      errorAlert.className = 'alert-box error';
      alertIcon.textContent = '⚠️';
    }
  }

  function hideError() {
    errorAlert.style.display = 'none';
  }
});
