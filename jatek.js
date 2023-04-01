
var szelesseg = 10;
var hosszusag = 8;
var lerakott = 0;
var pont = 0;
var milyenvegelett = 0;

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

var generaltdarabok = [];
//helyek 2 dimenziós töm létrehozása
var helyek = new Array(hosszusag)
for(i = 0; i < hosszusag;i++){
    helyek[i] = new Array(szelesseg);
}
//játék újra kezdése
function reset(){
    milyenvegelett = 0;
    document.getElementById("oldal").innerHTML = ``;
    kezdes();
    pont = 0;
    lerakott = 0;
    document.getElementById("vegeoldal").style.display = "none";
    document.getElementById("oldal").classList.remove("blur");
}
//10 alap kártya + 70 darab véletlenszerűlegenerálása
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
//tábla üressé tétele
function urestabla(){
    for(i = 0; i < hosszusag;i++){
        for(f = 0; f < szelesseg; f++){
            helyek[i][f] = `<img style='border: 1px solid black;' darab='semmi' id=${i}-${f}-kep src='./kepek/semmi.png'>`;
        }
    }
}
//játékos névváltás
var jatekosnev;
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
    if(document.getElementById("jatekosnev") != null){
        jatekosnev = document.getElementById("jatekosnev").value;
    }
    var jatekter = "";
    var index = 0;
    document.getElementById("oldal").innerHTML += `<div id="darabokhelye"><h2>Jelenlegi darab</h2></div>`;
    document.getElementById("menu").style.marginTop = 0;
    document.getElementById("logo").style.height = "80px";
    document.getElementById("logo").style.left = "47%";
    jatekter += `<table id='jatekter'>`;
    generalas();
    urestabla();
    for(i = 0; i < hosszusag; i++){
        jatekter += "<tr>"
        for(f = 0; f < szelesseg; f++){
            document.getElementById("darabokhelye").innerHTML +=  `<img style='z-index:${index};' id=${index} kep=${generaltdarabok[index]} fent=${darabok[generaltdarabok[index]].csatlakozasok.fent} lent=${darabok[generaltdarabok[index]].csatlakozasok.lent} jobb=${darabok[generaltdarabok[index]].csatlakozasok.jobb} bal=${darabok[generaltdarabok[index]].csatlakozasok.bal} onclick='forgatas(this)' src="${darabok[generaltdarabok[index]].kep}">`;
            jatekter += `<td id=${i}-${f} class='hely' onclick='elhelyezes(this)'>${helyek[i][f]}</td>`
            index++;
        }
        jatekter += "</tr>";
    }
    jatekter += "</table>";
    document.getElementById("oldal").innerHTML += `<h2 id="pont" class="nav-link">Pont: <span id="pontszam">0</span></h2>`
    document.getElementById("oldal").innerHTML += jatekter;
}


//játék vége
function vege(szam){
    document.getElementById("vegeoldal").style.display = "block";
    document.getElementById("oldal").classList.add("blur");
    var vegeszoveg = "";
    var megtekintesgombszoveg = "";
    var mentesgomb = "";
    if(szam == 1){
        vegeszoveg = "Nem maradt több elhelyezési lehetőség";
        megtekintesgombszoveg = "Játéktér megtekintése";
        milyenvegelett = 1;
    }
    if(szam == 2){
        vegeszoveg = "Feladtad a játékot"
        megtekintesgombszoveg = "Játék folytatása";
        mentesgomb = `<button class="btn btn-primary" onclick="pontokmentese(pont),nemfolytathatja()">Pont mentése</button>`
        milyenvegelett = 2;
    }

    document.getElementById("vegeoldal").innerHTML = `
        <div class="card-header">
              Játék vége
            </div>
            <div class="card-body">
              <h5 class="card-title">${vegeszoveg}</h5>
              <p class="card-text">Elért pontszám: ${pont}</p>
              <a href="./index.html" class="btn btn-primary">Főoldal</a>
              <button class="btn btn-primary" onclick="reset()">Újrakezdés</button>
              <br>
              <button class="btn btn-primary" id="megtekintesvagyvisszateres" onclick="megtekintes()">${megtekintesgombszoveg}</button>
              ${mentesgomb}
        </div>`

}

