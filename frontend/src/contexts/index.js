import React from 'react'
import { LoginContext, LoginProvider } from './common/LoginContext';
import { LayoutContext, LayoutProvider } from './common/LayoutContext'
import {Provider} from './common/context'

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider
}

export const ContextManager = (props) => {
  const { children } = props;
  return (
    <Provider>
    <LayoutProvider>
      <LoginProvider>
        {children}
      </LoginProvider>
    </LayoutProvider>
    </Provider>
  )

}
