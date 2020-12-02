const canvasWidth: number = 800;
const canvasHeight: number = 1000;

class canvasCoords {
    public x: number;
    public y: number;

    constructor($x: number, $y: number) {
		this.x = $x;
		this.y = $y;
    }
    
}

class fTreeBranch {
    
    private lenght: number;
    private width: number;
    private rotation: number;
    private root: fTreeBranch;
    private children: Array<fTreeBranch>;
    private _startCords: canvasCoords;
    private _endCoords: canvasCoords;

    public get startCords(): canvasCoords {
        return this._startCords;
    } 

    public get endCoords() :canvasCoords {
        return this._endCoords
    }

    
    

	constructor($lenght: number, $width:number, $rotation: number, $root: fTreeBranch) {
        this.lenght = $lenght;
        this.width = $width;
		this.rotation = $rotation;
        this.root = $root;
        this._startCords = this.setStartCords();
        this._endCoords = this.calculateEndCoords();
        this.children = new Array<fTreeBranch>();
    }

    public setStartCords(): canvasCoords {
        if (this.root === null) {
            return new canvasCoords(canvasWidth/2, canvasHeight)
        } else {
            return this.root.endCoords;
        }
    }

    private calculateEndCoords(): canvasCoords {
        return new canvasCoords(this._startCords.x + this.lenght*Math.sin(this.rotation), 
                                this._startCords.y - this.lenght*Math.cos(this.rotation));
    }

    


    drawBranch(canvas: HTMLCanvasElement): void {
        const canvasContext = fractalTreeCanvas.getContext("2d");
        canvasContext.moveTo(this.startCords.x, this.startCords.y)
        canvasContext.lineTo(this.endCoords.x, this.endCoords.y);
        canvasContext.strokeStyle = '#ffffff';
        canvasContext.lineWidth = this.width;
        canvasContext.stroke();
    }

    drawAll(canvas: HTMLCanvasElement): void {
        this.drawBranch(canvas);
        this.children.forEach(child => {
            child.drawAll(canvas)
        });
    }

    makeChidren(numberOfBranches: number, depth: number): void {
        const lenghtIntensity = 0.4;
        const rotationIntensity = 0.5;
        const widthIntensity = 0;
        let firstBranchRotation: number;
        if (numberOfBranches % 2 == 0) {
            firstBranchRotation = this.rotation - (rotationIntensity * Math.floor(numberOfBranches/2)) + rotationIntensity/2;
        } else {
            firstBranchRotation = this.rotation - rotationIntensity *  Math.floor((numberOfBranches-1)/2);
        }
        for (let index = 0; index < numberOfBranches; index++) {
            let child = new fTreeBranch(this.lenght - (this.lenght*lenghtIntensity), 
                                            this.width - widthIntensity,
                                            firstBranchRotation + index * rotationIntensity,
                                            this);
            console.log(child.endCoords.x, child.lenght, child.width, typeof child);
            if (depth > 0) {
                child.makeChidren(numberOfBranches, depth-1);
            }
            this.children.push(child);
            
        }
        console.log(depth);
        
    }
    
}

let rootBranch = new fTreeBranch(300, 1, 0, null);

const fractalTreeCanvas = document.getElementById("fractalTreeCanvas") as HTMLCanvasElement;
fractalTreeCanvas.width=canvasWidth;
fractalTreeCanvas.height=canvasHeight;
rootBranch.makeChidren(5,3);
rootBranch.drawAll(fractalTreeCanvas);
