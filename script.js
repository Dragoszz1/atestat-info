/* ===================================================
   SAREA ÎN BUCATE - Script principal JavaScript
   Proiect pentru atestatul la informatică - clasa 12
   ---------------------------------------------------
   Aici se află toată logica aplicației:
   - meniu (filtrare, căutare, sortare)
   - coș de cumpărături (localStorage)
   - cont utilizator (demo, fără bază de date reală)
   - rezervări
   - galerie cu lightbox
   - notificări toast
   - navbar și back to top
   =================================================== */


/* ===================================================
   1. DATELE PREPARATELOR DIN MENIU
   ---------------------------------------------------
   Aceasta este "baza de date" simulată a meniului.
   Conform cerințelor, NU avem imagini per produs.
   Fiecare preparat are: id, nume, categorie,
   descriere și preț.
   =================================================== */

const preparate = [
    // ---- APERITIVE ----
    {
        id: 1,
        nume: "Salată de vinete",
        categorie: "aperitive",
        descriere: "Vinete coapte pe foc, amestecate cu ceapă proaspătă și ulei rece presat din semințe.",
        pret: 18
    },
    {
        id: 2,
        nume: "Zacuscă de casă",
        categorie: "aperitive",
        descriere: "Zacuscă tradițională din ardei copt, vinete și roșii, după rețeta bunicii.",
        pret: 16
    },
    {
        id: 3,
        nume: "Mușchi țigănesc",
        categorie: "aperitive",
        descriere: "Mușchi de porc afumat în casă, feliat fin, servit cu pâine de țară.",
        pret: 28
    },
    {
        id: 4,
        nume: "Telemea cu roșii",
        categorie: "aperitive",
        descriere: "Telemea de oaie cu roșii proaspete, ceapă verde și măsline.",
        pret: 22
    },
    {
        id: 5,
        nume: "Slănină afumată",
        categorie: "aperitive",
        descriere: "Slănină de țară afumată natural, cu ceapă roșie și ardei iute.",
        pret: 24
    },

    // ---- CIORBE ----
    {
        id: 6,
        nume: "Ciorbă de burtă",
        categorie: "ciorbe",
        descriere: "Ciorbă acră de burtă, cu smântână, ou și usturoi, servită cu ardei iute.",
        pret: 32
    },
    {
        id: 7,
        nume: "Ciorbă rădăuțeană",
        categorie: "ciorbe",
        descriere: "Ciorbă cu piept de pui, smântână și ou, dreasă cu usturoi proaspăt.",
        pret: 30
    },
    {
        id: 8,
        nume: "Ciorbă de perișoare",
        categorie: "ciorbe",
        descriere: "Ciorbă acrită cu borș, perișoare din carne tocată și legume de grădină.",
        pret: 28
    },
    {
        id: 9,
        nume: "Borș de legume",
        categorie: "ciorbe",
        descriere: "Borș de post cu legume proaspete, cartofi și verdeață, exact ca la mama acasă.",
        pret: 22
    },

    // ---- FELURI PRINCIPALE ----
    {
        id: 10,
        nume: "Sarmale cu mămăligă",
        categorie: "principale",
        descriere: "Sarmale tradiționale învelite în foi de varză murată, servite cu mămăligă și smântână.",
        pret: 45
    },
    {
        id: 11,
        nume: "Mici cu muștar",
        categorie: "principale",
        descriere: "Cinci mici tradiționali la grătar, serviți cu muștar și pâine de casă.",
        pret: 38
    },
    {
        id: 12,
        nume: "Tochitură moldovenească",
        categorie: "principale",
        descriere: "Tochitură de porc cu cârnați, ou ochi, brânză și mămăligă.",
        pret: 48
    },
    {
        id: 13,
        nume: "Schnitzel cu cartofi",
        categorie: "principale",
        descriere: "Șnițel din mușchi de porc, pane în casă, cu cartofi prăjiți și salată.",
        pret: 42
    },
    {
        id: 14,
        nume: "Mușchi de vită la grătar",
        categorie: "principale",
        descriere: "Mușchi de vită fraged, gătit medium-rare, cu cartofi copți și unt aromatizat.",
        pret: 65
    },
    {
        id: 15,
        nume: "Tocăniță de pui",
        categorie: "principale",
        descriere: "Pulpe de pui gătite lent în sos de roșii cu ceapă, servite cu mămăligă caldă.",
        pret: 40
    },
    {
        id: 16,
        nume: "Pulpă de miel",
        categorie: "principale",
        descriere: "Pulpă de miel marinată în ierburi, gătită la cuptor cu cartofi și usturoi.",
        pret: 58
    },

    // ---- GARNITURI ----
    {
        id: 17,
        nume: "Mămăligă cu brânză",
        categorie: "garnituri",
        descriere: "Mămăligă caldă, brânză de burduf și smântână din ferma proprie.",
        pret: 18
    },
    {
        id: 18,
        nume: "Cartofi țărănești",
        categorie: "garnituri",
        descriere: "Cartofi noi, gătiți cu slănină, ceapă și boia de ardei dulce.",
        pret: 16
    },
    {
        id: 19,
        nume: "Salată de varză murată",
        categorie: "garnituri",
        descriere: "Varză murată în casă, cu ulei rece presat și boia.",
        pret: 12
    },
    {
        id: 20,
        nume: "Murături asortate",
        categorie: "garnituri",
        descriere: "Castraveți, gogoșari, conopidă și morcovi murați în zeamă proprie.",
        pret: 14
    },

    // ---- DESERTURI ----
    {
        id: 21,
        nume: "Papanași cu dulceață",
        categorie: "deserturi",
        descriere: "Papanași prăjiți, serviți cu smântână și dulceață de afine de munte.",
        pret: 26
    },
    {
        id: 22,
        nume: "Cozonac cu nucă",
        categorie: "deserturi",
        descriere: "Cozonac de casă cu umplutură generoasă de nucă, cacao și rahat.",
        pret: 22
    },
    {
        id: 23,
        nume: "Plăcintă cu mere",
        categorie: "deserturi",
        descriere: "Plăcintă cu foi subțiri, mere coapte cu scorțișoară și nucă măcinată.",
        pret: 20
    },
    {
        id: 24,
        nume: "Clătite cu dulceață",
        categorie: "deserturi",
        descriere: "Clătite subțiri, umplute cu dulceață de vișine sau gem de prune.",
        pret: 18
    },

    // ---- BĂUTURI ----
    {
        id: 25,
        nume: "Vin roșu de casă",
        categorie: "bauturi",
        descriere: "Vin roșu sec, 250 ml, din podgoriile proprii din zona Drăgășani.",
        pret: 18
    },
    {
        id: 26,
        nume: "Țuică de prune",
        categorie: "bauturi",
        descriere: "Țuică de prune dublu rafinată, 50 ml, învechită minim 3 ani.",
        pret: 12
    },
    {
        id: 27,
        nume: "Limonadă de casă",
        categorie: "bauturi",
        descriere: "Limonadă proaspătă cu lămâi, miere și mentă din grădină.",
        pret: 14
    },
    {
        id: 28,
        nume: "Compot de prune",
        categorie: "bauturi",
        descriere: "Compot de prune din vara trecută, dulce-acrișor, servit rece.",
        pret: 10
    },
    {
        id: 29,
        nume: "Apă plată / minerală",
        categorie: "bauturi",
        descriere: "Apă plată sau minerală îmbuteliată, 500 ml.",
        pret: 8
    }
];


