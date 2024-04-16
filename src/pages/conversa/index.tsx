import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../../services/Api";
import Styles from "./Styles";

type Props = {
    route: any;
};

type Message = {
    message: string;
    received: boolean;
    sentAt: string;
};

type State = {
    messages: Message[];
    message: string;
};

export default class ConversaPage extends React.Component<Props, State> {
    estaBuscando = false;
    scrollViewRef: React.RefObject<ScrollView>;

    constructor(props: Props) {
        super(props);
        this.scrollViewRef = React.createRef();
        this.state = {
            messages: [],
            message: "",
        };
    }

    componentDidMount = async () => {
        const response = await api.get(
            `/ler-conversa/${this.props.route.params.user}`,
            {
                headers: {
                    token: this.props.route.params.token,
                },
            }
        );
        const responseData = (typeof response.data === "object"
            ? response.data
            : JSON.parse(response.data)) as Message[];
        this.setState({
            messages: responseData.sort(
                (a, b) =>
                    new Date(a.sentAt).valueOf() - new Date(b.sentAt).valueOf()
            ),
        });

        if (!this.estaBuscando) {
            const callback = () => {
                setTimeout(() => {
                    this.componentDidMount();
                    callback();
                }, 5000);
            };
            callback();
            this.estaBuscando = true;
        }

        // Scroll para o final
        if (this.scrollViewRef.current) {
            this.scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    setMessage = (message: string) => {
        this.setState({ message });
    };

    sendMessage = async () => {
        await api.post(
            "/envia-mensagem",
            JSON.stringify({
                message: this.state.message,
                toUsername: this.props.route.params.user,
            }),
            {
                headers: {
                    token: this.props.route.params.token,
                },
            }
        );
        this.setState({ message: "" });
        await this.componentDidMount();
    };

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={Styles.container}
            >
                <ScrollView
                    ref={this.scrollViewRef}
                    style={Styles.chat}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
                >
                    <Text>Conversa com {this.props.route.params.user}</Text>
                    {this.state.messages.map((m, i) => {
                        return (
                            <View
                                key={i}
                                style={[Styles.cell, m.received ? Styles.received : Styles.sent]}
                            >
                                <Text>{m.message}</Text>
                                <Text>
                                    {new Date(m.sentAt).toLocaleDateString("pt-br")} -{" "}
                                    {new Date(m.sentAt).toLocaleTimeString("pt-br")}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
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
        );
    }
}
