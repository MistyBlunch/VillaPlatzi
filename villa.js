/**********************************************/
/* VARIABLES
/**********************************************/

/* Canvas */
let vp = document.getElementById("villaplatzi");
let papel = vp.getContext("2d");

/* Animals and Wallpaper objects*/
let fondo = {
  url: "imgs/tile.png",
  cargaOK: false
};

let cow = {
  url: "imgs/vaca.png",
  cargaOK: false
};

let pig = {
  url: "imgs/cerdo.png",
  cargaOK: false
};

let chicken = {
  url: "imgs/pollo.webp",
  cargaOK: false,
  isVisible: true
};

/* Animal Cantidad */
let cantCow = aleatorio(1, 3);
let cantPig = aleatorio(1, 10);
let cantChicken = aleatorio(1, 10);

/* Arrows in keyboard */
let teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

/* Coordenadas de los animales */
let coorCow = [];
let coorChicken = [];

/* mov of lines and var of position of pig */
let mov = 10;
let pigX = 210;
let pigY = 210;

/**********************************************/
/* ADDING PROPS and EVENTS
/**********************************************/

/* Adding props to my objects */
/* fondo */
fondo.img = new Image();
fondo.img.src = fondo.url;
fondo.img.addEventListener("load", chargeWallpaper);

/* vaca */
cow.img = new Image();
cow.img.src = cow.url;
cow.img.addEventListener("load", chargeCow);

/* cerdo */
pig.img = new Image();
pig.img.src = pig.url;
pig.img.addEventListener("load", chargePig);

/* pollo */
chicken.img = new Image();
chicken.img.src = chicken.url;
chicken.img.addEventListener("load", chargeChicken);

/* Events Listeners */
document.addEventListener("keydown", movePig);

/**********************************************/
/* FUNCTIONS
/**********************************************/

/* Redraw all that are visible */
function redraw() {
  papel.clearRect(0, 0, vp.width, vp.height);
  papel.drawImage(fondo.img, 0, 0);
  papel.drawImage(pig.img, pigX, pigY);

  for (let i of coorCow) {
    papel.drawImage(cow.img, i[0], i[1]);
  }

  for (let i of coorChicken) {
    papel.drawImage(chicken.img, i[0], i[1]);
  }
}

/* Move the pig */
function movePig(e) {
  switch (e.keyCode) {
    case teclas.UP:
      pigY -= mov;
      redraw();
      break;
    case teclas.DOWN:
      pigY += mov;
      redraw();
      break;
    case teclas.LEFT:
      pigX -= mov;
      redraw();
      break;
    case teclas.RIGHT:
      pigX += mov;
      redraw();
      break;
    default:
      break;
  }
}

/* Draw my Object Components */
function chargeWallpaper() {
  fondo.cargaOK = true;
  draw();
}
function chargePig() {
  pig.cargaOK = true;
  draw();
}
function chargeCow() {
  cow.cargaOK = true;
  draw();
}
function chargeChicken() {
  chicken.cargaOK = true;
  draw();
}

/* Funcion dibujar */
function draw() {
  if (fondo.cargaOK) {
    papel.drawImage(fondo.img, 0, 0);
  }
  if (cow.cargaOK) {
    for (let c = 0; c < cantCow; c++) {
      let x = aleatorio(0, 5);
      let y = aleatorio(0, 5);
      x = x * 80;
      y = y * 80;
      coorCow.push([x, y]);
      papel.drawImage(cow.img, x, y);
    }
  }
  if (pig.cargaOK) {
    papel.drawImage(pig.img, pigX, pigY);
  }
  if (chicken.cargaOK) {
    for (let ch = 0; ch < cantChicken; ch++) {
      let x = aleatorio(0, 5);
      let y = aleatorio(0, 5);
      x = x * 80;
      y = y * 80;
      coorChicken.push([x, y]);
      papel.drawImage(chicken.img, x, y);
    }
  }
  fondo.cargaOK = false;
  pig.cargaOK = false;
  cow.cargaOK = false;
  chicken.cargaOK = false;
}

/* El navegador monta esta func en la memoria RAM */
/* Luego lee todo desde la primera línea */
function aleatorio(min, maxi) {
  let result;
  result = Math.floor(Math.random() * (maxi - min + 1)) + min;
  return result;
}
