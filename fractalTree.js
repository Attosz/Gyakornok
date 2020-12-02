var canvasWidth = 800;
var canvasHeight = 1000;
var canvasCoords = /** @class */ (function () {
    function canvasCoords($x, $y) {
        this.x = $x;
        this.y = $y;
    }
    return canvasCoords;
}());
var fTreeBranch = /** @class */ (function () {
    function fTreeBranch($lenght, $width, $rotation, $root) {
        this.lenght = $lenght;
        this.width = $width;
        this.rotation = $rotation;
        this.root = $root;
        this._startCords = this.setStartCords();
        this._endCoords = this.calculateEndCoords();
        this.children = new Array();
    }
    Object.defineProperty(fTreeBranch.prototype, "startCords", {
        get: function () {
            return this._startCords;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(fTreeBranch.prototype, "endCoords", {
        get: function () {
            return this._endCoords;
        },
        enumerable: false,
        configurable: true
    });
    fTreeBranch.prototype.setStartCords = function () {
        if (this.root === null) {
            return new canvasCoords(canvasWidth / 2, canvasHeight);
        }
        else {
            return this.root.endCoords;
        }
    };
    fTreeBranch.prototype.calculateEndCoords = function () {
        return new canvasCoords(this._startCords.x + this.lenght * Math.sin(this.rotation), this._startCords.y - this.lenght * Math.cos(this.rotation));
    };
    fTreeBranch.prototype.drawBranch = function (canvas) {
        var canvasContext = fractalTreeCanvas.getContext("2d");
        canvasContext.moveTo(this.startCords.x, this.startCords.y);
        canvasContext.lineTo(this.endCoords.x, this.endCoords.y);
        canvasContext.strokeStyle = '#ffffff';
        canvasContext.lineWidth = this.width;
        canvasContext.stroke();
    };
    fTreeBranch.prototype.drawAll = function (canvas) {
        this.drawBranch(canvas);
        this.children.forEach(function (child) {
            child.drawAll(canvas);
        });
    };
    fTreeBranch.prototype.makeChidren = function (numberOfBranches, depth) {
        var lenghtIntensity = 0.4;
        var rotationIntensity = 0.5;
        var widthIntensity = 0;
        var firstBranchRotation;
        if (numberOfBranches % 2 == 0) {
            firstBranchRotation = this.rotation - (rotationIntensity * Math.floor(numberOfBranches / 2)) + rotationIntensity / 2;
        }
        else {
            firstBranchRotation = this.rotation - rotationIntensity * Math.floor((numberOfBranches - 1) / 2);
        }
        for (var index = 0; index < numberOfBranches; index++) {
            var child = new fTreeBranch(this.lenght - (this.lenght * lenghtIntensity), this.width - widthIntensity, firstBranchRotation + index * rotationIntensity, this);
            console.log(child.endCoords.x, child.lenght, child.width, typeof child);
            if (depth > 0) {
                child.makeChidren(numberOfBranches, depth - 1);
            }
            this.children.push(child);
        }
        console.log(depth);
    };
    return fTreeBranch;
}());
var rootBranch = new fTreeBranch(300, 1, 0, null);
var fractalTreeCanvas = document.getElementById("fractalTreeCanvas");
fractalTreeCanvas.width = canvasWidth;
fractalTreeCanvas.height = canvasHeight;
rootBranch.makeChidren(5, 3);
rootBranch.drawAll(fractalTreeCanvas);
//# sourceMappingURL=fractalTree.js.map