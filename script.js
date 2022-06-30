const libtx = document.querySelector("#library");
const handtx = document.querySelector("#hand");
const btn = document.querySelector("button");
const imgs = document.querySelectorAll("img");

const draw = () =>{
    const l = libtx.value || libtx.placeholder;
    const parsed = parse(l);
    const hand = shuffle(parsed).slice(0, 7).sort((a, b) => parsed.indexOf(a) > parsed.indexOf(b));
    handtx.value = hand.map(c => c.replace(/\w{3}\/\d+$/, "")).join("\n") + "\n\n" + (Math.random() > .5 ? "Play" : "Draw");
    localStorage.setItem("default", l);

    for(let i = 0; i < 7; ++i){
        imgs[i].src = "https://mtg-jp.com//img_sys/cardImages/" + hand[i].match(/\w{3}\/\d+$/) + "/cardimage.png"
    }
};

const parse = tx => tx.split("\n")
                    .map(l => l.split(" "))
                    .map(l => Array(+l[0]).fill(l.slice(1).join(" ")))
                    .flat();
                    
const shuffle = arr => {
    const deck = [...arr];
    for(let i = deck.length - 1; i > 0; --i){
        const j = Math.random() * (i + 1) | 0;
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

btn.addEventListener("click", draw);
document.addEventListener("keydown", e => {if(e.target == document.body)draw();});
document.body.onload = () => libtx.value = localStorage.getItem("default");