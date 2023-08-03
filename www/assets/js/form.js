document.addEventListener("DOMContentLoaded", function() {
    let e = document.querySelectorAll(".form__input");
    document.querySelector(".form__name");
    let r = document.querySelector(".form__email")
      , t = document.querySelector("#error_text")
      , o = document.querySelector("#error_text-email")
      , s = document.querySelector(".info")
      , i = document.querySelector(".checkbox__input")
      , l = document.querySelector(".form_button");
    document.querySelector("#form_send"),
    i.addEventListener("click", function() {
        i.checked ? (l.removeAttribute("disabled"),
        l.classList.remove("dis")) : (l.setAttribute("disabled", "disabled"),
        l.classList.add("dis"))
    });
    let a = async e=>{
        let r = await fetch("/dc_vr/sendmail.php", {
            method: "POST",
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: e
        });
        if (!r.ok)
            throw Error(`Ошибка по адресу ${r.url}, статус ошибки ${r.status}`);
        return await r.text()
    }
      , c = document.querySelectorAll("form");
    c.forEach(i=>{
        i.addEventListener("submit", function(l) {
            var c;
            l.preventDefault();
            let d = 0
              , n = r.value
              , u = Array.from(e).filter(e=>"" === e.value);
            if (e.forEach(function(e) {
                "" === e.value ? (e.classList.add("_error"),
                o.classList.add("hide"),
                t.classList.remove("hide"),
                d++) : (e.classList.remove("_error"),
                t.classList.add("hide"),
                d = 0)
            }),
            0 !== u.length)
                return console.log("inputs not filled"),
                t.classList.remove("hide"),
                d++,
                !1;
            if (c = n,
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(c).toLowerCase()))
                return console.log("email not valid"),
                o.classList.remove("hide"),
                r.classList.add("_error"),
                d++,
                !1;
            if (r.classList.remove("_error"),
            o.classList.add("hide"),
            0 == (d = 0)) {
                let f = new FormData(this);
                a(f).then(e=>{
                    for (var r of (console.log(e),
                    f.entries()))
                        console.log(r[0] + ", " + r[1]);
                    s.classList.remove("hide"),
                    i.reset(),
                    setInterval(function() {
                        s.classList.add("hide")
                    }, 3e3)
                }
                ).catch(e=>console.error(e))
            }
        })
    }
    )
});
