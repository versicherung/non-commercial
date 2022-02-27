import ReactDOM from 'react-dom';
import nProgress from 'nprogress';
import App from './App';

import './index.less';

nProgress.configure({ showSpinner: false });

ReactDOM.render(<App />, document.getElementById('root'));
