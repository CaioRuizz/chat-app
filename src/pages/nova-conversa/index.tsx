import React from "react";
import {Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import api from "../../services/Api";
import Styles from "./Styles";

type Props = {
    route: any,
    navigation: any,
}

type State = {
    user: string,
    message: string,
}

export default class NovaConversaPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            message: '',
            user: '',
        }
    }

    setMessage = (message: string) => {
        this.setState({message});
    }

    setUser = (user: string) => {
        this.setState({ user });
    }

    sendMessage = async () => {
        const response = await api.post('/envia-mensagem', JSON.stringify({
            message: this.state.message,
            toUsername: this.state.user,
        }), {
            headers: {
                token: this.props.route.params.token,
            }
        }).catch(() => Alert.alert('Erro', 'Nenhum usuário encontrado com esse username'));

        if (response) this.props.navigation.replace('Conversa', {
            token: this.props.route.params.token,
            user: this.state.user,
        })
    }

    componentDidMount = async () => {

    }

    render() {
        return <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={Styles.container}>
            <View style={Styles.chat}>
                <View style={Styles.linha}>
                    <Text>Enviar para: </Text>
                    <TextInput
                        style={Styles.input}
                        value={this.state.user}
                        onChangeText={this.setUser}
                        placeholder="username"
                    />
                </View>
            </View>
            <View style={Styles.inputView}>
                <TextInput
                    value={this.state.message}
                    onChangeText={this.setMessage}
                    placeholder="Digite sua mensagem"
                    style={Styles.input}
                />
                <TouchableOpacity onPress={this.sendMessage}>
                    <Text style={Styles.emoji}>✔</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    }
}