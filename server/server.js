import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '~/public/react-loadable.json'
import { Provider } from 'react-redux'
import configureStore from '&/redux/configureStore'

// Импортируем все необходимое для material-ui
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

import App from '&/app/App'
import MobileApp from '&/mobileApp/App'
import template from './template'

export default function render(url, initialState, mobile) {
  const store = configureStore(initialState)
  const reactRouterContext = {}

  //Создаем объект sheetsRegistry - пока он пустой
  const sheetsRegistry = new SheetsRegistry()
  const sheetsManager = new Map()
  // Создаем тему - можно настроить на любой вкус и цвет
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: {
        main: '#f44336',
      },
    },
    // Это нужно только для версий 3.*.*. Когда будет v4 - удалить
    typography: {
      useNextVariants: true,
    },
  })
  const generateClassName = createGenerateClassName()
  let modules = []
  // Создаем обертку для приложения
  let content = renderToString(
    <StaticRouter location={url} context={reactRouterContext}>
      <Provider store={store} >
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              {mobile === null ? <App/> : <MobileApp/> }
            </Loadable.Capture>
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()
  initialState.mobile = mobile

   // Превращаем модули в бандлы (рассказано дальше)
   let bundles = getBundles(stats, modules)
   // И передаем в HTML-шаблон
   return template(helmet, content, sheetsRegistry, bundles, initialState)
}