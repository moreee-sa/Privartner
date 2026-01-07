import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import Home from '@pages/Home';
import AddContactPage from '@pages/Add';
import ContactPage from '@pages/Contact';
import { Provider } from 'react-redux';
import { store } from './state/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddContactPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/contact/:id' element={<ContactPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>
)