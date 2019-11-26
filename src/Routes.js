import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Contacts from './Pages/Contacts';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MyAccount from './Pages/MyAccount';
import NewContact from './Pages/NewContact';
import Chat from './Pages/Chat';

const Routes = createAppContainer(
    createDrawerNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                drawerLockMode: 'locked-closed',
            },
        },
        Contacts: {
            screen: Contacts,
            navigationOptions: {
                drawerLockMode: 'unlocked',
            },
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
        AddContact: {
            screen: NewContact,
            navigationOptions: {
                drawerLockMode: 'unlocked',
            },
        },
        Chat: {
            screen: Chat,
            navigationOptions: {
                drawerLockMode: 'locked-closed',
            },
        }
    },
    )
);

export default Routes;