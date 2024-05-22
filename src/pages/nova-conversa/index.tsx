import React from "react";
import {Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import api, { defaultUrl } from "../../services/Api";
import Styles from "./Styles";
import {Picker, PickerIOS} from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    route: any,
    navigation: any,
}

type State = {
    user: string,
    message: string,
    users: string[],
}

type usernamesApiResponse  = {
    username: string,
}

export default class NovaConversaPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            message: '',
            user: '',
            users: [],
        }
    }

    setMessage = (message: string) => {
        this.setState({message});
    }

    setUser = (user: string) => {
        this.setState({ user });
    }

    sendMessage = async () => {
        const url = (await AsyncStorage.getItem('url')) ?? defaultUrl;
        const response = await api(url).post('/envia-mensagem', JSON.stringify({
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
        const url = (await AsyncStorage.getItem('url')) ?? defaultUrl;
        const response = await api(url).get('/lista-usuarios',{
            headers: {
                token: this.props.route.params.token,
            }
        })
        const users = response.data.map((d: usernamesApiResponse) => d.username)
        this.setState({ users })
        // console.log(users)
        // console.log(Date.now())
    }


    render = () => {
        // console.log(this.state)
        return <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={Styles.container}>
            <View style={Styles.chat}>
                <View style={Styles.linha}>
                    <Text style={{marginTop: 20}}>Enviar para: </Text>
                    <Picker
                        selectedValue={this.state.user}
                        onValueChange={(value) => {
                            this.setState({user: value})
                        }}
                        style={{
                            width: 300,
                            height: 50,
                        }}
                        enabled={true}
                    >
                        {this.state.users.map(u => (
                            <Picker.Item label={u} value={u} key={u} />
                        ))}
                    </Picker>
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