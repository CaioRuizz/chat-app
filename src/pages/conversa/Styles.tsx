import {StyleSheet} from "react-native";

const _default = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        marginBottom: 20,
    },
    chat: {
        margin: 5,
    },
    cell: {
        margin: 3,
        backgroundColor: '#ddd',
        borderRadius: 10
    },
    input: {
        borderWidth: 1,
        marginRight: 5,
        padding: 5,
        flex: 1,
    },
    inputView: {
        flexDirection: 'row',
        margin: 10,
    },
    emoji: {
        fontSize: 40,
    },
    received: {
        marginRight: '30%',
    },
    sent: {
        backgroundColor: '#aaddaa',
        marginLeft: '30%',
    }
});

export default _default;