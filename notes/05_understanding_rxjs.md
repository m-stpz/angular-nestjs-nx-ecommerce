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

| Feature         | Observable                                     | Promise                                     |
| --------------- | ---------------------------------------------- | ------------------------------------------- |
| Multiple values | Can emit them over time                        | Emits a single value (resolved or rejected) |
| Lazy execution  | Starts only when subscribed                    | Starts immediately when defined             |
| Cancelation     | Supports cancelation via `unsubscribe()`       | Can't be canceled once started              |
| Operators       | Supports powerful operators for transformation | Limited functionality                       |

- Observables are more flexible than Promises. They allow:
  - Multiple scenarios: good for data updates
  - Lazy execution: you can control when they start
  - Cancelation: unsub when data isn't needed

- They are like what `useEffect` does to keep data in sync

## RxJS and Observables

- RxJS is the implementation + tooling around Observables
- It provides:
  - `Observable` class
  - Creation functions: of, from, interval, fromEvent
  - Operators: map, filter, switchMap, catchErrors
  - Schedulers
  - Subjects
- Angular's async model is built on RxJS
