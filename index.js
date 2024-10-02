import { parse } from 'node-html-parser';


const getPage = async (url) => {


    const res = await fetch(url, {
        method:"GET", 
        credentials: "include",
        headers:{
            "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-encoding":"Accept-Encoding:gzip, deflate, br, zstd",
            "Cache-Control":"no-cache",
            "Accept-Language": "en-US",
            "Cookie": "country",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-User": "?1",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "Linux",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Ch-Ua": '"Not-A.Brand";v="99",',
            "Priority": "u=0, i",
            "Pragma": "no-cache",
        }})
        

        return await res.text()

}

(async ()=> {

    console.log(await getPage("https://www.kuranmeali.com/AyetKarsilastirma.php?sure=2&ayet=16"))
})()

