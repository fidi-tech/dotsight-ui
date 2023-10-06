import {Provider} from 'react-redux';
import {store} from './redux';

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}
