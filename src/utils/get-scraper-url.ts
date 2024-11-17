export const getScraperUrl = (url: string) => {
    return `http://jsl2021.tail220d0a.ts.net/api/scrape?url=${encodeURIComponent(url)}&screenshot=true`
    // return `http://localhost:3000/api/scrape?url=${encodeURIComponent(url)}&screenshot=true`
    // return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`

}