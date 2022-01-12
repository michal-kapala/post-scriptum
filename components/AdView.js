import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';
import { AdMobBanner } from 'expo-ads-admob';

export default AdView = ({postId, navigation}) => {

    {/*Kontekst postów*/}
    const postCtx = useContext(PostContext);
    const userCtx = useContext(UserContext);
    var post = postCtx.getPost(postId);

    {/*Like icon state*/}
    {/*For testing only, should use postCtx.updateLike() instead*/}
    const [liked, setLiked] = useState((post.liked ? 'true' : false));

    async function deletePost(id) {
        await postCtx.deletePost(userCtx.userData.token, new URLSearchParams({ "post_id": id }));
        await postCtx.updatePosts(userCtx.userData.token, new URLSearchParams({ "user_id": userCtx.userData.userId }));
    }

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
                    <Text style={{color: '#777', fontSize: 12}}>{post.datetime} · Reklama</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => {}} style={{paddingRight: 5}}>
                        <MaterialIcons name="edit" size={24} color='coral' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deletePost(post.post_id)} style={{paddingRight: 10}}>
                        <FontAwesome name="window-close" size={24} color='coral'/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/*Content*/}
            <View style={styles.content}>
                <Text style={{color: 'black'}}>{post.content}</Text>
            </View>

            {/*AdMob banner*/}
            <AdMobBanner
                style={styles.banner}
                bannerSize="adaptiveBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID
            />

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
        marginBottom: 6,
    },
    banner: {
        alignItems: 'center',
        marginBottom: 10,
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
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    }
});