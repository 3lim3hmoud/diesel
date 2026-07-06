/* Shared themed UI feedback: toasts + confirm modal.
   Replaces native alert()/confirm() so nothing breaks the terminal aesthetic.
   Depends on: DieselSound (optional, for sfx). Works standalone otherwise. */
const DieselUI = {
  _stackEl: null,

  _stack(){
    if(this._stackEl && document.body.contains(this._stackEl)) return this._stackEl;
    const el = document.createElement('div');
    el.className = 'dui-stack';
    document.body.appendChild(el);
    this._stackEl = el;
    return el;
  },

  /* kind: 'ok' | 'info' | 'warn' | 'err' */
  toast(msg, opts){
    opts = opts || {};
    const kind = opts.kind || 'ok';
    const icon = opts.icon || ({ ok:'\u2713', info:'\u25CF', warn:'\u26A0', err:'\u2715' })[kind];
    const duration = opts.duration || 2200;

    const stack = this._stack();
    const t = document.createElement('div');
    t.className = 'dui-toast dui-' + kind;
    t.innerHTML = '<span class="dui-ic">' + icon + '</span><span class="dui-msg"></span>';
    t.querySelector('.dui-msg').textContent = msg;
    stack.appendChild(t);
    requestAnimationFrame(() => t.classList.add('in'));

    const kill = () => {
      t.classList.remove('in');
      t.classList.add('out');
      setTimeout(() => t.remove(), 260);
    };
    const timer = setTimeout(kill, duration);
    t.addEventListener('click', () => { clearTimeout(timer); kill(); });
    return t;
  },

  /* Promise-based themed confirm — replaces window.confirm(). */
  confirm(msg, opts){
    opts = opts || {};
    const title = opts.title || 'CONFIRM ACTION';
    const okLabel = opts.okLabel || 'CONFIRM';
    const cancelLabel = opts.cancelLabel || 'CANCEL';

    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'dui-overlay';
      overlay.innerHTML = `
        <div class="dui-modal" role="alertdialog" aria-modal="true">
          <div class="dui-modal-title">${title}</div>
          <div class="dui-modal-msg"></div>
          <div class="dui-modal-actions">
            <button class="btn" data-a="cancel">${cancelLabel}</button>
            <button class="btn danger" data-a="ok">${okLabel}</button>
          </div>
        </div>`;
      overlay.querySelector('.dui-modal-msg').textContent = msg;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('in'));

      const close = (result) => {
        overlay.classList.remove('in');
        overlay.classList.add('out');
        setTimeout(() => overlay.remove(), 200);
        resolve(result);
      };
      overlay.addEventListener('click', (e) => {
        if(e.target === overlay) close(false);
        const a = e.target.closest('[data-a]');
        if(a) close(a.dataset.a === 'ok');
      });
      overlay.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') close(false);
      });
      overlay.querySelector('[data-a="ok"]').focus();
    });
  }
};
