const { parse } = require('node-html-parser')
const fs = require("fs")

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

    const data = {} ;

  surah:  for(let asz = 114; asz < 115; asz++){
    // const root = await parse(await getPage(`https://www.kuranmeali.com/AyetKarsilastirma.php?sure=${114}&ayet=${6}`));
    // const Mealler = await parse(root.querySelector('#Mealler'))



    


    var cnt = 0;

            try {

           ayah: for(let utz= 1; utz < 300; utz++){
                    const root = await parse(await getPage(`https://www.kuranmeali.com/AyetKarsilastirma.php?sure=${asz}&ayet=${utz}`));
                    const Mealler = await parse(root.querySelector('#Mealler'))


                    // console.log(Mealler.childNodes[0].childNodes)
                    data[utz] = {}

                    var arapca = ""
                    for(let ou= 0; ou < Mealler.childNodes[0].childNodes[3].lastChild.firstChild.childNodes[0].childNodes.length; ou++){

                        if( typeof Mealler.childNodes[0].childNodes[3].lastChild.firstChild.childNodes[0].childNodes[ou].innerHTML == "undefined") continue
                       
                        arapca += Mealler.childNodes[0].childNodes[3].lastChild.firstChild.childNodes[0].childNodes[ou].innerHTML
                    }

                    data[utz]["arabic"] = arapca

                    for(let uas = 5; uas < Mealler.childNodes[0].childNodes.length -1; uas++){
                        
                        data[utz][Mealler.childNodes[0].childNodes[uas].firstChild.firstChild.innerHTML] = Mealler.childNodes[0].childNodes[uas].lastChild.firstChild.firstChild.innerHTML
                    }
                   
                    console.log(`${asz}:${utz}`)
                    cnt++

                    
                }
                
            } catch (error) {

                console.log(error)
                if (cnt == 0) break surah
                continue surah;

            }
        }
fs.writeFileSync("surah.json",JSON.stringify(data))
        console.log("FINISHED")

            
   


  
    
    // for (let u = 5; u < Mealler.childNodes[0].childNodes.length -1; u++){

    //     console.log(`${Mealler.childNodes[0].childNodes[u].firstChild.firstChild.innerHTML} \n`)
    //     console.log(`${Mealler.childNodes[0].childNodes[u].lastChild.firstChild.firstChild.innerHTML} \n`)

    


 
    // }
})()

