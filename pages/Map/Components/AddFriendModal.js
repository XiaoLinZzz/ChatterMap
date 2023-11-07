import PropTypes from 'prop-types'
import React from 'react'
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'

import FontAwesome from '@expo/vector-icons/FontAwesome'

export default class AddFriendModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  handleSearch = () => {
    // ...您的搜索逻辑
  }

  render () {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onClose}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <View style={styles.dialog}>
              <Text style={styles.title}>Add a friend</Text>

                <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose}>
                  <FontAwesome name="close" size={24} color="#aaa" />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Enter username..."
                    value={this.state.searchTerm}
                    onChangeText={(text) => this.setState({ searchTerm: text })}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={this.handleSearch}>
                    <FontAwesome name="search" size={20} color="white" />
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    position: 'relative', // 这允许我们对子元素进行定位
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  searchBar: {
    flex: 1,
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 15,
    marginRight: 10
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  closeButton: {
    position: 'absolute', // 这将按钮定位到对话框的右上角
    right: 5,
    top: 5,
    padding: 10
  }
})

AddFriendModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
