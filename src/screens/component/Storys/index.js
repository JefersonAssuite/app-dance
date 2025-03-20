import React from 'react';
import { Box, Avatar, Text, Pressable } from 'native-base';

export default function Storys({ data }) {
    return (
        <Pressable>
            <Box marginRight={4} marginBottom={4} alignItems="center">
                <Avatar
                    size="lg"
                    source={data.avatarURL}
                    borderWidth={2}
                    borderColor="blue.500"
                    mb={2}
                />
                <Text fontSize="xs" color="gray.500">
                    {data.fullName}
                </Text>
            </Box>
        </Pressable>
    );
}
