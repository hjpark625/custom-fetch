import 'server-only';
import Rollbar from 'rollbar';
import packageJson from '../../../package.json';

const nodeEnv = process.env.NODE_ENV;
const rollbarServerToken = process.env.NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN;

const rollbarConfig = {
  accessToken: rollbarServerToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: nodeEnv === 'development' ? 'local' : 'prod',
  code_version: packageJson.version
};

if (!['production'].includes(`${nodeEnv}`)) {
  rollbarConfig.accessToken = '';
}

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
