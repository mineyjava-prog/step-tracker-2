function Jiryeotdari () {
    music.play(music.stringPlayable("F - A A - C5 C5 - ", 1000), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Happy)
}
function Goals (Goal_Number: number, Goal_Reached: boolean) {
    Is_Setting_Goal = true
    music.play(music.stringPlayable("F G - B - - - - ", 500), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Target)
    basic.showNumber(Goal)
}
input.onButtonPressed(Button.A, function () {
    if (!(Is_Setting_Goal)) {
        Goals(1, true)
    }
})
function Scrolls_Goals () {
    if (Is_Setting_Goal && input.buttonIsPressed(Button.B)) {
        Goal_Index += 1
        if (Goal_Index >= Goal_List.length) {
            Goal_Index = 0
        }
        Goal = Goal_List[Goal_Index]
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showNumber(Goal, 35)
basic.showIcon(IconNames.Target)
    }
}
function Stepping () {
    if (Force > Min_Force && Chill >= 250) {
        Steps += 1
        Chill = 0
        if (Steps == Goal) {
            Goals(Goal, true)
        }
    } else {
        Chill += 50
    }
}
function Physics_Stuff () {
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    Force = Math.sqrt(x ** 2 + y ** 2 + z ** 2)
}
function Reset () {
    Chill = 250
    Steps = 0
    Min_Force = 1750
    Force = 0
    Time = 0
    Goal_Index = 0
    Goal = 0
    Is_Setting_Goal = false
}
let Time = 0
let z = 0
let y = 0
let x = 0
let Steps = 0
let Chill = 0
let Min_Force = 0
let Force = 0
let Goal_Index = 0
let Is_Setting_Goal = false
let Goal_List: number[] = []
let Goal = 0
Goal_List = [
0,
500,
1000,
2000,
5000,
7500,
10000,
15000,
20000,
30000,
50000
]
Reset()
basic.forever(function () {
    if (!(Is_Setting_Goal)) {
        basic.showNumber(Steps)
    }
})
basic.forever(function () {
    Scrolls_Goals()
    if (Is_Setting_Goal && input.buttonIsPressed(Button.A)) {
        music.play(music.stringPlayable("C5 C5 - A A - E - ", 120), music.PlaybackMode.InBackground)
        Is_Setting_Goal = false
    }
})
control.inBackground(function () {
    while (true) {
        basic.pause(50)
        Physics_Stuff()
        Time = input.runningTime() / 1000
        Stepping()
    }
})
