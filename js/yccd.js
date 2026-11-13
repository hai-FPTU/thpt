/* =========================================================
   HOẠT ĐỘNG THEO YÊU CẦU CẦN ĐẠT (mạch A, B – lớp 12)
   Vòng đời AI – ai kiểm soát? (12.A1.1, 12.A1.MR1, 12.A1.2)
   Bộ nguyên tắc dự án AI (12.A2.1, 12.A2.MR1)
   (Thang rủi ro, Ai chịu trách nhiệm?, Truy nguyên nhân sai lệch nằm trong games.js)
   ========================================================= */
(function(){
const A = window.APP, D = A.D, st = A.st, $ = A.$, esc = A.esc, I = window.ICON;
const G = window.GAMES;

function done(k, xp, why){ if (!st.prac[k]) { st.prac[k] = true; A.save(); A.addXP(xp, why); A.SND.win(); A.confetti(); } }

/* ---------- 1. VÒNG ĐỜI AI – AI KIỂM SOÁT, AI CHỊU TRÁCH NHIỆM? ---------- */
G.vongdoi = function(el){
  const C = D.lifecycle, S = C.steps;
  let i = 0, lvOk = false, whoOk = false, badLv = new Set(), badWho = new Set(), miss = 0;
  const log = [];
  function stagesHTML(){
    return '<ol class="vd-stages">' + C.stages.map((s, k) => {
      const all = S.filter(x => x.st === k), fin = all.every(x => S.indexOf(x) < i);
      const on = i < S.length && S[i].st === k;
      return '<li class="' + (fin ? 'fin' : '') + (on ? ' on' : '') + '"><span>' + (fin ? I('check') : k + 1) + '</span><b>' + esc(s) + '</b></li>';
    }).join('') + '</ol>';
  }
  function render(){
    let h = '<div class="vd"><div class="vd-proj">' + I('cpu') + '<div><b>Dự án:</b> ' + esc(C.project) + '</div></div>' + stagesHTML();
    if (i < S.length) {
      const q = S[i];
      h += '<div class="card vd-card"><div class="row between"><span class="tag">' + esc(C.stages[q.st]) + '</span><span class="counter">Quyết định ' + (i + 1) + '/' + S.length + '</span></div>' +
        '<h3 class="vd-q">' + esc(q.q) + '</h3>' +
        '<p class="vd-lab"><b>1.</b> Ở bước này, ai nên quyết định?</p>' +
        '<div class="vd-lv">' + C.levels.map((l, k) => {
          let c = 'vd-opt'; if (badLv.has(k)) c += ' no'; if (lvOk && k === q.lv) c += ' ok';
          return '<button class="' + c + '" data-lv="' + k + '"' + (badLv.has(k) || lvOk ? ' disabled' : '') + '><span class="ibox">' + I(l.ic) + '</span><b>' + esc(l.t) + '</b><small>' + esc(l.d) + '</small></button>';
        }).join('') + '</div>' +
        (lvOk ? '<p class="vd-lab"><b>2.</b> Ai chịu trách nhiệm chính về quyết định này?</p><div class="vd-who">' + C.roles.map((r, k) => {
          let c = 'chip'; if (badWho.has(k)) c += ' bad'; if (whoOk && q.who.includes(k)) c += ' good';
          return '<button class="' + c + '" data-who="' + k + '"' + (badWho.has(k) || whoOk ? ' disabled' : '') + '>' + esc(r) + '</button>';
        }).join('') + '</div>' : '') +
        (whoOk ? '<div class="fb ok" style="margin-top:14px">' + I('check') + '<div><b>' + esc(C.levels[q.lv].t) + ' · Người chịu trách nhiệm: ' + q.who.map(k => esc(C.roles[k])).join(' hoặc ') + '.</b> ' + esc(q.e) + '</div></div><div class="row" style="margin-top:12px"><button class="btn" id="vdNext">' + (i < S.length - 1 ? 'Quyết định tiếp theo ' + I('right') : 'Xem bản phân tích ' + I('right')) + '</button></div>' : '') +
        '</div>';
    } else {
      h += '<div class="card"><div class="eyebrow">Sản phẩm của em</div><h3 style="margin:4px 0 10px">Bản phân tích quyền kiểm soát và trách nhiệm</h3>' +
        '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Bước</th><th>Quyết định</th><th>Ai quyết định</th><th>Người chịu trách nhiệm</th></tr></thead><tbody>' +
        S.map(q => '<tr><td>' + esc(C.stages[q.st]) + '</td><td>' + esc(q.q) + '</td><td>' + esc(C.levels[q.lv].t) + '</td><td>' + q.who.map(k => esc(C.roles[k])).join(' / ') + '</td></tr>').join('') +
        '</tbody></table></div>' +
        '<div class="fb ' + (miss <= 3 ? 'ok' : 'mid') + '" style="margin-top:14px">' + I('award') + '<div><b>Hoàn thành ' + S.length + ' quyết định' + (miss ? ', chọn nhầm ' + miss + ' lần' : ', không nhầm lần nào') + '.</b> Nhận xét: ở hệ thống ảnh hưởng tới học sinh, gần như mọi bước quan trọng đều do con người quyết định; AI chỉ tự làm việc kỹ thuật rủi ro thấp. “Hệ thống AI” không bao giờ là người chịu trách nhiệm.</div></div>' +
        '<div class="row" style="margin-top:14px"><button class="btn ghost" id="vdAgain">' + I('refresh') + ' Làm lại</button><a class="btn" href="#baihoc-9">' + I('cap') + ' Ôn Bài 9</a></div></div>';
    }
    el.innerHTML = h + '</div>';
  }
  el.addEventListener('click', e => {
    const q = S[i];
    const lv = e.target.closest('[data-lv]');
    if (lv && !lvOk) {
      const k = +lv.dataset.lv;
      if (k === q.lv) { lvOk = true; A.SND.ok(); }
      else { badLv.add(k); miss++; A.SND.no(); A.toast(k === 0 ? 'Quyết định này ảnh hưởng tới con người – chưa nên để AI tự làm.' : 'Chưa phù hợp, thử lại nhé.'); }
      render(); return;
    }
    const w = e.target.closest('[data-who]');
    if (w && lvOk && !whoOk) {
      const k = +w.dataset.who;
      if (q.who.includes(k)) { whoOk = true; A.SND.ok(); log.push(i); }
      else { badWho.add(k); miss++; A.SND.no(); A.toast(k === 3 ? 'AI không thể chịu trách nhiệm – trách nhiệm luôn thuộc về con người.' : 'Chưa đúng người chịu trách nhiệm chính, thử lại.'); }
      render(); return;
    }
    if (e.target.closest('#vdNext')) { i++; lvOk = whoOk = false; badLv = new Set(); badWho = new Set(); render(); if (i >= S.length) done('vongdoi', 50, 'Phân tích quyền kiểm soát trong vòng đời AI'); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (e.target.closest('#vdAgain')) { i = 0; lvOk = whoOk = false; badLv = new Set(); badWho = new Set(); miss = 0; log.length = 0; render(); }
  });
  render();
};

/* ---------- 2. BỘ NGUYÊN TẮC DỰ ÁN AI CỦA EM ---------- */
G.nguyentac = function(el){
  const C = D.principles, PL = C.list, DE = C.decisions;
  const order = PL.map(p => A.shuffle(p.o.map((_, k) => k)));
  let phase = 1, pick = PL.map(() => null), tried = PL.map(() => new Set());
  let di = 0, verdict = null, vTried = new Set(), pTried = new Set(), pOk = false, miss = 0, extra = '';
  const name = k => (PL.find(p => p.k === k) || {}).n;
  const MSG = { vague: 'Chung chung, không kiểm tra được. Nguyên tắc tốt phải cụ thể, đo được.', bad: 'Cam kết này vi phạm chính nguyên tắc em đang viết!' };
  function head(){
    return '<div class="vd-proj">' + I('cpu') + '<div><b>Dự án:</b> ' + esc(C.project) + '</div></div>' +
      '<ol class="nt-steps"><li class="' + (phase === 1 ? 'on' : 'fin') + '"><span>1</span>Soạn bộ nguyên tắc</li><li class="' + (phase === 2 ? 'on' : phase > 2 ? 'fin' : '') + '"><span>2</span>Đối chiếu thiết kế</li><li class="' + (phase === 3 ? 'on' : '') + '"><span>3</span>Bộ nguyên tắc hoàn chỉnh</li></ol>';
  }
  function render(){
    let h = '<div class="nt">' + head();
    if (phase === 1) {
      const ok = pick.filter(x => x != null).length;
      h += '<p class="muted">Với mỗi nguyên tắc, chọn <b>cam kết cụ thể, kiểm tra được</b> để đưa vào bộ nguyên tắc của dự án. <span class="counter" style="margin-left:6px">' + ok + '/' + PL.length + '</span></p><div class="nt-grid">' +
        PL.map((p, i) => '<div class="nt-card' + (pick[i] != null ? ' fin' : '') + '" style="--nc:' + p.c + '"><h4>' + (pick[i] != null ? I('check') + ' ' : '') + esc(p.n) + '</h4>' +
          order[i].map(k => { const o = p.o[k]; let c = 'nt-opt'; if (tried[i].has(k)) c += ' ' + o[1]; if (pick[i] === k) c += ' good'; return '<button class="' + c + '" data-p="' + i + '" data-o="' + k + '"' + (pick[i] != null || tried[i].has(k) ? ' disabled' : '') + '>' + esc(o[0]) + (tried[i].has(k) && o[1] !== 'good' ? '<small>' + MSG[o[1]] + '</small>' : '') + '</button>'; }).join('') +
        '</div>').join('') + '</div>' +
        (ok === PL.length ? '<div class="fb ok" style="margin-top:14px">' + I('check') + '<div><b>Đã có đủ 6 cam kết.</b> Giờ hãy dùng bộ nguyên tắc này để kiểm tra các quyết định thiết kế của nhóm.</div></div><div class="row" style="margin-top:12px"><button class="btn" id="ntP2">Sang bước 2: Đối chiếu thiết kế ' + I('right') + '</button></div>' : '');
    } else if (phase === 2) {
      const d = DE[di], solved = verdict === 'right' && (d.ok || pOk);
      h += '<div class="card vd-card"><div class="row between"><span class="tag">' + esc(d.tag) + '</span><span class="counter">Quyết định ' + (di + 1) + '/' + DE.length + '</span></div>' +
        '<h3 class="vd-q">“' + esc(d.t) + '”</h3><p class="vd-lab">Đối chiếu với bộ nguyên tắc: quyết định này thế nào?</p>' +
        '<div class="row">' + [['yes', 'Phù hợp bộ nguyên tắc', 'check'], ['no', 'Có nguy cơ vi phạm', 'alert']].map(b => { const right = (b[0] === 'yes') === d.ok; let c = 'btn ' + (b[0] === 'yes' ? 'ghost' : 'ghost'); if (vTried.has(b[0]) && !right) c += ' is-no'; if (verdict === 'right' && right) c += ' is-ok'; return '<button class="' + c + '" data-v="' + b[0] + '"' + (verdict === 'right' || vTried.has(b[0]) ? ' disabled' : '') + '>' + I(b[2]) + ' ' + b[1] + '</button>'; }).join('') + '</div>' +
        (verdict === 'right' && !d.ok ? '<p class="vd-lab" style="margin-top:16px">Vi phạm nguyên tắc nào?</p><div class="vd-who">' + PL.map(p => { let c = 'chip'; if (pTried.has(p.k)) c += ' bad'; if (pOk && d.v.includes(p.k)) c += ' good'; return '<button class="' + c + '" style="--nc:' + p.c + '" data-pr="' + p.k + '"' + (pOk || pTried.has(p.k) ? ' disabled' : '') + '>' + esc(p.n) + '</button>'; }).join('') + '</div>' : '') +
        (solved ? '<div class="fb ' + (d.ok ? 'ok' : 'mid') + '" style="margin-top:14px">' + I(d.ok ? 'check' : 'refresh') + '<div><b>' + (d.ok ? 'Giữ nguyên.' : 'Điều chỉnh (vi phạm: ' + d.v.map(name).join(', ') + '):') + '</b> ' + esc(d.fix) + '</div></div><div class="row" style="margin-top:12px"><button class="btn" id="ntNext">' + (di < DE.length - 1 ? 'Quyết định tiếp theo ' + I('right') : 'Xem bộ nguyên tắc hoàn chỉnh ' + I('right')) + '</button></div>' : '') +
        '</div>';
    } else {
      h += '<div class="card nt-doc"><div class="eyebrow">Sản phẩm của em</div><h3 style="margin:4px 0 2px">Bộ nguyên tắc dự án</h3><p class="muted" style="margin:0 0 12px">' + esc(C.project) + '</p>' +
        '<ol class="nt-list">' + PL.map((p, i) => '<li style="--nc:' + p.c + '"><b>' + esc(p.n) + ':</b> ' + esc(p.o[pick[i]][0]) + '</li>').join('') + '</ol>' +
        '<h4 style="margin:18px 0 8px">Nhật kí điều chỉnh thiết kế</h4><ul class="nt-log">' + DE.filter(d => !d.ok).map(d => '<li><span class="tag">' + esc(d.tag) + '</span> ' + esc(d.t) + '<br><b>→ ' + esc(d.fix) + '</b> <span class="muted small">(' + d.v.map(name).join(', ') + ')</span></li>').join('') + '</ul>' +
        '<label class="vd-lab" for="ntExtra" style="display:block;margin-top:16px">Cam kết riêng của nhóm em (không bắt buộc)</label><textarea id="ntExtra" class="nt-extra" rows="3" placeholder="Ví dụ: Mỗi học kỳ, nhóm khảo sát ý kiến học sinh về ứng dụng và công bố kết quả.">' + esc(extra) + '</textarea>' +
        '<div class="fb ok" style="margin-top:14px">' + I('award') + '<div><b>Hoàn thành!</b> ' + (miss ? 'Chọn nhầm ' + miss + ' lần. ' : 'Không nhầm lần nào. ') + 'Em đã soạn bộ nguyên tắc, đối chiếu ' + DE.length + ' quyết định thiết kế và điều chỉnh ' + DE.filter(d => !d.ok).length + ' quyết định có nguy cơ vi phạm.</div></div>' +
        '<div class="row" style="margin-top:14px"><button class="btn" id="ntSave">' + I('download') + ' Tải bộ nguyên tắc (.txt)</button><button class="btn ghost" id="ntAgain">' + I('refresh') + ' Làm lại</button></div></div>';
    }
    el.innerHTML = h + '</div>';
  }
  function text(){
    return ['BỘ NGUYÊN TẮC DỰ ÁN AI', 'Dự án: ' + C.project, '',
      ...PL.map((p, i) => (i + 1) + '. ' + p.n + ': ' + p.o[pick[i]][0]),
      ...(extra.trim() ? ['7. Cam kết riêng của nhóm: ' + extra.trim()] : []),
      '', 'NHẬT KÍ ĐIỀU CHỈNH THIẾT KẾ',
      ...DE.filter(d => !d.ok).map(d => '- [' + d.tag + '] ' + d.t + '\n  Vi phạm: ' + d.v.map(name).join(', ') + '\n  Điều chỉnh: ' + d.fix),
      '', '(' + D.site.name + ' – ' + D.site.year + ')'].join('\n');
  }
  el.addEventListener('input', e => { if (e.target.id === 'ntExtra') extra = e.target.value; });
  el.addEventListener('click', e => {
    const o = e.target.closest('[data-o]');
    if (o && phase === 1) {
      const i = +o.dataset.p, k = +o.dataset.o, r = PL[i].o[k][1];
      if (r === 'good') { pick[i] = k; A.SND.ok(); } else { tried[i].add(k); miss++; A.SND.no(); }
      render(); return;
    }
    if (e.target.closest('#ntP2')) { phase = 2; A.SND.tap(); render(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const vb = e.target.closest('[data-v]');
    if (vb && phase === 2 && verdict !== 'right') {
      const d = DE[di], right = (vb.dataset.v === 'yes') === d.ok;
      if (right) { verdict = 'right'; A.SND.ok(); } else { vTried.add(vb.dataset.v); miss++; A.SND.no(); A.toast(d.ok ? 'Quyết định này đã đáp ứng các nguyên tắc – xem lại nhé.' : 'Hãy đối chiếu lại với từng nguyên tắc.'); }
      render(); return;
    }
    const pr = e.target.closest('[data-pr]');
    if (pr && phase === 2 && !pOk) {
      if (DE[di].v.includes(pr.dataset.pr)) { pOk = true; A.SND.ok(); } else { pTried.add(pr.dataset.pr); miss++; A.SND.no(); }
      render(); return;
    }
    if (e.target.closest('#ntNext')) { di++; verdict = null; vTried = new Set(); pTried = new Set(); pOk = false; if (di >= DE.length) { phase = 3; done('nguyentac', 50, 'Soạn bộ nguyên tắc cho dự án AI'); } render(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if (e.target.closest('#ntSave')) { A.saveFile('bo-nguyen-tac-du-an-ai.txt', new Blob(['﻿' + text()], { type: 'text/plain;charset=utf-8' })).then(ok => ok && A.toast('Đã tải bộ nguyên tắc')); return; }
    if (e.target.closest('#ntAgain')) { phase = 1; pick = PL.map(() => null); tried = PL.map(() => new Set()); di = 0; verdict = null; vTried = new Set(); pTried = new Set(); pOk = false; miss = 0; extra = ''; render(); }
  });
  render();
};
})();
