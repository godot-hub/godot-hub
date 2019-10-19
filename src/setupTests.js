import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure enzyme to work with jest
configure({ adapter: new Adapter() });

// configure jest to use jest-fetch-mock
global.fetch = require('jest-fetch-mock');