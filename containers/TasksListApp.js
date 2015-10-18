import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NewTask from '../components/NewTask';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TasksListActions from '../actions/tasksList';

class TasksListApp extends Component {
  render() {
    const {tasks, actions} = this.props;

    return (
      <div>
        <h1>Tasks List</h1>

        <Header
          tasks={tasks} 
          onToggleAll={actions.toggleAll}
          onMarkAsDoneSelected={() => actions.completeSelectedTasks(true)}
          onMarkAsUndoneSelected={() => actions.completeSelectedTasks(false)}
          onDeleteSelected={actions.deleteSelectedTasks} />

        <MainSection tasks={tasks} actions={actions} />

        <NewTask addTask={actions.addTask} />
      </div>
    );
  }
}

TasksListApp.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TasksListActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListApp);
