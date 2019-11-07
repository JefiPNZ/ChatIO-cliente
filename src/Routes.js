import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Contacts from './Pages/Contacts';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MyAccount from './Pages/MyAccount';

const Routes = createAppContainer(
    createDrawerNavigator({
        Contacts: {
            screen: Contacts,
            navigationOptions: {
                drawerLockMode: 'unlocked',
            },
        },
        Login: {
            screen: Login,
            navigationOptions: {
                drawerLockMode: 'locked-closed',
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                drawerLockMode: 'locked-closed',
            },
        },
        MyAccount: {
            screen: MyAccount,
            navigationOptions: {
                drawerLockMode: 'unlocked',
            },
        },

    },
    )
);

export default Routes;