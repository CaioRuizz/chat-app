import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LoginPage from "./pages/login";
import ListaConversasPage from "./pages/lista-conversas";

type Props = {};

type State = {};

const Stack = createNativeStackNavigator();

export default class Router extends React.Component<Props, State> {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={LoginPage}
                        options={{title: 'Caio Chat - Login'}}
                    />
                    <Stack.Screen
                        name="ListarConversas"
                        component={ListaConversasPage}
                        options={{title: 'Caio Chat - Conversas'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}