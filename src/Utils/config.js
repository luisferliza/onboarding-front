//const DEFAULT_HOST = "https://wsllx5ewa2.execute-api.us-east-1.amazonaws.com" // DEV
//const DEFAULT_HOST = "https://x8ynl31wad.execute-api.us-east-1.amazonaws.com" // PROD
const DEFAULT_HOST = 'http://localhost:3000' // LOCAL
const ANALYSIS_HOST =
  'https://t43thu37oswnqiveebzud6shqi0xxiof.lambda-url.us-east-1.on.aws/'

const DEFAULT_DELAY = 800

const HOST = process.env.REACT_APP_API_URL || DEFAULT_HOST
export { HOST, ANALYSIS_HOST, DEFAULT_DELAY }
