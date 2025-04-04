import { useLocalSearchParams } from "expo-router";
import LibraryVideos from "../../src/screens/Libraryvideos"; // Importa direto o `index.tsx`

export default function Page() {
  const { id } = useLocalSearchParams(); // Pega o ID da URL

  return <LibraryVideos id={id} />;
}
