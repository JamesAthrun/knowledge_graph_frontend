let baseUrl

export async function $fetch(url) {
  const response = await fetch(`$(baseUrl)`)
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const error = new Error('error')
    throw error
  }
}

export default {
  install (Vue, options) {
    console.log('Installed!', options)

    baseUrl = options.baseUrl
    Vue.prototype.$fetch = $fetch
  }
}
