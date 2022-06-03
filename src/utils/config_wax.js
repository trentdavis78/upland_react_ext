let IS_TESTNET = true

var var_WAX_BASE_ENDPOINT = 'https://api.wax.alohaeos.com'
var var_WAX_BASE_ENDPOINT_HOST = 'api.wax.alohaeos.com'
var var_WAX_CHAIN_ID =
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
var var_ATOMIC_BASE_ENDPOINT = 'https://wax.api.atomicassets.io/atomicassets'

var var_COLLECTION_NAME = 'nftgamertv'

if (IS_TESTNET) {
  var_WAX_CHAIN_ID =
    'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12'
  var_WAX_BASE_ENDPOINT_HOST = 'api.waxtest.alohaeos.com'
  var_ATOMIC_BASE_ENDPOINT = 'https://test.wax.api.atomicassets.io/atomicassets'
  var_WAX_BASE_ENDPOINT = 'https://api.waxtest.alohaeos.com'

  var_COLLECTION_NAME = 'nftgamecards'
}

export const WAX_CHAIN_ID = var_WAX_CHAIN_ID
export const ATOMIC_BASE_ENDPOINT = var_ATOMIC_BASE_ENDPOINT
export const WAX_BASE_ENDPOINT = var_WAX_BASE_ENDPOINT
export const WAX_BASE_ENDPOINT_HOST = var_WAX_BASE_ENDPOINT_HOST

export const COLLECTION_NAME = var_COLLECTION_NAME
export const TESTNET = IS_TESTNET
export const ATOMIC_ASSET_URL = 'https://wax.atomichub.io/explorer/asset/'


export const TestContainerID = '437'