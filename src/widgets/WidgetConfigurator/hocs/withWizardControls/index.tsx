"use client";

import React, {ComponentType} from 'react';
import {useWizard} from 'react-use-wizard';

import WizardControls from '@/features/WizardControls';
import {Button} from '@/shared/ui';
import {Icons} from '@/shared/ui/icons';

import ShareButton from './components/ShareButton';
import {Props, BaseProps} from '../../types';

export const withWizardControls = (Component: ComponentType<Props>) => {
  const MyComp = (props: BaseProps) => {
    const { previousStep } = useWizard();
    const Controls = (
      <WizardControls
        left={
          <Button
            onClick={previousStep}
            text="Back"
            theme="minor"
            iconPosition="Left"
            icon={
              <div>
                <Icons.OutlinedArrow/>
              </div>
            }
          />
        }
        right={<ShareButton id={props.id}/>}
        percentage={100}
      />
    );

    return (
      <Component {...props} WizardControls={Controls} />
    );
  }
  MyComp.displayName = `withWizardControls(${Component.displayName || Component.name || 'Component'})`;
  return MyComp;
};
