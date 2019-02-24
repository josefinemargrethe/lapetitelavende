let alleRetter = [];
let filter = "alle";

document.addEventListener("DOMContentLoaded", hentJson);





const modtager = document.querySelector(".data-container");

async function hentJson() {

    const jsonData = await fetch("retter.json");

    alleRetter = await jsonData.json();

    visRetter();
}

function toggleMenu() {
    console.log("Toggle menu");
    document.querySelector("#menu").classList.toggle("hidden");


    let erSkjult =
        document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        //menuen er nu skjult - ændr menuknap til ☰
        document.querySelector("#menuknap").textContent = "☰";

    } else {
        //menuen er nu vist - ændr menuknap til ✕
        document.querySelector("#menuknap").textContent = "✕";
    }
}

function visRetter() {
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);


    modtager.innerHTML = "";

    alleRetter.forEach(ret => {
        if (filter == "alle" || filter == ret.kategori) {
            let template = `
                    <article class="retter">
                        <div class="item-a item-retter">
                        <img src="img/${ret.billede}.jpg" alt="${ret.navn}">
                        </div>
                        <div class="item-b item-retter">
                        <h2>${ret.navn}</h2>
                        <p>${ret.fransk}</p>
                        <p>${ret.pris},-</p>
                        </div>
                    </article>
                `;
            modtager.insertAdjacentHTML("beforeend", template);
            modtager.lastElementChild.addEventListener("click", () => {
                visSingle(ret);
            });

            function visSingle(ret) {
                document.querySelector("#indhold").innerHTML = `
                            <article class="singleret">
                                <div class="item-a">
                                <img src="img/${ret.billede}.jpg" alt="${ret.navn}">
                                </div>
                                <div class="item-b">
                                <h2>${ret.navn}</h2>
                                <p>${ret.dansk}.</p>
                                <p>${ret.pris},-</p>
                                </div>
                            </article>
                               `;
                document.querySelector("#nav").style.display = "none";
                document.querySelector("#myBtn").style.display = "none";
                document.querySelector("#popup").style.display = "block";
                document.querySelector("#popup #luk").addEventListener("click", close);
            }

            function close() {
                document.querySelector("#popup").style.display = "none";
            }

        }
    })
}

document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filtrering);
})

function filtrering() {
    filter = this.getAttribute("data-hold");
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();
}

visRetter();



// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    console.log("Scroll funtion");
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.querySelector("#myBtn").classList.add("show");
        document.querySelector("#myBtn").classList.remove("myBtn");
    } else {
        document.querySelector("#myBtn").classList.add("hide");
        document.querySelector("#myBtn").classList.remove("show");

    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    console.log("Top function");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
