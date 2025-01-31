import React, { useContext, Suspense } from 'react';
import AuthContext from '../context/AuthProvider';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Loader } from '../AtomicComponents/Loader';

// Lazy load your screens
const LoginScreeen = React.lazy(() => import('../screens/auth/Login'));
const InvoiceList = React.lazy(() => import('../screens/Invoice/InvoiceList'));
const Mainstack = React.lazy(() => import('./Mainstack'));
const AddInvoice = React.lazy(() => import('../screens/Invoice/AddInvoice'));
const AddLineItem = React.lazy(() => import('../screens/Invoice/AddSaleInvoice'));

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense fallback={<Loader />}>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Mainstack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sales Invoice"
            component={InvoiceList}
            options={{
              headerTopInsetEnabled: false,
            }}
          />
          <Stack.Screen
            name="Add Sales Invoice"
            component={AddInvoice}
            options={{
              headerTopInsetEnabled: false,
            }}
          />
          <Stack.Screen
            name="Add Line Item"
            component={AddLineItem}
            options={{
              headerTopInsetEnabled: false,
            }}
          />
          <Stack.Screen
            name="Edit Sales Invoice"
            component={AddInvoice}
            options={{
              headerTopInsetEnabled: false,
            }}
          />
          <Stack.Screen
            name="Edit Line Item"
            component={AddLineItem}
            options={{
              headerTopInsetEnabled: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreeen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </Suspense>
  );
}
