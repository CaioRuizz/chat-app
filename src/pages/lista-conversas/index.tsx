import React from "react";
import {Animated, ScrollView, Text, TouchableOpacity} from "react-native";
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
            const response = await api.get('/lista-conversas', {
                headers: {
                    token: this.token,
                }
            });
            const responseObject = JSON.parse(response.data) as ListaConversasResponse;
            console.log(responseObject)
            this.setConversas(responseObject.chatsUsername);
        }

    }

    render() {
        return (
            <ScrollView contentContainerStyle={Styles.container}>
                {this.state.conversas.map((c, i) =>
                    <TouchableOpacity>
                        <View key={i} style={Styles.listElement}>
                            <Text>
                                {c}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        );
    }
}