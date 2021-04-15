let baseUrl

export default {
    install (Vue, options) {
        console.log('Installed', options)

        baseUrl = options.baseUrl

        Vue.prototype.$fetch = $fetch
    }
}

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)

    const response = await fetch(`${baseUrl}${url}`)
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        const message = await response.text()
        const error = new Error(message)
        error.response = response
        throw error
    }
}

export async function $req(biasUrl,type,data) {
    return $.ajax({
        url: `${baseUrl}${biasUrl}`,
        type: type,
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        data: data
    });
}