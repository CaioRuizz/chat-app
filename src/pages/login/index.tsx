import React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity} from "react-native";
import Styles from "./Styles";
import Api, { defaultUrl } from "../../services/Api";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    navigation: any,
};

type State = {
    username: string,
};

type AuthResponse = {
    user: string,
    username: string,
    token: string,
    message: string,
}

export default class LoginPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
        this.state = {
            username: '',
        };
    }

    setUsername = (username: string) => {
        this.setState({ username })
    }

    sendApiCallLogin = async (username: string) => {
        // console.log(`autenticando ${username}`)
        const url = (await AsyncStorage.getItem('url')) ?? defaultUrl;
        console.log(username.toLocaleLowerCase())
        return await Api(url).post('/login', JSON.stringify({
            username: username.toLowerCase(),
        }));
    }

    componentDidMount = async () => {
        // await this.authenticate();
    }

    authenticate = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            this.props.navigation.navigate('ListarConversas', {
                token,
            });
        }
    }

    handleLogin = async () => {
        Keyboard.dismiss();

        const response: AxiosResponse = await this.sendApiCallLogin(this.state.username);

        // console.log(response)

        if (response.status == 201) {
            const responseBody = typeof response.data === 'object' ?
                response.data :
                JSON.parse(response.data) as AuthResponse;
            await AsyncStorage.setItem('token', responseBody.token);
            await this.authenticate();
        }

        else {
            console.log(response.status)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={Styles.container}>
                <TextInput
                    value={this.state.username}
                    onChangeText={this.setUsername}
                    autoCapitalize="none"
                    placeholder="Nome de usuário"
                    style={Styles.input}
                />
                <TouchableOpacity style={Styles.button} onPress={this.handleLogin}>
                    <Text style={Styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}