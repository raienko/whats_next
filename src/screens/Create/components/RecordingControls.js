import React from 'react';
import Button from 'src/components/Button';

export default function RecordingControls({onSplit, onStop, state}) {
  const hasBreakpoints = state.nodes.length > 1;
  return (
    <>
      <Button text="button_split" onPress={onSplit} />
      {
        hasBreakpoints
        && <Button text="button_finish_episode" onPress={onStop} />
      }
    </>
  );
}
