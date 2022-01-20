import React from 'react';
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

  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  const editor = React.useMemo(() => withReact(createEditor()), []);

  return null;
};

export default Editor;
