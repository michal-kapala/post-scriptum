import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { PostContext } from '../contexts/PostContext';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default Post = ({postId, navigation}) => {

    {/*Kontekst postów*/}
    const postCtx = useContext(PostContext);
    var post = postCtx.getPost(postId);

    {/*Like icon state*/}
    {/*For testing only, should use postCtx.updateLike() instead*/}
    const [liked, setLiked] = useState((post.liked ? 'true' : false));

    {/*Post*/}
    return(
        <View style={styles.post}>
            {/*Header*/}
            <View style={styles.header}>
                {/*Image to be added*/}
                <View style={styles.creationInfo}>
                    {/*Author*/}
                    <Text style={{color: 'black', fontWeight: 'bold'}}>{post.author}</Text>
                    {/*Date & time*/}
                    <Text style={{color: '#777', fontSize: 12}}>{post.date}, {post.time}</Text>
                </View>
            </View>
            
            {/*Content*/}
            <View style={styles.content}>
                <Text style={{color: 'black'}}>{post.content}</Text>
            </View>

            {/*Likes bar*/}
            <View style={styles.activityBar}>
                {/*Likes*/}
                <View style={styles.likes}>
                    {/*Like icon*/}
                    <TouchableOpacity onPress={() => {setLiked(!liked); if(!liked) ++post.likes; else --post.likes}}>
                        {/*Like info to be added by the server*/}
                        <AntDesign name={liked ? "like1" : "like2"} size={24} color={liked ? "coral" : "black"} />
                    </TouchableOpacity>
                    {/*Like count*/}
                    <Text style={liked ? styles.likeCount : styles.nolikeCount}>{post.likes}</Text>
                </View>
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    post: {
      backgroundColor: '#FFF4E4'
    },
    header: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingLeft: '4%',
    },
    headerName: {
      fontWeight: 'bold',
      fontSize: 16
    },
    headerDate: {
      fontSize: 12,
    },
    image: {
      resizeMode: 'cover',
      width: 300,
      height: 200,
    },
    content: {
        marginHorizontal: '3%',
        marginBottom: 12,
    },
    activityBar: {
        paddingVertical: 10,
        borderTopWidth: 0.4,
        borderTopColor: '#FF7F50'
    },
    likes: {
        flexDirection: 'row',
        marginHorizontal: '3%',
    },
    nolikeCount: {
        paddingLeft: 5,
        paddingTop: 2,
        fontSize: 16,
        color: 'black'
    },
    likeCount: {
        paddingLeft: 5,
        paddingTop: 2,
        fontSize: 16,
        color: 'coral'
    },
    creationInfo: {

    },
  });