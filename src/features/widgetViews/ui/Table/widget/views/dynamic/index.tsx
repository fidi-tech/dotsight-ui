import {Module} from '@/shared/ui';
import {Table} from '@/shared/ui/Table';
import {Copyrights} from '@/shared/ui/Copyrights';
import {CopyrightsRaw} from '@/shared/api/dotsight';

import styles from './index.module.scss';
import {BaseProps} from '..';

type Props = BaseProps & {
    copyrights: CopyrightsRaw,
}

export const View = ({header, rows, copyrights}: Props) => {
    return (
        <Module className={styles.root}>
            <div className={styles.container}>
                <Table header={header} rows={rows} />
            </div>
            <Copyrights copyrights={copyrights} className={styles.copyright} />
        </Module>
    );
}