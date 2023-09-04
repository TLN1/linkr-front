import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleChatEntry from '../components/chat/SingleChatEntry';

interface MessageItem {
    user: string,
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
    navigation: NativeStackNavigationProp<any, "Profile">;
    route: any;
}


const ChatsListView = ({ navigation, route }: Props) => {

    const [chats, setChats] = useState(route?.params?.chats);

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
                <Text style={{color: "white", fontSize: 30, fontWeight: "bold" }}>
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
                    <View key={index} >
                        <SingleChatEntry
                            chat={chat}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChatsListView;