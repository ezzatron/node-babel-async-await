# Node.js `async`/`await` example

This is a very simple example of how to get `async`/`await` working for Node.js.
It may work in the browser also, but that is outside the scope of this project.

## `package.json` - NPM configuration

Our NPM configuration is pretty minimal. Basically 2 required dependencies, and
a third just for demonstration purposes:

```json
{
  "private": true,
  "dependencies": {
    "babel-preset-latest-minimal": "^1",
    "babel-register": "^6",
    "node-fetch": "^1"
  }
}
```

- `"private": true` - Because we never want to publish this by accident, and it
  shuts up NPM warnings about required fields.
- [babel-preset-latest-minimal] - Gives us *only what we need* on top of Node.js
  to support the latest ES2015+ features, including `async`/`await`. If you're
  trying to support the browser, you'll need [babel-preset-latest] instead.
- [babel-register] - Makes it so that when we `import` a module, it is
  transformed by Babel before being interpreted.
- [node-fetch] - This is just here so that we have something truly asynchronous
  to demonstrate. It's just [`fetch()`] implemented in Node.js.


## `.babelrc` - Babel configuration

Our Babel configuration is tiny, and just specifies which preset to use:

```json
{
    "presets": ["latest-minimal"]
}
```

- `"presets": ["latest-minimal"]` - Tells Babel to use the
  [babel-preset-latest-minimal] preset we installed.

## `Makefile` - Task configuration

We need to pass a couple of command-line options to `node`, so we're using
`make` to take care of them for us:

```make
run: node_modules
    node --harmony --require babel-register index.js

node_modules:
    npm install
```

- `run: node_modules`:
  - This is our default target, named `run`.
  - Execute it with `make run`, or just `make`.
  - It depends on the `node_modules` target. If `node_modules` does not exist,
    the `node_modules` target will be executed first.
  - `node --harmony --require babel-register index.js`:
    - `node` - Should be obvious.
    - `--harmony` - Enables all the ES2015+ features that node can support out
      of the box, leaving less for Babel to do.
    - `--require babel-register` - Loads the [babel-register] module before
      interpreting our entry point script, so that it can also be written in
      ES2015+.
    - `index.js` - The path to our entry point script.
- `node_modules`:
  - This target handles populating our `node_modules` directory.
  - We don't need to execute it directly, it's automatically taken care of when
    we execute `make run` or `make`.
  - `npm install` - Installs the NPM dependencies we defined in `package.json`.

### TL;DR

Just run `make` to see it in action.

## `index.js` - `async`/`await` demo

Comments are included in the source:

```js
// Import node-fetch so we have something asynchronous to demonstrate with.
import fetch from 'node-fetch'

// A simple wrapper around fetch() to log the request and response.
async function fetchAndLog(uri) {
    console.log('Fetching ' + uri)

    // These two statements are asynchronous,
    // but look almost like synchronous code.
    const response = await fetch(uri)
    const responseText = await response.text()

    console.log('Received ' + responseText)
}

// It's not possible to use await at the top level, so we need a simple async
// function wrapper.
(async () => {
    // These two operations are executed in series, despite being asynchronous.
    await fetchAndLog('https://httpbin.org/get?request=a')
    await fetchAndLog('https://httpbin.org/get?request=b')

    // These two operations are executed in parallel, and execution resumes when
    // both are finished.
    await Promise.all([
        fetchAndLog('https://httpbin.org/get?request=c'),
        fetchAndLog('https://httpbin.org/get?request=d'),
    ])
})();
```

## Other files

- `node_modules` - Node.js stores out dependencies here.
- `.gitignore` - Makes Git ignore `node_modules`.
- `npm-shrinkwrap.json` - Makes `npm install` faster by storing how the
  dependencies resolved.
- `README.md` - See the [README].

[`fetch()`]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
[babel-preset-latest-minimal]: https://www.npmjs.com/package/babel-preset-latest-minimal
[babel-preset-latest]: https://babeljs.io/docs/plugins/preset-latest/
[babel-register]: https://babeljs.io/docs/usage/require/
[node-fetch]: https://www.npmjs.com/package/node-fetch
[readme]: README.md#other-files
