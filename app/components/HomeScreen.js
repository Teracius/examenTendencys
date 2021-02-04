import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import axios from "axios";
import { Card } from "react-native-shadow-cards";
// //  import Toast, { DURATION } from "react-native-easy-toast";
import { Image } from "react-native-elements";
import Icon2 from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isEmpty } from "lodash";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeUsuarios: "",
      inputErrorNameMesagge1: "",
      inputErrorNameMesagge2: "",
      inputErrorMessageEmail: "",

      inputErrorName1: false,
      inputErrorEmail: false,
      inputErrorName2: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }




  /**
   * Este componente se carga una vez que se entra a "HomeScreen", aquí es donde cargamos el procedimiento
   * para consumir el servicio, donde obtenemos toda la información de los usuarios
   * en cuestion, tambien aqui es donde trabajamos esa información para poder utilizarla después.
   */
  async componentDidMount() {
    var arrayUsers = [];
    await axios
      .get(
        "https://reqres.in/api/users?page=1",
        {
          headers: {
            Accept: "application/json",
          },
        },
        { timeout: 10000 }
      )
      .then((response) => {
        response.data.data.forEach((item) => {
          arrayUsers.push(item);
        });
      });

    await axios
      .get(
        "https://reqres.in/api/users?page=2",
        {
          headers: {
            Accept: "application/json",
          },
        },
        { timeout: 10000 }
      )
      .then((response) => {
        response.data.data.forEach((item) => {
          arrayUsers.push(item);
        });
        console.log(arrayUsers);
      });
    this.setState({
      listaDeUsuarios: arrayUsers,
    });
     this.props = this.state.listaDeUsuarios
     global.userList  = this.state.listaDeUsuarios
  }

  /**
   *Esta función es para mandar los datos y abrir el modal
   */
  renderModal = (item) => {
    console.log(item);
    this.setState({
      modalEspera: true,
      idUser: item.id,
      emailUser: item.email,
      firstNameUser: item.first_name,
      lastNameUser: item.last_name,
    });
  };

   /**
   *Esta función es para validar el correo.
   */
  validationEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

   /**
   *Esta función es para agregar un usuario nuevo.
   */
  addUser = () => {
    var firstName = this.state.firstNameUserInput;
    var secondName = this.state.secondNameUserInput;
    var email = this.state.emailUserInput;
    var userArray = this.state.listaDeUsuarios;
    if (this.validationEmail(email) === false) {
      console.log("email no es correcto");
      this.setState({
        inputErrorEmail: true,
        inputErrorMessageEmail: "Este correo no es correcto",
      });
    } else {
      this.setState({
        inputErrorEmail: false,
        inputErrorMessageEmail: "",
      });
    }
    if (isEmpty(firstName)) {
      console.log("todos los campos son obligatorios");
      this.setState({
        inputErrorName1: true,
        inputErrorNameMesagge1: "Campo requerido",
      });
    } else {
      this.setState({
        inputErrorName1: false,
        inputErrorNameMesagge1: "",
      });
    }
    if (isEmpty(secondName)) {
      console.log("todos los campos son obligatorios");
      this.setState({
        inputErrorName2: true,
        inputErrorNameMesagge2: "Campo requerido",
      });
    } else {
      this.setState({
        inputErrorName2: false,
        inputErrorNameMesagge2: "",
      });
    }
    if (
      this.validationEmail(email) === true &&
      isEmpty(firstName) === false &&
      isEmpty(secondName) === false
    ) {
      console.log(firstName);
      console.log(secondName);
      console.log(email);
      var obj = {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      };
      obj.id = userArray.length + 1;
      obj.email = email;
      obj.first_name = firstName;
      obj.last_name = secondName;
      obj.avatar = "";
      userArray.push(obj);
      console.log(obj.id);
      this.setState({
        listaDeUsuarios: userArray,
        formModal: false,
        inputErrorName2: false,
        inputErrorNameMesagge2: "",
        inputErrorName1: false,
        inputErrorNameMesagge1: "",
        inputErrorEmail: false,
        inputErrorMessageEmail: "",
        firstNameUserInput: "",
        secondNameUserInput: "",
        emailUserInput: "",
      });
      global.userList = this.state.listaDeUsuarios
    }
  };

  /**
   *Esta función es para editar la información de un usuario existente.
   */
  editUser = () => {
    var idToDelete = this.state.idToDelete;
    var firstName = this.state.firstNameUserInput;
    var secondName = this.state.secondNameUserInput;
    var email = this.state.emailUserInput;
    var userArray = this.state.listaDeUsuarios;

    userArray.forEach((item) => {
      console.log(item.id);
      var idComparation = item.id;

      if (idToDelete != idComparation) {
        console.log("pasar");
      } else {
        item.first_name = firstName;
        item.last_name = secondName;
        item.email = email;
      }
    });

    this.setState({
      listaDeUsuarios: userArray,
      editModal: false,
      inputErrorName2: false,
      inputErrorNameMesagge2: "",
      inputErrorName1: false,
      inputErrorNameMesagge1: "",
      inputErrorEmail: false,
      inputErrorMessageEmail: "",
      firstNameUserInput: "",
      secondNameUserInput: "",
      emailUserInput: "",
    });
    global.userList = this.state.listaDeUsuarios
  };


  /**
   *Esta función es para borrar a un usuario existente.
   */
  deleteUser = () => {
    var idToDelete = this.state.idToDelete;
    var userArray = this.state.listaDeUsuarios;
    var auxUserArray = [];
    var auxUserArray2 = [];
    var i = 0;
    console.log("el ide es: ", idToDelete);
    userArray.forEach((item) => {
      console.log(item.id);
      var idComparation = item.id;
      if (idToDelete != idComparation) {
        auxUserArray.push(item);
      } else {
        console.log("se elimino el usuario: ", item.id);
      }
    });
    auxUserArray.forEach((item2) => {
      i++;
      item2.id = i;
      auxUserArray2.push(item2);
    });
    this.setState({ listaDeUsuarios: auxUserArray2, deleteModal: false,idToDelete: "" });
    global.userList = this.state.listaDeUsuarios
  };

  /**
   * Vista de la aplicación.
   */
  render() {
    var lista = this.state.listaDeUsuarios;
    const loading = true;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>L I S T A</Text>
        </View>

        {loading === true && (
          <View style={styles.containerList}>
            <FlatList
              data={lista}
              renderItem={({ item, index }) => (
                <Card style={styles.cardSize}>
                  <TouchableOpacity
                    onPress={() => this.renderModal(item)}
                    style={{ borderRadius: 10 }}
                  >
                    <View>
                      <View style={styles.spaceOfInfo}>
                        <View style={styles.fotoSpace}>
                          <Image
                            style={styles.foto}
                            source={
                              item.avatar !== ""
                                ? { uri: item.avatar }
                                : require("../../assets/user.png")
                            }
                          />
                        </View>
                        <View style={styles.nombreSpace}>
                          <Text style={styles.textSpace}>
                            {item.id} {item.first_name} {item.last_name}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              )}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        )}

        <View style={styles.btnContainer}>
          <Button
            buttonStyle={styles.btn}
            title="Agregar"
            onPress={() => this.setState({ formModal: true })}
            icon={<Icon2 name="add-circle-outline" style={styles.icon} />}
          />
        </View>
        <View style={styles.btnContainer2}>
          <Button
            buttonStyle={styles.btn}
            title="Editar"
            onPress={() => this.setState({ editModal: true })}
            icon={<Icon2 name="create-outline" style={styles.icon} />}
          />
        </View>
        <View style={styles.btnContainer3}>
          <Button
            buttonStyle={styles.btn}
            title="Eliminar"
            onPress={() => this.setState({ deleteModal: true })}
            icon={<Icon2 name="close-circle-outline" style={styles.icon} />}
          />
        </View>

        <Modal isVisible={this.state.modalEspera}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Informacion</Text>
            <Text style={styles.modalContent}>Informacion del usuario</Text>
            <View style={styles.modalButtonContainer}>
              <Text>ID: {this.state.idUser}</Text>
              <Text>
                Name: {this.state.firstNameUser} {this.state.lastNameUser}
              </Text>
              <Text>Email: {this.state.emailUser}</Text>
              <TouchableOpacity
                onPress={() => this.setState({ modalEspera: false })}
                style={[styles.modalButton, { backgroundColor: "#94D1FF" }]}
              >
                <Text style={styles.modalButtonText}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.formModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Formulario</Text>
            <Text style={styles.modalContent}>
              Ingrese la informacion del usuario
            </Text>
            <KeyboardAwareScrollView style={styles.modalButtonContainer}>
              <Input
                placeholder="Primer Nombre"
                containerSyle={styles.inputForm}
                errorStyle={styles.errorInput}
                errorMessage={this.state.inputErrorNameMesagge1}
                renderErrorMessage={this.state.inputErrorName1}
                rightIcon={
                  <Icon
                    type="material"
                    name="edit"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) =>
                  this.setState({ firstNameUserInput: value })
                }
              />
              <Input
                placeholder="Segundo Nombre"
                errorStyle={styles.errorInput}
                errorMessage={this.state.inputErrorNameMesagge2}
                renderErrorMessage={this.state.inputErrorName2}
                containerSyle={styles.inputForm}
                rightIcon={
                  <Icon
                    type="material"
                    name="edit"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) =>
                  this.setState({ secondNameUserInput: value })
                }
              />
              <Input
                placeholder="Email"
                containerSyle={styles.inputForm}
                errorStyle={styles.errorInput}
                errorMessage={this.state.inputErrorMessageEmail}
                renderErrorMessage={this.state.inputErrorMessageEmail}
                rightIcon={
                  <Icon
                    type="material-community"
                    name="email"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) =>
                  this.setState({ emailUserInput: value })
                }
              />
              <TouchableOpacity
                onPress={() => this.addUser()}
                style={[styles.modalButton, { backgroundColor: "#94D1FF" }]}
              >
                <Text style={styles.modalButtonText}>Registrar</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        <Modal isVisible={this.state.editModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar</Text>
            <Text style={styles.modalContent}>
              Ingrese la informacion nueva del usuario
            </Text>
            <KeyboardAwareScrollView style={styles.modalButtonContainer}>
              <Input
                placeholder="ID"
                containerSyle={styles.inputForm}
                rightIcon={
                  <Icon
                    type="material"
                    name="account-box"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) => this.setState({ idToDelete: value })}
              />
              <Input
                placeholder="Primer Nombre"
                containerSyle={styles.inputForm}
                rightIcon={
                  <Icon
                    type="material"
                    name="edit"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) =>
                  this.setState({ firstNameUserInput: value })
                }
              />
              <Input
                placeholder="Segundo Nombre"
                containerSyle={styles.inputForm}
                rightIcon={
                  <Icon
                    type="material"
                    name="edit"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) =>
                  this.setState({ secondNameUserInput: value })
                }
              />
              <Input
                placeholder="Email"
                containerSyle={styles.inputForm}
                rightIcon={
                  <Icon
                    type="material-community"
                    name="email"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) =>
                  this.setState({ emailUserInput: value })
                }
              />
              <TouchableOpacity
                onPress={() => this.editUser()}
                style={[styles.modalButton, { backgroundColor: "#94D1FF" }]}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        <Modal isVisible={this.state.deleteModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Eliminar</Text>
            <Text style={styles.modalContent}>Ingrese el ID del usuario</Text>
            <KeyboardAwareScrollView style={styles.modalButtonContainer}>
              <Input
                placeholder="ID"
                containerSyle={styles.inputForm}
                rightIcon={
                  <Icon
                    type="material"
                    name="delete"
                    iconStyle={styles.iconRight}
                  />
                }
                onChangeText={(value) => this.setState({ idToDelete: value })}
              />
              <TouchableOpacity
                onPress={() => this.deleteUser()}
                style={[styles.modalButton, { backgroundColor: "#94D1FF" }]}
              >
                <Text style={styles.modalButtonText}>Borrar</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        {/* <Toast
            ref="toastBoleta"
            position="bottom"
            positionValue={250}
            fadeInDuration={1000}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: "#fff" }}
          /> */}
      </View>
    );
  }
}

