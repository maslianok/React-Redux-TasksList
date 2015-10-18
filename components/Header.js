import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';

class Header extends Component {
  renderTasksProgress(totalCount, completedCount) {
    if (totalCount) {
      return (
        <div className="task-count">
          {(completedCount / totalCount * 100).toFixed(2) + '% completed'}
        </div>
      );
    }
  }

  renderLink(title, action, isActive) {
    return (
      <li>
        <a 
          className={classnames({
            'group-action': 1,
            'disabled': !isActive
          })} 
          onClick={isActive ? action : ()=>{}}>
          
          {title}
        </a>
      </li>
    );
  }

  render() {
    const {
      onMarkAsDoneSelected, 
      onMarkAsUndoneSelected, 
      onDeleteSelected,
      onToggleAll,
      tasks
    } = this.props;

    const totalCount = tasks.length;
    const checkedCount = tasks.reduce((count, task) => task.checked ? count + 1 : count, 0);
    const completedCount = tasks.reduce((count, task) => task.completed ? count + 1 : count, 0);

    const atLeastOneChecked = this.props.tasks.some(task => task.checked);
    const atLeastOneUndone = this.props.tasks.some(task => task.checked && !task.completed);
    const atLeastOneDone = this.props.tasks.some(task => task.checked && task.completed);

    return (
      <header className={classnames({header: totalCount})}>
        <div className="toggle-all-wrapper">
          <input type="checkbox"
            className={classnames({
              'toggle-all': 1,
              hidden: !totalCount
            })}          
            checked={totalCount && checkedCount === totalCount}
            onChange={onToggleAll} />
        </div>

        {this.renderTasksProgress(totalCount, completedCount)}

        <ul className="available-actions-list">
          {this.renderLink('Done', onMarkAsDoneSelected, atLeastOneUndone)}
          {this.renderLink('Undone', onMarkAsUndoneSelected, atLeastOneDone)}
          {this.renderLink('Delete', onDeleteSelected, atLeastOneChecked)}
        </ul>
      </header>
    );
  }
}

Header.propTypes = {
  tasks: PropTypes.array.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  onMarkAsDoneSelected: PropTypes.func.isRequired,
  onMarkAsUndoneSelected: PropTypes.func.isRequired,
  onDeleteSelected: PropTypes.func.isRequired
};

export default Header;
