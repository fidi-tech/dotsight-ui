import {ReactNode} from 'react';

import {WidgetId} from '@/entities/widget/model';

export type BaseProps = {
  id: WidgetId;
}

type WizardControlsProps = {
  WizardControls?: ReactNode;
}

export type Props = BaseProps & WizardControlsProps;