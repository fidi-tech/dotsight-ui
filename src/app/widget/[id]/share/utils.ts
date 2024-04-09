import {WidgetId} from '@/entities/widget/model';

export const getRawShareLink = (id: WidgetId) => {
  const {origin, search} = window.location;
  return `${origin}/widget/${id}/share/${search}`;
}