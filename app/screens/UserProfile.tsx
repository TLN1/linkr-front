import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  SectionList,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface Education {
  institution: string;
  degree: string;
}

interface Skill {
  name: string;
}

interface Experience {
  title: string;
  company: string;
}

interface User {
  username: string;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
}

interface Props {
  navigation: NativeStackNavigationProp<any, "Profile">;
}
const UserProfile = ({ navigation }: Props) => {

  const [addingItem, setAddingItem] = useState("");

  const [expreniences, setExperiences] = useState<Experience[]>([]);

  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    company: "",
  });

  const [educations, setEducations] = useState<Education[]>([]);

  const [newEducation, setNewEducation] = useState<Education>({
    institution: "",
    degree: "",
  });

  const [skills, setSkills] = useState<Skill[]>([]);

  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
  });

  const handleSaveExperience = () => {
    setAddingItem("")

    setNewExperience({ title: "", company: "" }); // Clear the input fields

    setExperiences([...expreniences, newExperience]);
  };

  const handleSaveEducation = () => {
    setAddingItem("")

    setNewEducation({ institution: "", degree: "" }); // Clear the input fields

    setEducations([...educations, newEducation]);
  };

  const handleSaveSkill = () => {

    setAddingItem("")

    setNewSkill({ name: "" }); // Clear the input fields

    setSkills([...skills, newSkill]);
  };



  const renderEducationItem = ({ item }: { item: Education }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Institution</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.institution}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Degree</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.degree}</Text>
    </View>
  );

  const renderSkillsItem = ({ item }: { item: Skill }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.name}</Text>
    </View>
  );

  const renderExperienceItem = ({ item }: { item: Experience }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Title</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.title}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Company</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.company}</Text>
    </View>
  );

  const sections: {
    title: string;
    data: (Education | Skill | Experience)[]; // Union of all possible data types
    renderItem: ({ item }: { item: Education | Skill | Experience }) => JSX.Element;
  }[] = [
    {
      title: "Education",
      data: educations,
      renderItem: renderEducationItem as ({ item }: { item: Education | Skill | Experience }) => JSX.Element,
    },
    {
      title: "Skills",
      data: skills,
      renderItem: renderSkillsItem as ({ item }: { item: Education | Skill | Experience } ) => JSX.Element,
    },
    {
      title: "Experience",
      data: expreniences,
      renderItem: renderExperienceItem as ({ item }: { item: Education | Skill | Experience }) => JSX.Element,
    },
  ];  

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable
      style={styles.addButton}
      onPress={() => {
        if (title === "Experience") {
          setAddingItem("Experience")
        } else if (title === "Education") {
          setAddingItem("Education")
        } else if (title == "Skill") {
          setAddingItem("Skill")
        }
      }}
      >
        <Text style={styles.addButtonLabel}>Add</Text>
      </Pressable>
    </View>
  );

  const AddItemDialog = () => {
    if (addingItem === "Education"){
      return (
        <View>
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <TextInput
              placeholder="Degree"
              value={newEducation.degree}
              onChangeText={(degree) =>
                setNewEducation((prevEducation) => ({
                  ...prevEducation,
                  degree,
                }))
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Institution"
              value={newEducation.institution}
              onChangeText={(institution) =>
                setNewEducation((prevEducation) => ({
                  ...prevEducation,
                  institution,
                }))
              }
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEducation}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setAddingItem("")}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>);
    } 
    else if (addingItem === "Skill"){
      return (
        <View>
          <View style={styles.dialogOverlay}>
            <View style={styles.dialogContainer}>
              <TextInput
                placeholder="Skill"
                value={newSkill.name}
                onChangeText={(name) =>
                  setNewSkill((prevSkill) => ({
                    ...prevSkill,
                    name,
                  }))
                }
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveSkill}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddingItem("")}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>);
    } 
    else if (addingItem === "Experience"){
      return (
      <View>
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <TextInput
              placeholder="Experience Name"
              value={newExperience.title}
              onChangeText={(title) =>
                setNewExperience((prevExperience) => ({
                  ...prevExperience,
                  title,
                }))
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Experience Company"
              value={newExperience.company}
              onChangeText={(company) =>
                setNewExperience((prevExperience) => ({
                  ...prevExperience,
                  company,
                }))
              }
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveExperience}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setAddingItem("")}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>);
    } 
  };

  return (
    <ScrollView style={{ backgroundColor: "white"}}>
      <View
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: "#000",
            height: 150,
          }}
        >
          <Pressable>
            <Image
              source={require("../assets/icon.png")}
              style={{ width: 30, height: 30 }}
            ></Image>
            <View></View>
            <View></View>
          </Pressable>
        </View>
        <View
          style={{ alignItems: "flex-start", padding: 10, marginLeft: "5%" }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: -70,
            }}
          ></Image>
        </View>
        <View style={{ padding: 10, marginLeft: "4%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {"User Name"}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: '4%' }}>
      </View>

      {/* SectionList for Education, Skills, and Experience */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        
        renderSectionHeader={({ section }) => (
          <>{renderSectionHeader({section})}</>
        )}
        renderItem={({ item, section }) => (
          <>
            {section.data.map((sectionItem) => (
              <>{section.renderItem({ item: sectionItem })}</>
            ))}
          </>
        )}
      />

      {addingItem && (
        <AddItemDialog
        />
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  // Define your styles here
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  aboutField: {
    padding: 10,
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 20
  },
  aboutLine: {
    padding: 5,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
  container: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  addButton: {
    position: 'absolute',
    top: 10, // Adjust the top positioning as needed
    right: 10, // Adjust the right positioning as needed
    backgroundColor: 'black', // Button background color
    padding: 10,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: 'white', // Button label color
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  dialogOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserProfile;
