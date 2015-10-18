import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TaskItem from '../../components/TaskItem';
import TaskTextInput from '../../components/TaskTextInput';

function setup(editing = false) {
  const props = {
    task: {
      id: 0,
      checked: false,
      completed: false,
      text: 'Task name'
    },
    checkTask: expect.createSpy(),
    editTask: expect.createSpy(),
    deleteTask: expect.createSpy(),
    completeTask: expect.createSpy(),
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TaskItem {...props} />
  );

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('TaskItem', () => {
    it('initial render', () => {
      const {output} = setup();

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      const div = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      const [input, label, deleteBtn, completeBtn] = div.props.children;

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Task name');

      expect(deleteBtn.type).toBe('button');
      expect(deleteBtn.props.className).toBe('destroy');

      expect(completeBtn.type).toBe('button');
      expect(completeBtn.props.className).toBe('complete');
    });

    it('input onChange should call completeTask', () => {
      const {output, props} = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.checkTask).toHaveBeenCalledWith(0);
    });

    it('delete button onClick should call deleteTask', () => {
      const {output, props} = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteTask).toHaveBeenCalledWith(0);
    });

    it('complete button onClick should call completeTask', () => {
      const {output, props} = setup();
      const button = output.props.children.props.children[3];
      button.props.onClick({});
      expect(props.completeTask).toHaveBeenCalledWith(0);
    });

    it('label onDoubleClick should put component in edit state', () => {
      const {output, renderer} = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });

    it('edit state render', () => {
      const { output } = setup(true);

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      const input = output.props.children;
      expect(input.type).toBe(TaskTextInput);
      expect(input.props.text).toBe('Task name');
      expect(input.props.editing).toBe(true);
    });

    it('TaskTextInput onSave should call editTask', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave('Task name');
      expect(props.editTask).toHaveBeenCalledWith(0, 'Task name');
    });

    it('TaskTextInput onSave should call deleteTask if text is empty', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave('');
      expect(props.deleteTask).toHaveBeenCalledWith(0);
    });

    it('TaskTextInput onSave should exit component from edit state', () => {
      const {output, renderer} = setup(true);
      output.props.children.props.onSave('Use Redux');
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
