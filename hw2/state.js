export class Context {
    static idelState = "idle";
    static mouseDownState = "down";
    static moviingState = "drag";
    static doubleClickState = "double";
    targetNumber;

    constructor() {
      this.state = "idle";
      this.startX = new Array(3);
      this.startY = new Array(3);
      this.offsetX = [0,0,0];
      this.offsetY = [0,0,0];
      this.initX = new Array(3);
      this.initY = new Array(3);
      this.isDown = false;
      this.move = false;
      this.followMode = false;
      this.isMoving = false;
      this.lastTouchTime = 0;
      this.touchMode = false;
    }
    onClick(i, event){
        event.stopPropagation();
        console.log('click',this.state,this.move);
        this.state = 'click';
        let targets = document.querySelectorAll('.target');
        if (this.state == 'click' & this.move == false  ){
            this.targetNumber = i;
            for (let r = 0; r < targets.length; r++) {
                targets[r].style.backgroundColor = 'red';
            }
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            nowTarget.style.backgroundColor = 'blue'
            
            this.followMode = false;
            console.log("cancel followMode",this.followMode,this.state);
        }
        
    }
    onMouseDown(i,event) {
        event.stopPropagation();
        this.targetNumber = i;
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        this.isDown = true;
        this.startX[i] = event.pageX;
        this.startY[i] = event.pageY;
        this.initX[i] = nowTarget.style.left;
        this.initY[i] = nowTarget.style.top;
        this.offsetX[i] = parseInt(nowTarget.style.left);
        this.offsetY[i] = parseInt(nowTarget.style.top);
        // if (this.move == true){
        //     nowTarget.addEventListener('mousemove', this.onMouseMove);
        // }
        
      }
    onMouseUp(event) {
        event.stopPropagation();
        
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        if (this.isDown) {
            this.initX[this.targetNumber] = nowTarget.style.left;
            this.initY[this.targetNumber] = nowTarget.style.top;
        }
        // console.log("mouse up", this.isDown,nowTarget.style.left,nowTarget.style.top);
        this.isDown = false;
        this.isMoving = false;
        nowTarget.removeEventListener('mousemove', this.onMouseMove);
    }
    onMouseMove(event) {
        event.stopPropagation();
        console.log("mouse move");
        
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        if (this.isDown & this.touchMode == false) {
            this.move = true;
            const dx = event.pageX - this.startX[this.targetNumber];
            const dy = event.pageY - this.startY[this.targetNumber];
            nowTarget.style.top =  this.offsetY[this.targetNumber]+dy + "px";
            nowTarget.style.left =  this.offsetX[this.targetNumber]+dx + "px";
            console.log(nowTarget.style.top, nowTarget.style.left)
            // nowTarget.style.transform = `translate(${this.offsetX[this.targetNumber] + dx}px,${this.offsetY[this.targetNumber] + dy}px)`;
            
        }else if (this.isMoving == true & this.followMode == true){
            
            console.log(nowTarget.style.left,nowTarget.style.top);
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
            nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';
        }else{
            this.move = false;
        }
    }
    onClickOutside(event){    
        event.stopPropagation();
        console.log("outside");
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        if(this.state != "idle" ){
            console.log("cancel" , this.state);
            let targets = document.querySelectorAll('.target');
            for (let r = 0; r < targets.length; r++) {
                targets[r].style.backgroundColor = 'red';
            }
            this.state = "idle"
            
        }this.followMode = false;
        
    }
    onDoubleClick(i,event){
        // event.stopPropagation();
        this.targetNumber = i;
        this.followMode = true;
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        this.initX[i] = nowTarget.style.left;
        this.initY[i] = nowTarget.style.top;
        console.log(this.initX[i],this.initY[i]);
        if (this.followMode == true){
            
            this.isMoving = true;
            console.log(i);
            nowTarget.addEventListener('mousemove', this.onMouseMove);

        }
    }
    // onTouchStartOutside(event){
    //     event.stopPropagation();
    //     if (this.followMode == true){
    //         var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
    //         this.isMoving = true;
    //         nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
    //         nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';
    //         nowTarget.addEventListener('mousemove', this.onDragOutside);

    //     }

    // }
    // onDragOutside(event){
    //     if (this.isMoving == true){
    //         var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
    //         nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
    //         nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';

    //     }
        
    // }
    onESC(event){
        if (event.key === "Escape"){
            console.log("esc",this.initX[this.targetNumber],this.initY[this.targetNumber],this.targetNumber);
            this.followMode = false;
            this.isMoving = false;
            this.isDown = false;
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            nowTarget.removeEventListener('mousemove', this.onMouseMove);
            nowTarget.style.left = (this.initX[this.targetNumber]);
            nowTarget.style.top = (this.initY[this.targetNumber]);
            
        }
    }
    // onTouchStart(i,event) {
    //     event.stopPropagation();
    //     console.log("touch start");
    //     this.targetNumber = i;
    //     var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
    //     this.isDown = true;
    //     this.touchMode = true;
    //     this.startX[i] = event.pageX;
    //     this.startY[i] = event.pageY;
    //     this.initX[i] = nowTarget.style.left;
    //     this.initY[i] = nowTarget.style.top;
    //     this.offsetX[i] = parseInt(nowTarget.style.left);
    //     this.offsetY[i] = parseInt(nowTarget.style.top);
    //     nowTarget.addEventListener('mousemove', this.onTouchMove);
    // }
    // onTouchEnd(event) {
    //     event.stopPropagation();
    //     var now = new Date().getTime();
    //     console.log("touch end", now, this.lastTouchTime);
    //     if (now - this.lastTouchTime <= 500) {
    //         var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
    //         nowTarget.style.backgroundColor = 'green'
    //         this.followMode = true;
    //         console.log("double touch");
    //     }
    //     this.lastTouchTime = now;
    // }
    // onTouchMove(event) {
    //     event.stopPropagation();
    //     this.move = true;
    //     var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
    //     if (this.isDown) {
    //         const dx = event.pageX - this.startX[this.targetNumber];
    //         const dy = event.pageY - this.startY[this.targetNumber];
    //         nowTarget.style.top =  this.offsetY[this.targetNumber]+dy + "px";
    //         nowTarget.style.left =  this.offsetX[this.targetNumber]+dx + "px";
    //         // nowTarget.style.transform = `translate(${this.offsetX[this.targetNumber] + dx}px,${this.offsetY[this.targetNumber] + dy}px)`;
            
    //     }else if (this.isMoving == true & this.followMode == true){
    //         console.log(nowTarget.style.left,nowTarget.style.top);
    //         var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
    //         nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
    //         nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';
    //     }else{
    //         this.move = false;
    //     }
    // }
}
export class Touch{
    targetNumber;

