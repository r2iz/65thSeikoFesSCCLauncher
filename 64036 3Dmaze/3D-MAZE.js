let cam;
let canvas;
let div;
let setumei1;
let setumei2;
let setumei3;
let setumei4;
let setumei5;
let setumei6;
let uddiv;
let timer;
let canmove = true;
let mark =[];
let lkey = [0];
let muki = [0];
let mazeud = [0,0];
let Mazesize = 11;//奇数限定
let px = 1;
let py = 1;
let pz = 1;
let itimatu = 0;
let started = false;
let startedtime;
let stoped;
let ikidomari;
let nowtime = 0;
function setup() {
  canvas = createCanvas(windowWidth-300, windowHeight, WEBGL);
  canvas.position(120,0)
  background(0);
  cam = createCamera();
  cam.perspective(PI/2.5, width/height, cam.eyeZ/10.0, cam.eyeZ*10.0)
  div = createDiv();
  div.position(0, 0);
  div.style('color', 'blue');
  div.style('font-size', '35px');
  uddiv = createDiv();//ud = up down
  uddiv.position(0, 60);
  uddiv.style('color', 'red');
  uddiv.style('font-size', '20px');
  timer = createDiv();
  timer.position(0,140);
  timer.style('color', 'green');
  timer.style('font-size', '15px');
  let button1 = createImg('buttons/stright.png');
  let button2 = createImg('buttons/usiro.png');
  let button3 = createImg('buttons/right.png');
  let button4 = createImg('buttons/left.png');
  let button5 = createImg('buttons/up.png');
  let button6 = createImg('buttons/down.png');
  let button7 = createImg('buttons/mark.png');
  let button8 = createButton('やり直す');
  button1.size(60,145);
  button1.position(30,windowHeight*0.53);
  button2.size(60,145);
  button2.position(30,windowHeight*0.75);
  button3.size(70,70);
  button3.position(windowWidth-80,windowHeight-170);
  button4.size(70,70);
  button4.position(windowWidth-175,windowHeight-170);
  button5.size(70,70);
  button6.size(70,70);
  button5.position(windowWidth-127.5,windowHeight-245);
  button6.position(windowWidth-127.5,windowHeight-95);
  button7.size(100,100);
  button7.position(windowWidth-170,windowHeight-400);
  button8.size(100,20);
  button8.position(windowWidth-170,windowHeight*0.1);
  button1.mousePressed(straight);
  button2.mousePressed(usiro);
  button3.mousePressed(right);
  button4.mousePressed(left);
  button5.mousePressed(up);
  button6.mousePressed(down);
  button7.mousePressed(marking);
  button8.mousePressed(restart);
  setumei1 = createDiv();
  setumei2 = createDiv();
  setumei3 = createDiv();
  setumei1.position(90,windowHeight*0.62)
  setumei1.style('font-size', '30px');
  setumei2.position(windowWidth-200,windowHeight-230);
  setumei2.style('font-size', '30px');
  setumei3.position(windowWidth-310,windowHeight-380);
  setumei3.style('font-size', '20px');
  setumei4 = createDiv();
  setumei5 = createDiv();
  setumei6 = createDiv();
  setumei4.position(windowWidth*0.5-170,windowHeight*0.06);
  setumei4.style('font-size', '80px');
  setumei5.position(150,windowHeight*0.3);
  setumei5.style('font-size', '20px');
  setumei6.position(windowWidth*0.5-300,windowHeight*0.8);
  setumei6.style('font-size', '40px');
  stoped = createDiv();
  stoped.style('color','red');
  stoped.position(0,165);
  stoped.style('font-size','23px')
}
const hori = () =>{
	dire = [];
	if(Hollx+2 <= Mazesize-1){
		if(Maze[Hollx+2][Holly][Hollz] != 1)
			dire.push(1);
	}
	if(Hollx-2 >= 0){
		if(Maze[Hollx-2][Holly][Hollz] != 1)
			dire.push(2);
	}
	if(Holly+2 <= Mazesize-1){
		if(Maze[Hollx][Holly+2][Hollz] != 1)
			dire.push(3);
	}
	if(Holly-2 >= 0){
		if(Maze[Hollx][Holly-2][Hollz] != 1)
			dire.push(4);
	}
	if(Hollz+2 <= Mazesize-1){
		if(Maze[Hollx][Holly][Hollz+2] != 1)
			dire.push(5);
	}
	if(Hollz-2 >= 0){
		if(Maze[Hollx][Holly][Hollz-2] != 1)
			dire.push(6);
	}
	if(dire.length === 0){
		cantholl.push([Hollx,Holly,Hollz]);
		//console.log('掘る場所変更する');
		return hori_set();
	}
	let hori_dire = Math.floor(Math.random()*dire.length);
	//console.log(dire);
	//console.log(dire[hori_dire]);
	switch(dire[hori_dire]){
		case 1:
			Maze[Hollx+1][Holly][Hollz] = 1;
			Maze[Hollx+2][Holly][Hollz] = 1;
			Hollx += 2;
			break;
		case 2:
			Maze[Hollx-1][Holly][Hollz] = 1;
			Maze[Hollx-2][Holly][Hollz] = 1;
			Hollx -= 2;
			break;
		case 3:
			Maze[Hollx][Holly+1][Hollz] = 1;
			Maze[Hollx][Holly+2][Hollz] = 1;
			Holly += 2;
			break;
		case 4:
			Maze[Hollx][Holly-1][Hollz] = 1;
			Maze[Hollx][Holly-2][Hollz] = 1;
			Holly -= 2;
			break;
		case 5:
			Maze[Hollx][Holly][Hollz+1] = 1;
			Maze[Hollx][Holly][Hollz+2] = 1;
			Hollz += 2;
			break;
		case 6:
			Maze[Hollx][Holly][Hollz-1] = 1;
			Maze[Hollx][Holly][Hollz-2] = 1;
			Hollz -= 2;
			break;
		default:
			console.log("何にも当てはまってませぬ")
			break;
	}
	return hori();
}
const hori_set = () =>{
	var set = [];
	var zantei = [];
	let setnum = 0;
	var safe = true;
	for(let a = 0;a < (Mazesize-1)/2; a += 1){
		for(let b= 0;b < (Mazesize-1)/2; b += 1){
			for(let c = 0;c < (Mazesize-1)/2; c += 1){
				if(Maze[a*2+1][b*2+1][c*2+1] === 1){
					zantei[0] = [a*2+1,b*2+1,c*2+1];
					safe = true;
					for(let d = 0;d < cantholl.length; d +=1){
						if(zantei[0].toString() == cantholl[d].toString()){
							safe = false;
						}
					}
					if(safe === true){
					set[setnum] = [a*2+1,b*2+1,c*2+1]
					setnum += 1;
					}
				}
			}
		}
	}
	//console.log(set);
	if(set.length === 0){
		return 1;
	}
	f = Math.floor(Math.random()*set.length);
	//console.log(set);
	Hollx = set[f][0];
	Holly = set[f][1];
	Hollz = set[f][2];
	//console.log('掘る場所'+String(Hollx)+','+String(Holly)+','+String(Hollz)+'に変更した');
	hori();
}
function straight(){
	if(started = true){
	canmove = true;
	switch(muki[muki.length-1]){
		case 0:
			if(Maze[px][py][pz+1] === 0){
				canmove = false;
			  //console.log('0');
			} else{
				pz += 1;
			}
			break;
		case 1:
			if(Maze[px+1][py][pz] === 0){
				canmove = false;
				//console.log('1');
			} else{
				px += 1;
			}
			break;
		case 2:
			if(Maze[px][py][pz-1] === 0){
				canmove = false;
				//console.log('2');
			} else{
				pz -= 1;
			}
			break;
		case 3:
			if(Maze[px-1][py][pz] === 0){
				canmove = false;
				//console.log('3');
			} else{
				px -= 1;
			}
			break;
	}
	if(canmove){
		cam.move(0,0,-250);
	}
	lkey.push(1);
}
}
function usiro(){
	if(started = true){
	canmove = true;
	switch(muki[muki.length-1]){
		case 0:
			if(Maze[px][py][pz-1] === 0){
				canmove = false;
			  //console.log('0');
			} else{
				pz -= 1;
			}
			break;
		case 1:
			if(Maze[px-1][py][pz] === 0){
				canmove = false;
				//console.log('1');
			} else{
				px -= 1;
			}
			break;
		case 2:
			if(Maze[px][py][pz+1] === 0){
				canmove = false;
				///console.log('2');
			} else{
				pz += 1;
			}
			break;
		case 3:
			if(Maze[px+1][py][pz] === 0){
				canmove = false;
				//console.log('3');
			} else{
				px += 1;
			}
			break;
	}
	if(canmove){
		cam.move(0,0,250);
	}
	lkey.push(2);
}
}
function right(){
	if(started = true){
	cam.pan(PI/-2);
	muki.push((muki[muki.length-1]+3)%4);
	}
}
function left(){
	if(started = true){
	cam.pan(PI/2);
	muki.push((muki[muki.length-1]+1)%4);
	}
}
function up(){
	if(started = true){
	if(Maze[px][py+1][pz] === 0){
		//console.log('4');
	} else{
		py += 1;
		cam.move(0,-250,0);
	}
}
}
function down(){
	if(started = true){
	if(Maze[px][py-1][pz] === 0){
		//console.log('5');
	} else{
		py -= 1;
		cam.move(0,250,0);
	}
}
}
function marking(){
	if(started = true){
	mark.push([px,py,pz]);
	}
	started = true;
	startedtime = frameCount;
}
function restart(){
	canmove = true;
	mark =[];
	lkey = [0];
	muki = [0];
	mazeud = [0,0];
	px = 1;
	py = 1;
	pz = 1;
	itimatu = 0;
	started = false;
	cam = createCamera();
  cam.perspective(PI/2.5, width/height, cam.eyeZ/10.0, cam.eyeZ*10.0)
	div.html('');
	uddiv.html('');
	timer.html('');
	angle = 0
	f = 0;
	Maze = [];
	dire = [];
	cantholl = [];
	Hollx = 1;
	Holly = 1;
	Hollz = 1;
	for(let a = 0; a < Mazesize;a += 1){
		Maze[a] = [];
		for(let b = 0; b < Mazesize;b += 1){
			Maze[a][b] = [];
			for(let c = 0; c < Mazesize;c += 1){
				Maze[a][b][c] = 0;
			}
		}
	}
	Maze[Hollx][Holly][Hollz] = 1;
	hori();
}
let angle = 0
let f = 0;
var Maze = [];
var dire = [];
var cantholl = [];
let Hollx = 1;
let Holly = 1;
let Hollz = 1;
for(let a = 0; a < Mazesize;a += 1){
	Maze[a] = [];
	for(let b = 0; b < Mazesize;b += 1){
		Maze[a][b] = [];
    for(let c = 0; c < Mazesize;c += 1){
      Maze[a][b][c] = 0;
 		}
	}
}
Maze[Hollx][Holly][Hollz] = 1;
hori();
//console.log(Maze);
function draw(){
	background(200)
	if(started===true){
	setumei1.html('');
	setumei2.html('');
	setumei3.html('');
	setumei4.html('');
	setumei5.html('');
	setumei6.html('');
  //rotateY(angle);
	translate(-125*Mazesize+125+250*6,125*Mazesize-1125,-1450+250*10)
	for(let y = 0; y < Mazesize; y++){
		for(let x = 0; x < Mazesize; x++){
			push();
			for(let z = 0;z < Mazesize; z++){
				for(let a = 0;a < mark.length-1; a++){
					if(x === mark[a][0]&&y === mark[a][1]&&z === mark[a][2]){
						fill(255,0,255);
						sphere(50);
					}
				}
				if(x===9&&y===9&&z===9){
					fill(255,0,0);
					sphere(70);
				}
				if(Maze[x][y][z] === 0){
					if(x%2===0){
					  if(z%2===y%2){
						  fill(0,255,0,255);
					  }
					  else{
						  fill(0,0,255,255);
					  }
					} else{
						if(z%2===y%2){
						  fill(0,0,255,255);
					  }
					  else{
						  fill(0,255,0,255);
					  }
					}
					box(249.7);
				}
				translate(0,0,-250);
			}
			pop();
			translate(-250,0,0)
			
		}
		translate(250*Mazesize,0,0)
		translate(0,-250,0);
	}
	// texture(img[4]);
	//translate(-500,-140,3000)
	box(100,100,100);
	//cam.tilt(-0.03);
	translate(0,0,166)
	div.html('('+px+','+py+','+pz+')');
	if(Maze[px][py+1][pz] != 0)
		mazeud[0] = '進める'
	else
		mazeud[0] = '進めない'
	if(Maze[px][py-1][pz] != 0)
		mazeud[1] = '進める'
	else
		mazeud[1] = '進めない'
	uddiv.html('上:'+mazeud[0]+'<br>下:'+mazeud[1]);
	timer.html('タイム:'+nowtime)
	if(px===9&&py===9&&pz===9){
		setumei4.html('クリア！')
		setumei6.html('タイム：'+nowtime)
		canmove = false;
	} else { 
		nowtime = (frameCount-startedtime)/40;
	}
	ikidomari = false;
	switch(muki[muki.length-1]){
		case 0:
			if(Maze[px][py][pz+1] === 0){
				ikidomari = true;
			  //console.log('0');
			}
			break;
		case 1:
			if(Maze[px+1][py][pz] === 0){
				ikidomari = true;
				//console.log('1');
			}
			break;
		case 2:
			if(Maze[px][py][pz-1] === 0){
				ikidomari = true;
				//console.log('2');
			}
			break;
		case 3:
			if(Maze[px-1][py][pz] === 0){
				ikidomari = true;
				//console.log('3');
			}
			break;
	}
    if(ikidomari === true){
		stoped.html('行き止まり');
	} else { 
		stoped.html('');
	}
} else{
	setumei1.html('前進<br><br><br>後退');
	setumei2.html('上昇<br><br><br>下降');
	setumei3.html('2回押して<br>その場にマーク<br><br><br><br><br><br><br>左、右を向く')
	setumei4.html('3D迷路')
	setumei5.html('遊び方:<br>ボタンを押して迷路を進み、<br>マーキングを駆使してスタート地点の反対側((9,9,9)の場所)に<br>あるゴールを目指そう！<br>このゲームについて:<br>・迷路の構造は毎回変わるよ<br>・上、下に進めるかは左上からわかるよ<br>・前に進めない場合も左上から分かるよ')
	setumei6.html('マークを押してスタート!')
}
}

function keyPressed() {
if(started===true){
	canmove = true;
	//console.log(lkey[lkey.length-1])移動　方向転換
  if (keyCode === UP_ARROW) {
	straight();
  } else if (keyCode === DOWN_ARROW) {
	usiro();
  } else if (keyCode === LEFT_ARROW) {
		left();
	} else if (keyCode === RIGHT_ARROW) {
		right();
	} else if (keyCode === SHIFT) {
		up();
	} else if (keyCode === ENTER) {
		down();
	} else if (key === ' ') {
		marking();
	}
}
}