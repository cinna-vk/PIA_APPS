// screens/ContactDetailScreen.js
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import stylesGlobal from "../styles/globalStyles";
import { saveContacts, loadContacts } from "../utils/storage";
import colors from "../styles/colors";

export default function ContactDetailScreen({ route, navigation }) {
  const { contact } = route.params;

  // ELIMINAR CONTACTO (Funciona en Android, iOS y Web)
  const deleteContact = async () => {
    // ⚠ Alert NO funciona en web en algunos entornos, así que hacemos fallback
    if (Platform.OS === "web") {
      const confirmDelete = window.confirm(
        `¿Seguro que deseas eliminar a ${contact.name}?`
      );

      if (!confirmDelete) return;

      const list = await loadContacts();
      const newList = list.filter((c) => c.id !== contact.id);
      await saveContacts(newList);
      navigation.navigate("Home");
      return;
    }
    Alert.alert(
      "Eliminar contacto",
      `¿Seguro que deseas eliminar a ${contact.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const list = await loadContacts();
            const newList = list.filter((c) => c.id !== contact.id);
            await saveContacts(newList);
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  return (
    <View style={stylesGlobal.container}>
      <TouchableOpacity
        style={{ marginBottom: 8, alignSelf: "flex-start" }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: colors.accent, fontWeight: "600", fontSize: 16 }}>
          ← Volver
        </Text>
      </TouchableOpacity>

      {/*info del contacto*/}
      <Text style={stylesGlobal.title}>{contact.name}</Text>

      <Text style={{ marginTop: 10, fontSize: 16 }}>{contact.phone}</Text>
      <Text style={{ fontSize: 16 }}>{contact.email}</Text>
      <Text style={{ marginTop: 10, fontSize: 16 }}>{contact.note}</Text>

      {/*boton de EDITAR */}
      <TouchableOpacity
        style={[stylesGlobal.button, { marginTop: 30 }]}
        onPress={() => navigation.navigate("Form", { mode: "edit", contact })}
      >
        <Text style={stylesGlobal.buttonText}>Editar</Text>
      </TouchableOpacity>
        {/* boton de  ELIMINAR */}
      <TouchableOpacity
        style={[
          stylesGlobal.button,
          {
            backgroundColor: colors.danger,
            marginTop: 10,
            zIndex: 9999,
            elevation: 10,
            pointerEvents: "auto",
          },
        ]}
        onPress={() => {
          console.log("ELIMINAR PRESIONADO");
          deleteContact();
        }}
      >
        <Text style={stylesGlobal.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}
