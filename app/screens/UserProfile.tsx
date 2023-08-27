import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
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
import { get, post, put } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Education {
  name: string;
  description: string;
}

interface Skill {
  name: string;
  description: string;
}

interface Experience {
  name: string;
  description: string;
}

interface Props {
  navigation: NativeStackNavigationProp<any, "Profile">;
}
const UserProfile = ({ navigation}: Props) => {

  const [addingItem, setAddingItem] = useState("");

  const [username, setUsername] = useState("")

  const [expreniences, setExperiences] = useState<Experience[]>([]);

  const [newExperience, setNewExperience] = useState<Experience>({
    name: "",
    description: "",
  });

  const [educations, setEducations] = useState<Education[]>([]);

  const [newEducation, setNewEducation] = useState<Education>({
    name: "",
    description: "",
  });

  const [skills, setSkills] = useState<Skill[]>([]);

  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const accessToken = JSON.parse(token).access_token;
          console.log("ZD " + accessToken);
  
          const response = await get("/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userData = response.data; 

          console.log(userData);
          console.log(response.data?.username);

          setEducations(userData.education || []);          
          setExperiences(response.data?.exprenience || []);
          setSkills(response.data?.skills || []);
          setUsername(response.data?.username || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const accessToken = JSON.parse(token).access_token;

        await put(
          "/user/update",  
          {
            username: username, 
            education: educations, 
            skills: skills,
            experience: expreniences,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
          );
  
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  }

  const handleSaveExperience = () => {

    setAddingItem("")

    expreniences.push(newExperience);

    setNewExperience({ name: "", description: "" }); // Clear the input fields

    updateUser();

  };

  const handleSaveEducation = async () => {
    setAddingItem("")

    educations.push(newEducation);

    setNewEducation({ name: "", description: "" }); // Clear the input fields

    updateUser();

  };

  const handleSaveSkill = () => {

    setAddingItem("")

    skills.push(newSkill);

    setNewSkill({ name: "" , description: ""}); 

    updateUser();

  };



  const renderEducationItem = ({ item }: { item: Education }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Institution</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.name}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Degree</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.description}</Text>
    </View>
  );

  const renderSkillsItem = ({ item }: { item: Skill }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Name</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.name}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>description</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.description}</Text>
    </View>
  );

  const renderExperienceItem = ({ item }: { item: Experience }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Title</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.name}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Company</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item.description}</Text>
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
      title: "Skill",
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
      onPress={ () => {
        if (title === "Experience") {
          setAddingItem("Experience")
        } else if (title === "Education") {
          setAddingItem("Education")
        } else if (title === "Skill") {
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
              value={newEducation.name}
              onChangeText={(name) =>
                setNewEducation((prevEducation) => ({
                  ...prevEducation,
                  name,
                }))
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Institution"
              value={newEducation.description}
              onChangeText={(description) =>
                setNewEducation((prevEducation) => ({
                  ...prevEducation,
                  description,
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
                placeholder="Skill Name"
                value={newSkill.name}
                onChangeText={(name) =>
                  setNewSkill((prevSkill) => ({
                    ...prevSkill,
                    name,
                  }))
                }
                style={styles.input}
              />
              
              <TextInput
                placeholder="Skill Description"
                value={newSkill.description}
                onChangeText={(description) =>
                  setNewSkill((prevSkill) => ({
                    ...prevSkill,
                    description,
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
              value={newExperience.name}
              onChangeText={(name) =>
                setNewExperience((prevExperience) => ({
                  ...prevExperience,
                  name,
                }))
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Experience Company"
              value={newExperience.description}
              onChangeText={(description) =>
                setNewExperience((prevExperience) => ({
                  ...prevExperience,
                  description,
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
            {username}
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
