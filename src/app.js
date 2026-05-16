(() => {
  'use strict';

  const rollBtn    = document.getElementById('rollBtn');
  const clearBtn   = document.getElementById('clearBtn');
  const resultsEl  = document.getElementById('results');
  const historyEl  = document.getElementById('history');
  const diceCount  = document.getElementById('diceCount');
  const diceType   = document.getElementById('diceType');

  /** Roll a single die with `sides` faces. */
  const rollDie = (sides) => Math.floor(Math.random() * sides) + 1;

  /** Render the most-recent roll result into #results. */
  function renderResult(rolls, sides) {
    const total = rolls.reduce((a, b) => a + b, 0);
    const max   = sides;
    const min   = 1;

    const diceHtml = rolls
      .map(v => {
        const cls = v === max ? 'die max' : v === min ? 'die min' : 'die';
        return `<div class="${cls}">${v}</div>`;
      })
      .join('');

    resultsEl.innerHTML = `
      <div class="roll-label">${rolls.length}d${sides}</div>
      <div class="roll-total">${total}</div>
      ${rolls.length > 1 ? `<div class="roll-breakdown">[${rolls.join(' + ')}]</div>` : ''}
      <div class="dice-row">${diceHtml}</div>
    `;
  }

  /** Add entry to history list (newest on top). */
  function addHistory(rolls, sides) {
    const total = rolls.reduce((a, b) => a + b, 0);
    const ts    = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const li    = document.createElement('li');
    li.innerHTML = `<span class="total">${total}</span> — ${rolls.length}d${sides} [${rolls.join(', ')}] <small>${ts}</small>`;
    historyEl.prepend(li);
  }

  function handleRoll() {
    const count = Math.max(1, Math.min(20, parseInt(diceCount.value, 10) || 1));
    const sides = parseInt(diceType.value, 10);
    const rolls = Array.from({ length: count }, () => rollDie(sides));
    renderResult(rolls, sides);
    addHistory(rolls, sides);
  }

  rollBtn.addEventListener('click', handleRoll);

  clearBtn.addEventListener('click', () => {
    historyEl.innerHTML = '';
  });

  // Keyboard shortcut: Enter triggers roll
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement !== clearBtn) handleRoll();
  });
})();
