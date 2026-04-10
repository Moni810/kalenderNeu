let heute = new Date();
let aktuellerTag = heute.getDay();
let aktuellerMonat = heute.getMonth();
let aktuellesJahr = heute.getFullYear();
let startTag = new Date(aktuellesJahr, aktuellerMonat, 1).getDay();
let letzterTag = new Date(aktuellesJahr, aktuellerMonat, 0).getDay();
console.log(startTag);

