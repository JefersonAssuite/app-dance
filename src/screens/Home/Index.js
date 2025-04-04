import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { Box, HStack, Icon, Pressable, Avatar, FlatList, Text, Image, ScrollView } from 'native-base';
import { Feather } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { auth, db } from '../../../services/FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { Video } from 'expo-av';

function HomeContent() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [bibliotecas, setBibliotecas] = useState([]); 

    useEffect(() => {
        const unsubscribeBibliotecas = onSnapshot(collection(db, "bibliotecas"), (snapshot) => {
            const bibliotecasList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBibliotecas(bibliotecasList);
        });

        return () => {
            unsubscribeBibliotecas();
        };
    }, []);

    // Separar bibliotecas por categoria
    const aulasDeDanca = bibliotecas.filter(b => b.categoria === "Aula de Dança");
    const alongamentoEExercicios = bibliotecas.filter(b => b.categoria === "Alongamento e Exercícios");

    return (
        <Box flex={1}  flexDirection="column">
            <ScrollView mt={15}>
                {/* Cabeçalho */}
                <Box>
                    <HStack padding={3} w="100%" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold">MOVE</Text>
                        </Box>
                        <Box flexDirection="row" alignItems="center">
                            <Pressable>
                                <Icon as={Feather} name="bell" size={7} marginRight={4} color="#000" />
                            </Pressable>
                            <Avatar h={12} w={12} source={require('../../../assets/images/ani.jpeg')} />
                        </Box>
                    </HStack>
                </Box>

                {/* Seção de Aulas de Dança */}
                <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>Aulas de Dança</Text>
                    {aulasDeDanca.length === 0 ? (
                        <Text>Nenhuma biblioteca encontrada.</Text>
                    ) : (
                        <FlatList
                            data={aulasDeDanca}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => router.push(`/library-videos/${item.id}`)}>
                                <Box 
                                    w={350} 
                                    h={450} 
                                    bg="gray.200" 
                                    rounded="lg" 
                                    overflow="hidden" 
                                    mr={4}
                                    shadow={2} 
                                    alignItems="center"
                                >
                                    <Image 
                                        source={{ uri: item.imageUrl }} 
                                        alt={item.nome || "Imagem da biblioteca"} 
                                        w="100%" 
                                        h={400} 
                                        resizeMode="cover"
                                        roundedTop="lg"
                                    />
                                    <Text fontSize="md" fontWeight="bold" mt={2} textAlign="center">
                                        {item.nome || "Sem nome"}
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            )}
                        />
                    )}
                </Box>

                {/* Seção de Alongamento e Exercícios */}
                <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>Alongamento e Exercícios</Text>
                    {alongamentoEExercicios.length === 0 ? (
                        <Text>Nenhuma biblioteca encontrada.</Text>
                    ) : (
                        <FlatList
                            data={alongamentoEExercicios}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => router.push(`/library-videos/${item.id}`)}>
                                    <Box 
                                        w={300} 
                                        h={150} 
                                        bg="gray.200" 
                                        rounded="lg" 
                                        overflow="hidden" 
                                        mr={4}
                                        shadow={2} 
                                        alignItems="center"
                                    >
                                        <Image 
                                            source={{ uri: item.imageUrl }} 
                                            alt={item.nome || "Imagem da biblioteca"} 
                                            w="100%" 
                                            h={400} 
                                            resizeMode="cover"
                                            roundedTop="lg"
                                        />
                                        <Text fontSize="md" fontWeight="bold" mt={2} textAlign="center">
                                            {item.nome || "Sem nome"}
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </Box>
            </ScrollView>
        </Box>
    );
}

export default function Home() {
    return <HomeContent />;
}
