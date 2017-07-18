# canvas-factory
[![npm version](https://img.shields.io/npm/v/canvas-factory.svg?style=flat-square)](https://www.npmjs.com/package/canvas-factory)
## Dependencies
[node-canvas](https://github.com/Automattic/node-canvas)

[jsgif](https://github.com/antimatter15/jsgif/)
## Example
```javascript
const factory = createFactory({ width : 100, height : 100  });
const canvas = factory.getCanvas();
const ctx = canvas.getContext('2d');

const d = 10;
ctx.fillStyle = 'red';
ctx.fillText("H",10,50);
ctx.fillText("e",10+d,50);
ctx.fillText(false)("l",10+d*2,50); // pass false first to not addFrame this ctx
ctx.fillText("l",10+d*3,50);
ctx.fillText(false)("o",10+d*4,50); // pass false first to not addFrame this ctx
ctx.fillText("!",10+d*5,50);

factory
  .saveGIF()
  .then((data)=>{
    fs.writeFile( '123.gif', data , 'binary', function(err){
      if (err) throw err
    })
  })
  .catch((error)=>{
    console.log(error);
  })
```

