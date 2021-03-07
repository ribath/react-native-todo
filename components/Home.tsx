import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import AddItemFAB from './AddItemFAB';
import axios from 'axios';
import { connect } from 'react-redux';
import { BASE_URL } from '../constants';
import { STORE, TODO } from '../models/POJO';
import ListItem from './ListItem';
import { todoList } from '../actions';

const mapDispatchToProps = (dispatch: any) => {
  return {
    todoList: (list: TODO[]) => dispatch(todoList(list))
  };
}

const mapStateToProps = (state: STORE) => (
  { list: state.list });

function HomeComponent(props: any) {
  const limit = 10;
  const [data, setData] = useState<TODO[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);

  const getItem = () => {
    axios.get(BASE_URL, {
      params: {
        page: page,
        limit: limit
      }
    })
    .then(function (response) {
      if(response.status===200){
        setMaxPage( response.data.meta.totalPages );
        if(response.data.meta.totalPages>=response.data.meta.currentPage){
          setPage( response.data.meta.currentPage+1 );
          setData(prevData => [...prevData, ...response.data.items])
          props.todoList(response.data.items);
        }
      }
    })
    .catch(function (error) {
      createTwoButtonAlert();
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "API Failed",
      "operation in server failed",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Retry", 
          onPress: () => getItem()
        }
      ],
      { cancelable: false }
    );
  
  useEffect(()=>{
      // setData([]);
      // setPage(1);
      if(isAvailable){
      getItem();
      }
      setIsAvailable(false)
    });
    
  return (
      <View style={styles.container}>
          <FlatList            
            style={styles.list}
            // data={data}
            data = {props.list}
            initialNumToRender={10}            
            keyExtractor={(item) => item.id.toString()}
            onEndReached={()=>{if(maxPage>=page){
              setIsAvailable(true); 
              getItem();
            }}}
            onEndReachedThreshold={0.5}
            renderItem={(itemData) => (
              <ListItem 
                item={itemData.item}
                navigation={props.navigation}
                onPress={() => props.navigation.navigate('Edit', {addItem:false})}
                />
            )}
          />
          
          <AddItemFAB navigation={props.navigation}/>
      </View>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      alignSelf: 'stretch',
      backgroundColor: '#c5cae9',
      paddingTop:5
    }
  });

  const Home = connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);
  
  export default Home;