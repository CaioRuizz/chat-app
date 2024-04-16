import React from "react";
import {Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity} from "react-native";
import Styles from "./Styles";
import Api from "../../services/Api";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    navigation: any,
};

type State = {
    email: string,
    username: string,
    isSettingUsername: boolean,
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
            email: '',
            username: '',
            isSettingUsername: false,
        };
    }

    setEmail = (email: string) => {
        this.setState({ email })
    }

    setUsername = (username: string) => {
        this.setState({ username })
    }

    setUsernameOnApi = async (email: string, username: string) => {
        return await Api.post('/altera-username', JSON.stringify({
            email,
            username,
        }));
    }

    sendApiCallLogin = async (email: string) => {
        return await Api.post('/login', JSON.stringify({
            email
        }));
    }

    componentDidMount = async () => {
        await this.authenticate();
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

        if (this.state.isSettingUsername) {
            const response = await this.setUsernameOnApi(this.state.email, this.state.username);
            if (response.status != 200) return console.log(response.data);
        }
        const response: AxiosResponse = await this.sendApiCallLogin(this.state.email);

        if ([403, 201].includes(response.status)) {
            this.setState({ isSettingUsername: true });
        }

        else if (response.status == 200) {
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
                    value={this.state.email}
                    onChangeText={this.setEmail}
                    placeholder="E-mail"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={Styles.input}
                />
                {this.state.isSettingUsername && (
                    <TextInput
                        value={this.state.username}
                        onChangeText={this.setUsername}
                        autoCapitalize="none"
                        placeholder="Nome de usuário"
                        style={Styles.input}
                    />
                )}
                <TouchableOpacity style={Styles.button} onPress={this.handleLogin}>
                    <Text style={Styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}