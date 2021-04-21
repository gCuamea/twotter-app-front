import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'animate.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { AppRouter } from './routers/AppRouter';

export const TwotterApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <AppRouter />
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
};

const theme = {
  primaryColor: '#35b7bc',
  primaryColorLight: '#97dfe2',
  primaryColorVeryLight: '#e6fff8',
  primaryColorDark: '#134345',
};

const AppContainer = styled.div`
  height: 100%;
  width: 100vw;
`;
