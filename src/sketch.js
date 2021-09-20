const TOTAL = 1000
const birds = []

let pipes = []
let counter = 0
let slider

function keyPressed() {
  if (key === 'S') {
    const bird = birds[0]
    saveJSON(bird.brain, 'bird.json')
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight - 200)
  // createCanvas(1280, 640)
  tf.setBackend('cpu')
  slider = createSlider(1, 10, 1)
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird()
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 === 0) {
      pipes.push(new Pipe())
    }
    counter += 1

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update()

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0])
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1)
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0])
      }
    }

    birds.forEach(bird => {
      bird.think(pipes)
      bird.update()
    })

    if (birds.length === 0) {
      counter = 0
      nextGeneration()
      pipes = []
    }
  }

  background(48)
  birds.forEach(bird => {
    bird.show()
  })
  pipes.forEach(pipe => {
    pipe.show()
  })
}
