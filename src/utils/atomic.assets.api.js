// import { ATOMIC_BASE_ENDPOINT } from './config_wax'

// export const fetchAtomic = async (endpoint, params = {}, options = {}) => {
//   const ATOMICASSETS_API_V = 1
//   const url = new URL(
//     `${ATOMIC_BASE_ENDPOINT}/v${ATOMICASSETS_API_V}/${endpoint}`
//   )

//   options = {
//     method: 'GET',
//     ...options,
//     headers: {
//       Accept: 'application/json',
//       ...options?.headers,
//     },
//   }

//   for (const [k, v] of Object.entries(params))
//     if (v !== undefined) url.searchParams.set(k, v)

//   const res = await fetch(url.toString(), options)
//   const { success, data, message } = await res.json()

//   if (!success) throw new Error(`AtomicAssets request failed: "${message}"`)

//   return data
// }

import axios from 'axios'

export const fetchAssets = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}
export const fetchTemplates = async (collection_name, params = {}) =>
  fetchAtomic('templates', {
    collection_name,
    order: 'desc',
    sort: 'created',
    ...params,
  })

export const fetchAccountTemplates = async (
  account,
  collection_name = undefined
) =>
  fetchAtomic(
    `accounts/${account}${collection_name ? `/${collection_name}` : ''}`
  )