/* ===================================================
   2. STAREA APLICAȚIEI
   ---------------------------------------------------
   Aici păstrăm informațiile curente:
   - cosul -> încărcat din localStorage la pornire
   - utilizator -> dacă e cineva autentificat
   - filtrele active pentru meniu
   =================================================== */

// Coșul: dacă există date salvate, le luăm; altfel -> []
let cos = JSON.parse(localStorage.getItem("cos")) || [];

// Utilizator curent: null = neautentificat
let utilizatorCurent = JSON.parse(localStorage.getItem("utilizatorCurent")) || null;

// Filtrele meniului
let categorieActiva = "toate";
let textCautare = "";
let modSortare = "default";


/* ===================================================
   3. AFIȘAREA MENIULUI
   ---------------------------------------------------
   Generează cardurile cu preparate, aplică filtrele
   și sortarea cerută de utilizator.
   =================================================== */

function afiseazaMeniu() {
    const container = document.getElementById("meniu-container");

    // Pasul 1: filtrăm preparatele după categorie + căutare
    let lista = preparate.filter(function(p) {
        // Verificăm dacă preparatul e din categoria selectată
        const corespundeCategorie = (categorieActiva === "toate" || p.categorie === categorieActiva);

        // Verificăm dacă numele conține textul căutat
        const numeMic = p.nume.toLowerCase();
        const cautareMica = textCautare.toLowerCase();
        const corespundeCautare = numeMic.includes(cautareMica);

        return corespundeCategorie && corespundeCautare;
    });

    // Pasul 2: sortăm lista conform opțiunii alese
    if (modSortare === "pret-asc") {
        lista.sort(function(a, b) { return a.pret - b.pret; });
    } else if (modSortare === "pret-desc") {
        lista.sort(function(a, b) { return b.pret - a.pret; });
    } else if (modSortare === "nume") {
        lista.sort(function(a, b) { return a.nume.localeCompare(b.nume, "ro"); });
    }

    // Pasul 3: dacă lista e goală -> afișăm un mesaj
    if (lista.length === 0) {
        container.innerHTML = '<p class="mesaj-gol">Nu am găsit preparate pentru această căutare.</p>';
        return;
    }

    // Pasul 4: generăm HTML-ul pentru fiecare card
    // Folosim map() pentru a transforma fiecare preparat într-un șir HTML,
    // apoi join("") le unește într-un singur șir mare.
    container.innerHTML = lista.map(function(p) {
        return `
            <article class="meniu-card">
                <span class="meniu-categorie">${numeCategorie(p.categorie)}</span>
                <h3 class="meniu-nume">${p.nume}</h3>
                <p class="meniu-descriere">${p.descriere}</p>
                <div class="meniu-footer">
                    <span class="meniu-pret">${p.pret} lei</span>
                    <button class="btn-adauga" onclick="adaugaInCos(${p.id})">Adaugă în coș</button>
                </div>
            </article>
        `;
    }).join("");
}

