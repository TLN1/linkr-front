import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export interface MessageItem {
    user: string,
    time: string;
    text: string;
  } 
  

interface ChatItem{
    chat_id: number
    username1: string
    username2: string
    message_list: MessageItem[]
}

interface Props {
    recipient: string,
    chat: ChatItem
  }

const SingleChatEntry = ({ recipient, chat}: Props) => { 

    return (
        <View style={styles.aboutField}>
            <TouchableOpacity style={styles.conversation}
                onPress={() => {/** needs navigation*/ }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.username}>{recipient}</Text>
                        <Text style={styles.time}>{chat.message_list[chat.message_list.length - 1].time}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.message}>{chat.message_list[chat.message_list.length - 1].text}</Text>
                        {/* notifications?? */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    conversation: {
        flexDirection: 'row',
        paddingBottom: 25,
        paddingRight: 20,
        paddingLeft: 10
    },
    username: {
        fontSize: 18,
        color: "#000",
        width: 210
    },
    message: {
        fontSize: 14,
        width: 240,
        color: '#555'
    },
    aboutField: {
        padding: 10,
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 20
    },
    time: {
        fontSize: 13,
        color: '#555',
        fontWeight: '300'
    },

})

export default SingleChatEntry;