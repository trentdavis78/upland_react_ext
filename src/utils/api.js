import axios from 'axios'

export const fetchData = async (url) => {
  const { data } = await axios.get(url)
  return data
}

export const checkSubDivide = (propNFTID) => {
  // const sampleNFTID = '30271'
  const eosid = sessionStorage.getItem('eos_id')
  const url = 'https://7bf4-2003-f8-973e-2100-3893-68b1-83a7-16bc.eu.ngrok.io/upland/structure/isdivided'
  return new Promise((resolve, reject) => {
    
    axios
      .post(url, {eosId:eosid,structureId:propNFTID})
      .then((res) => {
        console.log("Property NFTID:", propNFTID)
        console.log("Is Divided NFTID:",res.data)
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })


  // return new Promise((resolve, reject) => {
    
  //   axios
  //     .post('https://api.coindesk.com/v1/bpi/currentprice.json', {eosId:eosid,structureId:sampleNFTID})
  //     .then((res) => {
  //       if (propNFTID === sampleNFTID) {
  //         res.data.matches = true
  //       } else {
  //         res.data.matches = false
  //       }

  //       resolve(res.data)
  //     })
  //     .catch((err) => reject(err))
  // })

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
