

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

var helyek = new Array(5)
for(i = 0; i < 5;i++){
    helyek[i] = new Array(8);
    for(f = 0; f < 8; f++){
        helyek[i][f] = "<img style='width: 100px; border: 1px solid black;' darab='semmi' src='./kepek/semmi.png'>";
    }
}

function kezdes(){
    var jatekter = "";
    var index = 0;
    jatekter += "<table>";
    for(i = 0; i < 5; i++){
        jatekter += "<tr>"
        for(f = 0; f < 8; f++){
            index++;
            var random = Math.round(Math.random()*9);
            document.getElementById("darabokhelye").innerHTML +=  "<img style='width: 100px; z-index: "+ index +";' forgatas='' id="+ index +" kep="+ random +" fent="+ darabok[random].csatlakozasok.fent +" lent="+ darabok[random].csatlakozasok.lent +" jobb="+ darabok[random].csatlakozasok.jobb +" bal="+ darabok[random].csatlakozasok.bal +" onclick='forgatas(this)' src="+darabok[random].kep+">";
            jatekter += "<td id="+ i +"-"+ f +" class='hely' onclick='elhelyezes(this)'>"+helyek[i][f]+"</td>"
        }
        jatekter += "</tr>";
    }
    jatekter += "</table>";
    document.getElementById("jatekter").innerHTML = jatekter;
    document.getElementById("kezdes").remove();
}


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
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","ut");
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
            darab.setAttribute("lent","mezo");
            darab.setAttribute("bal","mezo");
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

function frissites(){
    var jatekter = "";
    jatekter += "<table>";
    for(i = 0; i < 5; i++){
        jatekter += "<tr>"
        for(f = 0; f < 8; f++){
            jatekter += "<td id="+ i +"-"+ f +" class='hely' onclick='elhelyezes(this)'>"+helyek[i][f]+"</td>"
        }
        jatekter += "</tr>";
    }
    jatekter += "</table>";
    document.getElementById("jatekter").innerHTML = jatekter;
}



