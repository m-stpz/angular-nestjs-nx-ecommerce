# Understanding RxJS

Source: https://dev.to/renukapatil/understanding-rxjs-and-observables-in-angular-a-beginner-friendly-guide-ibf#:~:text=RxJS%20provides%20a%20way%20to,emits%20multiple%20values%20over%20time.

- RxJS: Reactive Extensions for JavaScript
- A powerful library for handling async data streams in JS
  - It provides a way to work with async data streams
  - Core components of Angular applications
  - Handles events, HTTP requests
- RxJS revolves around `Observables`, a data structure that emits multiple values over time
  - Allows for better handling of async data streams, such as:
    - API calls
    - Real-time data updates
    - User interactions
    - Event streams

## Angular and RxJS

Angular applications use RxJS to manage:

- HTTP Requests
- Event handling
- React forms
- Component communication

## Observables

- Represents a stream of values of time

```ts
products$ = this.productsService.getProducts();
```

- Stream of values over time
- Promise that can emit multiple values, not just one
  - A Promise gives you one value later
  - An Observable gives you many values over time

### Observables vs. Promises

- Both are used for async, however, the differ:

| Feature | Observable | Promise |
| ------- | ---------- | ------- |
