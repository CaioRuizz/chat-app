import {StyleSheet} from "react-native";

const _default = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        width: '50%',
        height: 60,
        padding: 10,
        borderRadius: 20,
        margin: 20,
    },
    button: {
        backgroundColor: 'lightblue',
        width: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20
    }
});

export default _default;