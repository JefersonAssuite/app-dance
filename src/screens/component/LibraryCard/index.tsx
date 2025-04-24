// BibliotecaCard.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Image, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

interface BibliotecaCardProps {
  item: any;
  onPress: () => void;
  size: 'large' | 'small';
}

export default function BibliotecaCard({ item, onPress, size }: BibliotecaCardProps) {
  const width = size === 'large' ? 350 : 300;
  const height = size === 'large' ? 450 : 200;

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        w={width}
        h={height}
        rounded={size === 'large' ? '2xl' : 'lg'}
        overflow="hidden"
        mr={4}
        shadow={size === 'large' ? 4 : 3}
        position="relative"
      >
        <Image
          source={{ uri: item.imageUrl }}
          alt={item.nome || "Imagem da biblioteca"}
          w="100%"
          h="100%"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.05)', 'transparent']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70%',
            justifyContent: 'flex-end',
            padding: 16,
          }}
        >
          <Text fontSize={size === 'large' ? "lg" : "md"} fontWeight="bold" color="white">
            {item.nome || "Sem nome"}
          </Text>
        </LinearGradient>
      </Box>
    </TouchableOpacity>
  );
}
