import { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from '@arco-design/web-react';
import PageLayout from './components/Layout';
import Login from './pages/login';

const App: FC = () => {
  return (
    <HashRouter>
      <RecoilRoot>
        <ConfigProvider
          componentConfig={{
            Card: {
              bordered: false,
            },
            List: {
              bordered: false,
            },
            Table: {
              border: false,
            },
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageLayout />} />
          </Routes>
        </ConfigProvider>
      </RecoilRoot>
    </HashRouter>
  );
};

export default App;
