import React, { ReactEventHandler, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

export type EditorProps = {
  initialValue?: Array<Descendant>;
  onChange?: (value: Array<Descendant>) => void;
  placeholder?: string;
};

const DEFAULT_VALUE: Array<Descendant> = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const Editor: React.FunctionComponent<EditorProps> = (props) => {
  const { initialValue = DEFAULT_VALUE, onChange, placeholder } = props;

  const [editor] = useState(() => withReact(createEditor()));

  const [value, setValue] = React.useState(initialValue);

  const handleChange = React.useCallback((value: Array<Descendant>) => {
    console.log(value);
    setValue(value);
  }, []);

  const handleSelect: ReactEventHandler<HTMLElement> = React.useCallback(
    (e) => {
      const { selection } = editor;

      console.log(selection);
    },
    [editor],
  );

  React.useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <Slate editor={editor} value={initialValue} onChange={handleChange}>
      <Editable onSelect={handleSelect} />
    </Slate>
  );
};

export default Editor;
