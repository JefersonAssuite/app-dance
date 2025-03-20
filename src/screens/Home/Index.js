import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { Box, HStack, Icon, Pressable, Avatar, FlatList, Text, NativeBaseProvider, SectionList, ScrollView, } from 'native-base';
import { LinearGradient } from "expo-linear-gradient";
import { Video } from 'expo-av';
import { Feather } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { auth, db } from '../../../services/FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";

const data = [
    { id:"2", fullName: "Kiara", avatarURL: require("../../../assets/images/PERFIL2.jpg") },
    { id:"3", fullName: "Patricia", avatarURL: require("../../../assets/images/PERFIL4.jpg") },
    { id:"4", fullName: "Dani", avatarURL: require("../../../assets/images/PERFIL5.jpg") },
    { id:"5", fullName: "Paula", avatarURL: require("../../../assets/images/PERFIL6.jpg") },
    { id:"6", fullName: "Ana", avatarURL: require("../../../assets/images/PERFIL7.jpg") },
    { id:"7", fullName: "Tiago", avatarURL: require("../../../assets/images/PERFIL1.webp") },
];

function HomeContent() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [videos, setVideos] = useState([]); // Estado para os vídeos

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

        return () => {
            unsubscribeMessages();
            unsubscribeVideos();
        };
    }, []);

    return (
        <Box flex={1} flexDirection={"column"}>
            <LinearGradient colors={["#FDE9F9", "#FFFB7B"  ]} style={{ flex: 1 }}>
            <ScrollView mt={15} >
            <Box >
                <HStack padding={3} w={"100%"} alignItems={"center"} justifyContent={"space-between"} >
                    <Box>
                        <Pressable>
                            <Icon as={Feather} size={7} color="#000" name='menu' />
                        </Pressable>
                    </Box>
                    
                    <Box flexDirection={"row"} alignItems={"center"}>
                        <Pressable>
                            <Icon as={Feather} name="bell" size={7} marginRight={4} color="#000" />
                        </Pressable>
                        <Avatar h={12} w={12} source={require('../../../assets/images/ani.jpeg')} />
                    </Box>
                </HStack>
            </Box>
            
            {/* Lista de Perfis */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Box alignItems="center" m={2}>
                        <Avatar size="lg" source={item.avatarURL} />
                        <Text fontSize="sm">{item.fullName}</Text>
                    </Box>
                )}
            />
           
            {/* Seção de Mensagens */}
            <Box p={4}  top={"-20"} >
                <Box pb={2}>
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
                <Box >
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
            </Box>
            </ScrollView>
            

            {/* Botão de Logout */}
            <Box position="absolute" bottom={4} right={4}>
                <Button title="Sair" onPress={navigateToLogin} />
            </Box>
            </LinearGradient>
        </Box>
    );
}

export default function Home() {
    return (
        <NativeBaseProvider>
            <HomeContent />
        </NativeBaseProvider>
    );
}
