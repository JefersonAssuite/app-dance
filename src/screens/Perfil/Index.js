import React, { useEffect, useState } from "react";
import { Box, Text, HStack, Avatar, Icon, Button, Divider, ScrollView } from "native-base";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { signOut, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Perfil() {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const router = useRouter();
  const user = auth.currentUser;

  const menuItems = [
    { label: "Plano", route: "/plano", icon: "credit-card" },
    { label: "Histórico de aulas", route: "/historico", icon: "book-open" },
    { label: "Enviar Feedback", route: "/feedback", icon: "message-circle" },
    { label: "Configurações", route: "/configuracoes", icon: "settings" },
  ];

  const labelsPermitidos = ["Plano", "Histórico de aulas"];
  const principais = menuItems.filter(item => labelsPermitidos.includes(item.label));
  const outros = menuItems.filter(item => !labelsPermitidos.includes(item.label));

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <ScrollView flex={1} bg="white" p={4} pt={10}>
      <HStack padding={3} w="100%" alignItems="center" justifyContent="space-between">
        <Avatar
          size="xl"
          source={{ uri: userData?.photoURL || "https://via.placeholder.com/150" }}
        />
        <Box flex={1} ml={4}>
          <Text fontSize="md" fontWeight="bold">
            {userData?.nome} {userData?.sobrenome}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user?.email}
          </Text>
        </Box>
        <TouchableOpacity onPress={() => router.push("/editar-perfil")}>
          <Icon as={Feather} name="edit" size={5} color="#f17ea1" />
        </TouchableOpacity>
      </HStack>

      <Divider my={4} />

      {/* Principais opções */}
      {principais.map(item => (
        <TouchableOpacity key={item.label} onPress={() => router.push(item.route)}>
          <Box
            px={4}
            py={3}
            mb={2}
            flexDirection="row"
            alignItems="center"
          >
            <Icon as={Feather} name={item.icon} size={5} mr={3} color="#f17ea1" />
            <Text fontSize="xl" fontWeight="semibold" color="#f17ea1">
              {item.label}
            </Text>
          </Box>
        </TouchableOpacity>
      ))}

      <Divider my={4} />

      {/* Outras opções */}
      {outros.map(item => (
        <TouchableOpacity key={item.label} onPress={() => router.push(item.route)}>
          <Box
            px={4}
            py={3}
            mb={2}
            flexDirection="row"
            alignItems="center"
          >
            <Icon as={Feather} name={item.icon} size={5} mr={3} color="#f17ea1" />
            <Text fontSize="lg" fontWeight="medium" color="#f17ea1">
              {item.label}
            </Text>
          </Box>
        </TouchableOpacity>
      ))}

      <Divider my={6} />

      <Button w="100%" bgColor="#f17ea1" onPress={handleLogout}>
        Sair da conta
      </Button>
    </ScrollView>
    </SafeAreaView>
  );
}
