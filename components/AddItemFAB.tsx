import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

function AddItemFAB(props: { navigation: { navigate: (arg0: string, arg1: { addItem: boolean; }) => void; }; }){
    return(
        <FAB
    style={styles.fab}
    small
    icon="plus"
    onPress={() => props.navigation.navigate('Add', {addItem:true})}
  />
    )
}

const styles = StyleSheet.create({
    fab: {
      backgroundColor: '#2196f3',
      position: 'absolute',
      padding: 5,
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })

export default AddItemFAB;