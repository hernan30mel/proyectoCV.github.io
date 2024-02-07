document.addEventListener("astro:page-load", ()=>{
    const e = document.querySelectorAll("section")
      , t = document.querySelectorAll("header nav a")
      , n = o=>{
        o.forEach(a=>{
            a.isIntersecting && t.forEach(c=>{
                c.getAttribute("aria-label") == a.target.id ? c.classList.add("link-active") : c.classList.remove("link-active")
            }
            )
        }
        )
    }
      , r = new IntersectionObserver(n,{
        root: null,
        rootMargin: "0px",
        threshold: .3
    });
    e.forEach(o=>{
        r.observe(o)
    }
    ),
    window.onunload = ()=>{
        r.disconnect()
    }
}
);
const Y = e=>history.state && history.replaceState({
    ...history.state,
    ...e
}, "")
  , w = !!document.startViewTransition
  , E = ()=>!!document.querySelector('[name="astro-view-transitions-enabled"]')
  , q = e=>location.pathname === e.pathname && location.search === e.search
  , M = e=>document.dispatchEvent(new Event(e))
  , H = ()=>M("astro:page-load")
  , C = ()=>{
    let e = document.createElement("div");
    e.setAttribute("aria-live", "assertive"),
    e.setAttribute("aria-atomic", "true"),
    e.className = "astro-route-announcer",
    document.body.append(e),
    setTimeout(()=>{
        let t = document.title || document.querySelector("h1")?.textContent || location.pathname;
        e.textContent = t
    }
    , 60)
}
  , m = "data-astro-transition-persist";
