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
