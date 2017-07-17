# canvas-factory

## Example
```javascript
const factory = createFactory({ width : 100, height : 100  });
const canvas = factory.getCanvas();
const ctx = canvas.getContext('2d');

const d = 10;
ctx.fillStyle = 'red';
ctx.fillText("H",10,50);
ctx.fillText("e",10+d,50);
ctx.fillText("l",10+d*2,50);
ctx.fillText("l",10+d*3,50);
ctx.fillText("o",10+d*4,50);
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
