'use client';

import { useState } from 'react';
import { WysiwygToolbar } from '~/lib/wysiwyg/toolbar';

export default function WysiwygBasicPage() {
  const [content, setContent] = useState('');

  return (
    <div>
      <WysiwygToolbar content={content} setContent={setContent} />
    </div>
  );
}
