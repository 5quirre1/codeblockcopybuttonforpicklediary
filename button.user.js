// ==UserScript==
// @name         codeblockcopy
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  adds a copy button to code blocks an stuff
// @author       @squirrel
// @match        https://pikidiary.lol/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pikidiary.lol
// @grant        GM_addStyle
// ==/UserScript==

// also btw,., all icons come from https://p.yusukekamiyamane.com/ !!!!!! amazing icons.m.,.
(function () {
  'use strict';

  // icons
  const ICON_NORMAL = "https://f.feridinha.com/QRNrN.png"; // copy button
  const ICON_SUCCESS = "https://f.feridinha.com/qAY9z.png"; // check mark

  // try topreload the icons  so that it doesn't take ages and stuff and feels super butter smooth.,.,.
  [ICON_NORMAL, ICON_SUCCESS].forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // styling!11!
  GM_addStyle(`
    .copy-btn {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 4px;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .copy-btn img {
      width: 16px;
      height: 16px;
      pointer-events: none;
      transition: filter .2s;
    }
    .copy-btn:hover img {
      filter: brightness(1.2);
    }
    .code-block {
      position: relative;
      padding: 4px;
      border: 1px dashed #ccc;
      overflow-x: auto;
      margin: 0;
      font-size: 12px;
      white-space: pre-wrap;
      word-wrap: break-word;
      min-height: 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-top: 0;
      padding-bottom: 0;
      transition: min-height 0.3s ease,
                  padding 0.3s ease,
                  opacity 0.25s ease;
    }
    .code-block:hover .copy-btn {
      opacity: 1;
      transform: translateY(0);
    }
    .code-block:hover {
      min-height: 40px;
      padding-top: 8px;
      padding-bottom: 8px;
    }
  `);

  // add buttons
  function add() {
    document.querySelectorAll('.code-block').forEach(block => {
      if (block.querySelector('.copy-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.title = 'copy code';
      btn.innerHTML = `<img src="${ICON_NORMAL}" alt="copy">`;
      let locked = false;

      btn.addEventListener('click', () => {
        if (locked) return;
        locked = true;
 // blah blah
        const code = block.innerText;
        navigator.clipboard.writeText(code).then(() => {
          const img = btn.querySelector('img');
          img.src = ICON_SUCCESS;
          setTimeout(() => {
            img.src = ICON_NORMAL;
            locked = false;
          }, 1000);
        }).catch(() => {
          locked = false;
        });
      });

      block.appendChild(btn);
    });
  }

  add();

  const observer = new MutationObserver(add);
  observer.observe(document.body, { childList: true, subtree: true });
})();
// sorry if bad i make better someday
