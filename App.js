import React from "react";
import { View, Text, Alert, TouchableHighlight, TouchableOpacity, ActivityIndicator } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button } from "native-base";

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Cursos',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    cursos: [],
    isLoading: true
  }

  componentDidMount = async () => {
    const urlCursos = 'http://104.248.133.2:7001/cursos';
    const response = await fetch(urlCursos);
    const responseParsead = await response.json();

    this.setState({ cursos: responseParsead, isLoading: false });

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {this.state.cursos.map(curso => {
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Second', {
                  id: curso.id
                })}
              key={curso.nome}
              style={{
                flexDirection: 'row',
                padding: 15,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                // justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ marginLeft: 15, fontSize: 22 }}> {curso.id}</Text>
              <Text style={{ marginLeft: 15, fontSize: 22 }}>{curso.nome}</Text>
              <Button>
              </Button>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Detalhes da página',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    cursoDetalhado: [],
    alunosCadastrados: [],
    isLoading: true
  }

  componentDidMount = async () => {

    const { navigation } = this.props;
    const itemId = navigation.getParam('id');

    const urlCursoDetalhado = `http://104.248.133.2:7001/cursos/${itemId}`;
    const response = await fetch(urlCursoDetalhado);
    const responseParsead = await response.json();

    const urlAlunosInscritos = `http://104.248.133.2:7001/cursos/${itemId}/alunos-inscritos`;
    const responseAlunos = await fetch(urlAlunosInscritos);
    const responseParsedAlunos = await responseAlunos.json();

    this.setState({ cursoDetalhado: responseParsead[0], alunosCadastrados: responseParsedAlunos, isLoading: false })

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#eee', padding: 20 }}>

        <View style={{ backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 12 }}>
          <Text>Id :{this.state.cursoDetalhado.id}</Text>
          <Text>Curso: {this.state.cursoDetalhado.nome}</Text>
          <Text>Professor: {this.state.cursoDetalhado.professor}</Text>
          <Text>Local: {this.state.cursoDetalhado.local}</Text>
        </View>

        <View style={{ marginTop: 10, backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 12 }}>
          <View style={{
            backgroundColor: '#bbb',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15
          }}>
            <Text>ALUNOS CADASTRADOS</Text>
          </View>
          <Text>ALUNOS CADASTRADOS</Text>
          <Text>Id :{this.state.cursoDetalhado.id}</Text>
          <Text>Curso: {this.state.cursoDetalhado.nome}</Text>
          <Text>Professor: {this.state.cursoDetalhado.professor}</Text>
          <Text>Local: {this.state.cursoDetalhado.local}</Text>
        </View>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Second: {
    screen: DetailsScreen
  }
});

export default createAppContainer(AppNavigator);
