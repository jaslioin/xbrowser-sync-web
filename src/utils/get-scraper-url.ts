export const getScraperUrl = (url: string,isLocal = false) => {
    if(isLocal){
        return `http://localhost:3000/api/scrape?url=${encodeURIComponent(url)}&screenshot=true`
    }else{
        return `http://jsl2021.tail220d0a.ts.net/api/scrape?url=${encodeURIComponent(url)}&screenshot=true`
    }
}