import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard, 
  Platform, ToastAndroid, Alert, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements'
import moment from "moment";
import axios from 'axios';
import { BASE_URL } from '../constants';
import { TODO } from '../models/POJO';
import { connect } from 'react-redux';
import { addTodo, editTodo } from '../actions';

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (item: TODO) => dispatch(addTodo(item)),
    editTodo: (item: TODO) => dispatch(editTodo(item))
  };
}

function Form(props: any) {
  const isAdd = props.route.params.addItem;
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [dateTime, setDateTime] = useState(moment(new Date()).format());
  const [buttonText, seteButtonText] = useState("Add Scedule");
  const [completed, setComplete] = useState(true);
  const [show, setShow] = useState(false);

  const [flag, setFlag] = useState(1);

  useEffect(()=>{
    if(!isAdd && flag===1){
      let item = props.route.params.item;
      setTitle(item.title);
      setDetails(item.description);
      setComplete(item.completed);
      setDateTime(moment(item.deadline).format())
      seteButtonText("Edit Schedule");
    }
    setFlag(2);
  });

  const handleConfirm = (date: any) => {
    setShow(false);
    setDateTime(moment(date).format());
  };

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
          onPress: () => handleSubmit()
        }
      ],
      { cancelable: false }
    );

  const addTodo = () => {
    axios.post(BASE_URL, {
      title: title,
      description: details,
      deadline: dateTime
    })
    .then((response) => {
      if(response.status===201){
        if (Platform.OS != 'android') {
          // Snackbar.show({
          //     text: message,
          //     duration: Snackbar.LENGTH_SHORT,
          // });
        } else {
            ToastAndroid.show("Schedule added successfully", ToastAndroid.TOP);
        }
        const add_item:TODO = {
          title: response.data.title,
          description: response.data.description,
          deadline: response.data.deadline,
          id: response.data.id,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          completed: response.data.completed
        }
        props.addTodo(add_item);
        props.navigation.goBack();
      } else {
        createTwoButtonAlert();
      }
    }, (error) => {
      console.log(error);
      createTwoButtonAlert();
    });
  }

  const editTodo = () => {
    let item = props.route.params.item;
    axios.put(BASE_URL+'/'+item.id, {
      title: title,
      description: details,
      deadline: dateTime,
      completed: completed
    })
    .then((response) => {
      if(response.status===200){
        if (Platform.OS != 'android') {
          // Snackbar.show({
          //     text: message,
          //     duration: Snackbar.LENGTH_SHORT,
          // });
        } else {
            ToastAndroid.show("Schedule edited successfully", ToastAndroid.TOP);
        }
        const edit_item:TODO = {
          title: response.data.title,
          description: response.data.description,
          deadline: response.data.deadline,
          id: response.data.id,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          completed: response.data.completed
        }
        props.editTodo(edit_item);
        props.navigation.goBack();
      } else {
        createTwoButtonAlert();
      }
    }, (error) => {
      console.log(error);
      createTwoButtonAlert();
    });
  }

  const handleSubmit = () => {
    if(isAdd){
      addTodo();
    } else {
      editTodo();
    }
  }

    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss} 
        accessible={false}>
        <View style={styles.container}>

          <Text>Title</Text>
          <TextInput 
            style={styles.text_input}
            value={title}
            onChangeText={setTitle}
            placeholder="Type title"
            placeholderTextColor="grey">
          </TextInput>

          <View style={styles.full_width}>
            <Text>Deadline</Text>
            <TextInput 
              style={styles.text_input}
              value={dateTime}
              onChangeText={setDateTime}
              onTouchEnd={()=>{Keyboard.dismiss();setShow(true)}}
              placeholder="Select date and time"
              placeholderTextColor="grey">
            </TextInput>
          </View>

          <Text>Description</Text>
          <TextInput 
            style={styles.text_input_details}
            value={details}
            onChangeText={setDetails}
            placeholder="Type some details"
            placeholderTextColor="grey"
            multiline={true}
            numberOfLines={4}>
          </TextInput>

          {!isAdd && 
            <CheckBox
              title='Finished'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              containerStyle={styles.checkbox}
              checked={completed}
              onPress={() => setComplete(!completed)}
          />
            }

          <Button
            title={buttonText}
            onPress={handleSubmit}
          />


          <DateTimePickerModal
              date={new Date(dateTime)}
              isVisible={show}
              mode={'datetime'}
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={()=>{setShow(false)}}
              onHide={()=>{setShow(false)}}
            />
          </View>
      </TouchableWithoutFeedback>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 25,
    },
    full_width:{
      alignSelf: 'stretch'
    },
    text_input: {
      textDecorationColor: '#000000',
      alignSelf: 'stretch',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 4,
      marginBottom: 10,
      backgroundColor: '#f5f5f5',
      paddingLeft: 10,
      paddingRight: 10,
      height: 35
    },
    text_input_details: {
      alignSelf: 'stretch',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 4,
      marginBottom: 10,
      backgroundColor: '#f5f5f5',
      paddingLeft: 10,
      paddingRight: 10,
      height: 85,
      justifyContent: "flex-start"
    },
    checkbox: {
      marginLeft: 0,
      marginBottom: 30,
      backgroundColor: '#fff',
      borderColor: '#fff'
    }
  });

  const EditForm = connect(
    null,
    mapDispatchToProps
  )(Form);

  export default EditForm;