import { Constants } from 'expo';

const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(':').shift().concat(':8080')
  : 'api.example.com';

export { api as default };
