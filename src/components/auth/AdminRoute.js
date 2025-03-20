import { View, Text, ActivityIndicator } from 'react-native';
import { useAdmin } from '../../hooks/useAdmin';

export const AdminRoute = ({ children }) => {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return (
            <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!isAdmin) {
        return (
            <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <Text style={{
                    fontSize: 18,
                    color: '#666',
                    textAlign: 'center'
                }}>
                    Acesso não autorizado.
                    Você precisa ser um administrador para acessar esta área.
                </Text>
            </View>
        );
    }

    return children;
};