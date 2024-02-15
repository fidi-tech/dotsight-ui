import {useState} from 'react';

import widgets from '@/features/widgetViews/ui';

const TYPES = Object.values(widgets).map(widget => ({
  id: widget.type,
  name: widget.title,
  Icon: widget.Icon,
  isAvailable: true,
}))

export const useTypes = () => {
  const [selected, onSelect] = useState(TYPES[0].id);
  const [query, setQuery] = useState('');
  return {
    types: TYPES.filter(type => !query || type.name.includes(query)).map(type => ({
      ...type,
      isSelected: selected.includes(type.id),
    })),
    query,
    setQuery,
    onSelect,
  }
}