import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
import { Card } from "react-native-shadow-cards";
import { Image } from "react-native-elements";
import Modal from "react-native-modal";
import { UIActivityIndicator } from "react-native-indicators";

const SettingsScreen = (props) => {
  const [user, setUser] = useState(global.userList[0]);
  const [logoutModal, setlogoutModal] = useState(false);
  const [timer, setTimer] = useState(false);
  const setModal = () => {
    setlogoutModal((prevValue) => !prevValue);
    const timeout = setTimeout(() => {
      setTimer(true);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>P E R F I L</Text>
      </View>
      <View style={styles.containerList}>
        <Card style={styles.cardSize}>
          <View>
            <View style={styles.spaceOfInfo}>
              <View style={styles.fotoSpace}>
                <Image
                  style={styles.foto}
                  source={
                    user.avatar !== ""
                      ? { uri: user.avatar }
                      : require("../../assets/user.png")
                  }
                />
              </View>
              <View style={styles.nombreSpace}>
                <Text style={styles.textSpace}>
                  {user.id} {user.first_name} {user.last_name}
                </Text>
                <Text style={styles.textSpace2}>{user.email}</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.btnContainer}>
        <Button
          buttonStyle={styles.btn}
          onPress={setModal}
          icon={<Icon name="md-arrow-back" style={styles.icon} />}
        />

        <Modal isVisible={logoutModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sesión</Text>
            <Text style={styles.modalContent}>cerrado la sesión.</Text>
            <View style={styles.modalButtonContainer}>
              {timer === false && (
                <View style={styles.containerIndicator}>
                  <UIActivityIndicator
                    animationDuration={500}
                    hidesWhenStopped={true}
                  />
                </View>
              )}
              {timer === true && (
                <View>
                  <Text style={styles.title}>sesión terminada</Text>
                </View>
              )}
            </View>
            <Button
              buttonStyle={styles.btn}
              onPress={setModal}
              icon={<Icon name="md-arrow-back" style={styles.icon} />}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#eeeeee",
  },
  title: {
    alignSelf: "center",
    marginBottom: 20,
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
  containerList: {
    width: "93%",
    height: "25%",
    position: "absolute",
    alignSelf: "center",
    top: "21%",
    justifyContent: "center",
    //   borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
  btnContainer: {
    width: "40%",
    height: "10%",
    position: "absolute",
    alignSelf: "center",
    marginLeft: 20,
    justifyContent: "center",
    bottom: "3%",
  },
  btn: {
    backgroundColor: "#50B848",
    borderRadius: 10,
    // margin: 3,
    alignSelf: "center",
  },
  icon: {
    fontSize: 25,
    height: 25,
    color: "white",
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
    marginBottom: 35,
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
    height: "50%",
    top: "25%",
    position: "absolute",
    marginLeft: 110,
  },
  textSpace: {
    flex: 1,
    padding: 5,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSpace2: {
    flex: 1,
    padding: 5,
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "bold",
  },
  containerIndicator: {
    alignSelf: "center",
    width: "45%",
    height: "50%",
    position: "absolute",
    alignSelf: "center",
    top: "-25%",
    marginBottom: 25,
    justifyContent: "center",
    //   borderStyle: "dotted",
    // borderWidth: 1,
    // borderRadius: 1,
  },
});

export default SettingsScreen;
