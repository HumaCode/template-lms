/**
 * LH Alerts — LearnHub LMS Notification Library v1.0
 * Alert, toast, dialog, confirm, prompt, loading sistem
 * Design: Poppins · Blue primary · Bootstrap Icons
 * Compatible: semua halaman LearnHub admin panel
 */

(function (global) {
  'use strict';

  /* ══════════════════════════════════════════
     INJECT STYLES
  ══════════════════════════════════════════ */
  const STYLE = `
    :root {
      --lh-primary:    #2563eb;
      --lh-primary-l:  #3b82f6;
      --lh-primary-xl: #eff6ff;
      --lh-success:    #10b981;
      --lh-success-l:  #ecfdf5;
      --lh-warning:    #f59e0b;
      --lh-warning-l:  #fffbeb;
      --lh-danger:     #ef4444;
      --lh-danger-l:   #fef2f2;
      --lh-purple:     #8b5cf6;
      --lh-purple-l:   #f5f3ff;
      --lh-indigo:     #6366f1;
      --lh-indigo-l:   #eef2ff;
      --lh-teal:       #0d9488;
      --lh-teal-l:     #f0fdfa;
      --lh-orange:     #f97316;
      --lh-orange-l:   #fff7ed;
      --lh-text:       #0f172a;
      --lh-muted:      #64748b;
      --lh-border:     #e2e8f0;
      --lh-body-bg:    #f1f5f9;
      --lh-radius:     14px;
      --lh-font:       'Poppins', sans-serif;
    }

    /* ── TOAST ── */
    .lh-toast-container {
      position: fixed;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
      transition: all .3s;
    }
    .lh-toast-container.top-right    { top: 76px; right: 24px; align-items: flex-end; }
    .lh-toast-container.top-left     { top: 76px; left: 24px;  align-items: flex-start; }
    .lh-toast-container.top-center   { top: 76px; left: 50%; transform: translateX(-50%); align-items: center; }
    .lh-toast-container.bottom-right { bottom: 24px; right: 24px; align-items: flex-end; flex-direction: column-reverse; }
    .lh-toast-container.bottom-left  { bottom: 24px; left: 24px;  align-items: flex-start; flex-direction: column-reverse; }
    .lh-toast-container.bottom-center{ bottom: 24px; left: 50%; transform: translateX(-50%); align-items: center; flex-direction: column-reverse; }

    .lh-toast {
      pointer-events: all;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 13px;
      background: #fff;
      box-shadow: 0 8px 32px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08);
      border: 1px solid var(--lh-border);
      border-left: 4px solid var(--lh-primary);
      max-width: 360px;
      min-width: 280px;
      font-family: var(--lh-font);
      transform: translateX(120%);
      opacity: 0;
      transition: transform .38s cubic-bezier(.34,1.4,.64,1), opacity .3s ease;
      position: relative;
      overflow: hidden;
    }
    .lh-toast.from-left  { transform: translateX(-120%); }
    .lh-toast.from-top   { transform: translateY(-80px); }
    .lh-toast.from-bottom{ transform: translateY(80px); }
    .lh-toast.show {
      transform: translate(0,0) !important;
      opacity: 1;
    }
    .lh-toast.hide {
      transform: translateX(120%) !important;
      opacity: 0;
    }
    .lh-toast.hide.from-left  { transform: translateX(-120%) !important; }
    .lh-toast.hide.from-top   { transform: translateY(-80px) !important; }
    .lh-toast.hide.from-bottom{ transform: translateY(80px) !important; }

    /* toast color strip */
    .lh-toast::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--lh-toast-accent, var(--lh-primary));
      border-radius: 13px 13px 0 0;
    }
    .lh-toast-icon {
      width: 36px; height: 36px;
      border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .lh-toast-body { flex: 1; min-width: 0; }
    .lh-toast-title {
      font-size: 13.5px; font-weight: 700;
      color: var(--lh-text);
      margin-bottom: 2px;
    }
    .lh-toast-msg {
      font-size: 12.5px; color: var(--lh-muted);
      line-height: 1.55;
    }
    .lh-toast-close {
      width: 22px; height: 22px;
      border-radius: 6px; border: none;
      background: transparent;
      color: var(--lh-muted);
      cursor: pointer;
      font-size: 14px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      margin-top: -2px;
      transition: background .15s, color .15s;
    }
    .lh-toast-close:hover { background: var(--lh-body-bg); color: var(--lh-danger); }
    .lh-toast-progress {
      position: absolute;
      bottom: 0; left: 0;
      height: 3px;
      background: var(--lh-toast-accent, var(--lh-primary));
      opacity: .35;
      border-radius: 0 0 0 13px;
      transition: width linear;
    }

    /* ── COLORS ── */
    .lh-toast.lh-success { --lh-toast-accent: var(--lh-success); border-left-color: var(--lh-success); }
    .lh-toast.lh-success .lh-toast-icon { background: var(--lh-success-l); color: var(--lh-success); }
    .lh-toast.lh-error   { --lh-toast-accent: var(--lh-danger);  border-left-color: var(--lh-danger); }
    .lh-toast.lh-error   .lh-toast-icon { background: var(--lh-danger-l);  color: var(--lh-danger); }
    .lh-toast.lh-warning { --lh-toast-accent: var(--lh-warning); border-left-color: var(--lh-warning); }
    .lh-toast.lh-warning .lh-toast-icon { background: var(--lh-warning-l); color: var(--lh-warning); }
    .lh-toast.lh-info    { --lh-toast-accent: var(--lh-primary); border-left-color: var(--lh-primary); }
    .lh-toast.lh-info    .lh-toast-icon { background: var(--lh-primary-xl); color: var(--lh-primary); }
    .lh-toast.lh-teal    { --lh-toast-accent: var(--lh-teal);   border-left-color: var(--lh-teal); }
    .lh-toast.lh-teal    .lh-toast-icon { background: var(--lh-teal-l);    color: var(--lh-teal); }
    .lh-toast.lh-purple  { --lh-toast-accent: var(--lh-purple); border-left-color: var(--lh-purple); }
    .lh-toast.lh-purple  .lh-toast-icon { background: var(--lh-purple-l);  color: var(--lh-purple); }
    .lh-toast.lh-indigo  { --lh-toast-accent: var(--lh-indigo); border-left-color: var(--lh-indigo); }
    .lh-toast.lh-indigo  .lh-toast-icon { background: var(--lh-indigo-l);  color: var(--lh-indigo); }
    .lh-toast.lh-orange  { --lh-toast-accent: var(--lh-orange); border-left-color: var(--lh-orange); }
    .lh-toast.lh-orange  .lh-toast-icon { background: var(--lh-orange-l);  color: var(--lh-orange); }

    /* ── MODAL OVERLAY ── */
    .lh-overlay {
      position: fixed; inset: 0;
      background: rgba(15,23,42,.52);
      backdrop-filter: blur(5px);
      z-index: 99990;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      opacity: 0;
      transition: opacity .25s ease;
    }
    .lh-overlay.show { opacity: 1; }

    /* ── MODAL BOX ── */
    .lh-modal {
      background: #fff;
      border-radius: 20px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 24px 64px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.1);
      font-family: var(--lh-font);
      transform: scale(.88) translateY(24px);
      transition: transform .35s cubic-bezier(.34,1.45,.64,1);
      overflow: hidden;
    }
    .lh-overlay.show .lh-modal { transform: scale(1) translateY(0); }

    /* modal icon area */
    .lh-modal-icon-wrap {
      padding: 32px 32px 0;
      display: flex;
      justify-content: center;
    }
    .lh-modal-icon {
      width: 76px; height: 76px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 32px;
      position: relative;
      animation: lhIconFloat 2.8s ease-in-out infinite;
    }
    @keyframes lhIconFloat {
      0%,100% { transform: translateY(0) rotate(0deg); }
      40%      { transform: translateY(-5px) rotate(-6deg); }
      70%      { transform: translateY(2px) rotate(3deg); }
    }
    .lh-modal-icon::after {
      content: '';
      position: absolute;
      inset: -7px;
      border-radius: 50%;
      border: 2px dashed;
      border-color: inherit;
      opacity: .3;
      animation: lhRing 6s linear infinite;
    }
    @keyframes lhRing { to { transform: rotate(360deg); } }

    .lh-modal-body {
      padding: 20px 32px;
      text-align: center;
    }
    .lh-modal-title {
      font-size: 18px; font-weight: 700;
      color: var(--lh-text);
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .lh-modal-msg {
      font-size: 13.5px;
      color: var(--lh-muted);
      line-height: 1.7;
    }
    .lh-modal-msg strong { color: var(--lh-text); }

    /* checkbox (for confirm with require) */
    .lh-check-wrap {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 14px;
      background: var(--lh-body-bg);
      border: 1px solid var(--lh-border);
      border-radius: 10px;
      margin-top: 14px;
      text-align: left;
      cursor: pointer;
      transition: border-color .2s;
    }
    .lh-check-wrap:hover { border-color: var(--lh-danger); }
    .lh-check-wrap input { margin-top: 2px; accent-color: var(--lh-danger); flex-shrink: 0; width: 15px; height: 15px; cursor: pointer; }
    .lh-check-label { font-size: 12.5px; color: var(--lh-muted); line-height: 1.55; user-select: none; }

    /* prompt input */
    .lh-prompt-wrap {
      margin-top: 14px;
      text-align: left;
    }
    .lh-prompt-label {
      font-size: 12.5px; font-weight: 600;
      color: var(--lh-text);
      margin-bottom: 6px;
      display: block;
    }
    .lh-prompt-input {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid var(--lh-border);
      border-radius: 10px;
      font-family: var(--lh-font);
      font-size: 13.5px;
      color: var(--lh-text);
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      background: #fff;
    }
    .lh-prompt-input::placeholder { color: #94a3b8; }
    .lh-prompt-input:focus {
      border-color: var(--lh-primary-l);
      box-shadow: 0 0 0 3px rgba(59,130,246,.12);
    }
    .lh-prompt-input.lh-error-inp { border-color: var(--lh-danger); }
    .lh-prompt-input.lh-error-inp:focus { box-shadow: 0 0 0 3px rgba(239,68,68,.12); }
    .lh-prompt-err {
      font-size: 12px; color: var(--lh-danger);
      margin-top: 5px;
      display: flex; align-items: center; gap: 5px;
    }
    .lh-prompt-err::before { content: '\F332'; font-family: 'bootstrap-icons'; }

    /* modal footer / buttons */
    .lh-modal-foot {
      padding: 16px 32px 28px;
      display: flex;
      gap: 10px;
    }
    .lh-modal-foot.col { flex-direction: column; }
    .lh-btn {
      flex: 1;
      padding: 11px 16px;
      border-radius: 11px;
      border: none;
      font-family: var(--lh-font);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all .25s cubic-bezier(.4,0,.2,1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
    }
    .lh-btn:hover { transform: translateY(-1px); }
    .lh-btn:active { transform: scale(.97); }

    /* button variants */
    .lh-btn-cancel {
      background: #fff;
      color: var(--lh-muted);
      border: 1.5px solid var(--lh-border) !important;
      border: none;
    }
    .lh-btn-cancel:hover { background: var(--lh-body-bg); }

    .lh-btn-primary { background: linear-gradient(135deg, var(--lh-primary), var(--lh-primary-l)); color: #fff; box-shadow: 0 3px 12px rgba(37,99,235,.3); }
    .lh-btn-primary:hover { filter: brightness(1.08); box-shadow: 0 5px 18px rgba(37,99,235,.42); }

    .lh-btn-success { background: linear-gradient(135deg, var(--lh-success), #34d399); color: #fff; box-shadow: 0 3px 12px rgba(16,185,129,.3); }
    .lh-btn-success:hover { filter: brightness(1.08); box-shadow: 0 5px 18px rgba(16,185,129,.4); }

    .lh-btn-danger { background: linear-gradient(135deg, var(--lh-danger), #f87171); color: #fff; box-shadow: 0 3px 12px rgba(239,68,68,.3); }
    .lh-btn-danger:hover { filter: brightness(1.08); box-shadow: 0 5px 18px rgba(239,68,68,.4); }

    .lh-btn-warning { background: linear-gradient(135deg, var(--lh-warning), #fbbf24); color: #fff; box-shadow: 0 3px 12px rgba(245,158,11,.3); }
    .lh-btn-warning:hover { filter: brightness(1.08); }

    .lh-btn-purple { background: linear-gradient(135deg, var(--lh-purple), #a78bfa); color: #fff; box-shadow: 0 3px 12px rgba(139,92,246,.3); }
    .lh-btn-purple:hover { filter: brightness(1.08); }

    .lh-btn-teal { background: linear-gradient(135deg, var(--lh-teal), #2dd4bf); color: #fff; box-shadow: 0 3px 12px rgba(13,148,136,.28); }
    .lh-btn-teal:hover { filter: brightness(1.08); }

    .lh-btn-indigo { background: linear-gradient(135deg, var(--lh-indigo), #818cf8); color: #fff; box-shadow: 0 3px 12px rgba(99,102,241,.3); }
    .lh-btn-indigo:hover { filter: brightness(1.08); }

    .lh-btn-orange { background: linear-gradient(135deg, var(--lh-orange), #fb923c); color: #fff; box-shadow: 0 3px 12px rgba(249,115,22,.3); }
    .lh-btn-orange:hover { filter: brightness(1.08); }

    .lh-btn-ghost {
      background: #fff;
      border: 1.5px solid var(--lh-border) !important;
      border: none;
      color: var(--lh-muted);
    }
    .lh-btn-ghost:hover { background: var(--lh-primary-xl); color: var(--lh-primary); border-color: rgba(59,130,246,.3) !important; }

    /* disabled state */
    .lh-btn:disabled { opacity: .38; cursor: not-allowed; transform: none !important; filter: none !important; }

    /* ── LOADING ── */
    .lh-loading {
      position: fixed; inset: 0;
      background: rgba(15,23,42,.55);
      backdrop-filter: blur(6px);
      z-index: 99995;
      display: flex; align-items: center; justify-content: center;
      opacity: 0;
      transition: opacity .25s;
    }
    .lh-loading.show { opacity: 1; }
    .lh-loading-box {
      background: #fff;
      border-radius: 20px;
      padding: 36px 40px;
      text-align: center;
      box-shadow: 0 24px 64px rgba(0,0,0,.18);
      min-width: 240px;
      transform: scale(.9);
      transition: transform .3s cubic-bezier(.34,1.45,.64,1);
    }
    .lh-loading.show .lh-loading-box { transform: scale(1); }
    .lh-spinner {
      width: 52px; height: 52px;
      border-radius: 50%;
      border: 4px solid var(--lh-body-bg);
      border-top-color: var(--lh-primary);
      border-right-color: var(--lh-primary-l);
      animation: lhSpin .8s linear infinite;
      margin: 0 auto 18px;
    }
    @keyframes lhSpin { to { transform: rotate(360deg); } }
    .lh-loading-title {
      font-family: var(--lh-font);
      font-size: 15px; font-weight: 700;
      color: var(--lh-text);
      margin-bottom: 5px;
    }
    .lh-loading-msg {
      font-family: var(--lh-font);
      font-size: 13px; color: var(--lh-muted);
    }
    .lh-loading-close-btn {
      margin-top: 18px;
      padding: 8px 20px;
      border-radius: 9px;
      border: 1.5px solid var(--lh-border);
      background: #fff;
      font-family: var(--lh-font);
      font-size: 13px; font-weight: 600;
      color: var(--lh-muted);
      cursor: pointer;
      transition: all .2s;
    }
    .lh-loading-close-btn:hover { border-color: var(--lh-danger); color: var(--lh-danger); background: var(--lh-danger-l); }

    /* ── INLINE ALERT ── */
    .lh-inline {
      display: flex;
      align-items: flex-start;
      gap: 11px;
      padding: 13px 16px;
      border-radius: 11px;
      font-family: var(--lh-font);
      border-left: 4px solid;
      animation: lhSlideIn .3s ease both;
    }
    @keyframes lhSlideIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .lh-inline-icon {
      font-size: 17px; flex-shrink: 0; margin-top: 1px;
    }
    .lh-inline-body { flex: 1; min-width: 0; }
    .lh-inline-title {
      font-size: 13.5px; font-weight: 700;
      margin-bottom: 2px;
    }
    .lh-inline-msg { font-size: 12.5px; line-height: 1.6; }
    .lh-inline-close {
      width: 22px; height: 22px; border-radius: 5px;
      border: none; background: transparent;
      cursor: pointer; font-size: 13px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: -1px;
      opacity: .6; transition: opacity .15s, background .15s;
    }
    .lh-inline-close:hover { opacity: 1; background: rgba(0,0,0,.08); }

    /* inline variants */
    .lh-inline.lh-success { background: var(--lh-success-l); border-color: var(--lh-success); }
    .lh-inline.lh-success .lh-inline-icon, .lh-inline.lh-success .lh-inline-title { color: #065f46; }
    .lh-inline.lh-success .lh-inline-msg { color: #047857; }

    .lh-inline.lh-error { background: var(--lh-danger-l); border-color: var(--lh-danger); }
    .lh-inline.lh-error .lh-inline-icon, .lh-inline.lh-error .lh-inline-title { color: #991b1b; }
    .lh-inline.lh-error .lh-inline-msg { color: #b91c1c; }

    .lh-inline.lh-warning { background: var(--lh-warning-l); border-color: var(--lh-warning); }
    .lh-inline.lh-warning .lh-inline-icon, .lh-inline.lh-warning .lh-inline-title { color: #92400e; }
    .lh-inline.lh-warning .lh-inline-msg { color: #b45309; }

    .lh-inline.lh-info { background: var(--lh-primary-xl); border-color: var(--lh-primary); }
    .lh-inline.lh-info .lh-inline-icon, .lh-inline.lh-info .lh-inline-title { color: #1e40af; }
    .lh-inline.lh-info .lh-inline-msg { color: #2563eb; }

    .lh-inline.lh-teal { background: var(--lh-teal-l); border-color: var(--lh-teal); }
    .lh-inline.lh-teal .lh-inline-icon, .lh-inline.lh-teal .lh-inline-title { color: #134e4a; }
    .lh-inline.lh-teal .lh-inline-msg { color: var(--lh-teal); }

    .lh-inline.lh-purple { background: var(--lh-purple-l); border-color: var(--lh-purple); }
    .lh-inline.lh-purple .lh-inline-icon, .lh-inline.lh-purple .lh-inline-title { color: #4c1d95; }
    .lh-inline.lh-purple .lh-inline-msg { color: var(--lh-purple); }

    .lh-inline.lh-orange { background: var(--lh-orange-l); border-color: var(--lh-orange); }
    .lh-inline.lh-orange .lh-inline-icon, .lh-inline.lh-orange .lh-inline-title { color: #c2410c; }
    .lh-inline.lh-orange .lh-inline-msg { color: var(--lh-orange); }

    @media (max-width: 480px) {
      .lh-toast { max-width: calc(100vw - 32px); min-width: 0; }
      .lh-modal { border-radius: 16px; }
      .lh-modal-body, .lh-modal-foot { padding-left: 22px; padding-right: 22px; }
      .lh-modal-icon-wrap { padding: 26px 22px 0; }
    }
  `;

  if (!document.getElementById('lh-alerts-style')) {
    const s = document.createElement('style');
    s.id = 'lh-alerts-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════
     ICON MAP
  ══════════════════════════════════════════ */
  const ICONS = {
    success:  '<i class="bi bi-check-circle-fill"></i>',
    error:    '<i class="bi bi-x-circle-fill"></i>',
    warning:  '<i class="bi bi-exclamation-triangle-fill"></i>',
    info:     '<i class="bi bi-info-circle-fill"></i>',
    teal:     '<i class="bi bi-lightning-charge-fill"></i>',
    purple:   '<i class="bi bi-stars"></i>',
    indigo:   '<i class="bi bi-grid-1x2-fill"></i>',
    orange:   '<i class="bi bi-images"></i>',
    // named icons for dialogs
    save:     '<i class="bi bi-floppy-fill"></i>',
    delete:   '<i class="bi bi-trash-fill"></i>',
    logout:   '<i class="bi bi-box-arrow-right"></i>',
    lock:     '<i class="bi bi-lock-fill"></i>',
    key:      '<i class="bi bi-key-fill"></i>',
    user:     '<i class="bi bi-person-fill"></i>',
    send:     '<i class="bi bi-send-fill"></i>',
    upload:   '<i class="bi bi-cloud-upload-fill"></i>',
    download: '<i class="bi bi-cloud-download-fill"></i>',
    shield:   '<i class="bi bi-shield-lock-fill"></i>',
    mail:     '<i class="bi bi-envelope-fill"></i>',
    bell:     '<i class="bi bi-bell-fill"></i>',
    check:    '<i class="bi bi-check2-all"></i>',
    refresh:  '<i class="bi bi-arrow-clockwise"></i>',
    payment:  '<i class="bi bi-credit-card-2-front-fill"></i>',
    cert:     '<i class="bi bi-award-fill"></i>',
    course:   '<i class="bi bi-play-btn-fill"></i>',
    gear:     '<i class="bi bi-gear-fill"></i>',
    chart:    '<i class="bi bi-bar-chart-fill"></i>',
    image:    '<i class="bi bi-image-fill"></i>',
    link:     '<i class="bi bi-link-45deg"></i>',
  };

  const TYPE_ICON = {
    success: 'success', error: 'error', warning: 'warning',
    info: 'info', teal: 'teal', purple: 'purple', indigo: 'indigo', orange: 'orange',
  };

  function getIcon(type, icon) {
    if (icon && ICONS[icon]) return ICONS[icon];
    if (type && ICONS[type]) return ICONS[type];
    return ICONS.info;
  }

  /* ══════════════════════════════════════════
     TOAST
  ══════════════════════════════════════════ */
  const _containers = {};

  function getContainer(pos) {
    if (!_containers[pos]) {
      const c = document.createElement('div');
      c.className = `lh-toast-container ${pos}`;
      document.body.appendChild(c);
      _containers[pos] = c;
    }
    return _containers[pos];
  }

  function _animDir(pos) {
    if (pos.includes('left'))   return 'from-left';
    if (pos.includes('center')) return 'from-top';
    if (pos.includes('bottom')) return 'from-bottom';
    return ''; // default right
  }

  function toast(opts) {
    if (typeof opts === 'string') opts = { message: opts };
    const {
      type = 'info',
      title = '',
      message = '',
      duration = 4000,
      position = 'top-right',
      icon,
      closable = true,
    } = opts;

    const pos = position;
    const container = getContainer(pos);
    const animDir = _animDir(pos);
    const iconHtml = getIcon(type, icon);

    const el = document.createElement('div');
    el.className = `lh-toast lh-${type} ${animDir}`;
    el.innerHTML = `
      <div class="lh-toast-icon">${iconHtml}</div>
      <div class="lh-toast-body">
        ${title ? `<div class="lh-toast-title">${title}</div>` : ''}
        ${message ? `<div class="lh-toast-msg">${message}</div>` : ''}
      </div>
      ${closable ? '<button class="lh-toast-close"><i class="bi bi-x-lg"></i></button>' : ''}
      <div class="lh-toast-progress" style="width:100%"></div>
    `;

    container.appendChild(el);

    // close fn
    let dismissed = false;
    let timer, progTimer;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearTimeout(timer);
      clearInterval(progTimer);
      el.classList.add('hide');
      setTimeout(() => el.remove(), 420);
    }

    if (closable) {
      el.querySelector('.lh-toast-close').addEventListener('click', dismiss);
    }

    // show
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('show'));
    });

    // progress bar
    if (duration > 0) {
      const bar = el.querySelector('.lh-toast-progress');
      const start = Date.now();
      progTimer = setInterval(() => {
        const pct = Math.max(0, 1 - (Date.now() - start) / duration);
        bar.style.width = (pct * 100) + '%';
        if (pct <= 0) clearInterval(progTimer);
      }, 30);
      timer = setTimeout(dismiss, duration);
    }

    return { dismiss };
  }

  function success(message, title) { return toast({ type: 'success', message, title: title || 'Berhasil!', position: 'top-right' }); }
  function error(message, title)   { return toast({ type: 'error',   message, title: title || 'Terjadi Kesalahan', position: 'top-right' }); }
  function warning(message, title) { return toast({ type: 'warning', message, title: title || 'Perhatian!', position: 'top-right' }); }
  function info(message, title)    { return toast({ type: 'info',    message, title: title || 'Informasi', position: 'top-right' }); }

  /* ══════════════════════════════════════════
     MODAL BASE
  ══════════════════════════════════════════ */
  function createOverlay() {
    const ov = document.createElement('div');
    ov.className = 'lh-overlay';
    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('show')));
    return ov;
  }

  function closeOverlay(ov, cb) {
    ov.classList.remove('show');
    setTimeout(() => {
      ov.remove();
      document.body.style.overflow = '';
      if (typeof cb === 'function') cb();
    }, 260);
  }

  /* Icon bg colors for modal */
  const MODAL_ICON_BG = {
    success: { bg: '#dcfce7', color: '#16a34a', ring: '#16a34a' },
    error:   { bg: '#fee2e2', color: '#ef4444', ring: '#ef4444' },
    warning: { bg: '#fef3c7', color: '#f59e0b', ring: '#f59e0b' },
    info:    { bg: '#eff6ff', color: '#2563eb', ring: '#2563eb' },
    teal:    { bg: '#ccfbf1', color: '#0d9488', ring: '#0d9488' },
    purple:  { bg: '#f5f3ff', color: '#8b5cf6', ring: '#8b5cf6' },
    indigo:  { bg: '#eef2ff', color: '#6366f1', ring: '#6366f1' },
    orange:  { bg: '#fff7ed', color: '#f97316', ring: '#f97316' },
  };

  function buildModalIcon(type, icon) {
    const c = MODAL_ICON_BG[type] || MODAL_ICON_BG.info;
    const iconHtml = getIcon(type, icon);
    return `
      <div class="lh-modal-icon" style="background:${c.bg};border-color:${c.ring};">
        <span style="color:${c.color}">${iconHtml}</span>
      </div>
    `;
  }

  /* ══════════════════════════════════════════
     DIALOG
  ══════════════════════════════════════════ */
  function dialog(opts) {
    return new Promise((resolve) => {
      const {
        type = 'info',
        icon,
        title = 'Informasi',
        message = '',
        buttons = [{ label: 'Tutup', class: 'lh-btn-primary', close: true, value: true }],
      } = opts;

      const ov = createOverlay();
      const modal = document.createElement('div');
      modal.className = 'lh-modal';

      const btnsHtml = buttons.map((b, i) =>
        `<button class="lh-btn ${b.class || 'lh-btn-ghost'}" data-idx="${i}">
          ${b.icon ? b.icon + ' ' : ''}${b.label}
        </button>`
      ).join('');

      modal.innerHTML = `
        <div class="lh-modal-icon-wrap">${buildModalIcon(type, icon)}</div>
        <div class="lh-modal-body">
          <div class="lh-modal-title">${title}</div>
          ${message ? `<div class="lh-modal-msg">${message}</div>` : ''}
        </div>
        <div class="lh-modal-foot">${btnsHtml}</div>
      `;

      ov.appendChild(modal);

      modal.querySelectorAll('.lh-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          const def = buttons[idx];
          const val = def.value !== undefined ? def.value : def.label;
          if (def.close !== false) {
            closeOverlay(ov, () => resolve(val));
          } else {
            resolve(val);
          }
        });
      });

      // close on overlay click
      ov.addEventListener('click', (e) => {
        if (e.target === ov) closeOverlay(ov, () => resolve(null));
      });
    });
  }

  /* ══════════════════════════════════════════
     CONFIRM
  ══════════════════════════════════════════ */
  function confirm(opts) {
    return new Promise((resolve) => {
      const {
        type = 'warning',
        icon,
        title = 'Konfirmasi',
        message = 'Apakah Anda yakin?',
        confirmLabel = 'Ya, Lanjutkan',
        confirmClass = 'lh-btn-primary',
        confirmIcon = '',
        cancelLabel = 'Batal',
        requireCheck = false,
        checkLabel = 'Saya memahami konsekuensi dari tindakan ini.',
      } = opts;

      const ov = createOverlay();
      const modal = document.createElement('div');
      modal.className = 'lh-modal';

      modal.innerHTML = `
        <div class="lh-modal-icon-wrap">${buildModalIcon(type, icon)}</div>
        <div class="lh-modal-body">
          <div class="lh-modal-title">${title}</div>
          ${message ? `<div class="lh-modal-msg">${message}</div>` : ''}
          ${requireCheck ? `
            <label class="lh-check-wrap">
              <input type="checkbox" id="lh-req-check">
              <span class="lh-check-label">${checkLabel}</span>
            </label>
          ` : ''}
        </div>
        <div class="lh-modal-foot">
          <button class="lh-btn lh-btn-ghost" id="lh-cancel-btn">${cancelLabel}</button>
          <button class="lh-btn ${confirmClass}" id="lh-confirm-btn" ${requireCheck ? 'disabled' : ''}>
            ${confirmIcon ? confirmIcon + ' ' : ''}${confirmLabel}
          </button>
        </div>
      `;

      ov.appendChild(modal);

      const confirmBtn = modal.querySelector('#lh-confirm-btn');
      const cancelBtn  = modal.querySelector('#lh-cancel-btn');

      if (requireCheck) {
        const cb = modal.querySelector('#lh-req-check');
        cb.addEventListener('change', () => {
          confirmBtn.disabled = !cb.checked;
        });
      }

      confirmBtn.addEventListener('click', () => closeOverlay(ov, () => resolve(true)));
      cancelBtn.addEventListener('click',  () => closeOverlay(ov, () => resolve(false)));
      ov.addEventListener('click', (e) => { if (e.target === ov) closeOverlay(ov, () => resolve(false)); });
    });
  }

  /* ══════════════════════════════════════════
     PROMPT
  ══════════════════════════════════════════ */
  function prompt(opts) {
    return new Promise((resolve) => {
      const {
        type = 'info',
        icon,
        title = 'Masukkan Data',
        message = '',
        label = 'Nilai',
        placeholder = '',
        defaultValue = '',
        inputType = 'text',
        confirmLabel = 'Simpan',
        cancelLabel = 'Batal',
        confirmClass,
        required = true,
        validate,
      } = opts;

      // pick btn class from type if not provided
      const btnClass = confirmClass || ({
        success: 'lh-btn-success', error: 'lh-btn-danger',
        warning: 'lh-btn-warning', teal: 'lh-btn-teal',
        purple: 'lh-btn-purple', indigo: 'lh-btn-indigo',
        orange: 'lh-btn-orange',
      }[type] || 'lh-btn-primary');

      const ov = createOverlay();
      const modal = document.createElement('div');
      modal.className = 'lh-modal';

      modal.innerHTML = `
        <div class="lh-modal-icon-wrap">${buildModalIcon(type, icon)}</div>
        <div class="lh-modal-body">
          <div class="lh-modal-title">${title}</div>
          ${message ? `<div class="lh-modal-msg">${message}</div>` : ''}
          <div class="lh-prompt-wrap">
            <label class="lh-prompt-label">${label}</label>
            <input class="lh-prompt-input" type="${inputType}"
              placeholder="${placeholder}" value="${defaultValue}" autocomplete="off">
            <div class="lh-prompt-err" style="display:none"></div>
          </div>
        </div>
        <div class="lh-modal-foot">
          <button class="lh-btn lh-btn-ghost" id="lh-cancel-btn">${cancelLabel}</button>
          <button class="lh-btn ${btnClass}" id="lh-confirm-btn">${confirmLabel}</button>
        </div>
      `;

      ov.appendChild(modal);

      const input      = modal.querySelector('.lh-prompt-input');
      const errEl      = modal.querySelector('.lh-prompt-err');
      const confirmBtn = modal.querySelector('#lh-confirm-btn');
      const cancelBtn  = modal.querySelector('#lh-cancel-btn');

      // focus after animation
      setTimeout(() => input.focus(), 340);

      function showErr(msg) {
        errEl.textContent = msg;
        errEl.style.display = 'flex';
        input.classList.add('lh-error-inp');
      }
      function clearErr() {
        errEl.style.display = 'none';
        input.classList.remove('lh-error-inp');
      }

      input.addEventListener('input', clearErr);

      function doConfirm() {
        const val = input.value.trim();
        if (required && !val) { showErr('Field ini wajib diisi.'); return; }
        if (typeof validate === 'function') {
          const err = validate(val);
          if (err) { showErr(err); return; }
        }
        closeOverlay(ov, () => resolve(val || null));
      }

      confirmBtn.addEventListener('click', doConfirm);
      cancelBtn.addEventListener('click', () => closeOverlay(ov, () => resolve(null)));
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doConfirm(); });
      ov.addEventListener('click', (e) => { if (e.target === ov) closeOverlay(ov, () => resolve(null)); });
    });
  }

  /* ══════════════════════════════════════════
     LOADING
  ══════════════════════════════════════════ */
  function loading(opts = {}) {
    const {
      title = 'Memuat...',
      message = 'Mohon tunggu sebentar',
      closable = false,
    } = typeof opts === 'string' ? { title: opts } : opts;

    const ov = document.createElement('div');
    ov.className = 'lh-loading';
    ov.innerHTML = `
      <div class="lh-loading-box">
        <div class="lh-spinner"></div>
        <div class="lh-loading-title" id="lh-load-title">${title}</div>
        <div class="lh-loading-msg"  id="lh-load-msg">${message}</div>
        ${closable ? '<button class="lh-loading-close-btn" id="lh-load-close"><i class="bi bi-x-lg" style="margin-right:5px"></i>Batalkan</button>' : ''}
      </div>
    `;

    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('show')));

    let closed = false;
    function close(cb) {
      if (closed) return;
      closed = true;
      ov.classList.remove('show');
      setTimeout(() => {
        ov.remove();
        document.body.style.overflow = '';
        if (typeof cb === 'function') cb();
      }, 270);
    }

    if (closable) {
      ov.querySelector('#lh-load-close').addEventListener('click', () => close());
    }

    return {
      close,
      setTitle(t)  { const el = ov.querySelector('#lh-load-title'); if (el) el.textContent = t; },
      setMessage(m){ const el = ov.querySelector('#lh-load-msg');   if (el) el.textContent = m; },
    };
  }

  /* ══════════════════════════════════════════
     INLINE ALERT
  ══════════════════════════════════════════ */
  function alert(selector, opts = {}) {
    const target = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
    if (!target) return null;

    const {
      type = 'info',
      icon,
      title = '',
      message = '',
      closable = true,
      prepend = false,
    } = opts;

    const iconHtml = getIcon(type, icon);

    const el = document.createElement('div');
    el.className = `lh-inline lh-${type}`;
    el.innerHTML = `
      <div class="lh-inline-icon">${iconHtml}</div>
      <div class="lh-inline-body">
        ${title   ? `<div class="lh-inline-title">${title}</div>` : ''}
        ${message ? `<div class="lh-inline-msg">${message}</div>` : ''}
      </div>
      ${closable ? '<button class="lh-inline-close"><i class="bi bi-x-lg"></i></button>' : ''}
    `;

    if (prepend && target.firstChild) {
      target.insertBefore(el, target.firstChild);
    } else {
      target.appendChild(el);
    }

    if (closable) {
      el.querySelector('.lh-inline-close').addEventListener('click', () => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-6px)';
        el.style.transition = 'opacity .25s, transform .25s';
        setTimeout(() => el.remove(), 260);
      });
    }

    return el;
  }

  /* ══════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════ */
  const LH = {
    toast, success, error, warning, info,
    dialog, confirm, prompt, loading, alert,
  };

  // expose as window.LH
  global.LH = LH;

})(window);
