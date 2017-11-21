import 'babel-polyfill';
import 'nodelist-foreach';

import './utils/errors';
import './utils/images';
import Env from './utils/env';

console.log(Env.isDesktop());
console.log(Env.isLandscape());
