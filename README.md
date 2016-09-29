# Node.js `async`/`await` example

This is a very simple example of how to get `async` / `await` working for
Node.js. It may work in the browser also, but that is outside the scope of this
repo.

## `package.json`

```json
{
  "private": true,
  "dependencies": {
    "babel-preset-latest-minimal": "^1.1.1",
    "babel-register": "^6.16.0",
    "isomorphic-fetch": "^2.2.1"
  }
}
```

- `"private": true`: Because we never want to publish this by accident, and it
  shuts NPM up.
