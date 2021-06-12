const fade = (v,seconds,obj,beginOpacity,endOpacity)=>{
    let each = (endOpacity-beginOpacity)/(seconds*v)
    let times = seconds*v
    let perTimeout = seconds/times*1000
    let tempList = []
    let nowOpacity = endOpacity
    for(let i=times;i>=0;i--) {
        nowOpacity -= each
        tempList.push((nowOpacity).toString())
    }

    let loop = () =>{
        obj.style.opacity = tempList.pop()
        times -= 1
        if(times>0) setTimeout(loop,perTimeout)
    }
    loop()
}

export function $fadeIn(v,seconds,obj){//v 帧速率
    fade(v,seconds,obj,0,1)
}
export function $fadeOut(v,seconds,obj){//v 帧速率
    fade(v,seconds,obj,1,0)
}