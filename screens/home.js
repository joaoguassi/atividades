import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const App = () => {

    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagem, setImagem] = useState('');
    
    const [produtos, setProdutos] = useState([]);

    const navigation = useNavigation();
    const route = useRoute();

    useEffect( () => {
        axios.get('http://10.0.2.2:3000/produtos')
            .then((dados) => setProdutos(dados.data))
            .catch((erro) => alert('Erro: ' + erro));
        }, [ route.params?.res ])

    const salvarProduto = () => {
        axios.post('http://10.0.2.2:3000/produtos/',
        {
            descricao: descricao,
            preco: preco,
            categoria: categoria,
            imagem: imagem
        })
        .then( (data) => {
            const temp = [...produtos, data.data];
            setProdutos(temp);
            alert('Produto salvo com sucesso !');
        })
        .catch((erro) => alert('Erro ao salvar: ' + erro));
    }

    const apagarProduto = (id) => {

        axios.delete('http://10.0.2.2:3000/produtos/' + id )
        .then( () => {
            const temp = produtos.filter( (item) => {
                return item.id !== id;
            })
            setProdutos(temp);
            alert('Produto apagado com sucesso !' )
        })
        .catch( ( erro ) => alert('Erro ao apagar o produto : ' + erro ));
    }

    return (
        <View style = {styles.container}>
            <TextInput onChangeText={(des)=> setDescricao(des)} style={styles.input} placeholder="Descrição do Produto"></TextInput>
            <TextInput onChangeText={(pre)=> setPreco(pre)} style={styles.input} placeholder="Preço do Produto"></TextInput>
            <TextInput onChangeText={(cat)=> setCategoria(cat)} style={styles.input} placeholder="Categoria do Produto"></TextInput>
            <TextInput onChangeText={(img)=> setImagem(img)} style={styles.input} placeholder="Imagem do Produto"></TextInput>
            <TouchableOpacity style={styles.buttom} onPress={salvarProduto}>
                <Text style={styles.txtButton}>Cadastrar</Text>
            </TouchableOpacity>
            <FlatList keyExtractor = { ( item, index ) => item.id.toString() } data = { produtos } renderItem = { ({ item }) => ( 
                <View style = {{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress = { () => navigation.navigate('Details', {produtos: item })}>
                        <Text>{item.descricao}</Text>
                    </TouchableOpacity>
                    <Text onPress = { () => apagarProduto( item.id ) } style = {{ color: 'red', marginLeft: 10 }}>Apagar</Text>
                </View>
            )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#545454',
        marginVertical: 10,
        padding: 5,
        height: 45,
        fontSize: 16
    },
    buttom: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtButton: {
        fontSize: 16,
        fontWeight: '600'
    }
})

export default App;