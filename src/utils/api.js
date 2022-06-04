import axios from 'axios'

export const fetchData = async (url) => {
  const { data } = await axios.get(url)
  return data
}

export const checkSubDivide = (propNFTID) => {
  const eosid = sessionStorage.getItem('eos_id')
  const url =
    'https://7bf4-2003-f8-973e-2100-3893-68b1-83a7-16bc.eu.ngrok.io/upland/structure/isdivided'
  return new Promise((resolve, reject) => {
    axios
      .post(url, { eosId: eosid, structureId: propNFTID })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}

export const subDivide = (eosid, propNFTID) => {
  const url =
    'https://7bf4-2003-f8-973e-2100-3893-68b1-83a7-16bc.eu.ngrok.io/upland/structure/divide'
  return new Promise((resolve, reject) => {
    axios
      .post(url, { eosId: eosid, structureId: propNFTID })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}

export const getUserFromApp = (eosid) => {
  const url = `https://7bf4-2003-f8-973e-2100-3893-68b1-83a7-16bc.eu.ngrok.io/upland/user/${eosid}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        console.log('User:', res.data)
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}

export const sendStructureToContainer = (
  containerId,
  propNFTID,
  accessToken
) => {
  const payload = {
    containerId: containerId,
    upxAmount: 10000,
    sparkAmount: 1.5,
    assets: [
      {
        id: propNFTID,
        category: 'structure',
      },
    ],
  }

  const token = `Bearer ${accessToken}`
  console.log(token)

  const headerConfig = {
    headers: {
      Authorization: token,
    },
  }
  const url = `https://api.sandbox.upland.me/developers-api/user/join`
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, headerConfig)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}

export const fetchUpxAmt = () => {
  return axios
    .get(
      `https://multiindex-api.upland.me/accounts/${sessionStorage.getItem(
        'eos_id'
      )}`,
      {
        headers: {
          authorization: sessionStorage.getItem('auth_token'),
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(error)
    })
}

export const getProperties = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://multiindex-api.upland.me/accounts/`, {
        headers: {
          authorization: sessionStorage.getItem('auth_token'),
        },
      })
      .then((res) => {
        console.log(res.data)
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}
