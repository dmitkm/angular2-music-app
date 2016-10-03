# angular2-starter

A complete, yet simple, starter for Angular 2 using Webpack.



It is a lightweight build for Angular 2 apps base on [@AngularClass](https://github.com/AngularClass/angular2-webpack-starter) and [Rangle.io build](https://github.com/rangle/angular2-redux-example).

* Best practices in file and application organization for [Angular 2](https://angular.io/).
* Ready to go build system using [Webpack 2](https://webpack.github.io/docs/) for working with [TypeScript 2](http://www.typescriptlang.org/).
* Stylesheets with [SASS](http://sass-lang.com/) (not required, it supports regular css too).
* Error reported with [TSLint](http://palantir.github.io/tslint/) and [Codelyzer](https://github.com/mgechev/codelyzer).

>Warning: Make sure you're using the latest version of Node.js and NPM

##Todos

* Testing Angular 2 code with Jasmine and Karma.
* Documentation with TypeDoc.

### Quick start

```bash
# clone our repo
$ git clone https://github.com/dmitkm/angular2-starter.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```
go to [http://localhost:3000](http://localhost:3000) in your browser.


## Developing

After you have installed all dependencies you can now start developing with:

* `npm start`

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:8080`.

# FAQ

#### Do I need to add script / link tags into index.html ?

No, Webpack will add all the needed Javascript bundles as script tags and all the CSS files as link tags. The advantage is that you don't need to modify the index.html every time you build your solution to update the hashes.

#### How to include external angular 2 libraries ?

It's simple, just install the lib via npm and import it in your code when you need it. Don't forget that you need to configure some external libs in the [bootstrap](https://github.com/preboot/angular2-webpack/blob/master/src/main.ts) of your application.

#### How to include external css files such as bootstrap.css ?

Just install the lib and import the css files in vendor.ts. 

# TypeScript

> To take full advantage of TypeScript with autocomplete you would have to use an editor with the correct TypeScript plugins.

# License

[MIT](/LICENSE)
