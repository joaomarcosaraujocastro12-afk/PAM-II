import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9',
  },
  header: {
    backgroundColor: '#059669',
    padding: 25,
    paddingTop: 45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 14,
    color: '#D1FAE5',
    marginTop: 8,
  },
  conteudo: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 7,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 15,
    color: '#111827',
  },
  botao: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  botaoDesabilitado: {
    backgroundColor: '#6EE7B7',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mensagem: {
    marginTop: 20,
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
  },
  resultadoTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 25,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bandeira: {
    width: 64,
    height: 42,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  cardTitulos: {
    flex: 1,
  },
  nomePais: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#059669',
  },
  nomeOficial: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  textoCard: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  vazio: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});
