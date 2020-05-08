import React from 'react';
import Button from 'src/components/Button';
import EpisodeName from './EpisodeName';

export default function ReadyControls({onStart, onEdit, state}) {
  const episode = state.nodes[0];

  const updateEpisode = (changes) => onEdit(episode.id, changes);

  const record = () => onStart(episode.id);

  return (
    <>
      <EpisodeName episode={episode} onEdit={updateEpisode} />
      <Button disabled={!episode.name} text="button_start" onPress={record} />
    </>
  );
}
