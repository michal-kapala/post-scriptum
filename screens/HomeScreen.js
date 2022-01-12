import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Modal, TextInput, Switch, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign, Feather } from '@expo/vector-icons';
import Post from '../components/Post'
import AdView from '../components/AdView'
import { PostContext } from '../contexts/PostContext'
import { UserContext } from '../contexts/UserContext'


const HomeScreen = ({ navigation }) => {

    // Stany okna modalnego
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalAd, setModalAd] = useState(false);

    const postCtx = useContext(PostContext);
    const userCtx = useContext(UserContext);
    /*var userId = userCtx.userData.userId;
    var token = userCtx.userData.token;*/

    function openModal() {
      setModalOpen(true);
    }

    function closeModal() {
      setModalOpen(false);
      setModalContent("");
      setModalAd(false);
    }

    function changeInput(text) {
      setModalContent(text);
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

    async function addPost() {
      var post = {
        post_id: getRandomInt(1000, 1000000000), //random id, should be changed
        author: userCtx.userData.email,
        datetime: '12.01.2022, 11:45',
        content: modalContent,
        likes: 0,
        ad: modalAd
      };
      await postCtx.addPost(post, userCtx.userData.token);
      await postCtx.updatePosts(userCtx.userData.token, new URLSearchParams({ "user_id": userCtx.userData.userId }));
      closeModal();
    }

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
          {/*Add icon, show only after we have received posts*/}
          { postCtx.posts.length > 0 &&
            <View style={styles.addIcon}>
              <TouchableOpacity onPress={() => openModal()} style={{alignContent: 'flex-end'}}>
                <Feather name="plus-square" size={30} color="black" />
              </TouchableOpacity>
            </View>
          }
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

        <Modal visible={modalOpen} style={styles.modal} animationType="slide">
          <ScrollView>
            <View style={{backgroundColor: '#FFF4E4'}}>
              {/*Nagłówek*/}
              <View style={styles.modalHeader}>
                <AntDesign
                  name="close"
                  size={20}
                  color='#FFF4E4'
                  onPress={() => closeModal()}
                  style={styles.closeIcon}
                />
                <Text style={styles.modalTitle}>Dodaj ogłoszenie</Text>
              </View>

              {/*Dane*/}
              <View style={styles.modalContent}>
                <View style={styles.modalInput}>
                  <TextInput
                    placeholder='To będzie nowe ogłoszenie...'
                    onChangeText={changeInput}
                    value={modalContent}
                    multiline
                    editable
                    maxLength={300}
                  />
                </View>
                <View style={styles.adRow}>
                  <Text>Reklama</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: 'mediumslateblue' }}
                    thumbColor="#ddd"
                    onValueChange={() => setModalAd(!modalAd)}
                    value={modalAd}
                  />
                </View>
                <View style={styles.submitButton}>
                <TouchableOpacity onPress={() => addPost()}>
                    <Text style={{color: '#FFF4E4'}}>Dodaj</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
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
    backgroundColor: 'coral',
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
  },
  // Modal screen
  modal: {
    marginTop: "2%",
    backgroundColor: '#FFF4E4',
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'coral',
    paddingVertical: 10,
  },
  closeIcon: {
    marginLeft: 10,
  },
  modalTitle: {
    flex: 1,
    marginLeft: 30,
    fontSize: 18,
    color: '#FFF4E4'
  },
  modalContent: {
    backgroundColor: '#FFF4E4',
    height: 520
  },
  modalInput: {
    marginHorizontal: '5%',
    marginTop: '5%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: 'coral',
    borderWidth: 1,
    backgroundColor: '#ddd',
    borderRadius: 10
  },
  adRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButton: {
    backgroundColor: 'coral',
    borderRadius: 10,
    marginHorizontal: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30
  }
});