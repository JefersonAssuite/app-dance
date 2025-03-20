import React from 'react';
import { Box, HStack, Avatar, Text, Pressable } from 'native-base';

export default function Feed({ data }) {
    return (
        <Pressable>
            <Box 
                bg="white" 
                shadow={2} 
                rounded="lg" 
                marginBottom={4} 
                padding={4}
            >
                <HStack space={3} alignItems="center">
                    <Avatar size="md" source={data.avatarURL} />
                    <Box>
                        <Text bold>{data.fullName}</Text>
                        <Text fontSize="xs" color="gray.500">
                            {data.timeStamp}
                        </Text>
                    </Box>
                </HStack>
                <Text mt={3}>
                    {data.recentText}
                </Text>
            </Box>
        </Pressable>
    );
}
