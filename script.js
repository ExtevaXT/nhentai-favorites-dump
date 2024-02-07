// Open devtools by Ctrl+Shift+C or Ctrl+Shift+I or Right-click -> Inspect 
// Take out that 2 values from Application -> Cookies -> https://nhentai.net
// Copypaste everything into Console
// Increase rate if it returns Too many requests
const sessionid = '...'
const cf_clearance = '...'
const rate = 10

let cookies = document.cookie
cookies = `${cookies}; sessionid=${sessionid}; cf_clearance=${cf_clearance}`

let data = []
async function parseHtml(url){
    let response = await fetch(url, {headers: {method: 'GET','Cookie': cookies}})
    let text = await response.text()
    return new DOMParser().parseFromString(text, 'text/html')
}
async function getFavs(i) {
    const page = await parseHtml(`/favorites/?page=${i}`);
    let favs = page.querySelectorAll('.gallery-favorite');

    for (const fav of favs) {
        let id = fav.getAttribute('data-id');
        let thumb = fav.querySelector('img').getAttribute('data-src');
        const doujin = await parseHtml(`/g/${id}`);
        let title = doujin.querySelector('h1').textContent;
        let fullTitle = doujin.querySelector('h2').textContent;
        data.push({ id, thumb, title, fullTitle });
        console.log(`Scraped ${id}: ${title}`);
        await new Promise(resolve => setTimeout(resolve, rate));
    }
}

(async () => {
    const page = await parseHtml(`/favorites`);
    const pages = page.querySelector('.pagination .last').getAttribute('href').substring(17)
    for (let i = 0; i < pages; i++) {
        await getFavs(i)
    }
    const a = Object.assign(document.createElement('a'), { 
    href: URL.createObjectURL(
        new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })), 
    download: 'nhentai.json' });
    document.body.appendChild(a).click();
    document.body.removeChild(a);
})()
