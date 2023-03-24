

var darabok = [
    {tipus: "ut",csatlakozasok: {fent: false, lent: true, bal: true, jobb: false},kep: "./kepek/út1.jpg"},
    {tipus: "ut",csatlakozasok: {fent: false, lent: false, bal: true, jobb: true},kep: "./kepek/út2.jpg"},
    {tipus: "ut",csatlakozasok: {fent: true, lent: true, bal: true, jobb: true},kep: "./kepek/út3.jpg"},
    {tipus: "ut",csatlakozasok: {fent: true, lent: true, bal: false, jobb: true},kep: "./kepek/út4.jpg"},
    {tipus: "kolostor",csatlakozasok: {fent: true, lent: true, bal: true, jobb: true},kep: "./kepek/kolostor.jpg"},
    {tipus: "mező",csatlakozasok: {fent: true, lent: true, bal: true, jobb: true},kep: "./kepek/mező.jpg"},
    {tipus: "város1",csatlakozasok: {fent: true, lent: true, bal: false, jobb: false},kep: "./kepek/város1.jpg"},
    {tipus: "város2",csatlakozasok: {fent: true, lent: false, bal: true, jobb: true},kep: "./kepek/város2.jpg"},
    {tipus: "város3",csatlakozasok: {fent: true, lent: false, bal: true, jobb: false},kep: "./kepek/város3.jpg"},
    {tipus: "város4",csatlakozasok: {fent: false, lent: false, bal: true, jobb: true},kep: "./kepek/város4.jpg"}
]

var helyek = new Array(5)

for(i = 0; i < 5;i++){
    helyek[i] = new Array(8);
    for(f = 0; f < 8; f++){
        helyek[i][f] = "<img style='width: 100px; border: 1px solid black;' src='./kepek/white.png'>";
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
            document.getElementById("darabokhelye").innerHTML +=  "<img style='width: 100px; z-index: "+ index +";' id="+ index +" kep="+ random +" onclick='forgatas(this)' src="+darabok[random].kep+">";
            jatekter += "<td id="+ i +"-"+ f +" class='hely' onclick='elhelyezes(this)'>"+helyek[i][f]+"</td>"
        }
        jatekter += "</tr>";
    }
    jatekter += "</table>";
    document.getElementById("jatekter").innerHTML = jatekter;
    document.getElementById("kezdes").remove();
}


function forgatas(darab){
    if(darab.style.rotate == ""){
        darab.style.rotate = "90deg";
    }
    else if(darab.style.rotate == "90deg"){
        darab.style.rotate = "180deg";
    }
    else if(darab.style.rotate == "180deg"){
        darab.style.rotate = "270deg";
    }
    else if(darab.style.rotate == "270deg"){
        darab.style.rotate = "";
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


function elhelyezes(hely){
    var i = (hely.id).split('-')[0];
    var f = (hely.id).split('-')[1];
    for(k = 40; k > 0; k--){
        if(document.getElementById(k) != undefined){
            var melyikkep = document.getElementById(k).getAttribute('kep');
            var irany = document.getElementById(k).style.rotate;
            document.getElementById(k).remove();
            helyek[i][f] = "<img style='width: 100px; rotate: "+irany+";' src="+ darabok[melyikkep].kep +">";
            document.getElementById(hely.id).removeEventListener('click',elhelyezes(this))
            break;
        }
    }
    frissites();
}

document.getElementById("kezdes").addEventListener('click',kezdes);