// Funcție mică ajutătoare: returnează numele frumos al categoriei
function numeCategorie(cod) {
    const denumiri = {
        "aperitive": "Aperitive",
        "ciorbe": "Ciorbe",
        "principale": "Fel principal",
        "garnituri": "Garnitură",
        "deserturi": "Desert",
        "bauturi": "Băutură"
    };
    return denumiri[cod] || cod;
}


/* ===================================================
   4. FUNCȚII PENTRU COȘ
   ---------------------------------------------------
   Adăugare, eliminare, modificare cantitate.
   După orice modificare salvăm în localStorage.
   =================================================== */

function adaugaInCos(id) {
    // Găsim preparatul după id
    const preparat = preparate.find(function(p) { return p.id === id; });
    if (!preparat) return;

    // Verificăm dacă preparatul e deja în coș
    const existent = cos.find(function(c) { return c.id === id; });

    if (existent) {
        // Dacă există deja -> incrementăm cantitatea
        existent.cantitate++;
    } else {
        // Dacă nu -> adăugăm un produs nou cu cantitate 1
        cos.push({
            id: preparat.id,
            nume: preparat.nume,
            pret: preparat.pret,
            cantitate: 1
        });
    }

    salveazaCos();
    afiseazaCos();
    afiseazaToast(preparat.nume + " a fost adăugat în coș");
}

