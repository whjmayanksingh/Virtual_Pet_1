var dog, dogIMG,happydogIMG, happyDog, database;
var foodS, foodStock;

function preload()
{
  dogIMG = loadImage("images/Dog.png")
  happydogIMG = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database()
  
  dog=createSprite(400,350);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  var title = createElement('h3');
  title.html("Press 'UP ARROW' to feed your pet some milk");
  title.position(550,50);

  foodStock = database.ref('food');
  foodStock.on("value",readStock)
  
  
}


function draw() {
  
  background(0,133,160);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(happydogIMG)
    
  }
 

  drawSprites();
  //add styles here
  
  textSize(20);
  fill("red")
  text("Food Remaining"+foodS,200,200) 


}

function readStock (data){
   foodS = data.val();
}

function writeStock (x){
  if (x<=0) {
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}

