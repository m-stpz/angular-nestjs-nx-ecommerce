# Setting up Angular

```bash
pnpm nx add @nx/angular
pnpm nx g @nx/angular:app apps/<ng-app-name>
pnpm nx serve <ng-app-name>
```

## Stylesheets

- CSS, SCSS, Sass, Less are all possible ways to style
- CSS is the standard. SCSS, Sass, and Less are preprocessors
  - Sass not that common nowadays
  - SCSS: Sassy CSS, most popular preprocessor
  - Less: Older preprocessor, simpler, fewer features

## Bundlers

- They bundle code, meaning they package source code (JS, CSS, images) and their deps into optimized packages for web browsers

- Esbuild, RSPack, Webpack

### esbuild

- Ultra-fast bundler written in Go

- Pros
  - really fast (order of magnitutes faster than webpack)
  - zero-config
  - great for: dev tooling, libs, simple apss
- Cons
  - limited plugin ecosystem
  - less flexble for complex pipelines
  - not good for large, highly customized builds
- When to use
  - You want speed over flexibility
  - Libs, internal tools, simple SPAs

### webpack

- The old king. Highly flexible, highly complex
- Pros
  - Massive ecosystem
  - Can bundle anything
  - Extremely customizable
- Cons
  - Slow
  - Complex config
  - Harder to maintain
- When to use
  - Legacy projects
  - Need custom build requirements

### rspack

- Webpack-compatible bundler written in Rust
- Pros
  - much faster than webpack
  - Same mental model and config style
  - actively developed
- Cons
  - ecosystem is catching up
  - some webpack plugins won't work yet
- When to use
  - Want webpack power without its slowness
  - Migrating large webpack projects
  - Enterprise-scale apps

## Notes

- It was a huge pain in the f\*cking a\*\* to setup angular within an existing nx repo
- Many dependencies issues, many errors. A total fucking nightmare!
- I was able to do it by installing first some previous versions of angular, then setting up some version limits on some libraries. Really annoying and painful.