function eliminaDinCos(id) {
    // filter() returnează doar elementele care NU au id-ul respectiv
    cos = cos.filter(function(c) { return c.id !== id; });
    salveazaCos();
    afiseazaCos();
    afiseazaToast("Produs eliminat din coș");
}

function modificaCantitate(id, delta) {
    // delta = +1 sau -1
    const item = cos.find(function(c) { return c.id === id; });
    if (!item) return;

    item.cantitate += delta;

    // Dacă a ajuns la 0 -> îl scoatem complet
    if (item.cantitate <= 0) {
        eliminaDinCos(id);
    } else {
        salveazaCos();
        afiseazaCos();
    }
}

// Salvează coșul în localStorage
// IMPORTANT: localStorage acceptă doar text, deci convertim cu JSON.stringify
function salveazaCos() {
    localStorage.setItem("cos", JSON.stringify(cos));
}

// Afișează lista de produse din coș + total
function afiseazaCos() {
    const container = document.getElementById("cos-container");
    const totalSpan = document.getElementById("cos-total");
    const badge = document.getElementById("cos-badge");

    // Calculăm totalul: pentru fiecare produs -> preț × cantitate
    let total = 0;
    let nrProduse = 0;
    for (let i = 0; i < cos.length; i++) {
        total += cos[i].pret * cos[i].cantitate;
        nrProduse += cos[i].cantitate;
    }

    // Actualizăm badge-ul din navbar
    badge.textContent = nrProduse;

    // Afișăm totalul
    totalSpan.textContent = total + " lei";

    // Dacă coșul e gol -> mesaj prietenos
    if (cos.length === 0) {
        container.innerHTML = '<p class="mesaj-gol">Coșul este gol. Adaugă preparate din meniu pentru a continua.</p>';
        return;
    }

    // Generăm HTML pentru fiecare produs din coș
    container.innerHTML = cos.map(function(c) {
        return `
            <div class="cos-item">
                <div class="cos-item-info">
                    <h4>${c.nume}</h4>
                    <p>${c.pret} lei × ${c.cantitate} = ${c.pret * c.cantitate} lei</p>
                </div>
                <div class="cos-cantitate">
                    <button onclick="modificaCantitate(${c.id}, -1)" aria-label="Scade">−</button>
                    <span>${c.cantitate}</span>
                    <button onclick="modificaCantitate(${c.id}, 1)" aria-label="Crește">+</button>
                    <button class="btn-elimina" onclick="eliminaDinCos(${c.id})" aria-label="Elimină">×</button>
                </div>
            </div>
        `;
    }).join("");
}

// Finalizează comanda (simulare - nu trimite nimic la server)
function finalizeazaComanda() {
    if (cos.length === 0) {
        afiseazaToast("Coșul este gol. Adaugă produse mai întâi.");
        return;
    }

    // Calculăm totalul pentru mesaj
    let total = 0;
    for (let i = 0; i < cos.length; i++) {
        total += cos[i].pret * cos[i].cantitate;
    }

    // Simulare fără bază de date - doar golim coșul
    cos = [];
    salveazaCos();
    afiseazaCos();

    afiseazaToast("Comandă plasată cu succes! Total: " + total + " lei");
}


/* ===================================================
   5. CONT UTILIZATOR (DEMO)
   ---------------------------------------------------
   Sistem demonstrativ, fără securitate reală.
   Datele se salvează în localStorage doar pe acest
   dispozitiv. Parolele sunt stocate ca text simplu
   (DOAR pentru proiectul școlar)!
   =================================================== */