let S, p = 0;
history.state ? (p = history.state.index,
scrollTo({
    left: history.state.scrollX,
    top: history.state.scrollY
})) : E() && history.replaceState({
    index: p,
    scrollX,
    scrollY,
    intraPage: !1
}, "");
const N = (e,t)=>{
    let n = !1
      , r = !1;
    return (...o)=>{
        if (n) {
            r = !0;
            return
        }
        e(...o),
        n = !0,
        setTimeout(()=>{
            r && (r = !1,
            e(...o)),
            n = !1
        }
        , t)
    }
}
;
async function V(e, t) {
    try {
        const n = await fetch(e, t)
          , r = n.headers.get("content-type")?.replace(/;.*$/, "");
        return r !== "text/html" && r !== "application/xhtml+xml" ? null : {
            html: await n.text(),
            redirected: n.redirected ? n.url : void 0,
            mediaType: r
        }
    } catch {
        return null
    }
}
function I() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}
function W() {
    let e = Promise.resolve();
    for (const t of Array.from(document.scripts)) {
        if (t.dataset.astroExec === "")
            continue;
        const n = document.createElement("script");
        n.innerHTML = t.innerHTML;
        for (const r of t.attributes) {
            if (r.name === "src") {
                const o = new Promise(a=>{
                    n.onload = a
                }
                );
                e = e.then(()=>o)
            }
            n.setAttribute(r.name, r.value)
        }
        n.dataset.astroExec = "",
        t.replaceWith(n)
    }
    return e
}
function K(e) {
    const t = e.effect;
    return !t || !(t instanceof KeyframeEffect) || !t.target ? !1 : window.getComputedStyle(t.target, t.pseudoElement).animationIterationCount === "infinite"
}
const $ = (e,t,n)=>{
    const r = !q(e);
    let o = !1;
    e.href !== location.href && (t ? history.replaceState({
        ...history.state
    }, "", e.href) : (history.replaceState({
        ...history.state,
        intraPage: n
    }, ""),
    history.pushState({
        index: ++p,
        scrollX: 0,
        scrollY: 0
    }, "", e.href)),
    r && (scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    }),
    o = !0)),
    e.hash ? location.href = e.href : o || scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    })
}
;
function B(e) {
    const t = [];
    for (const n of e.querySelectorAll("head link[rel=stylesheet]"))
        if (!document.querySelector(`[${m}="${n.getAttribute(m)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)) {
            const r = document.createElement("link");
            r.setAttribute("rel", "preload"),
            r.setAttribute("as", "style"),
            r.setAttribute("href", n.getAttribute("href")),
            t.push(new Promise(o=>{
                ["load", "error"].forEach(a=>r.addEventListener(a, o)),
                document.head.append(r)
            }
            ))
        }
    return t
}
async function k(e, t, n, r, o) {
    const a = s=>{
        const u = s.getAttribute(m)
          , d = u && e.head.querySelector(`[${m}="${u}"]`);
        if (d)
            return d;
        if (s.matches("link[rel=stylesheet]")) {
            const h = s.getAttribute("href");
            return e.head.querySelector(`link[rel=stylesheet][href="${h}"]`)
        }
        return null
    }
      , c = ()=>{
        const s = document.activeElement;
        if (s?.closest(`[${m}]`)) {
            if (s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement) {
                const u = s.selectionStart
                  , d = s.selectionEnd;
                return {
                    activeElement: s,
                    start: u,
                    end: d
                }
            }
            return {
                activeElement: s
            }
        } else
            return {
                activeElement: null
            }
    }
      , f = ({activeElement: s, start: u, end: d})=>{
        s && (s.focus(),
        (s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement) && (s.selectionStart = u,
        s.selectionEnd = d))
    }
      , y = ()=>{
        const s = document.documentElement
          , u = [...s.attributes].filter(({name: i})=>(s.removeAttribute(i),
        i.startsWith("data-astro-")));
        [...e.documentElement.attributes, ...u].forEach(({name: i, value: l})=>s.setAttribute(i, l));
        for (const i of document.scripts)
            for (const l of e.scripts)
                if (!i.src && i.textContent === l.textContent || i.src && i.type === l.type && i.src === l.src) {
                    l.dataset.astroExec = "";
                    break
                }
        for (const i of Array.from(document.head.children)) {
            const l = a(i);
            l ? l.remove() : i.remove()
        }
        document.head.append(...e.head.children);
        const d = document.body
          , h = c();
        document.body.replaceWith(e.body);
        for (const i of d.querySelectorAll(`[${m}]`)) {
            const l = i.getAttribute(m)
              , A = document.querySelector(`[${m}="${l}"]`);
            A && A.replaceWith(i)
        }
        f(h),
        r ? scrollTo(r.scrollX, r.scrollY) : $(t, n.history === "replace", !1),
        M("astro:after-swap")
    }
      , g = B(e);
    if (g.length && await Promise.all(g),
    o === "animate") {
        const s = document.getAnimations();
        document.documentElement.dataset.astroTransitionFallback = "old";
        const u = document.getAnimations().filter(h=>!s.includes(h) && !K(h));
        await Promise.all(u.map(h=>h.finished)),
        y(),
        document.documentElement.dataset.astroTransitionFallback = "new"
    } else
        y()
}
async function F(e, t, n, r) {
    let o;
    const a = t.href
      , c = {};
    n.formData && (c.method = "POST",
    c.body = n.formData);
    const f = await V(a, c);
    if (f === null) {
        location.href = a;
        return
    }
    f.redirected && (t = new URL(f.redirected)),
    S ??= new DOMParser;
    const y = S.parseFromString(f.html, f.mediaType);
    if (y.querySelectorAll("noscript").forEach(g=>g.remove()),
    !y.querySelector('[name="astro-view-transitions-enabled"]') && !n.formData) {
        location.href = a;
        return
    }
    r || history.replaceState({
        ...history.state,
        scrollX,
        scrollY
    }, ""),
    document.documentElement.dataset.astroTransition = e,
    w ? o = document.startViewTransition(()=>k(y, t, n, r)).finished : o = k(y, t, n, r, I());
    try {
        await o
    } finally {
        await W(),
        H(),
        C()
    }
}
function L(e, t) {
    if (!E()) {
        location.href = e;
        return
    }
    const n = new URL(e,location.href);
    location.origin === n.origin && q(n) && !t?.formData ? $(n, t?.history === "replace", !0) : F("forward", n, t ?? {})
}
function _(e) {
    if (!E() && e.state) {
        history.scrollRestoration && (history.scrollRestoration = "manual"),
        location.reload();
        return
    }
    if (e.state === null) {
        history.scrollRestoration && (history.scrollRestoration = "auto");
        return
    }
    history.scrollRestoration && (history.scrollRestoration = "manual");
    const t = history.state;
    if (t.intraPage)
        scrollTo(t.scrollX, t.scrollY);
    else {
        const n = t.index
          , r = n > p ? "forward" : "back";
        p = n,
        F(r, new URL(location.href), {}, t)
    }
}
const x = ()=>{
    Y({
        scrollX,
        scrollY
    })
}
;
{
    (w || I() !== "none") && (addEventListener("popstate", _),
    addEventListener("load", H),
    "onscrollend"in window ? addEventListener("scrollend", x) : addEventListener("scroll", N(x, 350), {
        passive: !0
    }));
    for (const e of document.scripts)
        e.dataset.astroExec = ""
}
const O = new Set
  , v = new WeakSet;
let U, D, P = !1;
function j(e) {
    P || (P = !0,
    U ??= e?.prefetchAll ?? !1,
    D ??= e?.defaultStrategy ?? "hover",
    z(),
    G(),
    J())
}
function z() {
    for (const e of ["touchstart", "mousedown"])
        document.body.addEventListener(e, t=>{
            b(t.target, "tap") && T(t.target.href, {
                with: "fetch"
            })
        }
        , {
            passive: !0
        })
}
function G() {
    let e;
    document.body.addEventListener("focusin", r=>{
        b(r.target, "hover") && t(r)
    }
    , {
        passive: !0
    }),
    document.body.addEventListener("focusout", n, {
        passive: !0
    }),
    X(()=>{
        for (const r of document.getElementsByTagName("a"))
            v.has(r) || b(r, "hover") && (v.add(r),
            r.addEventListener("mouseenter", t, {
                passive: !0
            }),
            r.addEventListener("mouseleave", n, {
                passive: !0
            }))
    }
    );
    function t(r) {
        const o = r.target.href;
        e && clearTimeout(e),
        e = setTimeout(()=>{
            T(o, {
                with: "fetch"
            })
        }
        , 80)
    }
    function n() {
        e && (clearTimeout(e),
        e = 0)
    }
}
function J() {
    let e;
    X(()=>{
        for (const t of document.getElementsByTagName("a"))
            v.has(t) || b(t, "viewport") && (v.add(t),
            e ??= Q(),
            e.observe(t))
    }
    )
}
function Q() {
    const e = new WeakMap;
    return new IntersectionObserver((t,n)=>{
        for (const r of t) {
            const o = r.target
              , a = e.get(o);
            r.isIntersecting ? (a && clearTimeout(a),
            e.set(o, setTimeout(()=>{
                n.unobserve(o),
                e.delete(o),
                T(o.href, {
                    with: "link"
                })
            }
            , 300))) : a && (clearTimeout(a),
            e.delete(o))
        }
    }
    )
}
function T(e, t) {
    if (!Z(e))
        return;
    if (O.add(e),
    (t?.with ?? "link") === "link") {
        const r = document.createElement("link");
        r.rel = "prefetch",
        r.setAttribute("href", e),
        document.head.append(r)
    } else
        fetch(e).catch(r=>{
            console.log(`[astro] Failed to prefetch ${e}`),
            console.error(r)
        }
        )
}
function Z(e) {
    if (!navigator.onLine)
        return !1;
    if ("connection"in navigator) {
        const t = navigator.connection;
        if (t.saveData || /(2|3)g/.test(t.effectiveType))
            return !1
    }
    try {
        const t = new URL(e,location.href);
        return location.origin === t.origin && location.pathname !== t.pathname && !O.has(e)
    } catch {}
    return !1
}
function b(e, t) {
    if (e?.tagName !== "A")
        return !1;
    const n = e.dataset.astroPrefetch;
    return n === "false" ? !1 : n == null && U || n === "" ? t === D : n === t
}
function X(e) {
    e();
    let t = !1;
    document.addEventListener("astro:page-load", ()=>{
        if (!t) {
            t = !0;
            return
        }
        e()
    }
    )
}
function ee() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}
function R(e) {
    return e.dataset.astroReload !== void 0
}
(w || ee() !== "none") && (document.addEventListener("click", e=>{
    let t = e.target;
    t instanceof Element && t.tagName !== "A" && (t = t.closest("a")),
    !(!t || !(t instanceof HTMLAnchorElement) || R(t) || t.hasAttribute("download") || !t.href || t.target && t.target !== "_self" || t.origin !== location.origin || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented) && (e.preventDefault(),
    L(t.href, {
        history: t.dataset.astroHistory === "replace" ? "replace" : "auto"
    }))
}
),
document.querySelector('[name="astro-view-transitions-forms"]') && document.addEventListener("submit", e=>{
    let t = e.target;
    if (t.tagName !== "FORM" || R(t))
        return;
    const n = t
      , r = new FormData(n);
    let o = n.action ?? location.pathname;
    const a = {};
    if (n.method === "get") {
        const c = new URLSearchParams(r)
          , f = new URL(o);
        f.search = c.toString(),
        o = f.toString()
    } else
        a.formData = r;
    e.preventDefault(),
    L(o, a)
}
),
j({
    prefetchAll: !0
}));
