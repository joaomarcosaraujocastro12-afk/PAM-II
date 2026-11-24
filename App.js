import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
  Image,
} from 'react-native';
import { consultarPais, formatarPais } from './rsc/funcoe';
import styles from './rsc/estilo';

export default function App() {
  const [nome, setNome] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function pesquisar() {
    if (carregando) return;

    Keyboard.dismiss();
    setMensagem('');
    setResultados([]);
    setCarregando(true);

    try {
      const dados = await consultarPais(nome);
      setResultados(dados);

      if (dados.length === 0) {
        setMensagem('Nenhum país encontrado.');
      }
    } catch (erro) {
      setMensagem(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  function renderItem({ item }) {
    const pais = formatarPais(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardTopo}>
          <Image source={{ uri: pais.bandeira }} style={styles.bandeira} />
          <View style={styles.cardTitulos}>
            <Text style={styles.nomePais}>{pais.nome}</Text>
            <Text style={styles.nomeOficial}>{pais.nomeOficial}</Text>
          </View>
        </View>

        <Text style={styles.textoCard}>Capital: {pais.capital}</Text>
        <Text style={styles.textoCard}>Região: {pais.regiao}</Text>
        <Text style={styles.textoCard}>População: {pais.populacao}</Text>
        <Text style={styles.textoCard}>Moeda: {pais.moeda}</Text>
        <Text style={styles.textoCard}>Idiomas: {pais.idiomas}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Consulta de Países</Text>
        <Text style={styles.subtitulo}>
          Descubra dados de qualquer país do mundo.
        </Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.label}>Nome do país</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Brasil, Japan, Alemanha"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
          returnKeyType="search"
          onSubmitEditing={pesquisar}
        />

        <TouchableOpacity
          style={[styles.botao, carregando && styles.botaoDesabilitado]}
          onPress={pesquisar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>Pesquisar país</Text>
          )}
        </TouchableOpacity>

        {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}

        {resultados.length > 0 && (
          <Text style={styles.resultadoTitulo}>
            Países encontrados ({resultados.length})
          </Text>
        )}

        <FlatList
          data={resultados}
          keyExtractor={(item) => item.cca3}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            !carregando && mensagem === '' ? (
              <Text style={styles.vazio}>Digite um país para pesquisar.</Text>
            ) : null
          }
        />
      </View>
    </View>
  );
}