function inregistrare(eveniment) {
    // Oprim trimiterea normală a formularului
    eveniment.preventDefault();

    // Luăm valorile din câmpuri
    const nume = document.getElementById("reg-nume").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const parola = document.getElementById("reg-parola").value;

    // Validare simplă
    if (nume === "" || email === "" || parola === "") {
        afiseazaToast("Te rugăm să completezi toate câmpurile.");
        return;
    }

    if (parola.length < 6) {
        afiseazaToast("Parola trebuie să aibă minim 6 caractere.");
        return;
    }

    // Luăm lista de utilizatori existenți (sau o creăm)
    let utilizatori = JSON.parse(localStorage.getItem("utilizatori")) || [];

    // Verificăm dacă email-ul e deja folosit
    const exista = utilizatori.find(function(u) { return u.email === email; });
    if (exista) {
        afiseazaToast("Acest email este deja înregistrat.");
        return;
    }

    // Adăugăm utilizatorul nou în listă
    utilizatori.push({ nume: nume, email: email, parola: parola });
    localStorage.setItem("utilizatori", JSON.stringify(utilizatori));

    // Îl autentificăm automat
    utilizatorCurent = { nume: nume, email: email };
    localStorage.setItem("utilizatorCurent", JSON.stringify(utilizatorCurent));

    // Actualizăm interfața
    actualizeazaUICont();
    afiseazaToast("Cont creat cu succes! Bun venit, " + nume + "!");

    // Resetăm formularul
    document.getElementById("form-inregistrare").reset();
}

function autentificare(eveniment) {
    eveniment.preventDefault();

    const email = document.getElementById("log-email").value.trim();
    const parola = document.getElementById("log-parola").value;

    if (email === "" || parola === "") {
        afiseazaToast("Te rugăm să completezi toate câmpurile.");
        return;
    }

    // Căutăm utilizatorul în listă
    const utilizatori = JSON.parse(localStorage.getItem("utilizatori")) || [];
    const gasit = utilizatori.find(function(u) {
        return u.email === email && u.parola === parola;
    });

    if (!gasit) {
        afiseazaToast("Email sau parolă incorectă.");
        return;
    }

    // Salvăm utilizatorul autentificat
    utilizatorCurent = { nume: gasit.nume, email: gasit.email };
    localStorage.setItem("utilizatorCurent", JSON.stringify(utilizatorCurent));

    actualizeazaUICont();
    afiseazaToast("Bun venit înapoi, " + gasit.nume + "!");
    document.getElementById("form-autentificare").reset();
}

function deconectare() {
    utilizatorCurent = null;
    localStorage.removeItem("utilizatorCurent");
    actualizeazaUICont();
    afiseazaToast("Te-ai deconectat cu succes.");
}

// Actualizează ce se vede pe ecran în secțiunea Cont
function actualizeazaUICont() {
    const sectiuneNeauten = document.getElementById("cont-neautentificat");
    const sectiuneAuten = document.getElementById("cont-autentificat");
    const numeAfisat = document.getElementById("nume-utilizator");
    const emailAfisat = document.getElementById("profil-email");
    const initiala = document.getElementById("profil-initiala");
    const numeNavbar = document.getElementById("nume-navbar");

    if (utilizatorCurent) {
        // Utilizator autentificat -> afișăm profilul
        sectiuneNeauten.style.display = "none";
        sectiuneAuten.style.display = "block";

        numeAfisat.textContent = utilizatorCurent.nume;
        emailAfisat.textContent = utilizatorCurent.email;
        initiala.textContent = utilizatorCurent.nume.charAt(0).toUpperCase();

        // Schimbăm și textul din navbar cu prenumele
        const prenume = utilizatorCurent.nume.split(" ")[0];
        numeNavbar.textContent = prenume;
    } else {
        // Neautentificat -> afișăm formulare
        sectiuneNeauten.style.display = "block";
        sectiuneAuten.style.display = "none";
        numeNavbar.textContent = "Contul Meu";
    }
}


/* ===================================================
   6. FORMULAR REZERVARE
   ---------------------------------------------------
   Validează datele și salvează rezervarea în
   localStorage (simulare - nu trimite la server).
   =================================================== */

