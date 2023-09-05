import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { get, post, put } from "../axios";

import SingleChatEntry from '../components/chat/SingleChatEntry';

interface MessageItem {
    sender: string,
    recipient: string,
    time: string;
    text: string;
}


interface ChatItem {
    chat_id: number
    username1: string
    username2: string
    message_list: MessageItem[]
}

interface Props {
    navigation: NativeStackNavigationProp<any, "My Chats">;
    route: any;
}


const ChatsListView = ({ navigation, route }: Props) => {

    const [chats, setChats] = useState([]);
    

    useEffect(() => {
        console.log(route?.params?.username);

        async function getUserChats() {
            const response = await get("/chats");
            console.log(response?.data);
            setChats(response?.data.chats);
        }
        getUserChats();
    },
        []);

    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View
                style={{
                    padding: 10,
                    width: "100%",
                    backgroundColor: "#000",
                    height: 70,
                }}
            >
                <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                    {"Conversations"}
                </Text>
            </View>
            <View
                style={{ alignItems: "flex-start", padding: 10, marginLeft: "5%" }}
            >
            </View>
            <View style={{ padding: 10, marginLeft: "4%" }}>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: '4%' }}>
            </View>
            <ScrollView>
                {chats.map((chat: any, index: number) => (
                    <TouchableOpacity key={index}
                        onPress={() => {
                            const recipient = route?.params?.username === chat.username1 ? chat.username2 : chat.username1;
                            console.log("CHAT LIST");
                            console.log(route?.params?.username);
                            console.log(recipient);
                            navigation.navigate("Chat", { recipient: recipient , username: route?.params?.username})
                        }}>
                        <SingleChatEntry
                            chat={chat}
                            recipient={route?.params?.username === chat.username1 ? chat.username2 : chat.username1}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChatsListView;