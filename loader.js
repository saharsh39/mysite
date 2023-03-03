let scripts = ["Bounce", "Walkers", "Twist", "Cubes", "Wavemaker", "Penrose Tiles", "Game of Life", "Physics", "Pong","maze"]
let notes = [
    "", 
    "", 
    "", 
    "", 
    "",
    "adapted from P5.JS", 
    "", 
    "mouse left: create\nmouse right: destroy\nspace: pause/play\nbackspace: clear\n", 
    "mouse left: drag\nmouse right: create\nspace: enable thing",
    "space: pause/play\nA: autopilot\n"
]
let disableOnMobile = ["Bounce", "Physics", "Game of Life", "Pong"]

// if device is mobile, disable some scripts
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    for(let i=0; i<disableOnMobile.length; i++){
        let index = scripts.indexOf(disableOnMobile[i])
        if(index > -1){
            scripts.splice(index, 1)
            notes.splice(index, 1)
        }
    }
}

for(let script of scripts){
    let a = document.createElement("a")
    a.innerText = script
    a.addEventListener("click", function(){
        gotoScript(scripts.indexOf(script))
    })
    document.getElementById("sketches").appendChild(a)
    document.getElementById("sketches").appendChild(document.createElement("br"))
}

let nextbtn = document.getElementById("next")
let prevbtn = document.getElementById("prev")
let sktname = document.getElementById("sketchName")

const params = new URLSearchParams(window.location.search);
if(params.has("sketch")){
    loadScript(params.get("sketch"))
} else{
    loadScript(Math.floor(Math.random() * scripts.length))
}

function loadScript(scriptIndex){
    let script = scripts[scriptIndex]
    document.getElementById("sketchScript").src = "sketches/" + script + ".js"
    document.getElementById("sourceLink").href = "D:\animation movies\FAST AND FURIOUS ALL PARTS\New folder\benman604.github.io\sketches" + script + ".js"
    document.getElementById("author").innerText = notes[scriptIndex]
    
    sktname.innerText = script
}

function gotoScript(scriptIndex){
    window.location.href = "?sketch=" + scriptIndex
}

nextbtn.addEventListener("click", function(){
    let scriptIndex = scripts.indexOf(sktname.innerText)
    if(scriptIndex < scripts.length - 1){
        gotoScript(scriptIndex + 1)
    } else{
        gotoScript(0)
    }
})

prevbtn.addEventListener("click", function(){
    let scriptIndex = scripts.indexOf(sktname.innerText)
    if(scriptIndex > 0){
        gotoScript(scriptIndex - 1)
    } else{
        gotoScript(scripts.length - 1)
    }
})

// prevent context menu when right clicking the canvas
document.addEventListener("contextmenu", function(e){
    if(e.target.className === "container"){
        e.preventDefault();
    }
})

// prevent text select when dragging mouse on canvas
window.addEventListener('selectstart', function(e){
    if(e.target.className === "container"){
        e.preventDefault();
    }
});