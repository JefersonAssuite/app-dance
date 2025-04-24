import React, { useState, useEffect } from "react";
import { Box, Text, FlatList } from "native-base";
import { Video } from "expo-av";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/FirebaseConfig"; 
import { useLocalSearchParams } from "expo-router"; // ✅ Pega o ID da URL


export default function LibraryVideos() {
  const { id } = useLocalSearchParams(); // ✅ Captura o ID da URL
  const [videos, setVideos] = useState([]);
  const [biblioteca, setBiblioteca] = useState(null);

  // 🔹 Buscar dados da biblioteca
  useEffect(() => {
    if (!id) return;

    const fetchBiblioteca = async () => {
      try {
        const docRef = doc(db, "bibliotecas", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBiblioteca({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Biblioteca não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao buscar biblioteca:", error);
      }
    };

    fetchBiblioteca();
  }, [id]);

  // 🔹 Buscar vídeos dessa biblioteca
  useEffect(() => {
    if (!id) return;

    const fetchVideos = async () => {
      try {
        const q = query(collection(db, "videos"), where("bibliotecaId", "==", id));
        const querySnapshot = await getDocs(q);
        const videosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videosList);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <Box flex={1} p={4} mt={10}>

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {biblioteca ? biblioteca.nome : "Carregando..."}
      </Text>
      
      {/* 🔹 Exibir lista de vídeos */}
      {videos.length === 0 ? (
        <Text>Nenhum vídeo encontrado.</Text>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box mb={4}>
              <Text fontSize="md" fontWeight="bold" mb={2}>{item.title || "Sem título"}</Text>
              {item.video_url ? (
                <Video
                  source={{ uri: item.video_url }}
                  useNativeControls
                  resizeMode="contain"
                  style={{ width: "100%", height: 200, borderRadius: 8 }}
                />
              ) : (
                <Text>Vídeo não disponível</Text>
              )}
            </Box>
          )}
        />
      )}
    </Box>
  );
}
