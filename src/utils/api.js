import axios from 'axios'

export const fetchData = async (url) => {
  const { data } = await axios.get(url)
  return data
}

export const checkSubDivide = (propNFTID) => {
  const sampleNFTID = 3831
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((res) => {
        if (propNFTID === sampleNFTID) {
          res.data.matches = true
        } else {
          res.data.matches = false
        }

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
