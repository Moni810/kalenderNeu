// function istTagGleich(tagA, tagB) {
//     if (tagA.getDate() == tagB.getDate() && tagA.getMonth() == tagB.getMonth() && tagA.getFullYear() == tagB.getFullYear())  {
//         return true;
//     }
//     return false;
// }

// function istTagGleich(tagA, tagB) {
//     if (tagA.getDate() == tagB.getDate()) {
//         if (tagA.getMonth() == tagB.getMonth()) {
//             if (tagA.getFullYear() == tagB.getFullYear())  {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

function istTagGleich(tagA, tagB) {
    if (tagA.getDate() != tagB.getDate()) return false;
    if (tagA.getMonth() != tagB.getMonth()) return false;
    if (tagA.getFullYear() != tagB.getFullYear()) return false;
    return true;
}

function clickDatum(tag) {
    selectedTag = tag;
    displayedMonth = tag;
    drawPage();
}

function drawPage() {
    drawErsetzungen();
    drawCalendar();
}

function switchMonth(howMany) {
    displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + howMany, 1);
    drawPage();
}

function drawErsetzungen() {
    // Ersetzungen im Text
    let aktuellerTag = selectedTag.getDate();
    let aktuellerMonat = selectedTag.getMonth();
    let aktuellesJahr = selectedTag.getFullYear();
    const alleMonate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    let monatString = alleMonate[displayedMonth.getMonth()];
    let datumString = `${aktuellerTag}.${aktuellerMonat + 1}.${aktuellesJahr}`;
    //let datumString2 = aktuellerTag + '.' + aktuellerMonat + '.' + aktuellesJahr;

    // Überschrift aktualisieren
    document.getElementById('überschrift').innerText = datumString;
    document.getElementById("überschrift2").innerText = monatString;
}

function drawCalendar() {
    let aktuellerTag = displayedMonth.getDate();
    let aktuellerMonat = displayedMonth.getMonth();
    let aktuellesJahr = displayedMonth.getFullYear();
    let startWochentag = new Date(aktuellesJahr, aktuellerMonat, 1).getDay();
    let letzterWochentag = new Date(aktuellesJahr, aktuellerMonat + 1, 0).getDay();
    console.log(startWochentag);
    console.log(letzterWochentag);

    // Wenn startWochentag == x, dann y Tage abziehen
    // 1 -> 0
    // 2 -> 1
    // 3 -> 2
    // 4 -> 3
    // 5 -> 4
    // 6 -> 5
    // 0 -> 6

    // let tageVorherBeginnen = startWochentag - 1;
    // if (startWochentag == 0) {
    //     tageVorherBeginnen = 6;
    // }

    let tageVorherBeginnen = startWochentag == 0 ? 6 : startWochentag - 1;
    console.log(tageVorherBeginnen);
    let startTag = new Date(aktuellesJahr, aktuellerMonat, 1 - tageVorherBeginnen);
    console.log(startTag);

    // Wenn letzerWochentag == x, dann y Tage dazu
    // 1 -> 6
    // 2 -> 5
    // 3 -> 4
    // 4 -> 3
    // 5 -> 2
    // 6 -> 1
    // 0 -> 0

    let tageNachEnde = letzterWochentag == 0 ? 0 : 7 - letzterWochentag;
    // let tageNachEnde = (7 - letzterWochentag) % 7;
    console.log(tageNachEnde);


    let endTag = new Date(aktuellesJahr, aktuellerMonat + 1, tageNachEnde);
    console.log(endTag);

    // let monatString;
    // if (aktuellerMonat == 1) {
    //     monatString = 'Januar';
    // } else if (aktuellerMonat == 2) {
    //     monatString = 'Februar';
    // } else if (aktuellerMonat == 3) {
    //     monatString = 'Närz';
    // } else if (aktuellerMonat == 4) {
    //     monatString = 'April';
    // } else if (aktuellerMonat == 5) {
    //     monatString = 'Mai';
    // } else if (aktuellerMonat == 6) {
    //     monatString = 'Juni';
    // } else if (aktuellerMonat == 7) {
    //     monatString = 'Juli';
    // } else if (aktuellerMonat == 8) {
    //     monatString = 'August';
    // } else if (aktuellerMonat == 9) {
    //     monatString = 'September';
    // } else if (aktuellerMonat == 10) {
    //     monatString = 'Oktober';
    // } else if (aktuellerMonat == 11) {
    //     monatString = 'November';
    // } else {
    //     monatString = 'Dezember';
    // }

    // Kalendertage bauen
    const tbody = document.getElementById("tage");
    tbody.innerHTML = '';
    let wochenZeile;
    for (let t = startTag; t <= endTag; t = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)) {
        // console.log(t);
        if (t.getDay() == 1) {
            wochenZeile = document.createElement('tr');
        }
        let tagZelle = document.createElement('td');
        tagZelle.innerText = t.getDate();
        // Sonderregeln
        if (istTagGleich(t, heute)) {
            tagZelle.classList.add('heute');
        }
        if (istTagGleich(t, selectedTag)) {
            tagZelle.classList.add('selected');
        }
        if (t.getDay() == 6) {
            tagZelle.classList.add('sa');
        }
        if (t.getDay() == 0) {
            tagZelle.classList.add('so');
        }
        // Click-Handler hinzufügen
        tagZelle.onclick = () => {
            clickDatum(t);
        };
        wochenZeile.appendChild(tagZelle);
        if (t.getDay() == 0) {
            tbody.appendChild(wochenZeile);
        }
    }
    // let tbodyHtml = '';
    // for (var t = startTag; t <= endTag; t = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)) {
    //     if (t.getDay() == 1) {
    //         tbodyHtml = tbodyHtml + '<tr>';
    //     }
    //     tbodyHtml = tbodyHtml + `<td>${t.getDate()}</td>`;
    //     if (t.getDay() == 0) {
    //         tbodyHtml = tbodyHtml + '</tr>';
    //     }
    // }
    // tbody.innerHTML = tbodyHtml;    
}

let heute = new Date();
let selectedTag = heute;
let displayedMonth = heute;
drawPage();