import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MainSection from '../../components/MainSection';
import TaskItem from '../../components/TaskItem';

function setup(propOverrides) {
  const props = Object.assign({
    tasks: [{
      text: 'Task name',
      checked: false,
      completed: false,
      id: 0
    }, {
      text: 'Run the tests',
      checked: false,
      completed: true,
      id: 1
    }, {
      text: 'Fix the tests',
      checked: true,
      completed: false,
      id: 2
    }],
    actions: {
      addTask: expect.createSpy(),
      deleteTask: expect.createSpy(),
      editTask: expect.createSpy(),
      completeTask: expect.createSpy(),
      checkTask: expect.createSpy(),
      toggleAll: expect.createSpy(),
      deleteSelectedTasks: expect.createSpy(),
      completeSelectedTasks: expect.createSpy()
    }
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<MainSection {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const {output} = setup();
      expect(output.type).toBe('section');
      expect(output.props.className).toBe('main');
    });

    describe('todo list', () => {
      it('should render', () => {
        const {output, props} = setup();
        const list = output.props.children;
        expect(list.type).toBe('ul');
        expect(list.props.children.length).toBe(3);
        list.props.children.forEach((item, i) => {
          expect(item.type).toBe(TaskItem);
          expect(item.props.task).toBe(props.tasks[i]);
        });
      });
    });
  });
});
