import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contactName: {
        fontSize: 22,
    },
    contactDescription: {

    },
    container: {
        alignContent: 'stretch',
        borderColor: '#ff5900',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 4,
        padding: 10,
    },
    icon: {
        marginTop: 15,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-end',
        position: 'absolute',
        width: '100%',
    },
    textContainer: {
        width: '80%',
    },
    modalCloseButton: {
        backgroundColor: '#34eb58',
        height: 44,
        width: 150,
        borderRadius: 4,
        margin: 10,
        padding: 5,
    },
    modalDeleteButton: {
        backgroundColor: '#eb4f34',
        height: 44,
        width: 150,
        borderRadius: 4,
        margin: 10,
        padding: 5,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: '#ff5900',
        borderWidth: 2,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalButtonContainer: {
        flexDirection: 'row',
    },
    modalText: {
        fontSize: 30,
        marginBottom: 50,
        textAlign: 'center',
    },
    modalButtonText: {
        fontSize: 25,
        alignSelf: 'center',
    }
});