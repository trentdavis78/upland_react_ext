import React, { useState, useEffect } from 'react'
import { fetchAssets } from '../../utils/atomic.assets.api'
import { withUAL } from 'ual-reactjs-renderer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const NoAssets = (props) => {
  return (
    <Box minH={200} w="100vw" p={60} textAlign="center">
      <p>You don't have any Room NFTs...</p>

      <a
        href={
          'https://wax.atomichub.io/market?collection_name=immersys&schema_name=properties'
        }
        target="_blank"
        rel="noreferrer"
      >
        <button>Buy on AtomicHub</button>
      </a>
    </Box>
  )
}

const Furnish = (props) => {
  const [loading, setLoading] = useState(true)
  const [propertyAssetData, setPropertyAssetData] = useState([])
  const accountName = 'msmqw.wam'
  const url = `https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=immersys&schema_name=crafted&owner=msmqw.wam&page=1&limit=100&order=desc&sort=asset_id`
  useEffect(() => {
    fetchAssets(url)
      .then((res) => {
        setPropertyAssetData(res.data)
        console.log(setPropertyAssetData)
      })
      .catch((err) => console.log(err.response))

    setLoading(false)
  }, [])

  return (
    <>
      {propertyAssetData?.length <= 0 ? (
        <NoAssets />
      ) : (
        propertyAssetData?.map((data, index) => {
          console.log(data)
          return (
            <Grid
              key={index}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 250,
                height: 350,
                margin: '40px auto 0',
              }}
            >
              <img
                style={{ width: 200 }}
                src={`https://ipfs.atomichub.io/ipfs/${data?.template.immutable_data.img}`}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
              >
                Furnish
              </Button>
            </Grid>
          )
        })
      )}
    </>
  )
}

export default Furnish
