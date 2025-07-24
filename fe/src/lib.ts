export async function fetcher(key:string){
    const res =await (await fetch(key,{
        headers:{
            'Content-Type':"application/json"
        }
    })).json()

    return res
}

export async function fakeDelay(time:number){
    await new Promise((res)=>{
        setTimeout(()=>{
            res('Promise is resolved')
        },time)
    })
}