import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LoginPage from "./pages/login";
import ListaConversasPage from "./pages/lista-conversas";
import ConversaPage from "./pages/conversa";
import NovaConversaPage from "./pages/nova-conversa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUrl } from "./services/Api";
import AlteraUrlPage from "./pages/altera-url";
import { Image, TouchableOpacity } from "react-native";
import Zap from '../assets/zap.png'

type Props = {};

type State = {};

const Stack = createNativeStackNavigator();

export default class Router extends React.Component<Props, State> {
    async componentDidMount() {
        const url = await AsyncStorage.getItem('url')
        if (!url) await AsyncStorage.setItem('url', defaultUrl)
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={LoginPage}
                        options={({navigation}) => ({
                            title: 'Chat - Login',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AlteraUrl')}>
                                    <Image source={Zap} style={{width: 50, height: 50}} />
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <
                        Stack.Screen
                        name="ListarConversas"
                        component={ListaConversasPage}
                        options={({navigation}) => ({
                            title: 'Chat - Conversas',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AlteraUrl')}>
                                    <Image source={Zap} style={{width: 50, height: 50}} />
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen
                        name="Conversa"
                        component={ConversaPage}
                        options={({navigation}) => ({
                            title: 'Chat - Conversa',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AlteraUrl')}>
                                    <Image source={Zap} style={{width: 50, height: 50}} />
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen
                        name="NovaConversa"
                        component={NovaConversaPage}
                        options={({navigation}) => ({
                            title: 'Chat - Nova Conversa',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AlteraUrl')}>
                                    <Image source={Zap} style={{width: 50, height: 50}} />
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen
                        name="AlteraUrl"
                        component={AlteraUrlPage}
                        options={{title: 'Chat - Alterar Url da API'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}