import { useEffect, useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import ContactItem from "../components/ContactItem";
import { loadContacts } from "../utils/storage";
import stylesGlobal from "../styles/globalStyles";
import colors from "../styles/colors";

export default function HomeScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadContacts().then(setContacts);
    });

    return unsubscribe;
  }, [navigation]);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={stylesGlobal.container}>
      <TextInput
        style={stylesGlobal.input}
        placeholder="Buscar..."
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onPress={() => navigation.navigate("Detail", { contact: item })}
          />
        )}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: colors.accent,
          padding: 20,
          borderRadius: 50,
        }}
        onPress={() => navigation.navigate("Form", { mode: "new" })}
      >
        <Text style={{ fontSize: 26, color: "white" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
