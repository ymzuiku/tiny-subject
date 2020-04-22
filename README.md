# Tiny Subject

Mini like Rxjs Subject class.

```js
import TinySubject from 'tiny-subject';

const subject = new TinySubject();

subject.subscribe(state=>{
  console.log(state);
})

subject.next('hello');
```