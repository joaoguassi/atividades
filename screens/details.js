import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Axios from 'axios';

const Details = () => {

    const [ id , setId ] = useState('');
    const [ descricao , setDescricao ] = useState('');
    const [ preco , setPreco ] = useState('');
    const [ categoria , setCategoria ] = useState('');
    const [ imagem , setImagem ] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    useEffect( () => { 

        const produtos = route.params.produtos;
        
        setId(produtos.id);
        setDescricao(produtos.descricao);
        setPreco(produtos.preco);
        setCategoria(produtos.categoria);
        setImagem(produtos.imagem);

    } , [] )

    const editarProduto = () => {
        Axios.patch('http://10.0.2.2:3000/produtos/' + id, {
            descricao: descricao,
            preco: preco,
            categoria: categoria,
            imagem: imagem
        })
        .then( ( res ) => {
            alert('Informações do produto alteradas com sucesso !');
            navigation.navigate("Home" , { res } );
        })
        .catch( ( erro ) => alert('Erro ao alterar as informações do produto : ' + erro ))
    }

    return (
        <View>
            <TextInput onChangeText={(des)=> setDescricao(des)} style={styles.input} value = {descricao}></TextInput>
            <TextInput onChangeText={(pre)=> setPreco(pre)} style={styles.input} value = {preco}></TextInput>
            <TextInput onChangeText={(cat)=> setCategoria(cat)} style={styles.input} value = {categoria}></TextInput>
            <TextInput onChangeText={(img)=> setImagem(img)} style={styles.input} value = {imagem}></TextInput>
            <TouchableOpacity style = { styles.button} onPress = { editarProduto }>
                <Text style = { styles.txtButton }>Salvar</Text>
            </TouchableOpacity>
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
        fontWeight: '600',
        color: "red",
        textAlign: 'center'
    }
})

export default Details;