function trimiteRezervare(eveniment) {
    eveniment.preventDefault();

    // Luăm toate valorile
    const nume = document.getElementById("rez-nume").value.trim();
    const telefon = document.getElementById("rez-telefon").value.trim();
    const email = document.getElementById("rez-email").value.trim();
    const persoane = document.getElementById("rez-persoane").value;
    const data = document.getElementById("rez-data").value;
    const ora = document.getElementById("rez-ora").value;

    // Validare: toate câmpurile sunt obligatorii
    if (nume === "" || telefon === "" || email === "" || persoane === "" || data === "" || ora === "") {
        afiseazaToast("Te rugăm să completezi toate câmpurile.");
        return;
    }

    // Validare email simplă: trebuie să conțină @ și .
    if (!email.includes("@") || !email.includes(".")) {
        afiseazaToast("Adresa de email pare invalidă.");
        return;
    }

    // Validare telefon: minim 10 caractere
    if (telefon.replace(/\s/g, "").length < 10) {
        afiseazaToast("Numărul de telefon pare invalid.");
        return;
    }

    // Validare dată: nu poate fi în trecut
    const azi = new Date();
    azi.setHours(0, 0, 0, 0);
    const dataAleasa = new Date(data);
    if (dataAleasa < azi) {
        afiseazaToast("Data aleasă este în trecut. Alege o altă dată.");
        return;
    }

    // Salvăm rezervarea în localStorage
    const rezervari = JSON.parse(localStorage.getItem("rezervari")) || [];
    rezervari.push({
        nume: nume,
        telefon: telefon,
        email: email,
        persoane: persoane,
        data: data,
        ora: ora,
        creat: new Date().toISOString()
    });
    localStorage.setItem("rezervari", JSON.stringify(rezervari));

    // Mesaj de succes + reset formular
    afiseazaToast("Rezervare confirmată pentru " + data + " la ora " + ora + "!");
    document.getElementById("form-rezervare").reset();
}


/* ===================================================
   7. GALERIE - LIGHTBOX
   ---------------------------------------------------
   La click pe o imagine, o afișăm mărită.
   =================================================== */

function deschideLightbox(element) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    // Luăm sursa imaginii pe care s-a făcut click
    const imagine = element.querySelector("img");
    lightboxImg.src = imagine.src;
    lightboxImg.alt = imagine.alt;

    lightbox.classList.add("activ");
    // Blocăm scroll-ul body-ului cât e deschis
    document.body.style.overflow = "hidden";
}

function inchideLightbox() {
    document.getElementById("lightbox").classList.remove("activ");
    document.body.style.overflow = "";
}

// Închidere și cu tasta ESC
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        inchideLightbox();
    }
});


/* ===================================================
   8. TOAST - notificări elegante (înlocuiesc alert)
   ---------------------------------------------------
   Apare jos pe ecran pentru câteva secunde.
   =================================================== */

let toastTimer = null;

function afiseazaToast(mesaj) {
    const toast = document.getElementById("toast");
    toast.textContent = mesaj;
    toast.classList.add("activ");

    // Anulăm timer-ul anterior dacă există
    if (toastTimer) clearTimeout(toastTimer);

    // Ascundem după 3 secunde
    toastTimer = setTimeout(function() {
        toast.classList.remove("activ");
    }, 3000);
}


/* ===================================================
   9. NAVBAR + MENIU MOBIL
   ---------------------------------------------------
   - Navbar care își schimbă fundalul la scroll
   - Hamburger pentru mobil
   - Buton "back to top"
   =================================================== */

const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const btnBackTop = document.getElementById("back-to-top");

// Click pe hamburger -> deschide/închide meniul mobil
burger.addEventListener("click", function() {
    burger.classList.toggle("activ");
    navLinks.classList.toggle("activ");
});

