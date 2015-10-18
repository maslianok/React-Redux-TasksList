import React, { PropTypes, Component } from 'react';
import TaskTextInput from './TaskTextInput';

class NewTask extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTask(text);
    }
  }

  render() {
    return (
      <footer className="footer">
        <TaskTextInput newTask
          onSave={this.handleSave.bind(this)}
          placeholder="New task" />
      </footer>
    );
  }
}

NewTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default NewTask;
