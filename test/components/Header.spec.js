import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../components/Header';

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
    }],
    onToggleAll: expect.createSpy(),
    onMarkAsDoneSelected: expect.createSpy(),
    onMarkAsUndoneSelected: expect.createSpy(),
    onDeleteSelected: expect.createSpy()
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output
  };
}

describe('components', () => {
  describe('Header', () => {
    it('should render container', () => {
      const {output} = setup();
      expect(output.type).toBe('header');
      expect(output.props.className).toBe('header');
    });

    it('should display completed value', () => {
      const {output} = setup();
      const [, completedProgress] = output.props.children;
      expect(completedProgress.type).toBe('div');
      expect(completedProgress.props.className).toBe('task-count');
    });

    it('should render group actions', () => {
      const {output} = setup();
      const [,, groupActions] = output.props.children;
      expect(groupActions.type).toBe('ul');
      expect(groupActions.props.className).toBe('available-actions-list');
      expect(groupActions.props.children.length).toBe(3);
      groupActions.props.children.forEach(function checkAction(groupAction, i) {
        expect(groupAction.type).toBe('li');
        const a = groupAction.props.children;
        expect(a.props.children).toBe({
          0: 'Done',
          1: 'Undone',
          2: 'Delete'
        }[i]);
      });
    });

    it('should disable groupActions when nothing selected', () => {
      const {output, props} = setup({tasks: []});
      const [,, groupActions] = output.props.children;
      groupActions.props.children.forEach(function checkAction(groupAction, i) {
        expect(groupAction.props.children.props.className).toBe('group-action disabled');
      });
    });

    it('should call onMarkAsDoneSelected when Done is clicked', () => {
      const {output, props} = setup({
        tasks: [{
          text: 'Task name',
          checked: true,
          completed: false,
          id: 0
        }]
      });
      const [,, groupActions] = output.props.children;
      const doneLink = groupActions.props.children[0].props.children;
      doneLink.props.onClick({});
      expect(props.onMarkAsDoneSelected).toHaveBeenCalled();
    });

    it('should call onMarkAsUndoneSelected when Undone is clicked', () => {
      const {output, props} = setup({
        tasks: [{
          text: 'Task name',
          checked: true,
          completed: true,
          id: 0
        }]
      });
      const [,, groupActions] = output.props.children;
      const undoneLink = groupActions.props.children[1].props.children;
      undoneLink.props.onClick({});
      expect(props.onMarkAsUndoneSelected).toHaveBeenCalled();
    });

    it('should call onDeleteSelected when Delete is clicked', () => {
      const {output, props} = setup({
        tasks: [{
          text: 'Task name',
          checked: true,
          completed: false,
          id: 0
        }]
      });
      const [,, groupActions] = output.props.children;
      const deleteLink = groupActions.props.children[2].props.children;
      deleteLink.props.onClick({});
      expect(props.onDeleteSelected).toHaveBeenCalled();
    });
  });
});
