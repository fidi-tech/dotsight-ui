'use client'

import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useRouter } from 'next/navigation'

import {useDispatch} from '@/infra/providers/redux';
import {getCategoriesList} from '@/entities/category/model/providers/getCategoriesList';
import MainLayout from '@/features/mainLayout/ui';
import {withAuth2} from '@/features/HOC/withAuth/ui';
import {StepTitle} from '@/shared/ui/StepTitle';
import {Tile} from '@/shared/ui/Tile';
import {Icons} from '@/shared/ui/icons';
import {NameWithIcon} from '@/shared/ui/NameWithIcon';
import {selectAll} from '@/entities/category/model/selectors';
import {createWidget} from '@/shared/api/dotsight';
import {getCategoryId, getCategoryName} from '@/entities/category/model/getters';
import {CategoryId} from '@/entities/category/model';
import {getWidgetId} from '@/entities/widget/model/getters';

import styles from './index.module.scss';

const ICON_MAP = {
  'wallet': Icons.Wallet,
  'network': Icons.Nodes,
  'token': Icons.Tokens,
}

type Props = {}
const NewWidget = ({}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);
  const categories = useSelector(selectAll);
  const onCreate = useCallback(async (category: CategoryId) => {
    const widget = await createWidget({category, name: 'Untitled widget'});
    router.push(`/v2/widget/${getWidgetId(widget)}`)
  }, [router]);

  return <MainLayout>
    <div className={styles.root}>
      <StepTitle n={1}>
        What would you like to explore?
      </StepTitle>
      <div className={styles.tiles}>
        {categories.map(category => {
          const Icon = ICON_MAP[getCategoryId(category)];
          return (
            <Tile
              className={styles.tile}
              key={getCategoryId(category)}
              onClick={onCreate.bind(this, getCategoryId(category))}
            >
              <NameWithIcon
                Icon={<div className={styles.icon}>{Icon && <Icon />}</div>}
                nameClassName={styles.name}
              >
                {getCategoryName(category)}
              </NameWithIcon>
            </Tile>
          )
        })}
      </div>
    </div>
  </MainLayout>;
}

export default withAuth2(NewWidget);
