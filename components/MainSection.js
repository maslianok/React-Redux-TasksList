import React, {Component, PropTypes} from 'react';

import TaskItem from './TaskItem';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {tasks, actions} = this.props;
    
    return (
      <section className="main">
        <ul className="todo-list">
          {tasks.map(task =>
            <TaskItem key={task.id} task={task} {...actions} />
          )}
        </ul>
      </section>
    );
  }
}

MainSection.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
