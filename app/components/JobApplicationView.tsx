import { View, ScrollView, Text } from "react-native";

export const JobApplicationView = (
  title: string,
  experienceLevel: string,
  jobLocation: string,
  jobType: string,
  skills: string[],
  description: string
) => {
  return (
    <View>
      <ScrollView>
        <Text style={{ fontSize: 15, padding: 8 }}>Job title:</Text>
        <Text style={{ fontSize: 10, padding: 5 }}>{title}</Text>

        <Text style={{ fontSize: 15, padding: 8 }}>Experience level:</Text>
        <Text style={{ fontSize: 10, padding: 5 }}>{experienceLevel}</Text>


        <Text style={{ fontSize: 15, padding: 8 }}>Job location:</Text>
        <Text style={{ fontSize: 10, padding: 5 }}>{jobLocation}</Text>

        <Text style={{ fontSize: 15, padding: 8 }}>Job type:</Text>
        <Text style={{ fontSize: 10, padding: 5 }}>{jobType}</Text>

        <Text style={{ fontSize: 15, padding: 8 }}>Skills:</Text>
        <View style={{flexDirection: 'row'}}>
            {skills.map((skill) => <Text style={{backgroundColor:'grey', color: 'black'}}>{skill}</Text>)}
        </View>
        <View>
          <Text style={{ fontSize: 15, padding: 8 }}>Description:</Text>
          <Text>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
