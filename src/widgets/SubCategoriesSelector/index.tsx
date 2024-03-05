import React, {useCallback, useMemo} from 'react';
import { useWizard } from 'react-use-wizard';

import WizardControls from '@/features/WizardControls';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';
import {StepTitle} from '@/shared/ui/StepTitle';
import {Module} from '@/shared/ui/Module';
import TilesSelector from '@/features/TilesSelector';
import {CategoryId} from '@/entities/category/model';
import {NameWithIcon} from '@/shared/ui/NameWithIcon';
import {getSubCategoryIcon, getSubCategoryName} from '@/entities/subCategory/model/getters';
import {SubCategory} from '@/entities/subCategory/model';

import styles from './index.module.scss';
import {useEnhance} from './hocs';
import {Title} from './components/Title';

type Props = {
  id: string;
}

const TITLES_MAP = {
  [CategoryId.wallet]: 'Search for Wallet',
  [CategoryId.network]: 'Available Networks',
  [CategoryId.token]: 'Search for Token',
}
const PLACEHOLDER_MAP = {
  [CategoryId.wallet]: 'Type in wallet address, ens...',
  [CategoryId.network]: 'Search for Networks/Protocols, Key words...',
  [CategoryId.token]: 'Search for Tokens...',
}

const SubCategoriesSelector = ({id}: Props) => {
  const { nextStep } = useWizard();
  const {
    categoryId,
    subCategories,
    onSelectSubCategory,
    query,
    setQuery,
    isCompleted,
  } = useEnhance(id);

  const renderSubCategory = useCallback((subCategory: SubCategory) =>
      <NameWithIcon
        Icon={getSubCategoryIcon(subCategory) &&
          <img
            alt={getSubCategoryName(subCategory)}
            src={getSubCategoryIcon(subCategory) || undefined}
            className={styles.tileIcon}
          />
        }
      >
        {getSubCategoryName(subCategory)}
      </NameWithIcon>
    , []);

  const sections = useMemo(() => [
    {id: 'subcategories', tiles: subCategories, renderTile: renderSubCategory, onSelect: onSelectSubCategory},
  ], [subCategories, renderSubCategory, onSelectSubCategory]);

  if (!categoryId) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <StepTitle n={2}>
          <Title categoryId={categoryId} />
        </StepTitle>
        <Module className={styles.module}>
          <TilesSelector
            title={TITLES_MAP[categoryId]}
            placeholder={PLACEHOLDER_MAP[categoryId]}
            query={query}
            sections={sections}
            setQuery={setQuery}
          />
        </Module>
      </div>
      <div className={styles.controls}>
        <WizardControls
          right={
            <Button
              onClick={nextStep}
              text="Next"
              icon={
                <div className={styles.nextIcon}>
                  <Icons.OutlinedArrow />
                </div>
              }
              disabled={!isCompleted}
            />
          }
          percentage={33}
        />
      </div>
    </div>
  )
}

export default SubCategoriesSelector;
