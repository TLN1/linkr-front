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
    chat: ChatItem
  }

const SingleChatEntry = ({ chat}: Props) => {
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
                        <Text style={styles.username}>{chat.username2}</Text>
                        <Text style={styles.time}>{"12:00"}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.message}>{"lastMessage"}</Text>
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