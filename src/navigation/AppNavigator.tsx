import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ApplicationsScreen from '../screens/ApplicationsScreen';
import AddEditApplicationScreen from '../screens/AddEditApplicationScreen';
import ApplicationDetailsScreen from '../screens/ApplicationDetailsScreen';

export type RootStackParamList = {
    Home: undefined;
    Applications: undefined;
    AddEditApplication: { application?: any } | undefined;
    ApplicationDetails: { application: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#1a1a2e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: '700' },
                    contentStyle: { backgroundColor: '#f7f8fa' },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Interview Vault' }}
                />
                <Stack.Screen
                    name="Applications"
                    component={ApplicationsScreen}
                    options={{ title: 'My Applications' }}
                />
                <Stack.Screen
                    name="AddEditApplication"
                    component={AddEditApplicationScreen}
                    options={{ title: 'Add Application' }}
                />
                <Stack.Screen
                    name="ApplicationDetails"
                    component={ApplicationDetailsScreen}
                    options={{ title: 'Application Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
