import { cn } from '@monorepo-starter/ui/lib/utils';
import { TableOfContentDataItem, type TableOfContentData } from '@tiptap/extension-table-of-contents';
import { TextSelection } from '@tiptap/pm/state';
import { type Editor } from '@tiptap/react';

export function ToC({ items = [], editor }: { items: TableOfContentData; editor: Editor }) {
  if (items.length === 0) return null;

  const onItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
      const pos = editor.view.posAtDOM(element as Node, 0);
      const tr = editor.view.state.tr;

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

      editor.view.dispatch(tr);
      editor.view.focus();

      if (history.pushState) {
        history.pushState(null, '', `#${id}`);
      }

      window.scrollTo({
        top: (element as HTMLElement).getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="border px-2 py-4 shadow">
      {items.map((item) => (
        <ToCItem onItemClick={onItemClick} key={item.id} item={item} />
      ))}
    </div>
  );
}

function ToCItem({
  item,
  onItemClick,
}: {
  item: TableOfContentDataItem;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  console.log(item);

  return (
    <div
      className={cn(item.isActive && 'text-2xl', item.isScrolledOver && 'text-xl', 'cursor-pointer')}
      style={{
        paddingLeft: `${item.level * 16}px`,
      }}
    >
      <a href={`#${item.id}`} onClick={(e) => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
        {item.textContent}
      </a>
    </div>
  );
}
