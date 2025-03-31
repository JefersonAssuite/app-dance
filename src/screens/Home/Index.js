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
    const [bibliotecas, setBibliotecas] = useState([]); // Estado para bibliotecas

    const navigateToLogin = () => {
        console.log('Volte sempre!');
        router.replace('/login');
    };

    useEffect(() => {
        // Buscar mensagens do Firestore
        const messagesCollection = collection(db, "messages");
        const unsubscribeMessages = onSnapshot(messagesCollection, (snapshot) => {
            const messagesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messagesList);
        });

        // Buscar vídeos do Firestore
        const videosCollection = collection(db, "videos");
        const unsubscribeVideos = onSnapshot(videosCollection, (snapshot) => {
            const videosList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVideos(videosList);
        });

        // Buscar bibliotecas do Firestore
        const bibliotecasCollection = collection(db, "bibliotecas");
        const unsubscribeBibliotecas = onSnapshot(bibliotecasCollection, (snapshot) => {
            const bibliotecasList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBibliotecas(bibliotecasList);
        });

        return () => {
            unsubscribeMessages();
            unsubscribeVideos();
            unsubscribeBibliotecas();
        };
    }, []);

    return (
        <Box flex={1} flexDirection={"column"}>
            <ScrollView mt={15}>
                {/* Cabeçalho */}
                <Box>
                    <HStack padding={3} w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold">MOVE</Text>
                        </Box>
                        <Box flexDirection={"row"} alignItems={"center"}>
                            <Pressable>
                                <Icon as={Feather} name="bell" size={7} marginRight={4} color="#000" />
                            </Pressable>
                            <Avatar h={12} w={12} source={require('../../../assets/images/ani.jpeg')} />
                        </Box>
                    </HStack>
                </Box>

                {/* Seção de Bibliotecas */}
                <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>Salas de Aula</Text>
                    {bibliotecas.length === 0 ? (
                        <Text>Nenhuma biblioteca encontrada.</Text>
                    ) : (
                        <FlatList
                            data={bibliotecas}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    onPress={() => console.log("Biblioteca clicada:", item.id)} // Adapte para navegação depois
                                >
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

                {/* Seção de Mensagens */}
                <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={5}>Mensagem do Dia</Text>
                    {messages.length === 0 ? (
                        <Text>Nenhuma mensagem encontrada.</Text>
                    ) : (
                        <FlatList
                            data={messages}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Box bg="white" p={3} mb={6} rounded="md" shadow={1}>
                                    <Text fontSize="md" fontWeight="bold">{item.user_name}</Text>
                                    <Text>{item.message}</Text>
                                </Box>
                            )}
                        />
                    )}
                </Box>

                {/* Seção de Vídeos */}
                <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={5}>Vídeos</Text>
                    {videos.length === 0 ? (
                        <Text>Nenhum vídeo disponível.</Text>
                    ) : (
                        <FlatList
                            data={videos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Box bg="white" p={4} mb={15} rounded="md" shadow={1}>
                                    <Video
                                        source={{ uri: item.video_url }}
                                        useNativeControls
                                        resizeMode="contain"
                                        style={{ width: "100%", height: 200 }}
                                    />
                                </Box>
                            )}
                        />
                    )}
                </Box>

                
            </ScrollView>

            {/* Botão de Logout */}
            <Box position="absolute" bottom={4} right={4}>
                <Button title="Sair" onPress={navigateToLogin} />
            </Box>
        </Box>
    );
}

export default function Home() {
    return (
        <HomeContent />
    );
}
