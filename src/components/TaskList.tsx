import * as React from 'react';

import { createSelector } from 'reselect';

import { List, ListItem } from '../widgets/List';

import { TaskType } from '../pim-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

const TaskListItem = React.memo((props: { entry: TaskType, onClick: (entry: TaskType) => void }) => {
  const {
    entry,
    onClick,
  } = props;
  const title = entry.title;

  return (
    <ListItem
      primaryText={title}
      onClick={() => onClick(entry)}
    />
  );
});

const sortSelector = createSelector(
  (entries: TaskType[]) => entries,
  (entries) => entries.sort((a, b) => a.title.localeCompare(b.title))
);

interface PropsType {
  entries: TaskType[];
  onItemClick: (entry: TaskType) => void;
}

export default React.memo(function TaskList(props: PropsType) {
  const [showCompleted, setShowCompleted] = React.useState(false);
  const entries = props.entries.filter((x) => showCompleted || !x.finished);
  const sortedEntries = sortSelector(entries);

  const itemList = sortedEntries.map((entry) => {
    const uid = entry.uid;

    return (
      <TaskListItem
        key={uid}
        entry={entry}
        onClick={props.onItemClick}
      />
    );
  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <FormControlLabel
          control={
            <Checkbox checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
          }
          label="Show Completed"
        />
      </div>

      <Divider style={{ marginTop: '1em' }} />
      <List>
        {itemList}
      </List>
    </>
  );
});