// Când dau click pe un link din meniu (mobil) -> îl închid
const linkuriMeniu = document.querySelectorAll("#nav-links a");
linkuriMeniu.forEach(function(link) {
    link.addEventListener("click", function() {
        burger.classList.remove("activ");
        navLinks.classList.remove("activ");
    });
});

// La scroll: schimbăm aspectul navbar-ului și arătăm/ascundem butonul back-to-top
window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        btnBackTop.classList.add("vizibil");
    } else {
        btnBackTop.classList.remove("vizibil");
    }
});

// Click pe butonul "back to top" -> scroll lin în sus
btnBackTop.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ===================================================
   10. INIȚIALIZAREA APLICAȚIEI
   ---------------------------------------------------
   Această funcție se rulează când pagina e gata.
   Atașează toate evenimentele și afișează datele.
   =================================================== */

function init() {
    // 1. Afișăm meniul, coșul și starea contului
    afiseazaMeniu();
    afiseazaCos();
    actualizeazaUICont();

    // 2. Filtrele meniului - click pe un buton de categorie
    const butoaneFiltru = document.querySelectorAll(".filtru-btn");
    butoaneFiltru.forEach(function(btn) {
        btn.addEventListener("click", function() {
            // Scoatem clasa "activ" de pe toate
            butoaneFiltru.forEach(function(b) { b.classList.remove("activ"); });
            // O punem pe cel apăsat
            btn.classList.add("activ");
            // Salvăm categoria și reafișăm meniul
            categorieActiva = btn.dataset.categorie;
            afiseazaMeniu();
        });
    });

    // 3. Căutarea în meniu
    document.getElementById("cautare").addEventListener("input", function(e) {
        textCautare = e.target.value;
        afiseazaMeniu();
    });

    // 4. Sortarea meniului
    document.getElementById("sortare").addEventListener("change", function(e) {
        modSortare = e.target.value;
        afiseazaMeniu();
    });

    // 5. Buton checkout din coș
    document.getElementById("btn-checkout").addEventListener("click", finalizeazaComanda);

    // 6. Formularele
    document.getElementById("form-rezervare").addEventListener("submit", trimiteRezervare);
    document.getElementById("form-inregistrare").addEventListener("submit", inregistrare);
    document.getElementById("form-autentificare").addEventListener("submit", autentificare);

    // 7. Buton deconectare
    document.getElementById("btn-deconectare").addEventListener("click", deconectare);

    // 8. Tab-uri pentru Login / Înregistrare
    const taburi = document.querySelectorAll(".tab-btn");
    taburi.forEach(function(tab) {
        tab.addEventListener("click", function() {
            const numeTab = tab.dataset.tab;

            // Schimbăm starea butoanelor
            taburi.forEach(function(t) { t.classList.remove("activ"); });
            tab.classList.add("activ");

            // Afișăm conținutul corespunzător
            const continuturi = document.querySelectorAll(".tab-continut");
            continuturi.forEach(function(c) {
                if (c.dataset.tab === numeTab) {
                    c.classList.add("activ");
                } else {
                    c.classList.remove("activ");
                }
            });
        });
    });

    // 9. Setăm data minimă a rezervării -> azi
    const inputData = document.getElementById("rez-data");
    if (inputData) {
        const azi = new Date().toISOString().split("T")[0];
        inputData.setAttribute("min", azi);
    }
}

// Așteptăm ca tot HTML-ul să fie încărcat înainte de a rula init()
document.addEventListener("DOMContentLoaded", init);


/* ===================================================
   NOTĂ FINALĂ - explicație pentru atestat
   ---------------------------------------------------
   Acest proiect este o simulare frontend completă:
   - NU folosește server și nici bază de date reală
   - Toate datele se salvează în localStorage
   - localStorage = spațiu de stocare al browser-ului
     care păstrează datele între sesiuni
   - Sistemul de cont este DEMONSTRATIV - parolele se
     stochează ca text simplu (NU este sigur pentru
     producție, dar e potrivit pentru un proiect școlar)
   =================================================== */
