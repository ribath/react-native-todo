import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ToastAndroid, Platform } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { TODO } from '../models/POJO';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions';

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTodo: (item: TODO) => dispatch(deleteTodo(item))
  };
}

function Item(props: any){

    const item:TODO = props.item;

    const deleteAction = () => {  
        Alert.alert(
        "DELETE",
        `Do you want to delete schedule ` + item.title,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { 
            text: "Ok", 
            onPress: () => handleDelete()
            }
        ],
        { cancelable: false }
        );
    }

    const handleDelete = () => {
        axios.delete(BASE_URL+'/'+item.id)
          .then((response) => {
            if(response.status===200){
              if (Platform.OS != 'android') {
                // Snackbar.show({
                //     text: message,
                //     duration: Snackbar.LENGTH_SHORT,
                // });
              } else {
                  ToastAndroid.show("Schedule deleted successfully", ToastAndroid.TOP);
              }
              props.deleteTodo(item);
            } else {
              createTwoButtonAlert();
            }
          }, (error) => {
            console.log(error);
            createTwoButtonAlert();
          });
        // props.deleteTodo(item);
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
          onPress: () => handleDelete()
        }
      ],
      { cancelable: false }
    );

    return(
        <TouchableOpacity 
            onPress = {()=>{props.navigation.navigate('Edit', {addItem:false, item:item})}}
            onLongPress={() => {deleteAction()}}
            style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.row_2nd}>
                <Text style={styles.date}>Deadline</Text>
                <Text>{item.deadline}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.date}>created at</Text>
                <Text>{item.createdAt}</Text>
            </View>
            {item.completed &&
                <Text style={styles.completed}>completed</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      paddingLeft: 15,
      paddingTop:5,
      paddingBottom:0,
      margin: 2,
      backgroundColor: '#e8eaf6'
    },
    title: {
        fontSize: 22,
        color: '#002884'
    },
    description: {
        alignSelf: 'stretch',
        fontSize: 16,
        color: '#002884'
    },
    row: {
        flexDirection: 'row'
    },
    row_2nd: {
        flexDirection: 'row',
        marginBottom: 4
    },
    date: {
        color: '#42a5f5',
        marginRight: 10,
        marginBottom:1
    },
    completed: {
        color: '#009688',
        marginBottom: 5,
    }
  });

  const ListItem = connect(
    null,
    mapDispatchToProps
  )(Item);

  export default ListItem;