import React from "react";
import {Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity} from "react-native";
import Styles from "./Styles";
import Api, { defaultUrl } from "../../services/Api";
import {AxiosResponse} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    navigation: any,
};

type State = {
    url: string,
};

export default class AlteraUrlPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
        this.state = {
            url: '',
        };
    }

    setUrl = (url: string) => {
        this.setState({ url })
    }


    componentDidMount = async () => {
        const url = await AsyncStorage.getItem('url')
        this.setState({
            url: url ?? '',
        })
    }

    handleAlterarUrl = async () => {
        Keyboard.dismiss();
        await AsyncStorage.setItem('url', this.state.url)
        Alert.alert('Aviso', 'Url Alterada com sucesso!')
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={Styles.container}>
                <TextInput
                    value={this.state.url}
                    onChangeText={this.setUrl}
                    autoCapitalize="none"
                    placeholder="Nome de usuário"
                    style={Styles.input}
                />
                <TouchableOpacity style={Styles.button} onPress={this.handleAlterarUrl}>
                    <Text style={Styles.buttonText}>Alterar Url</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}