/**
 * Aqui es donde se contienen los estilos de la vista.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#eeeeee",
  },
  containerList: {
    width: "93%",
    height: "65%",
    position: "absolute",
    alignSelf: "center",
    top: "21%",
    justifyContent: "center",
    //   borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  containerIndicator: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  btnContainer: {
    width: "30%",
    height: "10%",
    position: "absolute",
    alignSelf: "flex-start",
    marginLeft: 20,
    justifyContent: "center",
    bottom: "3%",
  },
  btnContainer2: {
    width: "30%",
    height: "10%",
    position: "absolute",
    alignSelf: "center",
    marginLeft: 20,
    justifyContent: "center",
    bottom: "3%",
    // borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  btnContainer3: {
    width: "30%",
    height: "10%",
    position: "relative",
    alignSelf: "flex-end",
    marginRight: 20,
    justifyContent: "center",
    top: "42%",
    // borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  btn: {
    backgroundColor: "#50B848",
    borderRadius: 10,
    // margin: 3,
    alignSelf: "center",
  },
  textSpace: {
    flex: 1,
    padding: 5,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
  },
  top: {
    width: "90%",
    height: "10%",
    position: "absolute",
    alignSelf: "center",
    top: "8%",
  },
  header: {
    textAlign: "center",
    alignSelf: "center",
    color: "#000a12",
    fontSize: 24,
    borderColor: "#000a12",
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 15,
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "50%",
    height: "50%",
    position: "absolute",
    top: "7%",
    alignSelf: "center",
  },
  icon: {
    fontSize: 25,
    height: 25,
    color: "white",
  },
  cardSize: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    height: 130,
  },
  spaceOfInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "98%",
    top: "2%",
  },
  fotoSpace: {
    width: "30%",
    height: "106%",
    top: "-6%",
    marginBottom: 10,
    backgroundColor: "#dcedc8",
    alignItems: "center",
    position: "absolute",
    borderRadius: 10,
  },
  foto: {
    width: 80,
    height: 110,
    top: "9%",
  },
  nombreSpace: {
    width: "60%",
    height: "30%",
    top: "30%",
    position: "absolute",
    marginLeft: 110,
  },
  modalContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    backgroundColor: "#00723F",
    color: "#FEBE10",
    textAlign: "center",
    position: "relative",
    top: 0,
    padding: 15,
    fontSize: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "100%",
  },
  modalContent: {
    marginVertical: 10,
    marginHorizontal: 22,
    fontSize: 15,
  },
  modalButtonContainer: {
    width: "75%",
    position: "relative",
    bottom: 0,
    marginHorizontal: 22,
    marginBottom: 22,
  },
  modalButton: {
    width: 100,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 5,
  },
  modalButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  errorInput: {
    backgroundColor: "#ffcccb",
  },
});
