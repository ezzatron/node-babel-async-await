import fetch from 'isomorphic-fetch'

async function fetchAndLog(uri) {
    console.log('Fetching ' + uri)

    const response = await fetch(uri)
    const responseText = await response.text()

    console.log('Received ' + responseText)
}

(async () => {
    await fetchAndLog('https://httpbin.org/get?request=a')
    await fetchAndLog('https://httpbin.org/get?request=b')
})();
