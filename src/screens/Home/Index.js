import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { Box, HStack, Icon, Pressable, Avatar, FlatList, Text, Image, ScrollView } from 'native-base';
import { Feather } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { auth, db } from '../../../services/FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";


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
        const unsubscribeMessages = onSnapshot(collection(db, "messages"), (snapshot) => {
            const messagesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messagesList);
        });
        return () => {
            unsubscribeBibliotecas();
            unsubscribeMessages();
        };
    }, []);

    // Separar bibliotecas por categoria
    const aulasDeDanca = bibliotecas.filter(b => b.categoria === "Aula de Dança");
    const alongamentoEExercicios = bibliotecas.filter(b => b.categoria === "Alongamento e Exercícios");

    return (
         <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
       
            <ScrollView flex={1} mt={-2}>
                {/* Cabeçalho */}
                <Box pt={6}>
                    <HStack padding={3} w="100%" alignItems="center" justifyContent="space-between">
                        
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold">MOVE</Text>
                        </Box>
                        <Box flexDirection="row" alignItems="center">
                            <Pressable>
                                <Icon as={Feather} name="bell" size={7} marginRight={4} color="#000" />
                            </Pressable>
                            
                        </Box>
                    </HStack>
                </Box>

                {/* Seção de Aulas de Dança */}
                <Box p={3} pt={4}>
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
                <Box p={3} pt={-6}>
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

                <Box p={4} pt={4}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>Novidades da Semana</Text>
            {messages.length === 0 ? (
                <Text>Nenhuma mensagem encontrada.</Text>
            ) : (
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Box 
                    p={4} 
                    mb={4} 
                    bg="gray.100" 
                    rounded="lg" 
                    shadow={2}
                >
                    <Text fontWeight="bold" fontSize="md">{item.user_name}</Text>
                    <Text>{item.message}</Text>
                    <Text fontSize="sm" color="gray.500">{new Date(item.created_at.seconds * 1000).toLocaleString()}</Text>
                </Box>
            )}
        />
    )}
</Box>


            </ScrollView>
        
        </SafeAreaView>
    );
}

export default function Home() {
    return <HomeContent />;
}