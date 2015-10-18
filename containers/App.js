import React, {Component} from 'react';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {Provider} from 'react-redux';

import TasksListApp from './TasksListApp';
import configureStore from '../store/configureStore';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <TasksListApp />
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} visibleOnLoad={true} />
        </DebugPanel>
      </div>
    );
  }
}