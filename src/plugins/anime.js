export function $fadeIn(v,seconds,obj){//v 帧速率
    let each = 1/(seconds*v)
    let times = seconds*v
    let perTimeout = seconds/times*1000
    let tempList = []
    for(let i=times;i>=0;i--) tempList.push((i*each).toString())

    let loop = () =>{
        obj.style.opacity = tempList.pop()
        times -= 1
        if(times>0) setTimeout(loop,perTimeout)
    }
    loop()
}

export function $fadeOut(v,seconds,obj){
    let each = 1/(seconds*v)
    let times = seconds*v
    let perTimeout = seconds/times*1000
    let tempList = []
    for(let i=0;i<times;i++) tempList.push((i*each).toString())

    let loop = () =>{
        obj.style.opacity = tempList.pop()
        times -= 1
        if(times>0) setTimeout(loop,perTimeout)
    }
    loop()
}