var hanyiranybanemrakhatole = 0;

//darab forgatása
function forgatas(darab){
    var melyikkep = darab.getAttribute("kep");
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
    var jatekter = "";
    jatekter += `<table>`;
    for(i = 0; i < hosszusag; i++){
        jatekter += "<tr>"
        for(f = 0; f < szelesseg; f++){
            jatekter += `<td id=${i}-${f} class='hely' onclick='elhelyezes(this)'>${helyek[i][f]}</td>`
    }
        jatekter += `</tr>`;
    }
    jatekter += `</table>`;
    document.getElementById("jatekter").innerHTML = jatekter;
    //következő kártya minden irányának lerakhatóságának vizsgálata
    if(hanyhely() == 0){
            hanyiranybanemrakhatole = 0; 
            for(k = szelesseg*hosszusag; k > 0; k--){
                if(document.getElementById(k) != undefined){
                    var irany = document.getElementById(k).style.rotate;
                    for(l = 0; l < 4; l++){
                        forgatas(document.getElementById(k));
                        var hanyhelyrelehet = hanyhely();
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
                        if(hanyiranybanemrakhatole == 4){
                            pontokmentese(pont);
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
    var irany = "";
    for(i = 0; i < hosszusag; i ++){
        for(f = 0; f < szelesseg; f ++){
            for(k = (szelesseg*hosszusag); k > 0; k--){
                if(document.getElementById(k) != undefined){
                    var melyikkep = document.getElementById(k).getAttribute('kep');
                    irany = document.getElementById(k).style.rotate;
                    if(helyek[i][f].includes('semmi') && leRakhatoE(melyikkep,parseInt(i),parseInt(f),document.getElementById(k).getAttribute("fent"),document.getElementById(k).getAttribute("lent"),document.getElementById(k).getAttribute("bal"),document.getElementById(k).getAttribute("jobb"))){
                        hanyhelyrerakhatojelenleg++; 
                    }
                    break;
                }
            }
        }
    } 
   return hanyhelyrerakhatojelenleg;  
}

//darab lerakásának vizsglata
function leRakhatoE(melyikkep,i,f,jelenlegifel,jelenlegile,jelenlegibal,jelenlegijobb){
    var feletti = helyek[Math.max(i-1,0)][f];
    var alatti = helyek[Math.min(i+1,hosszusag-1)][f];
    var baloldali = helyek[i][Math.max(f-1,0)];
    var jobboldali = helyek[i][Math.min(f+1,szelesseg-1)];
    //kolostor, és mező
    if((melyikkep == 4 || melyikkep == 5) & ((feletti.includes('lent=mezo') || feletti.includes('semmi')) & (alatti.includes('fent=mezo') || alatti.includes('semmi')) & (baloldali.includes('jobb=mezo') || baloldali.includes('semmi')) & (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi'))) ){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//út3
    else if((melyikkep == 2) && ((feletti.includes('lent=ut') || feletti.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi')) && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//út1
    else if(melyikkep == 0 && ((jelenlegibal == "ut" && jelenlegile == "ut" &&  jelenlegifel == "mezo" && jelenlegijobb == "mezo" && (baloldali.includes('jobb=ut') ||baloldali.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi'))) || (jelenlegibal == "ut" && jelenlegifel == "ut" && jelenlegijobb == "mezo" && jelenlegile == "mezo" && (baloldali.includes("jobb=ut") || baloldali.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi')) && (alatti.includes("fent=mezo") || alatti.includes("semmi")) ) || (jelenlegibal == "mezo" && jelenlegile == "ut" &&  jelenlegifel == "ut" && jelenlegijobb == "mezo" && (baloldali.includes('jobb=mezo') ||baloldali.includes('semmi')) && (alatti.includes('fent=mezo') || alatti.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi'))) || (jelenlegibal == "mezo" && jelenlegijobb == "ut" && jelenlegifel == "mezo" && jelenlegile == "ut" && (baloldali.includes("jobb=mezo") || baloldali.includes('semmi')) && (jobboldali.includes("bal=ut") || jobboldali.includes("semmi")) && (feletti.includes("lent=mezo") || feletti.includes("semmi")) && (alatti.includes("fent=ut") || alatti.includes("semmi"))) || ((jelenlegibal == "mezo" && jelenlegile == "mezo" &&  jelenlegifel == "ut" && jelenlegijobb == "ut" && (baloldali.includes('jobb=mezo') ||baloldali.includes('semmi')) && (alatti.includes('fent=mezo') || alatti.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')))))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//út2
    else if(melyikkep == 1 && (((jelenlegibal == "ut" && jelenlegijobb == "ut" && jelenlegifel == "mezo" && jelenlegile == "mezo" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (alatti.includes('fent=mezo') || alatti.includes('semmi'))) || (jelenlegifel = "ut" && jelenlegile == "ut" && jelenlegibal == "mezo" && jelenlegile == "ut" && jelenlegijobb == "mezo" && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi')) && (baloldali.includes('jobb=mezo') || baloldali.includes('semmi')) && (jobboldali.includes('bal=mezo') ||  jobboldali.includes('semmi')))))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//út4
    else if(melyikkep == 3 && ((jelenlegibal == "mezo" && jelenlegifel == "ut" && jelenlegijobb == "ut" && jelenlegile == "ut" && (baloldali.includes('jobb=mezo') || baloldali.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi'))) || (jelenlegibal == "ut" && jelenlegifel == "mezo" && jelenlegijobb == "ut" && jelenlegile == "ut" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi'))) || (jelenlegibal == "ut" && jelenlegifel == "ut" && jelenlegijobb == "mezo" && jelenlegile == "ut" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi'))) || (jelenlegibal == "ut" && jelenlegifel == "ut" && jelenlegijobb == "ut" && jelenlegile == "mezo" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')) && (alatti.includes('fent=mezo') || alatti.includes('semmi'))))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//város1
    else if(melyikkep == 6 && ((jelenlegifel == "varos") && (feletti.includes('lent=varos') || feletti.includes('semmi')) && (jelenlegile == "varos" && (alatti.includes('fent=varos') || alatti.includes('semmi'))) && (jelenlegibal == "mezo" && (baloldali.includes('jobb=mezo') || baloldali.includes('semmi'))) && (jelenlegijobb == "mezo" && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi')))    ||     ((jelenlegifel == "mezo") && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (jelenlegile == "mezo" && (alatti.includes('fent=mezo') || alatti.includes('semmi'))) && (jelenlegibal == "varos") && (baloldali.includes('jobb=varos') || baloldali.includes('semmi'))) && (jelenlegijobb == "varos" && (jobboldali.includes('bal=varos') || jobboldali.includes('semmi'))))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//város2
    else if(melyikkep == 7 && ((jelenlegile == "ut" && jelenlegibal == "varos" && jelenlegifel == "varos" && jelenlegijobb == "varos" && (alatti.includes("fent=ut") || alatti.includes("semmi")) && (baloldali.includes('jobb=varos') || baloldali.includes("semmi")) && (feletti.includes("lent=varos") || feletti.includes('semmi')) && (jobboldali.includes("varos") || jobboldali.includes('semmi'))) || (jelenlegile == "varos" && jelenlegibal == "ut" && jelenlegifel == "varos" && jelenlegijobb == "varos" && (alatti.includes("fent=varos") || alatti.includes("semmi")) && (baloldali.includes('jobb=ut') || baloldali.includes("semmi")) && (feletti.includes("lent=varos") || feletti.includes('semmi')) && (jobboldali.includes("varos") || jobboldali.includes('semmi'))) || (jelenlegile == "varos" && jelenlegibal == "varos" && jelenlegifel == "ut" && jelenlegijobb == "varos" && (alatti.includes("fent=varos") || alatti.includes("semmi")) && (baloldali.includes('jobb=varos') || baloldali.includes("semmi")) && (feletti.includes("lent=ut") || feletti.includes('semmi')) && (jobboldali.includes("varos") || jobboldali.includes('semmi'))) || (jelenlegile == "varos" && jelenlegibal == "varos" && jelenlegifel == "varos" && jelenlegijobb == "ut" && (alatti.includes("fent=varos") || alatti.includes("semmi")) && (baloldali.includes('jobb=varos') || baloldali.includes("semmi")) && (feletti.includes("lent=varos") || feletti.includes('semmi')) && (jobboldali.includes("bal=ut") || jobboldali.includes('semmi'))))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//város3
    else if(melyikkep == 8 && ((jelenlegibal == "varos" && jelenlegifel == "varos" && jelenlegile == "mezo" && jelenlegijobb == "mezo" && (baloldali.includes("jobb=varos") || baloldali.includes('semmi')) && (feletti.includes('lent=varos') || feletti.includes('semmi')) && (jobboldali.includes("bal=mezo") || jobboldali.includes('semmi')) && (alatti.includes("fent=mezo") || alatti.includes("semmi"))) || (jelenlegibal == "mezo" && jelenlegifel == "varos" && jelenlegile == "mezo" && jelenlegijobb == "varos" && (baloldali.includes("jobb=mezo") || baloldali.includes('semmi')) && (feletti.includes('lent=varos') || feletti.includes('semmi')) && (jobboldali.includes("bal=varos") || jobboldali.includes('semmi')) && (alatti.includes("fent=mezo") || alatti.includes("semmi"))) || (jelenlegibal == "mezo" && jelenlegijobb == "varos" && jelenlegile == "varos" && jelenlegifel == "mezo" && (baloldali.includes('jobb=mezo') ||baloldali.includes('semmi')) && (jobboldali.includes('bal=varos') || jobboldali.includes('semmi')) && (alatti.includes('fent=varos') || alatti.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi'))) || (jelenlegibal == "varos" && jelenlegifel == "mezo" && jelenlegile == "varos" && jelenlegijobb == "mezo" && (baloldali.includes("jobb=varos") || baloldali.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (jobboldali.includes("bal=mezo") || jobboldali.includes('semmi')) && (alatti.includes("fent=varos") || alatti.includes("semmi"))))){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }//város 4
    else if(melyikkep == 9 && (((jelenlegibal == "varos" && jelenlegijobb == "varos" && jelenlegifel == "mezo" && jelenlegile == "mezo" && (baloldali.includes('jobb=varos') || baloldali.includes('semmi')) && (jobboldali.includes('bal=varos') || jobboldali.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (alatti.includes('fent=mezo') || alatti.includes('semmi'))) || (jelenlegifel = "varos" && jelenlegile == "varos" && jelenlegibal == "mezo" && jelenlegile == "varos" && jelenlegijobb == "mezo" && (feletti.includes('lent=varos') || feletti.includes('semmi')) && (alatti.includes('fent=varos') || alatti.includes('semmi')) && (baloldali.includes('jobb=mezo') || baloldali.includes('semmi')) && (jobboldali.includes('bal=mezo') ||  jobboldali.includes('semmi')))    )  )){
        if(lerakott == 0 || !(feletti.includes("semmi") && alatti.includes("semmi") && baloldali.includes("semmi") && jobboldali.includes("semmi"))){
            return true;
        }
    }
}
//darab elhelyezése
function elhelyezes(hely){
    var i = (hely.id).split('-')[0];
    var f = (hely.id).split('-')[1];
    if(helyek[i][f].includes("semmi")){
    for(k = szelesseg*hosszusag; k > 0; k--){
        if(document.getElementById(k) != undefined){
            var melyikkep = document.getElementById(k).getAttribute('kep');
            var irany = document.getElementById(k).style.rotate;
        if(leRakhatoE(melyikkep,parseInt(i),parseInt(f),document.getElementById(k).getAttribute("fent"),document.getElementById(k).getAttribute("lent"),document.getElementById(k).getAttribute("bal"),document.getElementById(k).getAttribute("jobb"))){
            helyek[i][f] = `<img style="rotate: ${irany}" src="${darabok[melyikkep].kep}" id=${i}-${f}-kep darab=${melyikkep} fent=${document.getElementById(k).getAttribute("fent")} lent=${document.getElementById(k).getAttribute("lent")} bal=${document.getElementById(k).getAttribute("bal")} jobb=${document.getElementById(k).getAttribute("jobb")}>`;
            document.getElementById(k).remove();
            pont += 5;
            document.getElementById("pontszam").innerText = pont;
            lerakott++;
        }
        break;
        }
    }
    }
    frissites();
}
//pontokmentése, helyi tárolóba
var pontok;
function pontokmentese(pont){
    //ha még nincs mentett pont
    if(localStorage.getItem("pontok") == "" || localStorage.getItem("pontok") == undefined){
        pontok = 
        `Játékosnév - Pontszám\n-------------------------\n`;
        pontok += `${jatekosnev} - ${pont}\n` ;
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
        localStorage.setItem("pontok", pontok);
    }
}
//pontokmentése a helyi tárolóból fájlba
function pontokmentesefajlba() {
    var szoveg;
    if(localStorage.getItem("pontok") == null){
        szoveg = "Nincsenek elért pontszámok ezen a számítógépen!"
    }
    else{
        szoveg = localStorage.getItem("pontok");
    }
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
    localStorage.setItem("pontok","");
    document.getElementById("pontokmenuadatok").innerHTML = localStorage.getItem("pontok");
}


//pontok megtekintése oldal megjelenítése mindenfelett, és eltüntetése
function pontokmegtekintese(){
    if(document.getElementById("pontokmenu").style.display == "block"){
        if(document.getElementById("vegeoldal").classList.contains("blur")){
            document.getElementById("vegeoldal").classList.remove("blur");
        }   
        if(!document.getElementById("vegeoldal").innerHTML.includes("vége")){
            document.getElementById("oldal").classList.remove("blur");
        }
        document.getElementById("pontokmenu").style.display = "none";
        document.getElementById("pontokmegtekintese").innerText = "Pontok megtekintése";
        document.getElementById("pontokmegtekintese").style.backgroundColor = "white";
    }
    else{
        if(document.getElementById("vegeoldal").style.display == "block"){
            document.getElementById("vegeoldal").classList.add("blur");
        }
        document.getElementById("oldal").classList.add("blur");
        document.getElementById("pontokmenu").style.display = "block";
        document.getElementById("pontokmegtekintese").innerText = "Vissza a játékba";
        document.getElementById("pontokmegtekintese").style.backgroundColor = "#2EFF2E";
    }
    document.getElementById("pontokmenuadatok").innerHTML = localStorage.getItem("pontok");
}

//infó oldal megjelenítése, és eltüntetése
function info(szam){
    if(szam == 1){
        document.getElementById("info").style.display = "block";
        document.getElementById("oldal").style.display = "none";
        document.getElementById("logo").style.height = "150px";
        document.getElementById("mindenfelett").style.display = "none";
        document.getElementById("menu").style.marginTop = "-60px";
    }
    else if(szam == 2){
        document.getElementById("info").style.display = "none";
        document.getElementById("oldal").style.display = "block";
        document.getElementById("mindenfelett").style.display = "block";
        if(document.getElementById("jatekter") != null){
            document.getElementById("menu").style.marginTop = "0";
            document.getElementById("logo").style.height = "80px";
            document.getElementById("logo").style.left = "47%";
        }
    }
}

function megtekintes(){
    document.getElementById("oldal").classList.remove("blur");
    document.getElementById("vegeoldal").innerHTML = "";
    document.getElementById("vegeoldal").style.display = "none";
    if(milyenvegelett == "1"){
    document.getElementById("menupontok").innerHTML += 
    `<li class="nav-item">
        <button class="nav-link" id="vegeoldalmegtekintese" onclick="vege(${milyenvegelett},this.remove())">Vége oldal megtekintése</button>
    </li>`
    }
}

function nemfolytathatja(){
    document.getElementById("megtekintesvagyvisszateres").remove();
}