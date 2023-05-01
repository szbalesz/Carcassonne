//szükséges változók létrehozása
var szelesseg = 10;
var hosszusag = 8;
var lerakott = 0;
var pont = 0;
var milyenvegelett = 0;
var hanyiranybanemrakhatole = 0;

//10 féle kártya,darab adatainak megadása
var darabok = [
    {tipus: "ut1",csatlakozasok: {fent: "mezo", lent: "ut", bal: "ut", jobb: "mezo"},kep: "./kepek/út1.jpg"},
    {tipus: "ut2",csatlakozasok: {fent: "mezo", lent: "mezo", bal: "ut", jobb: "ut"},kep: "./kepek/út2.jpg"},
    {tipus: "ut3",csatlakozasok: {fent: "ut", lent: "ut", bal: "ut", jobb: "ut"},kep: "./kepek/út3.jpg"},
    {tipus: "ut4",csatlakozasok: {fent: "ut", lent: "ut", bal: "mezo", jobb: "ut"},kep: "./kepek/út4.jpg"},
    {tipus: "kolostor",csatlakozasok: {fent: "mezo", lent: "mezo", bal: "mezo", jobb: "mezo"},kep: "./kepek/kolostor.jpg"},
    {tipus: "mező",csatlakozasok: {fent: "mezo", lent: "mezo", bal: "mezo", jobb: "mezo"},kep: "./kepek/mező.jpg"},
    {tipus: "város1",csatlakozasok: {fent: "varos", lent: "varos", bal: "mezo", jobb: "mezo"},kep: "./kepek/város1.jpg"},
    {tipus: "város2",csatlakozasok: {fent: "varos", lent: "ut", bal: "varos", jobb: "varos"},kep: "./kepek/város2.jpg"},
    {tipus: "város3",csatlakozasok: {fent: "varos", lent: "mezo", bal: "varos", jobb: "mezo"},kep: "./kepek/város3.jpg"},
    {tipus: "város4",csatlakozasok: {fent: "mezo", lent: "mezo", bal: "varos", jobb: "varos"},kep: "./kepek/város4.jpg"}
]
//10 alap kártya + 70 darab véletlenszerűlegenerálása
var generaltdarabok = [];
function generalas(){
    for(i = 0; i < szelesseg*hosszusag;i++){
        if(i < 10){
            generaltdarabok[i] = i;
        }
        else{
            generaltdarabok[i] = Math.round(Math.random()*9);
        }
    }
}
//helyek 2 dimenziós tömb létrehozása
var helyek = new Array(hosszusag)
for(i = 0; i < hosszusag;i++){
    helyek[i] = new Array(szelesseg);
}
//játék újrakezdése
function reset(){
    milyenvegelett = 0;
    document.getElementById("oldal").innerHTML = ``;
    kezdes();
    pont = 0;
    lerakott = 0;
    document.getElementById("vegeoldal").style.display = "none";
    document.getElementById("oldal").style.opacity = "1";
    document.getElementById("feladasmenupont").style.display = "block"
}
//tábla üressé tétele
function urestabla(){
    for(i = 0; i < hosszusag;i++){
        for(f = 0; f < szelesseg; f++){
            helyek[i][f] = `<img style='border: 1px solid black;' class="semmi" darab='semmi' id=${i}-${f}-kep src='./kepek/semmi.png'`;
        }
    }
}
//játékos amikor megadja a nevét akkor kezdheti el a játékot
var jatekosnev = "";
function jatekosnevvaltas(){
    if(document.getElementById("kezdes").getAttribute("disabled") == ""){
        document.getElementById("kezdes").removeAttribute("disabled");
    }
}
//kezdesoldaltörlése
function kezdesoldaltorlese(){
    document.querySelector(".kezdes").remove();
}
//játék kezdése
function kezdes(){
    milyenvegelett = 0;
    //ha megadott játékosnevet
    if(document.getElementById("jatekosnev") != undefined){
        jatekosnev = document.getElementById("jatekosnev").value;
    }//ha nem adott meg
    else if(jatekosnev == ""){
        jatekosnev = "Játékos";
    }
    //játéktér létrehozása
    var jatekter = "";
    //index a darabok id-jéhez
    var index = 0;
    //az oldalhoz hozzáadjuk a darabokat
    document.getElementById("oldal").innerHTML += `<div id="darabokhelye"><h2>Jelenlegi darab</h2></div>`;
    //megjelenítjük a menüt
    document.getElementById("menu").style.marginTop = 0;
    //a logót áthelyezzük
    document.getElementById("logo").style.height = "80px";
    document.getElementById("logo").style.left = "50%";
    //játéktér ténylegse létrehozása
    jatekter += `<table id='jatekter'>`;
    generalas();
    urestabla();
    //játék tábla kialakítása
    for(i = 0; i < hosszusag; i++){
        jatekter += "<tr>"
        for(f = 0; f < szelesseg; f++){
            //minden darabot megjelenítünk amit a felhasználó majd letud rakni
            document.getElementById("darabokhelye").innerHTML +=  `<img style='z-index:${index};' id=${index} kep=${generaltdarabok[index]} fent=${darabok[generaltdarabok[index]].csatlakozasok.fent} lent=${darabok[generaltdarabok[index]].csatlakozasok.lent} jobb=${darabok[generaltdarabok[index]].csatlakozasok.jobb} bal=${darabok[generaltdarabok[index]].csatlakozasok.bal} onclick='forgatas(this)' src="${darabok[generaltdarabok[index]].kep}">`;
            //játéktáblán megjelenítjük a helyek tömbben eltárolt képeket
            jatekter += `<td id=${i}-${f} class='hely' onclick='elhelyezes(this)'>${helyek[i][f]}</td>`
            //növeljük az indexet
            index++;
        }
        jatekter += "</tr>";
    }
    jatekter += "</table>";
    //játéktér, és pont számláló megjelenítése az oldalon
    document.getElementById("oldal").innerHTML += `<h2 id="pont" class="nav-link">Pont: <span id="pontszam">0</span></h2>`
    document.getElementById("oldal").innerHTML += jatekter;
}
//játék vége
function vege(szam){
    //megjelenítjük a vége oldalt
    document.getElementById("vegeoldal").style.display = "block";
    //a játék oldalt eltüntetjük
    document.getElementById("oldal").style.opacity = "0";
    document.getElementById("feladasmenupont").style.display = "none";
    var vegeszoveg = "";
    var megtekintesgombszoveg = "";
    var mentesgomb = "";
    //játék végétől függ hogy mit ír ki a program a vége oldalon
    if(szam == 1){
        vegeszoveg = "Nem maradt több elhelyezési lehetőség";
        megtekintesgombszoveg = "Játéktér megtekintése";
        milyenvegelett = 1;
    }
    else if(szam == 2){
        vegeszoveg = "Feladtad a játékot"
        megtekintesgombszoveg = "Játék folytatása";
        mentesgomb = `<button class="btn btn-primary" onclick="pontokmentese(pont),nemfolytathatja(),this.remove()">Pont mentése</button>`
        milyenvegelett = 2;
    }
    document.getElementById("logo").style.height ="150px";
    document.getElementById("vegeoldal").innerHTML = `
        <div class="card-header">
              <span class="badge bg-primary">Játék vége</span>
            </div>
            <div class="card-body">
              <h5 class="card-title">${vegeszoveg}</h5>
              <p class="card-text">Játékos: <strong>${jatekosnev}</strong><br>Elért pontszám: <strong>${pont}</strong></p>
              <a href="" class="btn btn-primary">Főoldal</a>
              <button class="btn btn-primary" onclick="reset()">Újrakezdés</button>
              <br>
              <button class="btn btn-primary" id="megtekintesvagyvisszateres" onclick="megtekintes()">${megtekintesgombszoveg}</button>
              ${mentesgomb}
        </div>`

}
//darab forgatása
function forgatas(darab){
    var melyikkep = darab.getAttribute("kep");
    //jelenlegi darab helyzetétől függően elforgatjuk azt
    if(darab.style.rotate == ""){
        darab.style.rotate = "90deg";
        if(melyikkep == 0){ //út1
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","mezo");
        }
        if(melyikkep == 1){ //út2
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","mezo");
        }
        //út3 mindenirányba megy emiatt nem kell
        if(melyikkep == 3){ //út4
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","ut");
        }
        //kolostor mindenirány
        //mező mindenirány
        if(melyikkep == 6){ //város1
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 7){ //város2
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 8){ //város3
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 9){ //város4
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","mezo");
        }
    }
    else if(darab.style.rotate == "90deg"){
        darab.style.rotate = "180deg";
        if(melyikkep == 0){ //út1
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","ut");
        }
        if(melyikkep == 1){ //út2
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","ut");
        }
        //út3 mindenirányba megy emiatt nem kell
        if(melyikkep == 3){ //út4
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","mezo");
        }
        //kolostor mindenirány
        //mező mindenirány
        if(melyikkep == 6){ //város1
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","mezo");
        }
        if(melyikkep == 7){ //város2
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 8){ //város3
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 9){ //város4
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","varos");
        }
    }
    else if(darab.style.rotate == "180deg"){
        darab.style.rotate = "270deg";
        if(melyikkep == 0){ //út1
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","ut");
        }
        if(melyikkep == 1){ //út2
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","mezo");
        }
        //út3 mindenirányba megy emiatt nem kell
        if(melyikkep == 3){ //út4
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","ut");
        }
        //kolostor mindenirány
        //mező mindenirány
        if(melyikkep == 6){ //város1
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 7){ //város2
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","ut");
        }
        if(melyikkep == 8){ //város3
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","mezo");
        }
        if(melyikkep == 9){ //város4
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","mezo");
        }
    }
    else if(darab.style.rotate == "270deg"){
        darab.style.rotate = "";
        if(melyikkep == 0){ //út1
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","mezo");
        }
        if(melyikkep == 1){ //út2
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","ut");
            darab.setAttribute("jobb","ut");
        }
        //út3 mindenirányba megy emiatt nem kell
        if(melyikkep == 3){ //út4
            darab.setAttribute("fent","ut");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","ut");
        }
        //kolostor mindenirány
        //mező mindenirány
        if(melyikkep == 6){ //város1
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","varos");
            darab.setAttribute("bal","mezo");
            darab.setAttribute("jobb","mezo");
        }
        if(melyikkep == 7){ //város2
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","ut");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","varos");
        }
        if(melyikkep == 8){ //város3
            darab.setAttribute("fent","varos");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","mezo");
        }
        if(melyikkep == 9){ //város4
            darab.setAttribute("fent","mezo");
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","varos");
            darab.setAttribute("jobb","varos");
        }
    }
}
//tábla frissítése
function frissites(){
    //létrehozzuk a táblát
    var jatekter = "";
    jatekter += `<table>`;
    //táblába elhelyezzük a bele illő darabokat
    for(i = 0; i < hosszusag; i++){
        jatekter += "<tr>"
        for(f = 0; f < szelesseg; f++){
            jatekter += `<td id=${i}-${f} class='hely' onclick='elhelyezes(this)'>${helyek[i][f]}</td>`
    }
        jatekter += `</tr>`;
    }
    jatekter += `</table>`;
    //megjelenítjük a táblát az oldalon
    document.getElementById("jatekter").innerHTML = jatekter;
    //a következő kártya minden irányának lerakhatóságának vizsgálata
    if(hanyhely() == 0){
            hanyiranybanemrakhatole = 0; 
            //megkeressük hogy melyik kártya következik
            for(k = szelesseg*hosszusag; k > 0; k--){
                //ha a kártya létezik akkor történnek az alábbiak
                if(document.getElementById(k) != undefined){
                    //lekérjük az irányát
                    var irany = document.getElementById(k).style.rotate;
                    for(l = 0; l < 4; l++){
                        //elforgatunk rajta egyet
                        forgatas(document.getElementById(k));
                        //megvizsgáljuk hogy így elforgatva hány helyre rakható le
                        var hanyhelyrelehet = hanyhely();
                        //ha sehova sem akkor a "hanyiranybanemrakhatole" változóhoz hozzáadunk egyet
                        if(irany == "" && hanyiranybanemrakhatole == 0 && hanyhelyrelehet == 0){
                            hanyiranybanemrakhatole++;
                        }
                        else if(irany == "90deg" && hanyhelyrelehet == 0){
                            hanyiranybanemrakhatole++;
                        }
                        else if(irany == "180deg" && hanyhelyrelehet == 0){
                            hanyiranybanemrakhatole++;
                        }
                        else if(irany == "270deg" && hanyhelyrelehet == 0){
                            hanyiranybanemrakhatole++;
                        }
                        irany = document.getElementById(k).style.rotate;
                        //ha semelyik oldalával nem rakható le a kártya akkor
                        if(hanyiranybanemrakhatole == 4){
                            //elmentjük a pontjait
                            pontokmentese(pont);
                            //vissza gomb eltüntetése, ha a menüsoron lenne
                            if(document.getElementById("vegeoldalmegtekintese") != null){
                                document.getElementById("vegeoldalmegtekintese").remove();
                            }
                            //vége a játéknak
                            vege(1);
                        }
                    }
                    break;
            }
        }
    }
}
//hány helyre lehet elhelyezni a jelenlegi darabot
function hanyhely(){
    var hanyhelyrerakhatojelenleg = 0;
    //az összes helyen megvizsgáljuk, hogy a kártya lerakható-e arra a helyre, ha igen akkor nő a változónk
    for(i = 0; i < hosszusag; i ++){
        for(f = 0; f < szelesseg; f ++){
            for(k = (szelesseg*hosszusag); k > 0; k--){
                if(document.getElementById(k) != undefined){
                    //meghatározzuk, hogy melyik képet is vizsgáljuk, vagyis melyik kártyát
                    var melyikkep = document.getElementById(k).getAttribute('kep');
                    //megnézzük az irányát
                    irany = document.getElementById(k).style.rotate;
                    //ha lehelyezhető(ezt a leRakhatoE függvénnyel tesszük meg) akkor nő a változó, 
                    if(helyek[i][f].includes('semmi') && leRakhatoE(parseInt(i),parseInt(f),document.getElementById(k).getAttribute("fent"),document.getElementById(k).getAttribute("lent"),document.getElementById(k).getAttribute("bal"),document.getElementById(k).getAttribute("jobb"))){
                        hanyhelyrerakhatojelenleg++; 
                    }
                    //break amiatt szükséges hogy csak a soron következő kártyát vizsgáljuk
                    break;
                }
            }
        }
    } 
   //visszaküldjük, hogy hány helyre rakható le a jelenlegikártya
   return hanyhelyrerakhatojelenleg;  
}
//darab lerakásának vizsglata
function leRakhatoE(i,f,jelenlegifel,jelenlegile,jelenlegibal,jelenlegijobb){
    //a bejövő paraméterek alapján megkeressük a lerakási hely körüli kártyákat
    var feletti = helyek[Math.max(i-1,0)][f];
    var alatti = helyek[Math.min(i+1,hosszusag-1)][f];
    var baloldali = helyek[i][Math.max(f-1,0)];
    var jobboldali = helyek[i][Math.min(f+1,szelesseg-1)];
    //aztán megvizsgáljuk, hogy a kártya lerakható-e
    if(lerakott == 0 || !(baloldali.includes("semmi") && jobboldali.includes("semmi") && feletti.includes("semmi") && alatti.includes("semmi"))){
        if((feletti.includes("lent="+jelenlegifel) || feletti.includes("semmi")) && (alatti.includes("fent="+jelenlegile) || alatti.includes("semmi")) && (baloldali.includes("jobb="+jelenlegibal) || baloldali.includes("semmi")) && (jobboldali.includes("bal="+jelenlegijobb) || jobboldali.includes("semmi"))){
            return true;
        }
    }
}
//darab elhelyezése
function elhelyezes(hely){
    //az id ből meghatározzuk,hogy hová szeretné a felhasznló lehelyezni a kártyát
    var i = (hely.id).split('-')[0];
    var f = (hely.id).split('-')[1];
    //ha ott még nincs semmi akkor történnek az alábbiak
    if(helyek[i][f].includes("semmi")){
    //megkeressük, hogy a felhasználó épp melyik kártyát szeretné elhelyezni
    for(k = szelesseg*hosszusag; k > 0; k--){
        //ha megtaláltuk
        if(document.getElementById(k) != undefined){
            //megkeressük, hogy milyen kártya is az és milyen az iránya
            var melyikkep = document.getElementById(k).getAttribute('kep');
            var irany = document.getElementById(k).style.rotate;
            //megvizsgáljuk, hogy lerakható-e
        if(leRakhatoE(parseInt(i),parseInt(f),document.getElementById(k).getAttribute("fent"),document.getElementById(k).getAttribute("lent"),document.getElementById(k).getAttribute("bal"),document.getElementById(k).getAttribute("jobb"))){
            //ha lerakható, akkor a helyek tömbünkhöz hozzáadjuk az képet az alábbi attribútumokkal
            helyek[i][f] = `<img style="rotate: ${irany}" src="${darabok[melyikkep].kep}" id=${i}-${f}-kep darab=${melyikkep} fent=${document.getElementById(k).getAttribute("fent")} lent=${document.getElementById(k).getAttribute("lent")} bal=${document.getElementById(k).getAttribute("bal")} jobb=${document.getElementById(k).getAttribute("jobb")}>`;
            //a felhasználó pontot kap a lehelyezésért
            pontadas(helyek[i][f],parseInt(i),parseInt(f));
            //a kártyát a jobboldali pakliből eltávolítjuk
            document.getElementById(k).remove();
            //pontjait megjelenítjük
            document.getElementById("pontszam").innerText = pont;
            //lerakott változót növeljük egyel
            lerakott++;
        }
        break;
        }
    }
    }
    //aztán frissítjük a táblát
    frissites();
}
//pont adása a játékosnak
function pontadas(darab,i,f){
    
    //ha a kártya út
    if(darab.includes("út")){
        pont++;
    }
    //ha a kártya város
    if(darab.includes("város")){
        pont+=2;
    }
    //ha a kártya kolostor
    if(darab.includes("kolostor")){
        //a bejövő paraméterek alapján megkeressük a lerakási hely körüli kártyákat
        var feletti = helyek[Math.max(i-1,0)][f];
        var felettibal = helyek[Math.max(i-1,0)][Math.max(f-1,0)];
        var felettijobb = helyek[Math.max(i-1,0)][Math.min(f+1,szelesseg-1)];
        var alatti = helyek[Math.min(i+1,hosszusag-1)][f];
        var alattibal = helyek[Math.min(i+1,hosszusag-1)][Math.max(f-1,0)];
        var alattijobb = helyek[Math.min(i+1,hosszusag-1)][Math.min(f+1,szelesseg-1)];
        var baloldali = helyek[i][Math.max(f-1,0)];
        var jobboldali = helyek[i][Math.min(f+1,szelesseg-1)];
        if(!feletti.includes("semmi") && i != 0){
            pont++;
        }
        if(!felettibal.includes("semmi") && i != 0 && f != 0){
            pont++;
        }
        if(!felettijobb.includes("semmi") && i != 0 && f != szelesseg-1){
            pont++;
        }
        if(!alatti.includes("semmi") && i != hosszusag-1){
            pont++;
        }
        if(!alattibal.includes("semmi") && i != hosszusag-1){
            pont++;
        }
        if(!alattijobb.includes("semmi") && i != hosszusag-1 && f != szelesseg-1){
            pont++;
        }
        if(!baloldali.includes("semmi") && f != 0){
            pont++;
        }
        if(!jobboldali.includes("semmi") && f != szelesseg-1){
            pont++;
        }

    }
    //ha betelt a játéktér
    if(lerakott == 80){
        pont+=10;
    }
}
//pontokmentése, helyi tárolóba
var pontok;
function pontokmentese(pont){
    //ha még nincs mentett pont
    if(localStorage.getItem("pontok") == "" || localStorage.getItem("pontok") == undefined){
        pontok = 
        `Játékosnév - Pontszám\n-------------------------\n`;
        pontok += `${jatekosnev} - ${pont}\n` ;
        //helyi tárolóba mentés
        localStorage.setItem("pontok", pontok)
    }//ha már van mentett pont
    else{
        var eddigipontok = localStorage.getItem("pontok");
        pontok = 
        `Játékosnév - Pontszám\n-------------------------\n`;
        //növekvő sorrendbe rendezés
        eddigipontok += `${jatekosnev} - ${pont}`;
        var sorok = eddigipontok.split('\n');
        var mentettpontok = new Array(sorok.length-2);
        //pontok megszerzése
        for(i = 2; i < sorok.length; i ++){
            mentettpontok[i-2] = parseInt(sorok[i].split('-')[1]);
        }
        //pontok alapján a sorok rendezése növekvő sorrendbe
        for(f = 0; f < mentettpontok.length; f++){
            for(i = 0; i < mentettpontok.length; i++){
                if(mentettpontok[i+1] > mentettpontok[i]){
                    var ideiglenes = mentettpontok[i+1];
                    var ideiglenessor = sorok[i+1+2];
                    sorok[i+1+2] = sorok[i+2];
                    sorok[i+2] = ideiglenessor;
                    mentettpontok[i+1] = mentettpontok[i];
                    mentettpontok[i] = ideiglenes;
                }

            }
        }
        for(i = 2; i < sorok.length; i++){
            pontok+= sorok[i]+"\n";
        }
        //helyi tárolóba mentés
        localStorage.setItem("pontok", pontok);
    }
}
//pontokmentése a helyi tárolóból fájlba
function pontokmentesefajlba() {
    var szoveg;
    //Ha nincs még elért pontszám akkor a letöltött fájlba ez a szöveg jelenik meg
    if(localStorage.getItem("pontok") == null || localStorage.getItem("pontok") == ""){
        szoveg = "Nincsenek elért pontszámok ezen a számítógépen!"
    }//ha létezik akkor pedig a pontokat iratjuk bele a fájlba a helyi tárolóból
    else{
        szoveg = localStorage.getItem("pontok");
    }
    //fájl létrehozása a szöveggel
    var file = new Blob([szoveg], {type: 'text/plain'});
    var a = document.createElement("a");
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = "pontok.txt";
    document.getElementById("oldal").appendChild(a);
    a.click();
    setTimeout(function() {
      document.getElementById("oldal").removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
}
//pontok törlése
function pontoktorlese(){
    //pontok törlése a helyitárolóból
    localStorage.setItem("pontok","");
    //és a pontokmenüből is kitöröljük a pontokat
    document.getElementById("pontokmenuadatok").innerHTML = localStorage.getItem("pontok");
}
//pontok megtekintése oldal megjelenítése mindenfelett, és eltüntetése
function pontokmegtekintese(){
    //ha már megvan jelenítve, akkor eltüntetjük
    if(document.getElementById("pontokmenu").style.display == "block"){
        //ha a játék vége oldalról kerültünk a menübe
        if(document.getElementById("vegeoldal").style.opacity == "0"){
            document.getElementById("vegeoldal").style.opacity = "1";
        }   
        //ha nem a játék vége oldalról kerültünk a menübe
        //vagyis a "milyenvegelett" = 0
        //akkor megjelenítjük a játékot
        if(milyenvegelett == "0"){
            document.getElementById("oldal").style.opacity = "1";
        }
        //eltüntetjük a pontok oldalt
        document.getElementById("pontokmenu").style.display = "none";
        //megváltoztatjuk a menüpont nevét
        document.getElementById("pontokmegtekintese").innerText = "Mentett pontok megtekintése";
        //megváltoztatjuk a háttérszínét 
        document.getElementById("pontokmegtekintese").style.backgroundColor = "white";
    }//ha még nincs megjelenítve akkor megjelenítjük
    else{
        //ha a játék vége oldal megvan jelenítve, akkor azt eltüntetjük
        if(document.getElementById("vegeoldal").style.display == "block"){
            document.getElementById("vegeoldal").style.opacity = "0";
        }
        //a játékot is eltüntetjük
        document.getElementById("oldal").style.opacity = "0";;
        //megjelenítjük a pontok oldalt, az adatokkal
        document.getElementById("pontokmenu").style.display = "block";
        //megváltoztatjuk a menüpont nevét
        document.getElementById("pontokmegtekintese").innerText = "Vissza";
        //megváltoztatjuk a menüpont hátterét zöldre
        document.getElementById("pontokmegtekintese").style.backgroundColor = "#2EFF2E";
    }
    //a menübe betöltjük a pontokat a helyi tárolóból
    document.getElementById("pontokmenuadatok").innerHTML = localStorage.getItem("pontok");
}
//infó oldal megjelenítése, és eltüntetése
function info(szam){
    //ha az oldalon kattintunk az "i" jelre akkor
    if(szam == 1){
        //megjelenítjük az INFO oldalt
        document.getElementById("info").style.display = "block";
        //a játék oldalt eltüntetjük
        document.getElementById("oldal").style.display = "none";
        //a logót méretét megváltoztatjuk
        document.getElementById("logo").style.height = "150px";
        //eltüntetjük az "i" gombot és a többi dolgot ami minden felett jelenne meg
        document.getElementById("mindenfelett").style.display = "none";
        //a menüsort eltüntetjük
        document.getElementById("menu").style.marginTop = "-200px";
    }
    //ha az info oldalon kattintunk a "Vissza a játékba" gombra
    else if(szam == 2){
        //info oldal eltüntetése
        document.getElementById("info").style.display = "none";
        //játék oldal megjelenítése
        document.getElementById("oldal").style.display = "block";
        //minden felett lévő elemek megjelenítése
        document.getElementById("mindenfelett").style.display = "block";
        //ha a játéktér létezik, vagyis elvan indítva a játék, és még nincs vége a játéknak
        if(document.getElementById("jatekter") != null){
            //akkor megjelenik a menüsor
            document.getElementById("menu").style.marginTop = "0";
            //a logo mérete megváltozik, ha nincs vége a játéknak
            if(milyenvegelett == 0){
                document.getElementById("logo").style.height = "80px";
            }
        }
    }
}
//ha a játéknak végevan, de a játékos megszeretné nézni a játéktáblát mégegyszer
function megtekintes(){
    //akkor az oldalt megjelenítjük
    document.getElementById("oldal").style.opacity = "1";
    //eltüntetjük a végeoldalt
    document.getElementById("vegeoldal").innerHTML = "";
    document.getElementById("vegeoldal").style.display = "none";
    document.getElementById("logo").style.height = "80px";
    //ha a játékos nem feladta a játékot, hanem nincs több lehetősége lépni
    if(milyenvegelett == "1"){
    document.getElementById("menupontok").innerHTML += 
    `<li class="nav-item">
        <button class="nav-link" id="vegeoldalmegtekintese" onclick="vege(${milyenvegelett},this.remove())">Vissza</button>
    </li>`
    }
    else if(milyenvegelett == "2"){
        document.getElementById("feladasmenupont").style.display = "block";
        milyenvegelett = "0";
    }
}
//h a játékos lementette a pontjait a feladás után, akkor nem folytathatja a játékot
function nemfolytathatja(){
    document.getElementById("megtekintesvagyvisszateres").remove();
}