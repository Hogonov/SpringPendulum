let mass = null,
    springRate = null,
    downwardDeviation = null,
    frequency = null,
    oscillationTime = null,
    numberVibrations = null,
    positionX = null

let canvas = null,
    ctx = null,
    pendulum = null,
    x0 = 0, y0 = 0
let flag = false,
    seconds = 0,
    timer = null,
    T = 0.0,
    milliseconds = 0,
    springCoil = 40
let color = "#000000"

window.onload = () => {
    mass = getById("mass")
    springRate = getById("springRate")
    downwardDeviation = getById("downwardDeviation")
    frequency = getById("frequency")
    oscillationTime = getById("oscillationTime")
    numberVibrations = getById("numberVibrations")
    positionX = getById("positionX")

    mass.value = 0.5
    springRate.value = 5
    downwardDeviation.value = 10
    frequency.textContent = `${Math.sqrt(springRate.value / mass.value)}`
    drawElements()
}


const getById = id => document.getElementById(id)

const changeHandler = (event) => {
    let elem = getById(event.id)
    switch (event.id) {
        case "mass":
            elem.value = event.value < 0.5 ? 0.5 : event.value
            elem.value = event.value > 1 ? 1 : event.value
            frequency.textContent = `${Math.sqrt(springRate.value / mass.value)}`
            break
        case "springRate":
            elem.value = event.value < 5 ? 5 : event.value
            elem.value = event.value > 9 ? 9 : event.value
            frequency.textContent = `${Math.sqrt(springRate.value / mass.value)}`
            break
        case "downwardDeviation":
            elem.value = event.value < 0 ? 0 : event.value
            elem.value = event.value > 20 ? 20 : event.value
            break
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawElements()
}


const loop = (button) => {
    flag = !flag
    if (flag) {
        mass.disabled = true
        springRate.disabled = true
        downwardDeviation.disabled = true
        button.textContent = "Stop"
        seconds = 0

        T = Math.PI / parseFloat(frequency.textContent)
        timer = setInterval( () => {
            swingPendulum()
        }, 100)
    } else {
        mass.disabled = false
        springRate.disabled = false
        downwardDeviation.disabled = false
        button.textContent = "Play"
    }
}


const swingPendulum = () => {
    milliseconds += 100
    if (milliseconds % 1000 === 0){
        seconds += 1
    }
    oscillationTime.textContent = seconds
    numberVibrations.textContent = seconds / T
    positionX.textContent =
        parseFloat(downwardDeviation.value) * Math.cos((milliseconds / 1000) * parseFloat(frequency.textContent))

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    pendulum.y = parseFloat(positionX.textContent) + y0
    pendulum.draw()
    spring(pendulum.x, 0, pendulum.x, pendulum.y, color, pendulum.y / springCoil)
}


const drawElements = () => {
    canvas = getById("pendulum")
    ctx = canvas.getContext("2d")
    x0 = canvas.width / 2
    y0 = canvas.height / 2 + parseInt(downwardDeviation.value)
    let radius = parseFloat(mass.value) * 20
    pendulum = new Pendulum(x0, y0, radius, ctx)
    pendulum.draw()
    spring(x0, 0, x0, y0, color, y0 / springCoil)
}

const spring = (x0, y0, x, y, color, step) => {
    ctx.strokeStyle = color
    ctx.moveTo(x0, y0)
    let subX = x + 5
    for (let i = y0; i < y; i += step) {
        if (subX < x) {
            subX = x + 5
        } else {
            subX = x - 5
        }
        ctx.lineTo(subX, i)
    }
    ctx.stroke()
}

class Pendulum {
    constructor(x, y, R, ctx) {
        this.x = x
        this.y = y
        this.R = R
        this.ctx = ctx
    }
    draw = () => {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.R, 0, Math.PI * 2, true)
        this.ctx.fill()
        this.ctx.closePath()
    }
}
