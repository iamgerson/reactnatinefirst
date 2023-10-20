import { StyleSheet, Text, TouchableOpacity, View, TextInput, AsyncStorage } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [state, setState] = useState('leitura')
  const [anotation, setAnotation] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao')
        setAnotation(anotacaoLeitura)
      }catch(error) {}
    })()
  },[])

  async function setData(){
    try{
      await AsyncStorage.setItem('anotacao', anotation)
    }catch(error){}

    alert('Sua anotação foi salva');
  }

  function updateState() {
    setState('leitura')
    setData()
  }

  if(state == 'leitura'){
    return (
      <View style={{ flex: 1, }}>
       <StatusBar style='auto'/>
       <View style={styles.header}>
        <Text style={styles.hearderText}>Anotações</Text>
       </View>
       {
        (anotation !== '') ? 
        <View style={styles.anotation}>
          <Text>{anotation}</Text>
        </View>
        :
        <View style={{ padding: 20}}><Text style={{ opacity: 0.3 }}>Nenhuma anotação</Text></View>
       }
       <TouchableOpacity 
        onPress={() => setState('atualizando')} 
        style={styles.btnAnotation}
      >
        {
          (anotation === "") ?
          <Text style={styles.btnAnotationTexto}>+</Text>
          :
          <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center', marginTop: 16 }}>Editar</Text>
        }
       </TouchableOpacity>
      </View>
     );
  }else if(state == 'atualizando'){
    return(
      <View style={{ flex: 1, }}>
        <View style={styles.header}>
          <Text style={styles.hearderText}>Anotações</Text>
        </View>

        <TextInput
          autoFocus={true} 
          onChangeText={(text) => setAnotation(text)} multiline={true} numberOfLines={10} value={anotation}
          style={{ padding:20, height: '100%', textAlignVertical: 'top' }}
        >
        </TextInput>
      
        <TouchableOpacity onPress={() => updateState()} style={styles.btnSalvar}>
          <Text style={styles.btnSalvarTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 30,
    backgroundColor: '#715AFF',
  },

  hearderText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffff',
    margin: 8,
  },

  anotation: {
    fontSize: 14,
    padding: 20,
  },

  btnAnotation: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#715AFF'
  },

  btnAnotationTexto: {
    color: '#fff',
    position: 'relative',
    textAlign: 'center',
    top: 4,
    fontSize: 30,
  },

  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#715AFF'
  },

  btnSalvarTexto: {
    textAlign: 'center', 
    color: '#fff'
  }
})