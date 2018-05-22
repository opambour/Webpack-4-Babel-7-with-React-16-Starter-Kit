# Webpack 4 & Babel 7 with React 16 Starter Kit

[Webpack](https://webpack.js.org/configuration/) is our automation build tool/bundler/task runner that incorporates [Babel](https://babeljs.io/docs/setup/) to transpile or compile our es6 code to es5. With the help of .babelrc, it is well configured to handle react project as well to use its react presets in additon with "flow" that strips flow types and transform JSX into createElement calls.

## Little Know How

* babel-core: Transforms your ES6 code into ES5

* babel-loader: Webpack helper to transform your JavaScript dependencies (for example, when you import your
  components into other components) with Babel

* babel-preset-env: Determines which transformations/plugins to use and polyfills (provide modern functionality on   older browsers that do not natively support it) based on the browser matrix you want to support

* babel-preset-react: Babel preset for all React plugins, for example turning JSX into functions

## Usage

Download or clone this project:
Clone as:
> $ git clone https://github.com/opambour/Webpack-4-Babel-7-with-React-16-Starter-Kit.git projectName

Install dependencies as
> $ npm install

Run webpack in development to generate dist files
> $ npm run build:dev

Run webpack in production to generate dist files
> $ npm run build:prod

## MERN Stack Project
This kit has been configured to use with server side that uses TypeScript for the backend.

That's it...enjoy!

**Version #:** 1.0.0
