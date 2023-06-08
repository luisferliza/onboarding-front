//const DEFAULT_HOST = "https://wsllx5ewa2.execute-api.us-east-1.amazonaws.com" // DEV
const DEFAULT_HOST = 'https://qbym7i07xk.execute-api.us-east-1.amazonaws.com' // PROD
//const DEFAULT_HOST = 'http://localhost:3000' // LOCAL
const ANALYSIS_HOST =
  'https://t43thu37oswnqiveebzud6shqi0xxiof.lambda-url.us-east-1.on.aws/'

const DEFAULT_DELAY = 800
const DRAWER_COLOR = '#202e3c'
//const DRAWER_COLOR = '#0088CC'

const HOST = process.env.REACT_APP_API_URL || DEFAULT_HOST
export { HOST, ANALYSIS_HOST, DEFAULT_DELAY, DRAWER_COLOR }
