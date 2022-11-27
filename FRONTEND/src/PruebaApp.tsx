import { Provider } from 'react-redux';
import { store } from './store/store';

import { AppRouter } from './routes/AppRouter';

const PruebaApp = () => {
   return (
      <>
         <Provider store={store}>
            <AppRouter />
         </Provider>
      </>
   )
}

export default PruebaApp;