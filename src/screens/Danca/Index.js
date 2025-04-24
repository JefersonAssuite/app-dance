import React, { useState, useEffect } from "react";
import { 
    Box, Text, VStack, FlatList, Image, Input, Icon 
} from "native-base";
import { 
    TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../../services/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function Danca() {
    const [bibliotecas, setBibliotecas] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "bibliotecas"), (snapshot) => {
            const filteredBibliotecas = snapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((item) => item.categoria === "Aula de Dança");
            setBibliotecas(filteredBibliotecas);
        });

        return () => unsubscribe();
    }, []);

    // Filtra as bibliotecas de acordo com a busca
    const filteredBibliotecas = bibliotecas.filter((item) =>
        item.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box flex={1} bg="gray.100" p={4} mt={8}>
                    {/* Título e Subtítulo */}
                    <VStack mb={5} alignItems="flex-start">
                        <Text fontSize="2xl" fontWeight="bold" color="black">Vamos Dançar</Text>
                        <Text fontSize="md" color="gray.600">Escolha qual ritmo deseja aprender hoje!</Text>
                    </VStack>

                    {/* Barra de Busca */}
                    <Box mb={4}>
                        <Input
                            placeholder="Buscar ritmo..."
                            variant="filled"
                            bg="white"
                            borderRadius="full"
                            py={2}
                            px={4}
                            fontSize="md"
                            InputLeftElement={<Icon as={Feather} name="search" size={5} ml={3} color="gray.500" />}
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                            returnKeyType="search"
                        />
                    </Box>

                    {/* Lista de Bibliotecas */}
                    <FlatList
                        data={filteredBibliotecas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => console.log("Biblioteca clicada:", item.id)}>
                                <Box 
                                    w="100%" 
                                    h={200} 
                                    mb={4} 
                                    rounded="lg" 
                                    overflow="hidden" 
                                    shadow={3} 
                                    position="relative"
                                >
                                    {/* Imagem da Biblioteca */}
                                    <Image 
                                        source={{ uri: item.imageUrl }} 
                                        alt={item.nome} 
                                        w="100%" 
                                        h="100%" 
                                        resizeMode="cover"
                                    />

                                    {/* Nome sobre a imagem */}
                                    <Box 
                                        position="absolute" 
                                        bottom={0} 
                                        left={0} 
                                        right={0} 
                                        bg="rgba(0,0,0,0.5)" 
                                        p={3}
                                    >
                                        <Text fontSize="lg" fontWeight="bold" color="white" textAlign="center">
                                            {item.nome}
                                        </Text>
                                    </Box>
                                </Box>
                            </TouchableOpacity>
                        )}
                    />
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
