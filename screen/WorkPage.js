import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const WorkPage = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [selectedFont, setSelectedFont] = useState('normal');
  const [searchText, setSearchText] = useState('');

  // Load custom fonts
  const [loaded] = useFonts({
    'dancing-script': require('../assets/fontss/Dancing_Script/static/DancingScript-Regular.ttf'),
    'madimi-one': require('../assets/fontss/Madimi_One/MadimiOne-Regular.ttf'),
    'playfair-display': require('../assets/fontss/Playfair_Display/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
    'quicksand': require('../assets/fontss/Quicksand/Quicksand-VariableFont_wght.ttf'),
  });

  // Handle font loading error
  if (!loaded) {
    return null;
  }

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  };
  const handleSaveNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = { id: notes[selectedNoteIndex].id, text: noteText, backgroundColor, dateTime: getCurrentDateTime(), font: selectedFont }; // Use the existing ID of the note
      setNotes(updatedNotes);
    } else {
      if (noteText.trim() !== '') {
        const newNote = { id: Math.random().toString(36).substr(2, 9), text: noteText, backgroundColor, dateTime: getCurrentDateTime(), font: selectedFont }; // Generate a unique ID using Math.random()
        setNotes([...notes, newNote]);
      }
    }
    setNoteText('');
    setSelectedNoteIndex(null);
    setModalVisible(false);
  };
  
  


  const handleEditNote = (noteId) => {
    const index = notes.findIndex((note) => note.id === noteId); // Kuhaon ang index sa note base sa id
    const noteToEdit = notes[index];
    setNoteText(noteToEdit.text);
    setBackgroundColor(noteToEdit.backgroundColor);
    setSelectedFont(noteToEdit.font);
    setSelectedNoteIndex(index); // I-set ang selectedNoteIndex sa tamang index
    setModalVisible(true);
  };
  
  

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const renderNotes = () => {
    const filteredNotes = notes.filter(
      (note) =>
        note.text?.toLowerCase().includes(searchText.toLowerCase()) // Optional chaining to check if `text` property exists
    );
  
    const exactMatch = [];
    const partialMatch = [];
  
    // Paghiwalayin ang mga tala na may eksaktong match at may bahagi ng hinahanap na teksto
    filteredNotes.forEach((note) => {
      if (note.text?.toLowerCase() === searchText.toLowerCase()) { // Optional chaining to check if `text` property exists
        exactMatch.push(note);
      } else {
        partialMatch.push(note);
      }
    });
  
    // I-sort ang mga tala na may eksaktong match sa unahan ng listahan
    const sortedNotes = exactMatch.concat(partialMatch);
  
    return sortedNotes.map((note, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.noteContainer, { backgroundColor: note.backgroundColor }]}
        onPress={() => handleEditNote(note.id)}
      >
        <View style={styles.noteHeader}>
          <Text style={styles.noteDateTime}>{note.dateTime}</Text>
          <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
            <MaterialIcons name="delete" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.noteText, { fontFamily: note.font }]}>
          {note.text?.length > 25 ? note.text.substring(0, 25) + "..." : note.text} 
        </Text>
      </TouchableOpacity>
    ));
  };
  
  
  

  const fontStyles = {
    'normal': { fontFamily: 'normal' },
    'dancing-script': { fontFamily: 'dancing-script' },
    'madimi-one': { fontFamily: 'madimi-one' },
    'playfair-display': { fontFamily: 'playfair-display' },
    'quicksand': { fontFamily: 'quicksand' },
  };
  

  const fontOptions = [
    { label: 'Normal', value: 'normal', style: fontStyles['normal'] },
    { label: 'Dancing Script', value: 'dancing-script', style: fontStyles['dancing-script'] },
    { label: 'Madimi One', value: 'madimi-one', style: fontStyles['madimi-one'] },
    { label: 'Playfair Display', value: 'playfair-display', style: fontStyles['playfair-display'] },
    { label: 'Quicksand', value: 'quicksand', style: fontStyles['quicksand'] },
  ];
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView style={styles.notesContainer} contentContainerStyle={styles.notesContent}>
        {renderNotes()}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={[styles.noteInput, { backgroundColor: backgroundColor }, fontStyles[selectedFont]]}
            placeholder="Type your note here..."
            value={noteText}
            onChangeText={setNoteText}
            multiline
          />
          <View style={styles.optionsContainer}>
            <Text>Choose Background Color:</Text>
            <View style={styles.colorPickerContainer}>
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FAD0C9' }]} onPress={() => setBackgroundColor('#FAD0C9')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#C9E4F8' }]} onPress={() => setBackgroundColor('#C9E4F8')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#E2D1F8' }]} onPress={() => setBackgroundColor('#E2D1F8')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#F8E5C9' }]} onPress={() => setBackgroundColor('#F8E5C9')} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#F8F6C9' }]} onPress={() => setBackgroundColor('#F8F6C9')} />
            </View>
            <Text>Choose Font:</Text>
            <Picker
              selectedValue={selectedFont}
              onValueChange={(itemValue, itemIndex) => setSelectedFont(itemValue)}
              style={styles.fontPicker}
            >
              {fontOptions.map((option, index) => (
                <Picker.Item
                  key={index}
                  label={option.label}
                  value={option.value}
                  style={option.style}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
              <Text style={styles.buttonLabel}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonLabel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const theme = {
  colors: {
    primary: "rgb(0, 103, 131)",
    surface: "rgb(251, 252, 254)",
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  notesContainer: {
    flex: 1,
  },
  notesContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  noteContainer: {
    width: '48%',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para sa Android
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteDateTime: {
    fontSize: 12,
    color: 'gray',
  },
  noteText: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para sa Android
  },
  optionsContainer: {
    marginBottom: 20,

  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    marginBottom: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  fontPicker: {
    height: 50,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para sa Android
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para sa Android
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonLabel: {
    color: theme.colors.surface, // Palitan ang kulay ng text batay sa theme
    fontSize: 16,
  },
});

export default WorkPage;
