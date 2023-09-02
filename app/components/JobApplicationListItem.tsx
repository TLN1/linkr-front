import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Application {
  id: number;
  title: string;
  location: string;
  job_type: string;
  experienceLevel: string;
  skills: string[];
  description: string;
}

export function JobApplicationListItem(application) {
  console.log(application);
  return (
    <View style={{ padding: 10, flexDirection: "row" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {application?.item?.title}
        </Text>
        <Text style={{ fontSize: 15, color: "grey" }}>
          {application?.item?.location}
        </Text>
      </View>
      <View style={{ padding: 5 , marginRight: 0}}>
        <Feather.Button name="edit-3" backgroundColor="white" color="black" />
        <Feather.Button name="delete" backgroundColor="white" color="black" />
      </View>
    </View>
  );
}
