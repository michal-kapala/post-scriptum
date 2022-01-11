import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import Post from '../components/Post'
import AdView from '../components/AdView'
import testPosts from '../components/TestPosts'
import { PostContext } from '../contexts/PostContext'
import { UserContext } from '../contexts/UserContext'


const HomeScreen = ({ navigation }) => {

    const postCtx = useContext(PostContext);
    const userCtx = useContext(UserContext);
    /*var userId = userCtx.userData.userId;
    var token = userCtx.userData.token;*/

    return(
    <View style={{backgroundColor: '#ddd', height: '100%', marginTop: 25}}>
        <ScrollView>
        {/*Title bar*/}
        <View style={styles.titleBar}>
          <View>
            <Text style={styles.titleText}>
                Post Scriptum
            </Text>
          </View>
          {/*Add icon*/}
          <View style={styles.addIcon}>
            <TouchableOpacity onPress={() => {}} style={{alignContent: 'flex-end'}}>
              <Feather name="plus-square" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        

        {/*Posts*/}
        <View style={styles.container}>
            <View style={styles.postContainer}>
                {postCtx.posts.map((post) => {
                    return(
                    <View key={post.id} style={{width: '100%', marginBottom: 15}}>
                        {post.ad ? 
                          <AdView postId={post.id} navigation={navigation}/>
                        :
                          <Post postId={post.id} navigation={navigation}/>
                        }
                    </View>)
                })}
            </View>
        </View>
        </ScrollView>
    </View>
    )
}
export default HomeScreen;

//#362893

const styles = StyleSheet.create({
  titleText: {
      fontSize: 28,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF4E4',
      paddingLeft: '25%'
  },
  container: {
    marginVertical: '4%',
  },
  searchIcon:{
    paddingLeft: 8,
    paddingTop: 6,
    paddingBottom: 3,
    fontWeight: 'bold'
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    borderWidth: 1.7,
    borderColor: '#555',
    borderRadius: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  icon: {
    flex: 1,
    marginHorizontal: 3
  },
  categoryTitle: {
    fontSize: 25,
    paddingVertical: '8%'
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButtonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%'
  },
  categoryButton: {
    backgroundColor: '#362893',
    width: 80,
    height: 80,
    marginHorizontal: 10,
    marginTop: 45,
    marginBottom: 20,
    borderRadius: 15,
  },
  categoryButtonText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  categoryButtonImage: {
    position: 'absolute',
    top: 0,
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  textElement: {
    flex: 1,
    paddingVertical: 5,
  },
  seeMore: {
    justifyContent: 'flex-end',
    paddingTop: 3,
    fontSize: 15,
    color: '#777',
  },
  latestText: {
    justifyContent: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold'
  },
  postContainer: {
    alignItems: 'center',
  },
  titleBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'coral', //#FF7F50
    textAlign: 'center',
    paddingVertical: 10,
    color: '#FFF4E4'
  },
  addIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 25,
    paddingTop: 5
  }
});