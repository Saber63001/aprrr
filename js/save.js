function loopAssign(x, y) {
  
    for (var key in y) {
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object") {
            loopAssign(x[key],y[key])
        }
        else {
            x[key] = y[key]
        }
    }
    return x
}

function save() {
  if (typeof localStorage.game == "undefined") localStorage.game = JSON.stringify(app.player)
  localStorage.game = JSON.stringify(app.player)
}

function load() {
  if (typeof localStorage.game != "undefined") app.player = loopAssign(app.player, JSON.parse(localStorage.game))
}

function importSave() {
  x = window.prompt("Please enter your save here")
  if (typeof localStorage.game != "undefined") app.player = loopAssign(app.player, JSON.parse(window.atob(x)))
  save()
}

function exportSave() {
   navigator.clipboard.writeText(window.btoa(JSON.stringify(app.player)))
   window.confirm("Your save code has been copied to your clipboard")
}

function reset() {
  if (confirm("Are you sure you want to reset?")) {
    app.player = {
      points: "0",
      x: 0,
      y: 0,
      timeSinceLastTick: Date.now(),
      buildings: [0,0,0],
      functions: [0,0,0],
      tab: 1,
      upgrades: [0,0,0,0],
      pps: "0",
      unlocks: []
    }
    save();
    load();
    initiate();
  }
}