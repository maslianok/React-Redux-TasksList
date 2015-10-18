import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NewTask from '../../components/NewTask';
import TaskTextInput from '../../components/TaskTextInput';

function setup() {
  const props = {
    addTask: expect.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<NewTask {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('NewTask', () => {
    it('should render correctly', () => {
      const {output} = setup();

      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');

      const input = output.props.children;

      expect(input.type).toBe(TaskTextInput);
      expect(input.props.newTask).toBe(true);
      expect(input.props.placeholder).toBe('New task');
    });

    it('should call addTask if length of text is greater than 0', () => {
      const {output, props} = setup();
      const input = output.props.children;
      input.props.onSave('');
      expect(props.addTask.calls.length).toBe(0);
      input.props.onSave('Task name');
      expect(props.addTask.calls.length).toBe(1);
    });
  });
});
