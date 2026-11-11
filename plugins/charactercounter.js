const charactercounter = {
  id: 'charactercounter',
  name: 'Character Counter',
  description: 'Ripped straight from vencord. It shows the amount of characters you have typed in.',
  el: null,
  timer: null,
  last: -1,
  findbox() {
    return document.querySelector('.composer-box') || document.querySelector('.composer');
  },
  findinput() {
    return document.querySelector('.composer textarea, .composer-box textarea, textarea.msg-input');
  },
  makeel() {
    const el = document.createElement('div');
    el.id = 'yapplus-charcounter';
    el.style.cssText = [
      'position:fixed',
      'z-index:2147483000',
      'pointer-events:none',
      'display:none',
      'padding:4px 10px',
      'border-radius:999px',
      'border:1.5px solid #7c8cff',
      'background:rgba(18,18,24,.92)',
      'backdrop-filter:blur(6px)',
      'box-shadow:0 2px 10px rgba(0,0,0,.45)',
      'font-size:14px',
      'font-weight:700',
      'line-height:1',
      'letter-spacing:.3px',
      'font-variant-numeric:tabular-nums',
      'color:#e8ebff',
      'transition:color .15s, border-color .15s, transform .1s'
    ].join(';');
    document.body.appendChild(el);
    return el;
  },
  colorfor(n) {
    if (n >= 1000) return '#ff5c5c'; // red
    if (n >= 500) return '#ffb020';  // amber
    return '#9fb0ff';                // soft blue
  },
  tick() { // 10fps basically what i get when i try to run minecraft
    if (!this.el || !this.el.isConnected) this.el = this.makeel();
    const box = this.findbox();
    const input = this.findinput();
    if (!box || !input) {
      this.el.style.display = 'none';
      return;
    }
    const rect = box.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      this.el.style.display = 'none';
      return;
    }
    const n = input.value.length;
    if (n !== this.last) {
      const c = this.colorfor(n);
      this.el.textContent = n.toLocaleString();
      this.el.style.color = c;
      this.el.style.borderColor = c;
      this.last = n;
    }
    this.el.style.display = 'block';
    this.el.style.right = Math.max(0, window.innerWidth - rect.right) + 'px';
    this.el.style.bottom = Math.max(0, window.innerHeight - rect.top + 15) + 'px';
  },
  start() {
    if (this.timer) return;
    const self = this;
    this.last = -1;
    this.timer = setInterval(function () { self.tick(); }, 100);
  },
  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    if (this.el) { this.el.remove(); this.el = null; }
    this.last = -1;
  },
};

window.PluginHost.register(charactercounter);
