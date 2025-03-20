import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/FirebaseConfig';
import { StyleSheet } from 'react-native';
import {useRouter} from "expo-router"

const Register = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nomeCompleto: '',
            email: '',
            senha: '',
            sexo: '',
            dataNascimento: '',
            telefone: '',
            isAdmin:false
        }
    });
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                data.email, 
                data.senha
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: data.nomeCompleto
            });

            await setDoc(doc(db, 'usuarios', user.uid), {
                nomeCompleto: data.nomeCompleto,
                email: data.email,
                sexo: data.sexo,
                dataNascimento: data.dataNascimento,
                telefone: data.telefone,
                createdAt: new Date(),
                updatedAt: new Date(),
                isAdmin: false
            });

            alert('Cadastro realizado com sucesso!');
            router.replace('/login');

        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert('Erro ao realizar cadastro');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Cadastro</Text>

                {/* Nome Completo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <Controller
                        control={control}
                        name="nomeCompleto"
                        rules={{ 
                            required: 'Campo obrigatório',
                            minLength: { value: 3, message: 'Mínimo de 3 caracteres' }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu nome completo"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.nomeCompleto && (
                        <Text style={styles.errorText}>{errors.nomeCompleto.message}</Text>
                    )}
                </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu email"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                            />
                        )}
                    />
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email.message}</Text>
                    )}
                </View>

                {/* Senha */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <Controller
                        control={control}
                        name="senha"
                        rules={{
                            required: 'Campo obrigatório',
                            minLength: { value: 6, message: 'Mínimo de 6 caracteres' }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Digite sua senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )}
                    />
                    {errors.senha && (
                        <Text style={styles.errorText}>{errors.senha.message}</Text>
                    )}
                </View>

                {/* Sexo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sexo</Text>
                    <Controller
                        control={control}
                        name="sexo"
                        rules={{ required: 'Campo obrigatório' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.radioContainer}>
                                <TouchableOpacity 
                                    style={[styles.radioButton, value === 'masculino' && styles.radioSelected]}
                                    onPress={() => onChange('masculino')}
                                >
                                    <Text style={styles.radioText}>Masculino</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.radioButton, value === 'feminino' && styles.radioSelected]}
                                    onPress={() => onChange('feminino')}
                                >
                                    <Text style={styles.radioText}>Feminino</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    {errors.sexo && (
                        <Text style={styles.errorText}>{errors.sexo.message}</Text>
                    )}
                </View>

                {/* Data de Nascimento */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Data de Nascimento</Text>
                    <Controller
                        control={control}
                        name="dataNascimento"
                        rules={{ required: 'Campo obrigatório' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/AAAA"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.dataNascimento && (
                        <Text style={styles.errorText}>{errors.dataNascimento.message}</Text>
                    )}
                </View>

                {/* Telefone */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Telefone</Text>
                    <Controller
                        control={control}
                        name="telefone"
                        rules={{ required: 'Campo obrigatório' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="(XX) XXXXX-XXXX"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                    {errors.telefone && (
                        <Text style={styles.errorText}>{errors.telefone.message}</Text>
                    )}
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        padding: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    radioButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    radioSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    radioText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 14,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Register;