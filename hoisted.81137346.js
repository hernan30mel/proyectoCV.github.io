import "./hoisted.9d11435e.js";
class o extends HTMLElement {
    constructor() {
        super();
        let t = 0;
        const n = this.querySelector("button")
          , e = this.querySelector("span#count");
        n?.addEventListener("click", ()=>{
            t = 0,
            e && (e.textContent = t.toString())
        }
        ),
        setInterval(()=>{
            t++,
            e && (e.textContent = t.toString())
        }
        , 1e3)
    }
}
customElements.define("astro-heart", o);
