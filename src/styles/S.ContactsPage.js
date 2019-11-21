import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    emptyContactsMessage : {
        alignSelf: 'center',
        fontSize: 20,
        color: '#ff5900'
    },
    emptyContactsButton: {
        alignSelf: 'center',
        borderColor: '#ff5900',
        borderWidth: 1,
        padding: 15,
        borderRadius: 4,
    },
    emptyContactsButtonText: {
        fontSize: 20,
        color: '#ff5900',
        fontWeight: 'bold',
        margin: 0,
        padding: 0,
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