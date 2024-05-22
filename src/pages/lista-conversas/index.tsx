import React from "react";
import {Animated, Button, ScrollView, Text, TouchableOpacity} from "react-native";
import Styles from "./Styles";
import View = Animated.View;
import api from "../../services/Api";

type Props = {
    token: string,
    navigation: any,
    route: any,
};

type State = {
    conversas: string[],
};

type ListaConversasResponse = {
    chatsUsername: string[],
};

export default class ListaConversasPage extends React.Component<Props, State> {
    private token: string | null = null;
    constructor(props: Props) {
        super(props);
        this.state = {
            conversas: [],
        };
    }

    setConversas = (conversas: string[]) => {
        this.setState({
            conversas,
        });
    }

    componentDidMount = async () => {
        this.token = this.props?.route?.params?.token;
        if (this.token) {
            // console.log(this.token)
            this.loadConversa()
        }
    }

    loadConversa = async () => {
        const response = await api.get('/lista-conversas', {
            headers: {
                token: this.token,
            }
        });
        const responseObject = typeof response.data === 'object' ?
            response.data :
            JSON.parse(response.data) as ListaConversasResponse;
        this.setConversas(responseObject.chatsUsername);
    }

    consversarCom = (user: string) => {
        this.props.navigation.navigate('Conversa', {
            user,
            token: this.props.route.params.token,
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={Styles.container}>
                <Button title="Recarregar" onPress={this.loadConversa} />
                <TouchableOpacity onPress={() => this.consversarCom('')}>
                    <View style={Styles.listElement}>
                        <Text>
                            Chat Global
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.state.conversas.map((c, i) =>
                    <TouchableOpacity key={i} onPress={() => this.consversarCom(c)}>
                        <View style={Styles.listElement}>
                            <Text>
                                {c}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('NovaConversa', {
                        token: this.props.route.params.token,
                    })
                }}>
                    <View style={Styles.listElement}>
                        <Text>
                            Nova Conversa
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}