    constructor() {
      this.state = "idle";
      this.startX = new Array(3);
      this.startY = new Array(3);
      this.offsetX = [0,0,0];
      this.offsetY = [0,0,0];
      this.initX = new Array(3);
      this.initY = new Array(3);
      this.isDown = false;
      this.move = false;
      this.followMode = false;
      this.isMoving = false;
      this.lastTouchTime = 0;
      this.touchMode = false;
    }
    onTouchStart(i,event) {
        event.stopPropagation();
        console.log("touch start");
        this.targetNumber = i;
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        this.isDown = true;
        this.touchMode = true;
        this.startX[i] = event.pageX;
        this.startY[i] = event.pageY;
        this.initX[i] = nowTarget.style.left;
        this.initY[i] = nowTarget.style.top;
        this.offsetX[i] = parseInt(nowTarget.style.left);
        this.offsetY[i] = parseInt(nowTarget.style.top);
        nowTarget.addEventListener('mousemove', this.onTouchMove);
    }
    onTouchEnd(event) {
        event.stopPropagation();
        var now = new Date().getTime();
        console.log("touch end", now, this.lastTouchTime);
        if (now - this.lastTouchTime <= 500) {
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            nowTarget.style.backgroundColor = 'green'
            this.followMode = true;
            console.log("double touch");
        }
        this.lastTouchTime = now;
    }
    onTouchMove(event) {
        event.stopPropagation();
        this.move = true;
        var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
        if (this.isDown) {
            const dx = event.pageX - this.startX[this.targetNumber];
            const dy = event.pageY - this.startY[this.targetNumber];
            nowTarget.style.top =  this.offsetY[this.targetNumber]+dy + "px";
            nowTarget.style.left =  this.offsetX[this.targetNumber]+dx + "px";
            // nowTarget.style.transform = `translate(${this.offsetX[this.targetNumber] + dx}px,${this.offsetY[this.targetNumber] + dy}px)`;
            
        }else if (this.isMoving == true & this.followMode == true){
            console.log(nowTarget.style.left,nowTarget.style.top);
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
            nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';
        }else{
            this.move = false;
        }
    }
    onTouchStartOutside(event){
        event.stopPropagation();
        
        if (this.followMode == true){
            console.log("click outside start");
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            this.isMoving = true;
            nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
            nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';
            nowTarget.addEventListener('touchmove', this.onDragOutside);

        }

    }
    onDragOutside(event){
        if (this.isMoving == true){
            var nowTarget = document.getElementsByClassName("target")[this.targetNumber];
            nowTarget.style.left = (event.clientX - nowTarget.offsetWidth/2) + 'px';
            nowTarget.style.top = (event.clientY - nowTarget.offsetHeight/2) + 'px';

        }
        
    }
}