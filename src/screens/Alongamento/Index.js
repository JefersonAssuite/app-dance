import React, { useState, useEffect } from "react";
import { Box, Text, VStack, FlatList, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { db } from "../../../services/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { theme } from '../../styles/theme';
import { router } from "expo-router"; // 👈 Importa o router

export default function Alongamento() {
    const [alongamentoEExercicios, setAlongamentoEExercicios] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "bibliotecas"), (snapshot) => {
            const filteredBibliotecas = snapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((item) => item.categoria === "Alongamento e Exercícios");
            setAlongamentoEExercicios(filteredBibliotecas);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Box flex={1} bg={theme.colors.background.primary} p={3} mt={8}>
            {/* Título e Subtítulo */}
            <VStack mb={5} alignItems="flex-start">
                <Text fontSize="2xl" fontWeight="bold" color={theme.colors.text.primary}>Vamos Alongar</Text>
                <Text fontSize="md" color={theme.colors.text.secondary}>Escolha qual membro deseja trabalhar hoje!</Text>
            </VStack>

            {/* Lista de Bibliotecas */}
            <FlatList
                data={alongamentoEExercicios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/library-videos/${item.id}`)}>
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
    );
}
