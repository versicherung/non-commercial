import { FC } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from '@arco-design/web-react';
import PageLayout from './components/Layout';

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
            <Route path="*" element={<PageLayout />} />
          </Routes>
        </ConfigProvider>
      </RecoilRoot>
    </HashRouter>
  );
};

export default App;
