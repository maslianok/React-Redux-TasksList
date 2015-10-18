import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TaskTextInput from '../../components/TaskTextInput';

function setup(propOverrides) {
  const props = Object.assign({
    onSave: expect.createSpy(),
    text: 'Task name',
    placeholder: 'What needs to be done?',
    editing: false,
    newTask: false
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TaskTextInput {...props} />
  );

  let output = renderer.getRenderOutput();

  output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('TaskTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.props.placeholder).toEqual('What needs to be done?');
      expect(output.props.value).toEqual('Task name');
      expect(output.props.className).toEqual('');
    });

    it('should render correctly when editing=true', () => {
      const {output} = setup({editing: true});
      expect(output.props.className).toEqual('edit');
    });

    it('should render correctly when newTask=true', () => {
      const {output} = setup({newTask: true});
      expect(output.props.className).toEqual('new-task');
    });

    it('should update value on change', () => {
      const {output, renderer} = setup();
      output.props.onChange({target: {value: 'Run the tests'}});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('Run the tests');
    });

    it('should call onSave on return key press', () => {
      const {output, props} = setup();
      output.props.onKeyDown({which: 13, target: {value: 'Task name'}});
      expect(props.onSave).toHaveBeenCalledWith('Task name');
    });

    it('should reset state on return key press if newTask', () => {
      const {output, renderer} = setup({newTask: true});
      output.props.onKeyDown({which: 13, target: {value: 'Task name'}});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('');
    });

    it('should call onSave on blur', () => {
      const {output, props} = setup();
      output.props.onBlur({ target: {value: 'Task name'}});
      expect(props.onSave).toHaveBeenCalledWith('Task name');
    });

    it('shouldnt call onSave on blur if newTask', () => {
      const {output, props} = setup({newTask: true});
      output.props.onBlur({ target: {value: 'Task name'}});
      expect(props.onSave.calls.length).toBe(0);
    });
  });
});
