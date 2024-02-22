class makeAnimal{
    images = Array.from(document.querySelectorAll(".img_part"));
    area = document.querySelector(".area");
    currentImage;
    funk;
    constructor(){
        this.setStart();
        this.images.forEach(e=>{
            this.setDragable(e);
        });
        this.setRotate();
        this.setMouseup();
    }
    setMouseup(){
        window.addEventListener("mouseup",e => {
            console.log(this.funk)
            window.removeEventListener("mousemove", this.funk);

              if (this.isRightAssembly()) {
                alert("Картина собрана!");
                this.currentImage.removeEventListener("mousedown", this.handleDown);
                this.setAnimation();
              } 
              this.currentImage=null;
          }
        );
    }
    setStart(){
        this.images.forEach(e=>{
            this.setImgToRandomCords(e);
        });
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    setImgToRandomCords(img) {
        let areaRect = this.area.getBoundingClientRect();
        let width = img.getBoundingClientRect().width;
        let height = img.getBoundingClientRect().height;
        img.style.left = `${Math.random() * (areaRect.width - width) + width / 2
        }px`;
        img.style.transform=`rotate(${this.getRandomInt(8)*45}deg)`
        img.style.top = `${Math.random() * (areaRect.height - height) + height/2 + 25
        }px`;
    }
    
    chekOverlay(elem1,elem2){
        let elem1Size = elem1.getBoundingClientRect();
        let elem2Size = elem2.getBoundingClientRect();
        return (elem2Size.top>elem1Size.top-30 &&
             elem2Size.bottom < elem1Size.bottom+30 &&
              elem2Size.left>elem1Size.left &&
               elem2Size.right < elem1Size.right);
    }
    chekOnTop(elem1,elem2){
        let elem1Size = elem1.getBoundingClientRect();
        let elem2Size = elem2.getBoundingClientRect();
        return (elem2Size.top<elem1Size.top &&
            elem2Size.bottom < elem1Size.top+30 );
    }
    chekOnBottom(elem1,elem2){
        let elem1Size = elem1.getBoundingClientRect();
        let elem2Size = elem2.getBoundingClientRect();
        return (elem2Size.top>elem1Size.bottom-90 &&
             elem2Size.bottom < elem1Size.bottom+20 &&
              elem2Size.left>elem1Size.left &&
               elem2Size.right < elem1Size.right);
    }
    chekDeg(){
        let bodyDeg = this.getdeg(body)==0;
        let legDeg = this.getdeg(leg)==0;
        let mouthDeg = this.getdeg(mouth)==0;
        let eyeDeg = this.getdeg(eye)==0;
        let butterflyDeg = this.getdeg(butterfly)==0 || this.getdeg(butterfly)==180;
        return(bodyDeg && legDeg && mouthDeg && eyeDeg && butterflyDeg);
    }
    isRightAssembly(){
        console.log(this.chekDeg());
        return(
            this.chekDeg()&&
            this.chekOnBottom(body,leg) &&
            this.chekOverlay(body,mouth) &&
            this.chekOverlay(body,eye) &&
            this.chekOverlay(body,butterfly) &&
            this.chekOnTop(butterfly,mouth)&&
            this.chekOnTop(mouth,eye)

        );
    }
    getdeg(elem){
        let str = elem.style.transform;
        let deg=0;
            if(!elem.style.hasOwnProperty("transform")){
                deg=0;
            }else{
                deg = str.substring(str.indexOf("(")+1,str.indexOf("deg"));
                if(Number(deg)==360){
                    deg=0;
                }
            }
        return Number(deg);
    }
    setRotate(){
        document.addEventListener("keydown",e=>{
            
            let deg=this.getdeg(this.currentImage);
            if(e.code=="KeyE"){
                this.currentImage.style.transform=`rotate(${Number(deg)+45}deg)`
            }
            if(e.code=="KeyQ"){
                this.currentImage.style.transform=`rotate(${Number(deg)-45}deg)`
            }
            
        })
    }
        imgMove(e) {
        let x = e.pageX;
        let y = e.pageY;
        this.currentImage.style.left = `${x}px`;
        this.currentImage.style.top = `${y}px`;
      }
    
    onDown(e) {
        this.currentImage=e.target;
        this.funk = (e)=>{this.imgMove(e)};
        console.log(this.funk);
        window.addEventListener("mousemove", this.funk);
      }
    setAnimation(){
        body.classList.add("body_anim");
        leg.classList.add("leg_anim");
        mouth.classList.add("mouth_anim");
        eye.classList.add("eye_anim");
        butterfly.classList.add("butterfly_anim");
    }
    setDragable(img){
        img.addEventListener("mousedown",e=>this.onDown(e) );
    }
}