function leRakhatoE(melyikkep,i,f,jelenlegifel,jelenlegile,jelenlegibal,jelenlegijobb){
    var feletti = helyek[Math.max(i-1,0)][f];
    var alatti = helyek[Math.min(i+1,4)][f];
    var baloldali = helyek[i][Math.max(f-1,0)];
    var jobboldali = helyek[i][Math.min(f+1,7)];
    console.log(feletti)
    //kolostor, és mező
    if((melyikkep == 4 || melyikkep == 5) & ((feletti.includes('lent=mezo') || feletti.includes('semmi')) & (alatti.includes('fent=mezo') || alatti.includes('semmi')) & (baloldali.includes('jobb=mezo') || baloldali.includes('semmi')) & (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi'))) ){
        return true;
    }//út3
    else if((melyikkep == 2) && ((feletti.includes('lent=ut') || feletti.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi')) && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')))){
        return true;
    }//út1
    else if(melyikkep == 0 && ((jelenlegifel == "ut" && (feletti.includes('lent=ut') || feletti.includes('semmi')) && jelenlegibal == "ut" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) || (jelenlegile == "ut" && (alatti.includes('fent=ut') || alatti.includes('semmi')) && jelenlegibal == "ut" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) ||(jelenlegifel == "ut" && (feletti.includes('lent=ut') || feletti.includes('semmi')) && jelenlegijobb == "ut" && (jobboldali.includes('bal=ut') || jobb.includes('semmi')))))))
    {
        return true;
    }//út2
    else if(melyikkep == 3 && (((jelenlegibal == "ut" && jelenlegijobb == "ut" && jelenlegifel == "mezo" && jelenlegile == "mezo" && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi')) && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (alatti.includes('fent=mezo') || alatti.includes('semmi')))     ||     (jelenlegibal == "mezo" && jelenlegijobb == "mezo" && jelenlegifel == "ut" && jelenlegile == "ut" && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi')) && (baloldali.includes('jobb=mezo') || baloldali.includes('semmi')) && (feletti.includes('lent=ut') || feletti.includes('semmi')) && (alatti.includes('fent=ut') || alatti.includes('semmi')))     ))){
        return true;
    }//út4
    else if(melyikkep == 3 && (((jelenlegifel == "ut" && ((feletti.includes('lent=ut') || feletti.includes('semmi'))) || (jelenlegifel == "mezo" && (feletti.includes('lent=ut') || feletti.includes('semmi'))))) && (jelenlegijobb == "ut" && (jobboldali.includes('bal=ut') || jobboldali.includes('semmi'))) || (jelenlegijobb == "mezo" && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi')))) && ((jelenlegile == "ut" && (alatti.includes('fent=ut') || alatti.includes('semmi'))) || (jelenlegile == "mezo" &&(alatti.includes('fent=mezo') || alatti.includes('semmi')))) || (jelenlegibal == "ut" && (baloldali.includes('jobb=ut') || baloldali.includes('semmi')) && jelenlegifel == "ut" && jelenlegile == "ut" && jelenlegijobb == "mezo" && (jelenlegijobb.includes('bal=mezo') || jelenlegijobb.includes('semmi')) && (jelenlegibal.includes('jobb=ut') || jelenlegibal.includes('semmi')) && (jelenlegifel.includes('lent=ut') || jelenlegifel.includes('semmi')) && (jelenlegile.includes('fent="ut') || jelenlegile.includes('semmi')) )){
        return true;
    }//város1
    else if(melyikkep == 6 && ((jelenlegifel == "varos") && (feletti.includes('lent=varos') || feletti.includes('semmi')) && (jelenlegile == "varos" && (alatti.includes('fent=varos') || alatti.includes('semmi'))) && (jelenlegibal == "mezo" && (baloldali.includes('jobb=mezo') || baloldali.includes('semmi'))) && (jelenlegijobb == "mezo" && (jobboldali.includes('bal=mezo') || jobboldali.includes('semmi')))    ||     ((jelenlegifel == "mezo") && (feletti.includes('lent=mezo') || feletti.includes('semmi')) && (jelenlegile == "mezo" && (alatti.includes('fent=mezo') || alatti.includes('semmi'))) && (jelenlegibal == "varos" && (baloldali.includes('jobb=varos') || baloldali.includes('semmi'))) && (jelenlegijobb == "varos" && (jobboldali.includes('bal=varos') || jobboldali.includes('semmi')))))){
        return true;
    }
    else{
        return false;
    }
}


function elhelyezes(hely){
    var i = (hely.id).split('-')[0];
    var f = (hely.id).split('-')[1];
    if(helyek[i][f].includes("semmi")){
    for(k = 40; k > 0; k--){
        if(document.getElementById(k) != undefined){
            var melyikkep = document.getElementById(k).getAttribute('kep');
            var irany = document.getElementById(k).style.rotate;
        if(leRakhatoE(melyikkep,parseInt(i),parseInt(f),document.getElementById(k).getAttribute("fent"),document.getElementById(k).getAttribute("lent"),document.getElementById(k).getAttribute("bal"),document.getElementById(k).getAttribute("jobb"))){
            helyek[i][f] = "<img style='width: 100px; rotate: "+irany+";' src="+ darabok[melyikkep].kep +" id="+i +"-"+ f + "-kep" +" darab="+ melyikkep +" fent="+ document.getElementById(k).getAttribute("fent") +" lent="+ document.getElementById(k).getAttribute("lent") +" bal="+ document.getElementById(k).getAttribute("bal") +" jobb="+ document.getElementById(k).getAttribute("jobb") +">";
            document.getElementById(k).remove();
        }
        break;
        }
    }
    frissites();
}
}

document.getElementById("kezdes").addEventListener('click',kezdes);